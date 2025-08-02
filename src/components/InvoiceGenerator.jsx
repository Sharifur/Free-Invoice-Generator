import React, { useState } from 'react';
import CompanySection from './CompanySection';
import ClientSection from './ClientSection';
import LineItemsTable from './LineItemsTable';
import CalculationsPanel from './CalculationsPanel';
import TemplateCustomizer from './TemplateCustomizer';
import InvoicePreview from './InvoicePreview';
import ExportControls from './ExportControls';
import { useInvoiceData } from '../hooks/useInvoiceData';
import { useTemplateSettings } from '../hooks/useTemplateSettings';

const InvoiceGenerator = () => {
    const [activeTab, setActiveTab] = useState('edit');
    const [showCustomizer, setShowCustomizer] = useState(false);
    const { invoiceData } = useInvoiceData();
    const { templateSettings } = useTemplateSettings();
    
    return (
        <div className="sig-invoice-generator">
            <div className="sig-header">
                <h2>Invoice Generator</h2>
                <div className="sig-header-actions">
                    <button 
                        onClick={() => setShowCustomizer(!showCustomizer)}
                        className="sig-btn sig-btn-secondary"
                    >
                        Customize Template
                    </button>
                    <div className="sig-tab-switcher">
                        <button 
                            className={`sig-tab ${activeTab === 'edit' ? 'active' : ''}`}
                            onClick={() => setActiveTab('edit')}
                        >
                            Edit
                        </button>
                        <button 
                            className={`sig-tab ${activeTab === 'preview' ? 'active' : ''}`}
                            onClick={() => setActiveTab('preview')}
                        >
                            Preview
                        </button>
                    </div>
                </div>
            </div>
            
            {showCustomizer && (
                <div className="sig-customizer-panel">
                    <TemplateCustomizer onClose={() => setShowCustomizer(false)} />
                </div>
            )}
            
            <div className="sig-content">
                {activeTab === 'edit' ? (
                    <div className="sig-edit-mode">
                        <div className="sig-left-panel">
                            <CompanySection />
                            <ClientSection />
                        </div>
                        
                        <div className="sig-right-panel">
                            <LineItemsTable />
                            <CalculationsPanel />
                        </div>
                    </div>
                ) : (
                    <div className="sig-preview-mode">
                        <InvoicePreview />
                        <ExportControls />
                    </div>
                )}
            </div>
        </div>
    );
};

export default InvoiceGenerator;