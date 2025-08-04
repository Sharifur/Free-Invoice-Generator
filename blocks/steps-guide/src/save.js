import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const {
        title,
        subtitle,
        backgroundColor,
        titleColor,
        subtitleColor,
        stepNumberColor,
        stepCardBackground,
        steps,
        ctaText,
        ctaLink,
        showCta,
        topPadding,
        bottomPadding
    } = attributes;

    const blockProps = useBlockProps.save({
        className: 'ib-steps-section',
        style: {
            backgroundColor: backgroundColor,
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
                        style={{ color: titleColor }}
                    />
                    <RichText.Content
                        tagName="p"
                        className="ib-section-subtitle"
                        value={subtitle}
                        style={{ color: subtitleColor }}
                    />
                </div>

                <div className="ib-steps-container">
                    {steps.map((step, index) => (
                        <div key={index} className="ib-step-card" style={{ backgroundColor: stepCardBackground }}>
                            <div className="ib-step-number" style={{ backgroundColor: stepNumberColor }}>
                                {index + 1}
                            </div>
                            
                            <RichText.Content
                                tagName="h3"
                                className="ib-step-title"
                                value={step.title}
                            />
                            
                            <RichText.Content
                                tagName="p"
                                className="ib-step-description"
                                value={step.description}
                            />
                            
                            {step.features && step.features.length > 0 && (
                                <ul className="ib-step-features">
                                    {step.features.map((feature, featureIndex) => (
                                        <li key={featureIndex}>{feature}</li>
                                    ))}
                                </ul>
                            )}
                            
                            {step.showVisual && (
                                <div className="ib-step-visual">
                                    {step.imageUrl ? (
                                        <img 
                                            src={step.imageUrl} 
                                            alt={step.title}
                                            className="ib-step-image"
                                        />
                                    ) : (
                                        <div className="ib-visual-placeholder">
                                            Step {index + 1} Preview
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {showCta && (
                    <div className="ib-cta-section">
                        <a href={ctaLink} className="ib-cta-button">
                            <RichText.Content value={ctaText} />
                        </a>
                    </div>
                )}
            </div>
        </section>
    );
}