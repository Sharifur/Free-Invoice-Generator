import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const {
        title,
        subtitle,
        backgroundColor,
        gradientEndColor,
        accentColor,
        essentialElements,
        essentialsSectionTitle,
        taxRegions,
        taxSectionTitle,
        internationalCards,
        internationalSectionTitle,
        checklist,
        checklistSectionTitle,
        showCTA,
        ctaText,
        ctaUrl,
        ctaDescription,
        ctaSectionBackgroundColor,
        ctaTextColor,
        ctaButtonBackgroundColor,
        ctaButtonHoverColor,
        ctaButtonTextColor
    } = attributes;

    const blockProps = useBlockProps.save({
        className: 'ib-legal-section',
        style: {
            background: `linear-gradient(to bottom, ${backgroundColor}, ${gradientEndColor})`
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

                <div className="ib-legal-container">
                    {/* Essential Elements */}
                    <div className="ib-essentials-card">
                        <div className="ib-essentials-header" style={{ textAlign: 'center' }}>
                            <RichText.Content
                                tagName="h3"
                                className="ib-essentials-title"
                                value={essentialsSectionTitle}
                            />
                            <p style={{ color: '#666', margin: '10px 0 20px', maxWidth: '750px', marginLeft: 'auto', marginRight: 'auto' }}>These fundamental elements must be present on every invoice to ensure legal compliance and professional standards.</p>
                        </div>

                        <div className="ib-essentials-grid">
                            {essentialElements.map((element, index) => (
                                <div key={index} className="ib-essential-item">
                                    <div 
                                        className="ib-essential-number"
                                        style={{ backgroundColor: accentColor }}
                                    >
                                        {element.number}
                                    </div>
                                    <div className="ib-essential-content">
                                        <RichText.Content
                                            tagName="div"
                                            className="ib-essential-name"
                                            value={element.name}
                                        />
                                        <RichText.Content
                                            tagName="div"
                                            className="ib-essential-desc"
                                            value={element.description}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Tax Requirements */}
                    <div className="ib-tax-section">
                        <div className="ib-tax-header" style={{ textAlign: 'center' }}>
                            <RichText.Content
                                tagName="h3"
                                className="ib-tax-title"
                                value={taxSectionTitle}
                            />
                            <p style={{ color: '#666', margin: '10px 0 20px', maxWidth: '750px', marginLeft: 'auto', marginRight: 'auto' }}>Different countries and regions have specific tax requirements that must be included on invoices.</p>
                        </div>

                        <div className="ib-tax-tabs">
                            {taxRegions.map((region, index) => (
                                <div 
                                    key={region.id}
                                    className={`ib-tax-tab ${index === 0 ? 'active' : ''}`}
                                    data-tab={region.id}
                                    style={index === 0 ? { backgroundColor: accentColor, color: '#fff' } : {}}
                                >
                                    <RichText.Content value={region.name} />
                                </div>
                            ))}
                        </div>

                        {taxRegions.map((region, index) => (
                            <div 
                                key={region.id} 
                                id={region.id} 
                                className={`ib-tax-content ${index === 0 ? 'active' : ''}`}
                            >
                                <div className="ib-tax-info">
                                    <RichText.Content
                                        tagName="h4"
                                        value={region.title}
                                    />
                                    <ul className="ib-tax-list">
                                        {region.requirements.map((req, reqIndex) => (
                                            <li key={reqIndex}>{req}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* International Section */}
                    <div className="ib-international-section">
                        <div className="ib-international-header" style={{ textAlign: 'center' }}>
                            <RichText.Content
                                tagName="h3"
                                className="ib-tax-title"
                                value={internationalSectionTitle}
                            />
                            <p style={{ color: '#666', margin: '10px 0 20px', maxWidth: '750px', marginLeft: 'auto', marginRight: 'auto' }}>When invoicing internationally, additional considerations apply based on the nature of your business and destination country.</p>
                        </div>

                        <div className="ib-international-grid">
                            {internationalCards.map((card, index) => (
                                <div key={index} className="ib-international-card">
                                    <div className="ib-country-flag">{card.flag}</div>
                                    <RichText.Content
                                        tagName="div"
                                        className="ib-country-name"
                                        value={card.name}
                                    />
                                    <RichText.Content
                                        tagName="div"
                                        className="ib-country-requirement"
                                        value={card.requirement}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Checklist Section */}
                    <div className="ib-checklist-section">
                        <div className="ib-checklist-header" style={{ textAlign: 'center' }}>
                            <RichText.Content
                                tagName="h3"
                                className="ib-checklist-title"
                                value={checklistSectionTitle}
                            />
                            <p style={{ color: '#666', margin: '10px 0 20px', maxWidth: '750px', marginLeft: 'auto', marginRight: 'auto' }}>Maintain proper records for tax compliance and audits</p>
                        </div>

                        <div className="ib-checklist-grid">
                            {checklist.map((item, index) => (
                                <div key={index} className="ib-checklist-item">
                                    <div 
                                        className="ib-checkbox" 
                                        style={{ borderColor: accentColor, color: accentColor }}
                                    >
                                        ✓
                                    </div>
                                    <div className="ib-checklist-text">{item}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA Section */}
                    {showCTA && (
                        <div 
                            className="ib-cta-section" 
                            style={{ 
                                backgroundColor: ctaSectionBackgroundColor,
                                '--cta-button-hover-color': ctaButtonHoverColor
                            }}
                        >
                            <RichText.Content
                                tagName="p"
                                value={ctaDescription}
                                style={{ fontSize: '18px', color: ctaTextColor, marginBottom: '20px' }}
                            />
                            <a 
                                href={ctaUrl} 
                                className="ib-cta-button"
                                style={{ 
                                    backgroundColor: ctaButtonBackgroundColor,
                                    color: ctaButtonTextColor
                                }}
                            >
                                {ctaText}
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}