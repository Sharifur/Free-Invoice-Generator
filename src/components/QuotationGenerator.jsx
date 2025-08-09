import React, { useState } from 'react';
import { useQuotationData } from '../hooks/useQuotationData';
import QuotationPreview from './QuotationPreview';

const QuotationGenerator = () => {
    const [activeTab, setActiveTab] = useState('edit');
    const [draggedItem, setDraggedItem] = useState(null);
    const [dragOverIndex, setDragOverIndex] = useState(null);
    const [isEditMode, setIsEditMode] = useState(true);
    const [showCustomization, setShowCustomization] = useState(false);
    const [brandSettings, setBrandSettings] = useState(() => {
        const saved = localStorage.getItem('taskip_brand_settings');
        return saved ? JSON.parse(saved) : {
            primaryColor: '#667eea',
            accentColor: '#48bb78',
            borderColor: '#e2e8f0',
            headingColor: '#1a202c',
            paragraphColor: '#4a5568',
            fontFamily: 'Arial, sans-serif',
            borderStyle: 'solid',
            showBorders: true,
            headerStyle: 'modern',
            currency: 'USD'
        };
    });
    
    try {
        const { 
            quotationData, 
            updateQuotationData, 
            addLineItem, 
            removeLineItem, 
            updateLineItem,
            reorderLineItems 
        } = useQuotationData();

        // Drag and drop handlers
        const handleDragStart = (e, index) => {
            setDraggedItem(index);
            e.dataTransfer.effectAllowed = 'move';
            e.target.style.opacity = '0.5';
        };

        const handleDragEnd = (e) => {
            e.target.style.opacity = '1';
            setDraggedItem(null);
            setDragOverIndex(null);
        };

        const handleDragOver = (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
        };

        const handleDragEnter = (e, index) => {
            e.preventDefault();
            setDragOverIndex(index);
        };

        const handleDrop = (e, index) => {
            e.preventDefault();
            if (draggedItem !== null && draggedItem !== index) {
                reorderLineItems(draggedItem, index);
            }
            setDraggedItem(null);
            setDragOverIndex(null);
        };

        const handleLogoUpload = (event) => {
            const file = event.target.files[0];
            if (file) {
                // Check file type
                const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
                if (!allowedTypes.includes(file.type)) {
                    alert('Please upload a valid image file (JPEG, PNG, GIF, or WebP)');
                    return;
                }
                
                // Check file size (limit to 2MB)
                if (file.size > 2 * 1024 * 1024) {
                    alert('File size should be less than 2MB');
                    return;
                }
                
                const reader = new FileReader();
                reader.onload = (e) => {
                    const logoData = e.target.result;
                    updateQuotationData({ 
                        company: { ...quotationData.company, logo: logoData } 
                    });
                };
                reader.readAsDataURL(file);
            }
        };

        const handleLogoRemove = () => {
            updateQuotationData({ 
                company: { ...quotationData.company, logo: '' } 
            });
        };

        // Update brand settings
        const updateBrandSettings = (newSettings) => {
            const updatedSettings = { ...brandSettings, ...newSettings };
            setBrandSettings(updatedSettings);
            localStorage.setItem('taskip_brand_settings', JSON.stringify(updatedSettings));
        };
        
        // Unified function for both print and download PDF (both open print dialog)
        const handlePrintOrDownloadPDF = () => {
            const printContent = document.getElementById('quotation-preview');
            if (printContent) {
                // Create a complete HTML structure for printing/PDF generation
                const htmlContent = `
                    <!DOCTYPE html>
                    <html>
                        <head>
                            <title>${quotationData.title || 'QUOTATION'} ${quotationData.number || 'QUO-001'}</title>
                            <style>
                                * { margin: 0; padding: 0; box-sizing: border-box; }
                                .taskip-logo {
                                    max-width: 150px;
                                    max-height: 80px;
                                    margin-bottom: 20px;
                                    object-fit: contain;
                                }
                                body { 
                                    font-family: ${brandSettings.fontFamily}; 
                                    margin: 0; 
                                    padding: 20px; 
                                    background: white;
                                    color: #333;
                                }
                                .taskip-document { 
                                    max-width: 800px; 
                                    margin: 0 auto; 
                                    background: white;
                                }
                                .taskip-document-header { 
                                    display: grid; 
                                    grid-template-columns: 1fr 1fr; 
                                    gap: 40px; 
                                    margin-bottom: 40px;
                                    margin-top: ${brandSettings.headerStyle === 'corporate' ? '-20px' : '0'};
                                    margin-left: ${brandSettings.headerStyle === 'corporate' ? '-20px' : '0'};
                                    margin-right: ${brandSettings.headerStyle === 'corporate' ? '-20px' : '0'};
                                    padding-bottom: ${brandSettings.headerStyle === 'modern' ? '30px' :
                                                     brandSettings.headerStyle === 'classic' ? '25px' :
                                                     brandSettings.headerStyle === 'minimal' ? '20px' :
                                                     brandSettings.headerStyle === 'corporate' ? '35px' : '30px'};
                                    border-bottom: ${brandSettings.headerStyle === 'modern' ? `4px solid ${brandSettings.primaryColor}` :
                                                    brandSettings.headerStyle === 'classic' ? `3px double ${brandSettings.headingColor}` :
                                                    brandSettings.headerStyle === 'minimal' ? `1px solid ${brandSettings.borderColor}` :
                                                    brandSettings.headerStyle === 'corporate' ? `5px solid ${brandSettings.primaryColor}` : 
                                                    '2px solid #e2e8f0'};
                                    border-top: ${brandSettings.headerStyle === 'classic' ? `1px solid ${brandSettings.headingColor}` : 'none'};
                                    background: ${brandSettings.headerStyle === 'modern' ? `linear-gradient(135deg, ${brandSettings.primaryColor}08, transparent)` :
                                               brandSettings.headerStyle === 'corporate' ? `linear-gradient(135deg, ${brandSettings.primaryColor}25, ${brandSettings.accentColor}15)` : 'transparent'};
                                    padding: ${brandSettings.headerStyle === 'corporate' ? '30px 40px 35px 40px' :
                                             brandSettings.headerStyle === 'classic' ? '15px 0 25px 0' :
                                             brandSettings.headerStyle === 'modern' ? '10px 20px 30px 20px' : '0 0 20px 0'};
                                    border-radius: ${brandSettings.headerStyle === 'modern' ? '8px 8px 0 0' : 
                                                    brandSettings.headerStyle === 'corporate' ? '12px 12px 0 0' : '0'};
                                    box-shadow: ${brandSettings.headerStyle === 'corporate' ? '0 4px 12px rgba(0, 0, 0, 0.05)' : 'none'};
                                }
                                .taskip-company-details h1, .taskip-company-details input { 
                                    margin: 0 0 15px 0; 
                                    font-size: 24px; 
                                    color: ${brandSettings.headingColor}; 
                                    font-weight: bold;
                                }
                                .taskip-address p, .taskip-address input, .taskip-address textarea { 
                                    margin: 2px 0; 
                                    color: ${brandSettings.paragraphColor}; 
                                    font-size: 14px; 
                                }
                                .taskip-document-title { 
                                    font-size: 32px; 
                                    font-weight: 700; 
                                    color: ${brandSettings.primaryColor}; 
                                    margin: 0 0 20px 0; 
                                    text-align: right; 
                                }
                                .taskip-status { 
                                    padding: 8px 16px; 
                                    border-radius: 20px; 
                                    font-size: 12px; 
                                    font-weight: 600; 
                                    text-align: center; 
                                    margin-bottom: 20px; 
                                    text-transform: uppercase; 
                                    display: inline-block;
                                }
                                .status-draft { 
                                    background: #f7fafc; 
                                    color: ${brandSettings.paragraphColor}; 
                                    border: 1px solid ${brandSettings.borderColor}; 
                                }
                                .status-sent { 
                                    background: #ebf8ff; 
                                    color: #2b6cb0; 
                                    border: 1px solid ${brandSettings.borderColor}; 
                                }
                                .status-accepted { 
                                    background: #f0fff4; 
                                    color: #276749; 
                                    border: 1px solid ${brandSettings.borderColor}; 
                                }
                                .status-rejected { 
                                    background: #fed7e2; 
                                    color: #c53030; 
                                    border: 1px solid ${brandSettings.borderColor}; 
                                }
                                .taskip-detail-row { 
                                    display: flex; 
                                    justify-content: space-between; 
                                    margin-bottom: 8px; 
                                    font-size: 14px; 
                                }
                                .taskip-detail-row span:first-child { color: ${brandSettings.paragraphColor}; }
                                .taskip-detail-row span:last-child { font-weight: 500; color: ${brandSettings.headingColor}; }
                                .taskip-client-section { margin-bottom: 30px; }
                                .taskip-client-section h3 { 
                                    margin: 0 0 15px 0; 
                                    color: ${brandSettings.headingColor}; 
                                    font-size: 16px; 
                                    font-weight: 600; 
                                }
                                .taskip-client-info p, .taskip-client-info input, .taskip-client-info textarea { 
                                    margin: 3px 0; 
                                    color: ${brandSettings.paragraphColor}; 
                                    font-size: 14px; 
                                }
                                .taskip-items-table { 
                                    width: 100%; 
                                    border-collapse: collapse; 
                                    margin-bottom: 30px; 
                                }
                                .taskip-items-table th, 
                                .taskip-items-table td { 
                                    padding: 12px 8px; 
                                    text-align: left; 
                                    border-bottom: ${brandSettings.showBorders ? `1px ${brandSettings.borderStyle} ${brandSettings.borderColor}` : `1px solid ${brandSettings.borderColor}`}; 
                                }
                                .taskip-items-table th { 
                                    background: #f7fafc; 
                                    font-weight: 600; 
                                    color: ${brandSettings.headingColor}; 
                                    font-size: 14px; 
                                }
                                .taskip-items-table td { 
                                    font-size: 14px; 
                                    color: ${brandSettings.paragraphColor}; 
                                }
                                .taskip-item-description strong, .taskip-item-description input { color: ${brandSettings.headingColor}; }
                                .taskip-item-details, .taskip-item-details input { 
                                    font-size: 12px; 
                                    color: #718096; 
                                    margin-top: 4px; 
                                }
                                .taskip-totals-section { 
                                    display: flex; 
                                    justify-content: flex-end; 
                                    margin-bottom: 40px; 
                                }
                                .taskip-totals-table { min-width: 300px; }
                                .taskip-total-row { 
                                    display: flex; 
                                    justify-content: space-between; 
                                    padding: 8px 0; 
                                    border-bottom: 1px solid ${brandSettings.borderColor}; 
                                }
                                .taskip-final-total { 
                                    border-top: 2px solid ${brandSettings.borderColor}; 
                                    border-bottom: 2px solid ${brandSettings.borderColor}; 
                                    font-size: 18px; 
                                    padding: 12px 0; 
                                    margin-top: 10px; 
                                    font-weight: bold;
                                }
                                input, textarea, select { 
                                    background: transparent !important; 
                                    border: none !important; 
                                    outline: none !important; 
                                    font-family: inherit !important;
                                    font-size: inherit !important;
                                    color: inherit !important;
                                    font-weight: inherit !important;
                                    padding: 0 !important;
                                    margin: inherit !important;
                                    text-align: inherit !important;
                                }
                                /* Hide calendar icon from date inputs */
                                input[type="date"]::-webkit-calendar-picker-indicator {
                                    display: none !important;
                                }
                                input[type="date"]::-webkit-inner-spin-button,
                                input[type="date"]::-webkit-clear-button {
                                    display: none !important;
                                }
                                .print-hide { display: none !important; }
                                button, .taskip-btn { display: none !important; }
                                svg { display: none !important; }
                                textarea { resize: none !important; }
                                input::-webkit-resizer,
                                textarea::-webkit-resizer { display: none !important; }
                                * { box-shadow: none !important; }
                                .taskip-document { box-shadow: none !important; }
                                /* Fix totals alignment when Tax & Discount Settings are hidden */
                                div[style*="grid-template-columns"] { 
                                    display: block !important; 
                                }
                                .taskip-totals-section { 
                                    display: flex !important; 
                                    justify-content: flex-end !important; 
                                    width: 100% !important;
                                    margin-bottom: 40px !important; 
                                }
                                @media print {
                                    body { margin: 0; padding: 0; }
                                    * { -webkit-print-color-adjust: exact !important; }
                                }
                            </style>
                        </head>
                        <body>
                            ${printContent.outerHTML}
                        </body>
                    </html>
                `;

                // Create a new window for printing/PDF generation
                const printWindow = window.open('', '_blank');
                printWindow.document.write(htmlContent);
                printWindow.document.close();
                printWindow.focus();
                
                // Wait for content to load then trigger print dialog (user can choose Print or Save as PDF)
                setTimeout(() => {
                    printWindow.print();
                    // Note: The user can choose "Save as PDF" from the print dialog
                }, 250);
            }
        };

        // Helper function to get input styles based on mode
        const getInputStyle = (baseStyle = {}) => {
            return {
                ...baseStyle,
                background: isEditMode ? '#f1f5f9' : 'transparent',
                borderRadius: isEditMode ? '4px' : '0',
                padding: isEditMode ? '4px 8px' : baseStyle.padding || '0',
                transition: 'all 0.2s ease',
                border: isEditMode ? '1px solid #a0aec0' : 'none'
            };
        };

        const getTextareaStyle = (baseStyle = {}) => {
            return {
                ...baseStyle,
                background: isEditMode ? '#f1f5f9' : 'transparent',
                borderRadius: isEditMode ? '4px' : '0',
                padding: isEditMode ? '6px 10px' : baseStyle.padding || '0',
                transition: 'all 0.2s ease',
                border: isEditMode ? '1px solid #a0aec0' : 'none'
            };
        };

        // Helper function to get border style based on brand settings
        const getBorderStyle = () => {
            return brandSettings.showBorders 
                ? `1px ${brandSettings.borderStyle} ${brandSettings.borderColor}` 
                : `1px solid ${brandSettings.borderColor}`;
        };

        // Helper function to format currency based on brand settings
        const formatCurrency = (amount) => {
            const formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: brandSettings.currency || 'USD',
            });
            return formatter.format(amount || 0);
        };

        return (
            <div className="taskip-quotation-generator">
                <div className="taskip-header">
                    <h2>Quotation Generator</h2>
                    <div className="taskip-header-actions">
                        <button 
                            onClick={() => setIsEditMode(!isEditMode)}
                            className={`taskip-btn ${isEditMode ? 'taskip-btn-primary' : 'taskip-btn-secondary'}`}
                            style={{marginRight: '10px'}}
                        >
                            {isEditMode ? (
                                <>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{marginRight: '8px'}}>
                                        <path d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z"/>
                                    </svg>
                                    Preview Mode
                                </>
                            ) : (
                                <>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{marginRight: '8px'}}>
                                        <path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"/>
                                    </svg>
                                    Edit Mode
                                </>
                            )}
                        </button>
                        <button 
                            onClick={handlePrintOrDownloadPDF}
                            className="taskip-btn taskip-btn-primary"
                            style={{marginRight: '10px'}}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{marginRight: '8px'}}>
                                <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                            </svg>
                            Download PDF
                        </button>
                        <button 
                            onClick={handlePrintOrDownloadPDF}
                            className="taskip-btn taskip-btn-secondary"
                            style={{marginRight: '10px'}}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{marginRight: '8px'}}>
                                <path d="M18,3H6V7H18M19,12A1,1 0 0,1 18,11A1,1 0 0,1 19,10A1,1 0 0,1 20,11A1,1 0 0,1 19,12M16,19H8V14H16M19,8H5A3,3 0 0,0 2,11V17H6V21H18V17H22V11A3,3 0 0,0 19,8Z"/>
                            </svg>
                            Print
                        </button>
                        <button 
                            onClick={() => setShowCustomization(!showCustomization)}
                            className={`taskip-btn ${showCustomization ? 'taskip-btn-primary' : 'taskip-btn-secondary'}`}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{marginRight: '8px'}}>
                                <path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.22,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.22,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.68 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z"/>
                            </svg>
                            Customize
                        </button>
                    </div>
                </div>
                
                {/* Customization Sheet Overlay */}
                <div 
                    className={`taskip-customization-overlay ${showCustomization ? 'active' : ''}`}
                    onClick={() => setShowCustomization(false)}
                ></div>

                {/* Customization Sheet */}
                <div className={`taskip-customization-sheet ${showCustomization ? 'active' : ''}`}>
                    <div className="taskip-sheet-header">
                        <h3>Brand Customization</h3>
                        <button 
                            className="taskip-sheet-close"
                            onClick={() => setShowCustomization(false)}
                        >
                            ×
                        </button>
                    </div>
                    
                    <div className="taskip-sheet-content">
                        {/* Header Style Section - Moved to Top */}
                        <div className="taskip-customization-section">
                            <h4>Header Style</h4>
                            <div className="taskip-header-styles">
                                <div 
                                    className={`taskip-header-style ${brandSettings.headerStyle === 'modern' ? 'active' : ''}`}
                                    onClick={() => updateBrandSettings({ headerStyle: 'modern' })}
                                >
                                    <svg viewBox="0 0 100 60" fill="currentColor">
                                        <rect x="10" y="10" width="80" height="8" fill="#667eea"/>
                                        <rect x="10" y="25" width="60" height="4" fill="#a0aec0"/>
                                        <rect x="10" y="35" width="40" height="4" fill="#a0aec0"/>
                                        <rect x="10" y="45" width="70" height="4" fill="#a0aec0"/>
                                    </svg>
                                    <span>Modern</span>
                                </div>
                                <div 
                                    className={`taskip-header-style ${brandSettings.headerStyle === 'classic' ? 'active' : ''}`}
                                    onClick={() => updateBrandSettings({ headerStyle: 'classic' })}
                                >
                                    <svg viewBox="0 0 100 60" fill="currentColor">
                                        <rect x="10" y="10" width="80" height="2" fill="#4a5568"/>
                                        <rect x="10" y="18" width="80" height="6" fill="#667eea"/>
                                        <rect x="10" y="30" width="80" height="2" fill="#4a5568"/>
                                        <rect x="10" y="38" width="60" height="3" fill="#a0aec0"/>
                                        <rect x="10" y="47" width="50" height="3" fill="#a0aec0"/>
                                    </svg>
                                    <span>Classic</span>
                                </div>
                                <div 
                                    className={`taskip-header-style ${brandSettings.headerStyle === 'minimal' ? 'active' : ''}`}
                                    onClick={() => updateBrandSettings({ headerStyle: 'minimal' })}
                                >
                                    <svg viewBox="0 0 100 60" fill="currentColor">
                                        <rect x="10" y="15" width="50" height="6" fill="#667eea"/>
                                        <rect x="10" y="35" width="80" height="1" fill="#e2e8f0"/>
                                        <rect x="10" y="45" width="60" height="2" fill="#a0aec0"/>
                                    </svg>
                                    <span>Minimal</span>
                                </div>
                                <div 
                                    className={`taskip-header-style ${brandSettings.headerStyle === 'corporate' ? 'active' : ''}`}
                                    onClick={() => updateBrandSettings({ headerStyle: 'corporate' })}
                                >
                                    <svg viewBox="0 0 100 60" fill="currentColor">
                                        <rect x="10" y="10" width="80" height="12" fill="#4a5568"/>
                                        <rect x="15" y="14" width="70" height="4" fill="white"/>
                                        <rect x="10" y="30" width="35" height="3" fill="#a0aec0"/>
                                        <rect x="10" y="38" width="45" height="3" fill="#a0aec0"/>
                                        <rect x="10" y="46" width="30" height="3" fill="#a0aec0"/>
                                    </svg>
                                    <span>Corporate</span>
                                </div>
                            </div>
                        </div>

                        {/* Brand Colors Section */}
                        <div className="taskip-customization-section">
                            <h4>Brand Colors</h4>
                            <div className="taskip-color-input">
                                <label>Primary Color</label>
                                <input
                                    type="color"
                                    value={brandSettings.primaryColor}
                                    onChange={(e) => updateBrandSettings({ primaryColor: e.target.value })}
                                />
                            </div>
                            <div className="taskip-color-input">
                                <label>Accent Color</label>
                                <input
                                    type="color"
                                    value={brandSettings.accentColor}
                                    onChange={(e) => updateBrandSettings({ accentColor: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Text Colors Section */}
                        <div className="taskip-customization-section">
                            <h4>Text Colors</h4>
                            <div className="taskip-color-input">
                                <label>Heading Color</label>
                                <input
                                    type="color"
                                    value={brandSettings.headingColor}
                                    onChange={(e) => updateBrandSettings({ headingColor: e.target.value })}
                                />
                            </div>
                            <div className="taskip-color-input">
                                <label>Paragraph Color</label>
                                <input
                                    type="color"
                                    value={brandSettings.paragraphColor}
                                    onChange={(e) => updateBrandSettings({ paragraphColor: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Typography & Formatting Section */}
                        <div className="taskip-customization-section">
                            <h4>Typography & Formatting</h4>
                            <div className="taskip-field">
                                <label>Font Family</label>
                                <select
                                    value={brandSettings.fontFamily}
                                    onChange={(e) => updateBrandSettings({ fontFamily: e.target.value })}
                                    style={{width: '100%', padding: '10px', marginTop: '8px'}}
                                >
                                    <option value="Arial, sans-serif">Arial</option>
                                    <option value="Georgia, serif">Georgia</option>
                                    <option value="Times New Roman, serif">Times New Roman</option>
                                    <option value="Helvetica, sans-serif">Helvetica</option>
                                    <option value="Verdana, sans-serif">Verdana</option>
                                    <option value="Trebuchet MS, sans-serif">Trebuchet MS</option>
                                    <option value="Courier New, monospace">Courier New</option>
                                </select>
                            </div>
                            <div className="taskip-field" style={{marginTop: '15px'}}>
                                <label>Currency</label>
                                <select
                                    value={brandSettings.currency}
                                    onChange={(e) => updateBrandSettings({ currency: e.target.value })}
                                    style={{width: '100%', padding: '10px', marginTop: '8px'}}
                                >
                                    <option value="USD">USD ($) - US Dollar</option>
                                    <option value="EUR">EUR (€) - Euro</option>
                                    <option value="GBP">GBP (£) - British Pound</option>
                                    <option value="JPY">JPY (¥) - Japanese Yen</option>
                                    <option value="CAD">CAD ($) - Canadian Dollar</option>
                                    <option value="AUD">AUD ($) - Australian Dollar</option>
                                    <option value="CHF">CHF (Fr) - Swiss Franc</option>
                                    <option value="CNY">CNY (¥) - Chinese Yuan</option>
                                    <option value="INR">INR (₹) - Indian Rupee</option>
                                    <option value="BRL">BRL (R$) - Brazilian Real</option>
                                    <option value="SEK">SEK (kr) - Swedish Krona</option>
                                    <option value="NOK">NOK (kr) - Norwegian Krone</option>
                                    <option value="DKK">DKK (kr) - Danish Krone</option>
                                    <option value="ZAR">ZAR (R) - South African Rand</option>
                                    <option value="SGD">SGD ($) - Singapore Dollar</option>
                                    <option value="HKD">HKD ($) - Hong Kong Dollar</option>
                                    <option value="NZD">NZD ($) - New Zealand Dollar</option>
                                    <option value="MXN">MXN ($) - Mexican Peso</option>
                                    <option value="KRW">KRW (₩) - South Korean Won</option>
                                    <option value="PLN">PLN (zł) - Polish Zloty</option>
                                </select>
                            </div>
                        </div>

                        {/* Table Settings Section */}
                        <div className="taskip-customization-section">
                            <h4>Table Settings</h4>
                            <div className="taskip-checkbox-field">
                                <input
                                    type="checkbox"
                                    id="showBorders"
                                    checked={brandSettings.showBorders}
                                    onChange={(e) => updateBrandSettings({ showBorders: e.target.checked })}
                                />
                                <label htmlFor="showBorders">Show Table Borders</label>
                            </div>
                            <div className="taskip-color-input">
                                <label>Border Color</label>
                                <input
                                    type="color"
                                    value={brandSettings.borderColor}
                                    onChange={(e) => updateBrandSettings({ borderColor: e.target.value })}
                                    disabled={!brandSettings.showBorders}
                                />
                            </div>
                            <div className="taskip-field">
                                <label>Border Style</label>
                                <select
                                    value={brandSettings.borderStyle}
                                    onChange={(e) => updateBrandSettings({ borderStyle: e.target.value })}
                                    style={{width: '100%', padding: '10px', marginTop: '8px'}}
                                    disabled={!brandSettings.showBorders}
                                >
                                    <option value="solid">Solid</option>
                                    <option value="dashed">Dashed</option>
                                    <option value="dotted">Dotted</option>
                                    <option value="double">Double</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="taskip-sheet-actions">
                        <button 
                            className="taskip-btn taskip-btn-secondary"
                            onClick={() => {
                                const defaultSettings = {
                                    primaryColor: '#667eea',
                                    accentColor: '#48bb78',
                                    borderColor: '#e2e8f0',
                                    headingColor: '#1a202c',
                                    paragraphColor: '#4a5568',
                                    fontFamily: 'Arial, sans-serif',
                                    borderStyle: 'solid',
                                    showBorders: true,
                                    headerStyle: 'modern',
                                    currency: 'USD'
                                };
                                setBrandSettings(defaultSettings);
                                localStorage.setItem('taskip_brand_settings', JSON.stringify(defaultSettings));
                            }}
                            style={{flex: 1}}
                        >
                            Reset to Default
                        </button>
                        <button 
                            className="taskip-btn taskip-btn-primary"
                            onClick={() => setShowCustomization(false)}
                            style={{flex: 1}}
                        >
                            Apply & Close
                        </button>
                    </div>
                </div>
                
                <div className="taskip-content">
                    <div className="taskip-quotation-preview">
                        <div className="taskip-document" id="quotation-preview" style={{
                            maxWidth: '800px',
                            margin: '0 auto',
                            padding: '40px',
                            background: 'white',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                            borderRadius: '8px',
                            fontFamily: brandSettings.fontFamily
                        }}>
                            {/* Document Header */}
                            <div className="taskip-document-header" style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                gap: '40px',
                                marginBottom: '40px',
                                marginTop: brandSettings.headerStyle === 'corporate' ? '-20px' : '0',
                                marginLeft: brandSettings.headerStyle === 'corporate' ? '-20px' : '0',
                                marginRight: brandSettings.headerStyle === 'corporate' ? '-20px' : '0',
                                paddingBottom: brandSettings.headerStyle === 'modern' ? '30px' :
                                             brandSettings.headerStyle === 'classic' ? '25px' :
                                             brandSettings.headerStyle === 'minimal' ? '20px' :
                                             brandSettings.headerStyle === 'corporate' ? '35px' : '30px',
                                borderBottom: brandSettings.headerStyle === 'modern' ? `4px solid ${brandSettings.primaryColor}` :
                                            brandSettings.headerStyle === 'classic' ? `3px double ${brandSettings.headingColor}` :
                                            brandSettings.headerStyle === 'minimal' ? `1px solid ${brandSettings.borderColor}` :
                                            brandSettings.headerStyle === 'corporate' ? `5px solid ${brandSettings.primaryColor}` : 
                                            '2px solid #e2e8f0',
                                borderTop: brandSettings.headerStyle === 'classic' ? `1px solid ${brandSettings.headingColor}` : 'none',
                                background: brandSettings.headerStyle === 'modern' ? `linear-gradient(135deg, ${brandSettings.primaryColor}08, transparent)` :
                                          brandSettings.headerStyle === 'corporate' ? `linear-gradient(135deg, ${brandSettings.primaryColor}25, ${brandSettings.accentColor}15)` : 'transparent',
                                padding: brandSettings.headerStyle === 'corporate' ? '30px 40px 35px 40px' :
                                        brandSettings.headerStyle === 'classic' ? '15px 0 25px 0' :
                                        brandSettings.headerStyle === 'modern' ? '10px 20px 30px 20px' : '0 0 20px 0',
                                borderRadius: brandSettings.headerStyle === 'modern' ? '8px 8px 0 0' : 
                                            brandSettings.headerStyle === 'corporate' ? '12px 12px 0 0' : '0',
                                boxShadow: brandSettings.headerStyle === 'corporate' ? '0 4px 12px rgba(0, 0, 0, 0.05)' : 'none'
                            }}>
                                <div className="taskip-company-info">
                                    {quotationData.company.logo && (
                                        <div style={{marginBottom: '20px', position: 'relative', display: 'inline-block'}}>
                                            <img 
                                                src={quotationData.company.logo} 
                                                alt="Company Logo" 
                                                style={{
                                                    maxWidth: '150px',
                                                    maxHeight: '80px',
                                                    objectFit: 'contain',
                                                    border: isEditMode ? '2px dashed #cbd5e0' : 'none',
                                                    borderRadius: '4px',
                                                    padding: isEditMode ? '8px' : '0'
                                                }}
                                            />
                                            {isEditMode && (
                                                <button
                                                    onClick={handleLogoRemove}
                                                    className="print-hide"
                                                    style={{
                                                        position: 'absolute',
                                                        top: '-8px',
                                                        right: '-8px',
                                                        background: '#dc3545',
                                                        color: 'white',
                                                        border: 'none',
                                                        borderRadius: '50%',
                                                        width: '20px',
                                                        height: '20px',
                                                        fontSize: '12px',
                                                        cursor: 'pointer',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center'
                                                    }}
                                                    title="Remove logo"
                                                >
                                                    ×
                                                </button>
                                            )}
                                        </div>
                                    )}
                                    
                                    {!quotationData.company.logo && isEditMode && (
                                        <div style={{marginBottom: '20px'}}>
                                            <label 
                                                style={{
                                                    display: 'inline-block',
                                                    padding: '10px 15px',
                                                    background: '#f8f9fa',
                                                    border: '2px dashed #cbd5e0',
                                                    borderRadius: '6px',
                                                    cursor: 'pointer',
                                                    fontSize: '14px',
                                                    color: '#6c757d',
                                                    transition: 'all 0.2s ease'
                                                }}
                                                onMouseOver={(e) => {
                                                    e.target.style.background = '#e9ecef';
                                                    e.target.style.borderColor = '#adb5bd';
                                                }}
                                                onMouseOut={(e) => {
                                                    e.target.style.background = '#f8f9fa';
                                                    e.target.style.borderColor = '#cbd5e0';
                                                }}
                                            >
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{marginRight: '8px'}}>
                                                    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                                                </svg>
                                                Upload Logo
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleLogoUpload}
                                                    style={{display: 'none'}}
                                                />
                                            </label>
                                        </div>
                                    )}

                                    <div className="taskip-company-details">
                                        <input
                                            type="text"
                                            value={quotationData.company.name || ''}
                                            onChange={(e) => updateQuotationData({ 
                                                company: { ...quotationData.company, name: e.target.value } 
                                            })}
                                            placeholder="Your Company Name"
                                            style={getInputStyle({
                                                fontSize: '24px',
                                                fontWeight: 'bold',
                                                color: brandSettings.headingColor,
                                                margin: '0 0 15px 0',
                                                width: '100%',
                                                outline: 'none'
                                            })}
                                        />
                                        <div className="taskip-address">
                                            <input
                                                type="email"
                                                value={quotationData.company.email || ''}
                                                onChange={(e) => updateQuotationData({ 
                                                    company: { ...quotationData.company, email: e.target.value } 
                                                })}
                                                placeholder="company@email.com"
                                                style={getInputStyle({
                                                    fontSize: '14px',
                                                    color: brandSettings.paragraphColor,
                                                    width: '100%',
                                                    margin: '2px 0',
                                                    outline: 'none'
                                                })}
                                            />
                                            <input
                                                type="tel"
                                                value={quotationData.company.phone || ''}
                                                onChange={(e) => updateQuotationData({ 
                                                    company: { ...quotationData.company, phone: e.target.value } 
                                                })}
                                                placeholder="Phone"
                                                style={getInputStyle({
                                                    fontSize: '14px',
                                                    color: brandSettings.paragraphColor,
                                                    width: '100%',
                                                    margin: '2px 0',
                                                    outline: 'none'
                                                })}
                                            />
                                            <textarea
                                                value={quotationData.company.address || ''}
                                                onChange={(e) => updateQuotationData({ 
                                                    company: { ...quotationData.company, address: e.target.value } 
                                                })}
                                                placeholder="Company Address"
                                                rows="2"
                                                style={getTextareaStyle({
                                                    fontSize: '14px',
                                                    color: brandSettings.paragraphColor,
                                                    width: '100%',
                                                    margin: '2px 0',
                                                    outline: 'none',
                                                    resize: 'vertical'
                                                })}
                                            />
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="taskip-document-info">
                                    <input
                                        type="text"
                                        value={quotationData.title || 'QUOTATION'}
                                        onChange={(e) => updateQuotationData({ title: e.target.value.toUpperCase() })}
                                        placeholder="QUOTATION"
                                        style={getInputStyle({
                                            fontSize: '32px',
                                            fontWeight: '700',
                                            color: brandSettings.primaryColor,
                                            margin: '0 0 20px 0',
                                            textAlign: 'right',
                                            width: '100%',
                                            outline: 'none',
                                            textTransform: 'uppercase'
                                        })}
                                    />
                                    <div className="taskip-document-details">
                                        <div className="taskip-detail-row" style={{display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px'}}>
                                            <span>Quote #:</span>
                                            <input
                                                type="text"
                                                value={quotationData.number || ''}
                                                onChange={(e) => updateQuotationData({ number: e.target.value })}
                                                placeholder="QUO-001"
                                                style={getInputStyle({
                                                    textAlign: 'right',
                                                    fontWeight: '500',
                                                    color: brandSettings.headingColor,
                                                    outline: 'none',
                                                    width: '120px'
                                                })}
                                            />
                                        </div>
                                        <div className="taskip-detail-row" style={{display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px'}}>
                                            <span>Quote Date:</span>
                                            <input
                                                type="date"
                                                value={quotationData.date || ''}
                                                onChange={(e) => updateQuotationData({ date: e.target.value })}
                                                style={getInputStyle({
                                                    textAlign: 'right',
                                                    fontWeight: '500',
                                                    color: brandSettings.headingColor,
                                                    outline: 'none'
                                                })}
                                            />
                                        </div>
                                        <div className="taskip-detail-row" style={{display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px'}}>
                                            <span>Valid Until:</span>
                                            <input
                                                type="date"
                                                value={quotationData.validUntil || ''}
                                                onChange={(e) => updateQuotationData({ validUntil: e.target.value })}
                                                style={getInputStyle({
                                                    textAlign: 'right',
                                                    fontWeight: '500',
                                                    color: brandSettings.headingColor,
                                                    outline: 'none'
                                                })}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Client Section */}
                            <div className="taskip-client-section" style={{marginBottom: '30px'}}>
                                <h3 style={{margin: '0 0 15px 0', color: brandSettings.headingColor, fontSize: '16px', fontWeight: '600'}}>Quote To:</h3>
                                <div className="taskip-client-info">
                                    <input
                                        type="text"
                                        value={quotationData.client.name || ''}
                                        onChange={(e) => updateQuotationData({ 
                                            client: { ...quotationData.client, name: e.target.value } 
                                        })}
                                        placeholder="Client Name"
                                        style={getInputStyle({
                                            fontSize: '16px',
                                            fontWeight: 'bold',
                                            color: brandSettings.headingColor,
                                            width: '100%',
                                            margin: '3px 0',
                                            outline: 'none'
                                        })}
                                    />
                                    <input
                                        type="email"
                                        value={quotationData.client.email || ''}
                                        onChange={(e) => updateQuotationData({ 
                                            client: { ...quotationData.client, email: e.target.value } 
                                        })}
                                        placeholder="client@email.com"
                                        style={getInputStyle({
                                            fontSize: '14px',
                                            color: brandSettings.paragraphColor,
                                            width: '100%',
                                            margin: '3px 0',
                                            outline: 'none'
                                        })}
                                    />
                                    <textarea
                                        value={quotationData.client.address || ''}
                                        onChange={(e) => updateQuotationData({ 
                                            client: { ...quotationData.client, address: e.target.value } 
                                        })}
                                        placeholder="Client Address"
                                        rows="2"
                                        style={getTextareaStyle({
                                            fontSize: '14px',
                                            color: brandSettings.paragraphColor,
                                            width: '100%',
                                            margin: '3px 0',
                                            outline: 'none',
                                            resize: 'vertical'
                                        })}
                                    />
                                </div>
                            </div>

                            {/* Items Table */}
                            <div className="taskip-items-section">
                                <table className="taskip-items-table" style={{
                                    width: '100%',
                                    borderCollapse: 'collapse',
                                    marginBottom: '30px',
                                    border: brandSettings.showBorders ? `1px ${brandSettings.borderStyle} ${brandSettings.borderColor}` : 'none'
                                }}>
                                    <thead>
                                        <tr>
                                            <th className="print-hide" style={{padding: '12px 8px', textAlign: 'left', borderBottom: getBorderStyle(), background: '#f7fafc', fontWeight: '600', color: brandSettings.headingColor, fontSize: '14px', width: '30px'}}></th>
                                            <th style={{padding: '12px 8px', textAlign: 'left', borderBottom: getBorderStyle(), background: '#f7fafc', fontWeight: '600', color: brandSettings.headingColor, fontSize: '14px'}}>Description</th>
                                            <th style={{padding: '12px 8px', textAlign: 'left', borderBottom: getBorderStyle(), background: '#f7fafc', fontWeight: '600', color: brandSettings.headingColor, fontSize: '14px', width: '80px'}}>Qty</th>
                                            <th style={{padding: '12px 8px', textAlign: 'left', borderBottom: getBorderStyle(), background: '#f7fafc', fontWeight: '600', color: brandSettings.headingColor, fontSize: '14px', width: '100px'}}>Rate</th>
                                            <th style={{padding: '12px 8px', textAlign: 'right', borderBottom: getBorderStyle(), background: '#f7fafc', fontWeight: '600', color: brandSettings.headingColor, fontSize: '14px', width: '100px'}}>Amount</th>
                                            <th className="print-hide" style={{padding: '12px 8px', textAlign: 'left', borderBottom: getBorderStyle(), background: '#f7fafc', fontWeight: '600', color: brandSettings.headingColor, fontSize: '14px', width: '30px'}}></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {quotationData.lineItems.map((item, index) => (
                                            <tr 
                                                key={index}
                                                className={`taskip-line-item ${dragOverIndex === index ? 'drag-over' : ''}`}
                                                draggable="true"
                                                onDragStart={(e) => handleDragStart(e, index)}
                                                onDragEnd={handleDragEnd}
                                                onDragOver={handleDragOver}
                                                onDragEnter={(e) => handleDragEnter(e, index)}
                                                onDrop={(e) => handleDrop(e, index)}
                                                style={{cursor: 'move', transition: 'all 0.2s ease'}}
                                            >
                                                <td className="print-hide" style={{padding: '12px 8px', fontSize: '14px', color: brandSettings.paragraphColor, borderBottom: getBorderStyle()}}>
                                                    <span style={{fontSize: '18px', color: '#999', cursor: 'grab'}}>⋮⋮</span>
                                                </td>
                                                <td style={{padding: '12px 8px', fontSize: '14px', color: brandSettings.paragraphColor, borderBottom: getBorderStyle()}}>
                                                    <div className="taskip-item-description">
                                                        <input
                                                            type="text"
                                                            value={item.description || ''}
                                                            onChange={(e) => updateLineItem(index, { description: e.target.value })}
                                                            placeholder="Item description..."
                                                            style={getInputStyle({
                                                                fontSize: '14px',
                                                                fontWeight: 'bold',
                                                                color: brandSettings.headingColor,
                                                                width: '100%',
                                                                outline: 'none'
                                                            })}
                                                        />
                                                        <input
                                                            type="text"
                                                            value={item.details || ''}
                                                            onChange={(e) => updateLineItem(index, { details: e.target.value })}
                                                            placeholder="Additional details..."
                                                            style={getInputStyle({
                                                                fontSize: '12px',
                                                                color: '#718096',
                                                                width: '100%',
                                                                marginTop: '4px',
                                                                outline: 'none'
                                                            })}
                                                        />
                                                    </div>
                                                </td>
                                                <td style={{padding: '12px 8px', fontSize: '14px', color: brandSettings.paragraphColor, borderBottom: getBorderStyle()}}>
                                                    <input
                                                        type="number"
                                                        value={item.quantity || 1}
                                                        onChange={(e) => updateLineItem(index, { quantity: parseFloat(e.target.value) || 0 })}
                                                        min="0"
                                                        step="1"
                                                        style={getInputStyle({
                                                            fontSize: '14px',
                                                            color: brandSettings.paragraphColor,
                                                            width: '100%',
                                                            textAlign: 'center',
                                                            outline: 'none'
                                                        })}
                                                    />
                                                </td>
                                                <td style={{padding: '12px 8px', fontSize: '14px', color: brandSettings.paragraphColor, borderBottom: getBorderStyle()}}>
                                                    <input
                                                        type="number"
                                                        value={item.rate || 0}
                                                        onChange={(e) => updateLineItem(index, { rate: parseFloat(e.target.value) || 0 })}
                                                        min="0"
                                                        step="1"
                                                        style={getInputStyle({
                                                            fontSize: '14px',
                                                            color: brandSettings.paragraphColor,
                                                            width: '100%',
                                                            textAlign: 'right',
                                                            outline: 'none'
                                                        })}
                                                    />
                                                </td>
                                                <td style={{padding: '12px 8px', fontSize: '14px', color: brandSettings.paragraphColor, borderBottom: getBorderStyle(), textAlign: 'right', fontWeight: 'bold'}}>
                                                    {formatCurrency((item.quantity || 1) * (item.rate || 0))}
                                                </td>
                                                <td className="print-hide" style={{padding: '12px 8px', fontSize: '14px', color: brandSettings.paragraphColor, borderBottom: getBorderStyle()}}>
                                                    <button 
                                                        type="button"
                                                        onClick={() => removeLineItem(index)}
                                                        className="print-hide"
                                                        style={{
                                                            background: 'none',
                                                            border: 'none',
                                                            color: '#dc3545',
                                                            cursor: 'pointer',
                                                            fontSize: '16px',
                                                            padding: '2px'
                                                        }}
                                                        title="Remove item"
                                                    >
                                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                                                        </svg>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                
                                <button 
                                    type="button"
                                    onClick={addLineItem}
                                    className="taskip-btn taskip-btn-secondary print-hide"
                                    style={{
                                        marginBottom: '20px'
                                    }}
                                >
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{marginRight: '8px'}}>
                                        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                                    </svg>
                                    Add Line Item
                                </button>
                            </div>

                            {/* Calculations and Totals */}
                            <div style={{display: 'grid', gridTemplateColumns: '1fr 300px', gap: '40px', marginBottom: '30px'}}>
                                <div className="print-hide">
                                    <h4 style={{color: brandSettings.headingColor, marginBottom: '15px'}}>Tax & Discount Settings</h4>
                                    <div style={{display: 'flex', flexDirection: 'column', gap: '15px', fontSize: '14px', maxWidth: '300px'}}>
                                        <div>
                                            <label style={{display: 'block', marginBottom: '5px', color: brandSettings.paragraphColor, fontSize: '12px'}}>Tax Rate (%)</label>
                                            <input
                                                type="number"
                                                value={quotationData.taxRate || 0}
                                                onChange={(e) => updateQuotationData({ taxRate: parseFloat(e.target.value) || 0 })}
                                                min="0"
                                                max="100"
                                                step="1"
                                                style={getInputStyle({
                                                    width: '100%',
                                                    fontSize: '14px'
                                                })}
                                            />
                                        </div>
                                        <div>
                                            <label style={{display: 'block', marginBottom: '5px', color: brandSettings.paragraphColor, fontSize: '12px'}}>Discount Type</label>
                                            <select
                                                value={quotationData.discountType || 'percentage'}
                                                onChange={(e) => updateQuotationData({ discountType: e.target.value })}
                                                style={getInputStyle({
                                                    width: '100%',
                                                    fontSize: '14px'
                                                })}
                                            >
                                                <option value="percentage">Percentage (%)</option>
                                                <option value="fixed">Fixed Amount ($)</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label style={{display: 'block', marginBottom: '5px', color: brandSettings.paragraphColor, fontSize: '12px'}}>Discount Value</label>
                                            <input
                                                type="number"
                                                value={quotationData.discountValue || 0}
                                                onChange={(e) => updateQuotationData({ discountValue: parseFloat(e.target.value) || 0 })}
                                                min="0"
                                                step="1"
                                                style={getInputStyle({
                                                    width: '100%',
                                                    fontSize: '14px'
                                                })}
                                            />
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="taskip-totals-section">
                                    <div className="taskip-totals-table" style={{minWidth: '300px'}}>
                                        <div className="taskip-total-row" style={{display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: getBorderStyle()}}>
                                            <span>Subtotal:</span>
                                            <span>{formatCurrency(quotationData.subtotal)}</span>
                                        </div>
                                        
                                        {(quotationData.discountValue > 0 || quotationData.discountAmount > 0) && (
                                            <div className="taskip-total-row" style={{display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: getBorderStyle()}}>
                                                <span>
                                                    Discount ({quotationData.discountType === 'percentage' ? `${quotationData.discountValue}%` : formatCurrency(quotationData.discountValue)}):
                                                </span>
                                                <span>-{formatCurrency(quotationData.discountAmount)}</span>
                                            </div>
                                        )}
                                        
                                        {(quotationData.taxRate > 0 || quotationData.taxAmount > 0) && (
                                            <div className="taskip-total-row" style={{display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: getBorderStyle()}}>
                                                <span>Tax ({quotationData.taxRate}%):</span>
                                                <span>{formatCurrency(quotationData.taxAmount)}</span>
                                            </div>
                                        )}
                                        
                                        <div className="taskip-total-row taskip-final-total" style={{
                                            display: 'flex', 
                                            justifyContent: 'space-between', 
                                            borderTop: `2px solid ${brandSettings.borderColor}`, 
                                            borderBottom: `2px solid ${brandSettings.borderColor}`, 
                                            fontSize: '18px', 
                                            padding: '12px 0', 
                                            marginTop: '10px',
                                            fontWeight: 'bold'
                                        }}>
                                            <span>Total:</span>
                                            <span>{formatCurrency(quotationData.total)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Notes and Terms */}
                            <div style={{marginBottom: '30px'}}>
                                <div style={{marginBottom: '20px'}}>
                                    <h4 style={{color: brandSettings.headingColor, marginBottom: '10px'}}>Notes:</h4>
                                    <textarea
                                        value={quotationData.notes || ''}
                                        onChange={(e) => updateQuotationData({ notes: e.target.value })}
                                        placeholder="Additional notes or information..."
                                        rows="3"
                                        style={getTextareaStyle({
                                            width: '100%',
                                            fontSize: '14px',
                                            color: brandSettings.paragraphColor,
                                            resize: 'vertical'
                                        })}
                                    />
                                </div>
                                
                                <div>
                                    <h4 style={{color: brandSettings.headingColor, marginBottom: '10px'}}>Terms & Conditions:</h4>
                                    <textarea
                                        value={quotationData.terms || ''}
                                        onChange={(e) => updateQuotationData({ terms: e.target.value })}
                                        placeholder="Terms and conditions..."
                                        rows="4"
                                        style={getTextareaStyle({
                                            width: '100%',
                                            fontSize: '14px',
                                            color: brandSettings.paragraphColor,
                                            resize: 'vertical'
                                        })}
                                    />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('QuotationGenerator Error:', error);
        return (
            <div className="taskip-quotation-generator" style={{ 
                padding: '20px', 
                border: '2px solid #dc3545', 
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
                margin: '20px 0'
            }}>
                <h2 style={{ color: '#dc3545' }}>⚠️ Quotation Generator Error</h2>
                <p>There was an error loading the quotation generator: {error.message}</p>
            </div>
        );
    }
};

export default QuotationGenerator;