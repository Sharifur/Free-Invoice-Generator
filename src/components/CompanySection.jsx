import React, { useState, useRef } from 'react';
import { useInvoiceData } from '../hooks/useInvoiceData';

const CompanySection = () => {
    const { invoiceData, updateCompany, updateInvoice, config } = useInvoiceData();
    const [logoPreview, setLogoPreview] = useState(invoiceData.company.logo);
    const fileInputRef = useRef(null);
    
    const handleLogoUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        // Validate file type
        const allowedTypes = config.allowedImageTypes.map(ext => `image/${ext}`);
        if (!allowedTypes.includes(file.type.toLowerCase())) {
            alert(`Please upload a valid image file (${config.allowedImageTypes.join(', ')})`);
            return;
        }
        
        // Validate file size
        if (file.size > config.maxFileSize) {
            alert(`File size must be less than ${config.maxFileSize / 1024 / 1024}MB`);
            return;
        }
        
        // Create preview
        const reader = new FileReader();
        reader.onload = (e) => {
            const logoData = e.target.result;
            setLogoPreview(logoData);
            updateCompany('logo', logoData);
        };
        reader.readAsDataURL(file);
    };
    
    const handleDragOver = (e) => {
        e.preventDefault();
        e.currentTarget.classList.add('drag-over');
    };
    
    const handleDragLeave = (e) => {
        e.currentTarget.classList.remove('drag-over');
    };
    
    const handleDrop = (e) => {
        e.preventDefault();
        e.currentTarget.classList.remove('drag-over');
        
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            const event = { target: { files: [file] } };
            handleLogoUpload(event);
        }
    };
    
    const removeLogo = () => {
        setLogoPreview(null);
        updateCompany('logo', null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };
    
    return (
        <div className="sig-section sig-company-section">
            <h3>Company Information</h3>
            
            <div className="sig-form-group">
                <label>Company Logo</label>
                <div 
                    className="sig-logo-upload"
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    {logoPreview ? (
                        <div className="sig-logo-preview">
                            <img src={logoPreview} alt="Company Logo" />
                            <button 
                                type="button"
                                onClick={removeLogo}
                                className="sig-remove-logo"
                            >
                                ×
                            </button>
                        </div>
                    ) : (
                        <div className="sig-logo-placeholder">
                            <span>Drag & drop logo here or</span>
                            <button 
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="sig-btn sig-btn-small"
                            >
                                Choose File
                            </button>
                        </div>
                    )}
                    <input 
                        ref={fileInputRef}
                        type="file"
                        accept={config.allowedImageTypes.map(ext => `.${ext}`).join(',')}
                        onChange={handleLogoUpload}
                        style={{ display: 'none' }}
                    />
                </div>
            </div>
            
            <div className="sig-form-group">
                <label htmlFor="company-name">Company Name</label>
                <input 
                    id="company-name"
                    type="text"
                    value={invoiceData.company.name}
                    onChange={(e) => updateCompany('name', e.target.value)}
                    placeholder="Your Company Name"
                />
            </div>
            
            <div className="sig-form-group">
                <label htmlFor="company-address">Address</label>
                <textarea 
                    id="company-address"
                    value={invoiceData.company.address}
                    onChange={(e) => updateCompany('address', e.target.value)}
                    placeholder="123 Main Street&#10;City, State 12345"
                    rows="3"
                />
            </div>
            
            <div className="sig-form-row">
                <div className="sig-form-group">
                    <label htmlFor="company-phone">Phone</label>
                    <input 
                        id="company-phone"
                        type="tel"
                        value={invoiceData.company.phone}
                        onChange={(e) => updateCompany('phone', e.target.value)}
                        placeholder="(123) 456-7890"
                    />
                </div>
                
                <div className="sig-form-group">
                    <label htmlFor="company-email">Email</label>
                    <input 
                        id="company-email"
                        type="email"
                        value={invoiceData.company.email}
                        onChange={(e) => updateCompany('email', e.target.value)}
                        placeholder="info@company.com"
                    />
                </div>
            </div>
            
            <div className="sig-form-group">
                <label htmlFor="company-website">Website</label>
                <input 
                    id="company-website"
                    type="url"
                    value={invoiceData.company.website}
                    onChange={(e) => updateCompany('website', e.target.value)}
                    placeholder="www.company.com"
                />
            </div>
            
            <hr className="sig-divider" />
            
            <h3>Invoice Details</h3>
            
            <div className="sig-form-row">
                <div className="sig-form-group">
                    <label htmlFor="invoice-number">Invoice Number</label>
                    <input 
                        id="invoice-number"
                        type="text"
                        value={invoiceData.invoice.number}
                        onChange={(e) => updateInvoice('number', e.target.value)}
                        placeholder="INV-2024-001"
                    />
                </div>
                
                <div className="sig-form-group">
                    <label htmlFor="invoice-currency">Currency</label>
                    <select 
                        id="invoice-currency"
                        value={invoiceData.invoice.currency}
                        onChange={(e) => updateInvoice('currency', e.target.value)}
                    >
                        {Object.entries(config.currencies).map(([code, info]) => (
                            <option key={code} value={code}>
                                {code} - {info.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            
            <div className="sig-form-row">
                <div className="sig-form-group">
                    <label htmlFor="invoice-date">Invoice Date</label>
                    <input 
                        id="invoice-date"
                        type="date"
                        value={invoiceData.invoice.date}
                        onChange={(e) => updateInvoice('date', e.target.value)}
                    />
                </div>
                
                <div className="sig-form-group">
                    <label htmlFor="due-date">Due Date</label>
                    <input 
                        id="due-date"
                        type="date"
                        value={invoiceData.invoice.dueDate}
                        onChange={(e) => updateInvoice('dueDate', e.target.value)}
                        min={invoiceData.invoice.date}
                    />
                </div>
            </div>
        </div>
    );
};

export default CompanySection;