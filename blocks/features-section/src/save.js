import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const {
        title,
        subtitle,
        backgroundColor,
        features,
        topPadding,
        bottomPadding
    } = attributes;

    const blockProps = useBlockProps.save({
        className: 'ib-features-section',
        style: {
            backgroundColor: backgroundColor,
            paddingTop: `${topPadding}px`,
            paddingBottom: `${bottomPadding}px`
        }
    });

    return (
        <section {...blockProps}>
            <div className="container">
                <RichText.Content tagName="h2" value={title} />
                <RichText.Content tagName="p" value={subtitle} />
                
                <div className="features-grid">
                    {features.map((feature, index) => (
                        <div key={index} className="feature-card">
                            <div className="feature-icon">{feature.icon}</div>
                            <RichText.Content tagName="h3" className="feature-title" value={feature.title} />
                            <RichText.Content tagName="p" className="feature-description" value={feature.description} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}