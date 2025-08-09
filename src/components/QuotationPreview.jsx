import React from 'react';

const QuotationPreview = ({ data, settings }) => {
    const {
        company = {},
        client = {},
        number = '',
        date = '',
        validUntil = '',
        status = 'draft',
        lineItems = [],
        subtotal = 0,
        taxRate = 0,
        taxAmount = 0,
        discountType = 'percentage',
        discountValue = 0,
        discountAmount = 0,
        total = 0
    } = data;

    const formatCurrency = (amount) => {
        const currency = window.sigQuotationConfig?.currency || 'USD';
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
        });
        return formatter.format(amount || 0);
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString();
    };

    const getStatusClass = (status) => {
        switch (status) {
            case 'sent': return 'status-sent';
            case 'accepted': return 'status-accepted';
            case 'rejected': return 'status-rejected';
            default: return 'status-draft';
        }
    };

    return (
        <div className="taskip-quotation-preview">
            <div className="taskip-document" id="quotation-preview">
                <div className="taskip-document-header">
                    <div className="taskip-company-info">
                        {company.logo && (
                            <img src={company.logo} alt="Company Logo" className="taskip-logo" />
                        )}
                        <div className="taskip-company-details">
                            <h1>{company.name || 'Your Company'}</h1>
                            <div className="taskip-address">
                                <p>{company.address}</p>
                                <p>{company.city}, {company.state} {company.zip}</p>
                                <p>{company.country}</p>
                                <p>{company.email}</p>
                                <p>{company.phone}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="taskip-document-info">
                        <h2 className="taskip-document-title">QUOTATION</h2>
                        <div className={`taskip-status ${getStatusClass(status)}`}>
                            {status.toUpperCase()}
                        </div>
                        <div className="taskip-document-details">
                            <div className="taskip-detail-row">
                                <span>Quote #:</span>
                                <span>{number || 'QUO-001'}</span>
                            </div>
                            <div className="taskip-detail-row">
                                <span>Quote Date:</span>
                                <span>{formatDate(date)}</span>
                            </div>
                            <div className="taskip-detail-row">
                                <span>Valid Until:</span>
                                <span>{formatDate(validUntil)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="taskip-client-section">
                    <h3>Quote To:</h3>
                    <div className="taskip-client-info">
                        <p><strong>{client.name || 'Client Name'}</strong></p>
                        <p>{client.email}</p>
                        <p>{client.address}</p>
                        <p>{client.city}, {client.state} {client.zip}</p>
                        <p>{client.country}</p>
                    </div>
                </div>

                <div className="taskip-items-section">
                    <table className="taskip-items-table">
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Qty</th>
                                <th>Rate</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lineItems.map((item, index) => (
                                <tr key={index}>
                                    <td>
                                        <div className="taskip-item-description">
                                            <strong>{item.description || 'Item description'}</strong>
                                            {item.details && (
                                                <div className="taskip-item-details">
                                                    {item.details}
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td>{item.quantity || 1}</td>
                                    <td>{formatCurrency(item.rate || 0)}</td>
                                    <td>{formatCurrency((item.quantity || 1) * (item.rate || 0))}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="taskip-totals-section">
                    <div className="taskip-totals-table">
                        <div className="taskip-total-row">
                            <span>Subtotal:</span>
                            <span>{formatCurrency(subtotal)}</span>
                        </div>
                        
                        {discountAmount > 0 && (
                            <div className="taskip-total-row">
                                <span>
                                    Discount ({discountType === 'percentage' ? `${discountValue}%` : formatCurrency(discountValue)}):
                                </span>
                                <span>-{formatCurrency(discountAmount)}</span>
                            </div>
                        )}
                        
                        {taxAmount > 0 && (
                            <div className="taskip-total-row">
                                <span>Tax ({taxRate}%):</span>
                                <span>{formatCurrency(taxAmount)}</span>
                            </div>
                        )}
                        
                        <div className="taskip-total-row taskip-final-total">
                            <span><strong>Quoted Amount:</strong></span>
                            <span><strong>{formatCurrency(total)}</strong></span>
                        </div>
                    </div>
                </div>

                <div className="taskip-quotation-actions">
                    {status === 'sent' && (
                        <div className="taskip-client-actions">
                            <button className="taskip-btn taskip-btn-primary">
                                Accept Quote
                            </button>
                            <button className="taskip-btn taskip-btn-secondary">
                                Request Changes
                            </button>
                        </div>
                    )}
                </div>

                <div className="taskip-disclaimer">
                    <p><strong>Important:</strong> This quotation is valid until {formatDate(validUntil)}. 
                    Prices and availability are subject to change after this date.</p>
                    <p>To proceed, please accept this quote or contact us with any questions.</p>
                </div>
            </div>
        </div>
    );
};

export default QuotationPreview;