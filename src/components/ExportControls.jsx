import React, { useState } from 'react';
import { useInvoiceData } from '../hooks/useInvoiceData';
import { generatePDF } from '../utils/pdfGenerator';

const ExportControls = () => {
    const { invoiceData, resetInvoice } = useInvoiceData();
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState('');
    
    const handlePrint = () => {
        window.print();
    };
    
    const handleDownloadPDF = async () => {
        setIsGenerating(true);
        setError('');
        
        try {
            await generatePDF(invoiceData);
        } catch (err) {
            console.error('PDF generation error:', err);
            setError('Failed to generate PDF. Please try again.');
        } finally {
            setIsGenerating(false);
        }
    };
    
    const handleNewInvoice = () => {
        resetInvoice();
    };
    
    return (
        <div className="sig-export-controls">
            <div className="sig-export-actions">
                <button 
                    onClick={handlePrint}
                    className="sig-btn sig-btn-secondary sig-no-print"
                    disabled={isGenerating}
                >
                    Print Invoice
                </button>
                
                <button 
                    onClick={handleDownloadPDF}
                    className="sig-btn sig-btn-primary sig-no-print"
                    disabled={isGenerating}
                >
                    {isGenerating ? 'Generating...' : 'Download PDF'}
                </button>
                
                <button 
                    onClick={handleNewInvoice}
                    className="sig-btn sig-btn-outline sig-no-print"
                    disabled={isGenerating}
                >
                    New Invoice
                </button>
            </div>
            
            {error && (
                <div className="sig-error-message">
                    {error}
                </div>
            )}
        </div>
    );
};

export default ExportControls;