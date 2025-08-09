import React from 'react';
import ReactDOM from 'react-dom';
import QuotationGenerator from './components/QuotationGenerator';

// Initialize the quotation generator when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('Taskip Quotation Generator: DOM loaded, searching for containers...');
    
    // Find all quotation generator containers
    const containers = document.querySelectorAll('.taskip-quotation-generator-container');
    console.log('Taskip Quotation Generator: Found', containers.length, 'containers');
    
    containers.forEach((container, index) => {
        console.log('Taskip Quotation Generator: Processing container', index, container);
        
        if (container && !container.hasChildNodes()) {
            try {
                console.log('Taskip Quotation Generator: Rendering React component in container', index);
                
                // Create React root and render the quotation generator
                if (ReactDOM.createRoot) {
                    const root = ReactDOM.createRoot(container);
                    root.render(<QuotationGenerator />);
                } else {
                    ReactDOM.render(<QuotationGenerator />, container);
                }
                
                console.log('Taskip Quotation Generator: Successfully rendered in container', index);
            } catch (error) {
                console.error('Taskip Quotation Generator: Error rendering component:', error);
                // Fallback: show a simple message
                container.innerHTML = '<div style="padding: 20px; border: 1px solid #ccc; background: #f9f9f9;">Quotation Generator loading... If this persists, please check console for errors.</div>';
            }
        } else if (container && container.hasChildNodes()) {
            console.log('Taskip Quotation Generator: Container', index, 'already has content, skipping');
        }
    });
});

// Export for potential external use
window.TaskipQuotationGenerator = QuotationGenerator;