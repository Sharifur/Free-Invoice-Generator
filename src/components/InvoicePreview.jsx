import React, { useRef } from 'react';
import { useInvoiceData } from '../hooks/useInvoiceData';
import { useTemplateSettings } from '../hooks/useTemplateSettings';
import { formatCurrency, calculateTotals } from '../utils/calculations';

const InvoicePreview = () => {
    const { invoiceData, config } = useInvoiceData();
    const { templateSettings } = useTemplateSettings();
    const previewRef = useRef(null);
    
    const currencyInfo = config.currencies[invoiceData.invoice.currency];
    const totals = calculateTotals(invoiceData);
    
    // Apply template styles
    const previewStyles = {
        fontFamily: templateSettings.font,
        '--primary-color': templateSettings.colorScheme.primary,
        '--secondary-color': templateSettings.colorScheme.secondary,
        '--accent-color': templateSettings.colorScheme.accent,
        '--text-color': templateSettings.colorScheme.text,
        '--background-color': templateSettings.colorScheme.background,
        '--border-color': templateSettings.colorScheme.border,
    };
    
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    };
    
    return (
        <div 
            ref={previewRef}
            className={`sig-invoice-preview sig-layout-${templateSettings.layout}`}
            style={previewStyles}
        >
            {templateSettings.showHeader && (
                <div className="sig-invoice-header">
                    <div className={`sig-header-content sig-logo-${templateSettings.logoPosition}`}>
                        {templateSettings.showLogo && invoiceData.company.logo && (
                            <div className="sig-company-logo">
                                <img src={invoiceData.company.logo} alt={invoiceData.company.name} />
                            </div>
                        )}
                        <div className="sig-company-info">
                            <h1>{invoiceData.company.name || 'Your Company Name'}</h1>
                            {invoiceData.company.address && (
                                <p className="sig-address">{invoiceData.company.address}</p>
                            )}
                            <div className="sig-contact-info">
                                {invoiceData.company.phone && <span>Phone: {invoiceData.company.phone}</span>}
                                {invoiceData.company.email && <span>Email: {invoiceData.company.email}</span>}
                                {invoiceData.company.website && <span>Website: {invoiceData.company.website}</span>}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            
            <div className="sig-invoice-title">
                <h2>INVOICE</h2>
            </div>
            
            <div className="sig-invoice-meta">
                <div className="sig-bill-to">
                    <h3>Bill To:</h3>
                    <div className="sig-client-details">
                        <strong>{invoiceData.client.name || 'Client Name'}</strong>
                        {invoiceData.client.address && (
                            <p className="sig-address">{invoiceData.client.address}</p>
                        )}
                        {invoiceData.client.email && <p>Email: {invoiceData.client.email}</p>}
                        {invoiceData.client.phone && <p>Phone: {invoiceData.client.phone}</p>}
                    </div>
                </div>
                
                <div className="sig-invoice-details">
                    <table>
                        <tbody>
                            <tr>
                                <td>Invoice Number:</td>
                                <td><strong>{invoiceData.invoice.number}</strong></td>
                            </tr>
                            <tr>
                                <td>Invoice Date:</td>
                                <td>{formatDate(invoiceData.invoice.date)}</td>
                            </tr>
                            {invoiceData.invoice.dueDate && (
                                <tr>
                                    <td>Due Date:</td>
                                    <td>{formatDate(invoiceData.invoice.dueDate)}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            
            <div className="sig-invoice-items">
                <table>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Quantity</th>
                            <th>Rate</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoiceData.lineItems.map(item => (
                            <tr key={item.id}>
                                <td className="sig-item-description">{item.description}</td>
                                <td className="sig-item-quantity">{item.quantity}</td>
                                <td className="sig-item-rate">
                                    {formatCurrency(item.rate, invoiceData.invoice.currency)}
                                </td>
                                <td className="sig-item-amount">
                                    {formatCurrency(item.amount, invoiceData.invoice.currency)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            <div className="sig-invoice-totals">
                <div className="sig-totals-container">
                    <div className="sig-total-row">
                        <span>Subtotal:</span>
                        <span>{formatCurrency(totals.subtotal, invoiceData.invoice.currency)}</span>
                    </div>
                    
                    {invoiceData.financial.discount > 0 && (
                        <div className="sig-total-row">
                            <span>
                                Discount 
                                ({invoiceData.financial.discount}{invoiceData.financial.discountType === 'percentage' ? '%' : ` ${currencyInfo.symbol}`}):
                            </span>
                            <span>-{formatCurrency(totals.discountAmount, invoiceData.invoice.currency)}</span>
                        </div>
                    )}
                    
                    {invoiceData.financial.shipping > 0 && (
                        <div className="sig-total-row">
                            <span>
                                Shipping
                                {invoiceData.financial.shippingDescription && ` (${invoiceData.financial.shippingDescription})`}:
                            </span>
                            <span>{formatCurrency(invoiceData.financial.shipping, invoiceData.invoice.currency)}</span>
                        </div>
                    )}
                    
                    {invoiceData.financial.taxRate > 0 && (
                        <div className="sig-total-row">
                            <span>Tax ({invoiceData.financial.taxRate}%):</span>
                            <span>{formatCurrency(totals.tax, invoiceData.invoice.currency)}</span>
                        </div>
                    )}
                    
                    <div className="sig-total-row sig-total-final">
                        <span>Total:</span>
                        <span>{formatCurrency(totals.total, invoiceData.invoice.currency)}</span>
                    </div>
                </div>
            </div>
            
            {(invoiceData.termsAndConditions || invoiceData.paymentInstructions || invoiceData.notes) && (
                <div className="sig-invoice-additional">
                    {invoiceData.termsAndConditions && (
                        <div className="sig-additional-section">
                            <h4>Terms & Conditions</h4>
                            <p>{invoiceData.termsAndConditions}</p>
                        </div>
                    )}
                    
                    {invoiceData.paymentInstructions && (
                        <div className="sig-additional-section">
                            <h4>Payment Instructions</h4>
                            <p>{invoiceData.paymentInstructions}</p>
                        </div>
                    )}
                    
                    {invoiceData.notes && (
                        <div className="sig-additional-section">
                            <h4>Notes</h4>
                            <p>{invoiceData.notes}</p>
                        </div>
                    )}
                </div>
            )}
            
            {templateSettings.showFooter && (
                <div className="sig-invoice-footer">
                    <p>{invoiceData.footerMessage || 'Thank you for your business!'}</p>
                </div>
            )}
        </div>
    );
};

export default InvoicePreview;