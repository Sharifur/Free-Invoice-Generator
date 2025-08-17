import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const {
        title,
        subtitle,
        backgroundColor,
        features,
        topPadding,
        bottomPadding,
        fullWidth,
        showIcons
    } = attributes;

    const blockProps = useBlockProps.save({
        className: `ib-features-section ${fullWidth ? 'full-width' : ''}`,
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
                    <RichText.Content tagName="h2" className="ib-section-title" value={title} />
                    <RichText.Content tagName="p" className="ib-section-subtitle" value={subtitle} />
                </div>
                
                <div className="ib-features-grid">
                    {features.map((feature, index) => (
                        <div key={index} className="ib-feature-card">
                            {showIcons && (
                                <div className="ib-feature-icon">{feature.icon}</div>
                            )}
                            <RichText.Content tagName="h3" className="ib-feature-title" value={feature.title} />
                            <RichText.Content tagName="p" className="ib-feature-description" value={feature.description} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}