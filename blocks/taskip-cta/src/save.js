import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const {
        title,
        subtitle,
        description,
        ctaButtonText,
        ctaButtonUrl,
        secondaryButtonText,
        secondaryButtonUrl,
        backgroundColor,
        titleColor,
        textColor,
        ctaButtonBackgroundColor,
        ctaButtonTextColor,
        ctaButtonHoverColor,
        secondaryButtonTextColor,
        features,
        showFeatures,
        showTestimonial,
        testimonialText,
        testimonialAuthor,
        testimonialRole,
        topPadding,
        bottomPadding
    } = attributes;

    const blockProps = useBlockProps.save({
        className: 'ib-taskip-cta-section',
        style: {
            backgroundColor: backgroundColor,
            paddingTop: `${topPadding}px`,
            paddingBottom: `${bottomPadding}px`
        }
    });

    return (
        <section {...blockProps}>
            <div className="ib-container">
                <div className="ib-taskip-content">
                    <div className="ib-taskip-header">
                        <RichText.Content
                            tagName="h2"
                            className="ib-taskip-title"
                            value={title}
                            style={{ color: titleColor }}
                        />
                        <RichText.Content
                            tagName="h3"
                            className="ib-taskip-subtitle"
                            value={subtitle}
                            style={{ color: textColor }}
                        />
                        <RichText.Content
                            tagName="p"
                            className="ib-taskip-description"
                            value={description}
                            style={{ color: textColor }}
                        />
                    </div>

                    {showFeatures && (
                        <div className="ib-taskip-features">
                            <div className="ib-features-grid">
                                {features.map((feature, index) => (
                                    <div key={feature.id} className="ib-feature-card">
                                        <div className="ib-feature-icon">{feature.icon}</div>
                                        <div className="ib-feature-content">
                                            <h4 className="ib-feature-title" style={{ color: titleColor }}>
                                                {feature.title}
                                            </h4>
                                            <p className="ib-feature-description" style={{ color: textColor }}>
                                                {feature.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {showTestimonial && (
                        <div className="ib-taskip-testimonial">
                            <div className="ib-testimonial-content">
                                <div className="ib-testimonial-quote">
                                    <span className="ib-quote-mark">"</span>
                                    <p style={{ color: textColor }}>{testimonialText}</p>
                                </div>
                                <div className="ib-testimonial-author">
                                    <div className="ib-author-info">
                                        <strong style={{ color: titleColor }}>{testimonialAuthor}</strong>
                                        <span style={{ color: textColor }}>{testimonialRole}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="ib-taskip-actions">
                        <a
                            href={ctaButtonUrl}
                            className="ib-cta-button ib-cta-primary"
                            style={{
                                backgroundColor: ctaButtonBackgroundColor,
                                color: ctaButtonTextColor,
                                '--cta-button-hover-color': ctaButtonHoverColor
                            }}
                        >
                            {ctaButtonText}
                        </a>
                        <a
                            href={secondaryButtonUrl}
                            className="ib-cta-button ib-cta-secondary"
                            style={{
                                color: secondaryButtonTextColor,
                                borderColor: secondaryButtonTextColor
                            }}
                        >
                            {secondaryButtonText}
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}