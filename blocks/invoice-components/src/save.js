import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const {
        title,
        subtitle,
        backgroundColor,
        accentColor,
        mockupData,
        components
    } = attributes;

    const blockProps = useBlockProps.save({
        className: 'ib-components-section',
        style: {
            backgroundColor: backgroundColor
        }
    });

    return (
        <section {...blockProps}>
            <div className="ib-container">
                <div className="ib-section-header">
                    <RichText.Content
                        tagName="h2"
                        className="ib-section-title"
                        value={title}
                    />
                    <RichText.Content
                        tagName="p"
                        className="ib-section-subtitle"
                        value={subtitle}
                    />
                </div>

                <div className="ib-components-layout">
                    <div className="ib-invoice-visual">
                        <div className="ib-invoice-mockup">
                            <div className="ib-mockup-header">
                                {mockupData.showLogo && (
                                    mockupData.logoUrl ? (
                                        <img 
                                            src={mockupData.logoUrl} 
                                            alt="Logo"
                                            className="ib-mockup-logo"
                                        />
                                    ) : (
                                        <div 
                                            className="ib-mockup-logo" 
                                            style={{ backgroundColor: accentColor }}
                                        ></div>
                                    )
                                )}
                                <div className="ib-mockup-company">{mockupData.companyName}</div>
                                <div style={{ fontSize: '14px', color: '#666' }}>{mockupData.companyAddress}</div>
                                <div style={{ fontSize: '13px', color: '#888' }}>
                                    {mockupData.companyPhone} • {mockupData.companyEmail}
                                </div>
                            </div>

                            <div className="ib-mockup-content">
                                <div className="ib-mockup-row">
                                    <div>
                                        <div className="ib-mockup-label">Invoice #</div>
                                        <div className="ib-mockup-value">{mockupData.invoiceNumber}</div>
                                    </div>
                                    <div>
                                        <div className="ib-mockup-label">Date</div>
                                        <div className="ib-mockup-value">{mockupData.invoiceDate}</div>
                                    </div>
                                </div>

                                <div className="ib-mockup-row">
                                    <div>
                                        <div className="ib-mockup-label">Bill To:</div>
                                        <div className="ib-mockup-value">{mockupData.clientName}</div>
                                        <div style={{ fontSize: '12px', color: '#888' }}>{mockupData.clientAddress}</div>
                                    </div>
                                    <div>
                                        <div className="ib-mockup-label">Due Date</div>
                                        <div className="ib-mockup-value">{mockupData.dueDate}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="ib-mockup-table">
                                <div className="ib-table-header">
                                    <div className="ib-table-row" style={{ fontWeight: '600', borderBottom: '2px solid #e0e0e0', paddingBottom: '10px', marginBottom: '10px' }}>
                                        <div style={{ flex: 2 }}>Description</div>
                                        <div style={{ flex: 1, textAlign: 'center' }}>Qty</div>
                                        <div style={{ flex: 1, textAlign: 'right' }}>Rate</div>
                                        <div style={{ flex: 1, textAlign: 'right' }}>Amount</div>
                                    </div>
                                </div>
                                <div className="ib-table-body">
                                    {mockupData.items.map((item, index) => (
                                        <div key={index} className="ib-table-row" style={{ paddingBottom: '8px' }}>
                                            <div style={{ flex: 2, fontSize: '14px' }}>{item.description}</div>
                                            <div style={{ flex: 1, textAlign: 'center', fontSize: '14px' }}>{item.quantity}</div>
                                            <div style={{ flex: 1, textAlign: 'right', fontSize: '14px' }}>{item.rate}</div>
                                            <div style={{ flex: 1, textAlign: 'right', fontSize: '14px', fontWeight: '500' }}>{item.amount}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="ib-mockup-summary">
                                <div className="ib-summary-row">
                                    <div className="ib-mockup-label">Subtotal</div>
                                    <div className="ib-mockup-value">{mockupData.subtotal}</div>
                                </div>
                                {mockupData.discount && mockupData.discount !== "$0.00" && (
                                    <div className="ib-summary-row">
                                        <div className="ib-mockup-label">Discount ({mockupData.discountPercent})</div>
                                        <div className="ib-mockup-value" style={{ color: '#22c55e' }}>-{mockupData.discount}</div>
                                    </div>
                                )}
                                {mockupData.shipping && mockupData.shipping !== "$0.00" && (
                                    <div className="ib-summary-row">
                                        <div className="ib-mockup-label">Shipping</div>
                                        <div className="ib-mockup-value">{mockupData.shipping}</div>
                                    </div>
                                )}
                                <div className="ib-summary-row">
                                    <div className="ib-mockup-label">Tax ({mockupData.taxPercent})</div>
                                    <div className="ib-mockup-value">{mockupData.tax}</div>
                                </div>
                                <div className="ib-summary-row" style={{ borderTop: '2px solid #e0e0e0', paddingTop: '10px', marginTop: '10px' }}>
                                    <div className="ib-mockup-label" style={{ fontSize: '18px', fontWeight: '600' }}>Total Due</div>
                                    <div 
                                        className="ib-mockup-value" 
                                        style={{ fontSize: '24px', fontWeight: '700', color: accentColor }}
                                    >
                                        {mockupData.totalAmount}
                                    </div>
                                </div>
                            </div>

                            {mockupData.notes && (
                                <div className="ib-mockup-notes" style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
                                    <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '5px', color: '#333' }}>Notes:</div>
                                    <div style={{ fontSize: '14px', color: '#666' }}>{mockupData.notes}</div>
                                </div>
                            )}

                            {mockupData.paymentTerms && (
                                <div className="ib-mockup-terms" style={{ marginTop: '15px', padding: '15px', backgroundColor: '#fff3cd', borderRadius: '8px', border: '1px solid #ffeaa7' }}>
                                    <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '5px', color: '#333' }}>Payment Terms:</div>
                                    <div style={{ fontSize: '13px', color: '#666', lineHeight: '1.4' }}>{mockupData.paymentTerms}</div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="ib-components-list">
                        {components.map((component, index) => (
                            <div 
                                key={index} 
                                className={`ib-component-item ${component.isActive ? 'active' : ''}`}
                                data-component-index={index}
                                style={component.isActive ? { borderColor: accentColor } : {}}
                            >
                                
                                <RichText.Content
                                    tagName="h3"
                                    className="ib-component-title"
                                    value={component.title}
                                />
                                
                                <RichText.Content
                                    tagName="p"
                                    className="ib-component-description"
                                    value={component.description}
                                />

                                <div className="ib-component-details">
                                    <ul className="ib-detail-list">
                                        {component.details.map((detail, detailIndex) => (
                                            <li key={detailIndex}>{detail}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}