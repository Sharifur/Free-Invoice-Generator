import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const generatePDF = async (invoiceData) => {
    try {
        // Find the preview element
        const element = document.querySelector('.sig-invoice-preview');
        if (!element) {
            throw new Error('Invoice preview not found');
        }
        
        // Clone the element to avoid modifying the original
        const clone = element.cloneNode(true);
        clone.style.width = '800px';
        clone.style.position = 'absolute';
        clone.style.left = '-9999px';
        clone.style.top = '0';
        document.body.appendChild(clone);
        
        // Remove no-print elements from clone
        const noPrintElements = clone.querySelectorAll('.sig-no-print');
        noPrintElements.forEach(el => el.remove());
        
        // Generate canvas from HTML
        const canvas = await html2canvas(clone, {
            scale: 2,
            useCORS: true,
            logging: false,
            backgroundColor: '#ffffff'
        });
        
        // Remove clone
        document.body.removeChild(clone);
        
        // Calculate dimensions
        const imgWidth = 210; // A4 width in mm
        const pageHeight = 297; // A4 height in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        
        // Create PDF
        const pdf = new jsPDF('p', 'mm', 'a4');
        let position = 0;
        
        // Add image to PDF
        const imgData = canvas.toDataURL('image/png');
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
        
        // Add new pages if needed
        while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }
        
        // Generate filename
        const filename = `invoice-${invoiceData.invoice.number.replace(/[^a-zA-Z0-9]/g, '-')}.pdf`;
        
        // Save PDF
        pdf.save(filename);
        
    } catch (error) {
        console.error('PDF generation error:', error);
        throw error;
    }
};

// Alternative method using REST API for server-side PDF generation
export const generatePDFViaAPI = async (invoiceData, config) => {
    try {
        const response = await fetch(`${config.restUrl}generate-pdf`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-WP-Nonce': config.nonce
            },
            body: JSON.stringify({ invoice: invoiceData })
        });
        
        if (!response.ok) {
            throw new Error('Failed to generate PDF');
        }
        
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `invoice-${invoiceData.invoice.number.replace(/[^a-zA-Z0-9]/g, '-')}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        
    } catch (error) {
        console.error('API PDF generation error:', error);
        throw error;
    }
};