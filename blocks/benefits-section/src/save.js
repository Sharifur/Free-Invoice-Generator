import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const {
        title,
        subtitle,
        backgroundColor,
        gradientColor,
        accentColor,
        benefits,
        showHighlight,
        highlightTitle,
        highlightSubtitle,
        stats,
        ctaText,
        ctaUrl,
        showIcons,
        topPadding,
        bottomPadding,
        ctaButtonBackgroundColor,
        ctaButtonTextColor,
        ctaButtonHoverColor
    } = attributes;

    const blockProps = useBlockProps.save({
        className: 'ib-benefits-section',
        style: {
            background: `linear-gradient(135deg, ${backgroundColor} 0%, ${gradientColor} 100%)`,
            paddingTop: `${topPadding}px`,
            paddingBottom: `${bottomPadding}px`
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

                <div className="ib-benefits-grid">
                    {benefits.map((benefit, index) => (
                        <div key={index} className="ib-benefit-card">
                            {showIcons && (
                                <div className="ib-benefit-icon">
                                    {benefit.useImage && benefit.imageUrl ? (
                                        <img 
                                            src={benefit.imageUrl} 
                                            alt="Benefit icon"
                                            className="ib-benefit-image"
                                        />
                                    ) : (
                                        <div 
                                            className="ib-benefit-emoji" 
                                            style={{ background: `linear-gradient(135deg, ${accentColor} 0%, #764ba2 100%)` }}
                                        >
                                            {benefit.icon}
                                        </div>
                                    )}
                                </div>
                            )}
                            
                            <h3 className="ib-benefit-title">
                                <RichText.Content value={benefit.title} />
                            </h3>
                            
                            <RichText.Content
                                tagName="p"
                                className="ib-benefit-description"
                                value={benefit.description}
                            />
                        </div>
                    ))}
                </div>

                {showHighlight && (
                    <div className="ib-highlight-box" style={{ borderColor: accentColor }}>
                        <RichText.Content
                            tagName="h3"
                            className="ib-highlight-title"
                            value={highlightTitle}
                        />
                        <RichText.Content
                            tagName="p"
                            className="ib-highlight-subtitle"
                            value={highlightSubtitle}
                        />

                        <div className="ib-stats-grid">
                            {stats.map((stat, index) => (
                                <div key={index} className="ib-stat-item">
                                    <RichText.Content
                                        tagName="div"
                                        className="ib-stat-number"
                                        style={{ color: accentColor }}
                                        value={stat.number}
                                    />
                                    <RichText.Content
                                        tagName="div"
                                        className="ib-stat-label"
                                        value={stat.label}
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="ib-cta-button-wrapper">
                            <a 
                                href={ctaUrl} 
                                className="ib-cta-button"
                                style={{ 
                                    backgroundColor: ctaButtonBackgroundColor,
                                    color: ctaButtonTextColor,
                                    '--cta-button-hover-color': ctaButtonHoverColor
                                }}
                            >
                                {ctaText}
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}