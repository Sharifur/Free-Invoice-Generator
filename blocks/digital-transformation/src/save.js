import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const {
        mainTitle,
        leadText,
        benefitSections,
        backgroundColor,
        topPadding,
        bottomPadding,
        fullWidth,
        showIcons
    } = attributes;

    const blockProps = useBlockProps.save({
        className: `digital-transformation-section ${fullWidth ? 'full-width' : ''}`,
        style: {
            paddingTop: `${topPadding}px`,
            paddingBottom: `${bottomPadding}px`,
            backgroundColor: backgroundColor
        }
    });

    return (
        <section {...blockProps}>
            <div className="container">
                <RichText.Content
                    tagName="h2"
                    value={mainTitle}
                />
                
                <div className="content-wrapper">
                    <RichText.Content
                        tagName="p"
                        className="lead-text"
                        value={leadText}
                    />
                    
                    <div className="digital-benefits">
                        {benefitSections.map((section, index) => (
                            <div key={index} className="benefit-section">
                                <h3>
                                    {showIcons && <span>{section.icon}</span>}
                                    <RichText.Content
                                        tagName="span"
                                        value={section.title}
                                    />
                                </h3>
                                <div className="benefit-list">
                                    {section.benefits.map((benefit, benefitIndex) => (
                                        <div key={benefitIndex} className="benefit-item">
                                            <strong>{benefit.title}</strong> {benefit.description}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}