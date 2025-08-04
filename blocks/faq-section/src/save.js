import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const {
        title,
        subtitle,
        backgroundColor,
        accentColor,
        categories,
        faqItems,
        showCTA,
        ctaTitle,
        ctaText,
        ctaButtonText,
        ctaButtonUrl,
        enableSchemaMarkup,
        ctaBackgroundStartColor,
        ctaBackgroundEndColor,
        ctaTextColor,
        ctaButtonBackgroundColor,
        ctaButtonTextColor,
        ctaButtonHoverColor
    } = attributes;

    const blockProps = useBlockProps.save({
        className: 'ib-faq-section',
        style: {
            backgroundColor: backgroundColor
        }
    });

    // Generate schema markup data for SEO (will be rendered via PHP hook)
    const generateSchemaMarkup = () => {
        if (!enableSchemaMarkup) return null;

        const faqSchema = {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqItems.map(faq => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq.answer
                }
            }))
        };

        // Store schema data in a hidden div for PHP to pick up
        return (
            <div 
                className="faq-schema-data" 
                style={{ display: 'none' }}
                data-schema={JSON.stringify(faqSchema)}
            />
        );
    };

    return (
        <>
            {generateSchemaMarkup()}
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
                    
                    <div className="ib-faq-categories">
                        {categories.map((category, index) => (
                            <button
                                key={category.id}
                                className={`ib-category-btn ${index === 0 ? 'active' : ''}`}
                                data-category={category.id}
                                style={{
                                    backgroundColor: index === 0 ? accentColor : '#f8f9fa',
                                    color: index === 0 ? '#fff' : '#666'
                                }}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>
                    
                    <div className="ib-faq-container">
                        {categories.map((category, categoryIndex) => {
                            const categoryFAQs = faqItems.filter(faq => faq.category === category.id);
                            
                            return (
                                <div 
                                    key={category.id}
                                    id={category.id}
                                    className={`ib-faq-group ${categoryIndex === 0 ? 'active' : ''}`}
                                >
                                    <h3 className="ib-group-title">
                                        {category.name}
                                    </h3>
                                    
                                    {categoryFAQs.map((faq, faqIndex) => (
                                        <div key={faq.id} className="ib-faq-item" itemScope itemType="https://schema.org/Question">
                                            <div className="ib-faq-question" itemProp="name">
                                                {faq.question}
                                                <span className="ib-faq-icon" style={{ color: accentColor }}>+</span>
                                            </div>
                                            <div className="ib-faq-answer" itemScope itemType="https://schema.org/Answer">
                                                <div itemProp="text">
                                                    {faq.answer.split('\n').map((paragraph, pIndex) => (
                                                        <p key={pIndex}>{paragraph}</p>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            );
                        })}
                    </div>
                    
                    {showCTA && (
                        <div 
                            className="ib-cta-section" 
                            style={{ 
                                background: `linear-gradient(135deg, ${ctaBackgroundStartColor} 0%, ${ctaBackgroundEndColor} 100%)`,
                                '--cta-button-hover-color': ctaButtonHoverColor
                            }}
                        >
                            <RichText.Content
                                tagName="h3"
                                className="ib-cta-title"
                                value={ctaTitle}
                                style={{ color: ctaTextColor }}
                            />
                            <RichText.Content
                                tagName="p"
                                className="ib-cta-text"
                                value={ctaText}
                                style={{ color: ctaTextColor }}
                            />
                            <a 
                                href={ctaButtonUrl} 
                                className="ib-cta-button"
                                style={{ 
                                    backgroundColor: ctaButtonBackgroundColor,
                                    color: ctaButtonTextColor
                                }}
                            >
                                {ctaButtonText}
                            </a>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}