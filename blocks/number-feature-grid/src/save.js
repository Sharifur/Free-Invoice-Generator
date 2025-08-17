import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const {
        mainTitle,
        leadText,
        features,
        backgroundColor,
        topPadding,
        bottomPadding,
        fullWidth,
        showNumbers
    } = attributes;

    const blockProps = useBlockProps.save({
        className: `number-feature-grid-section ${fullWidth ? 'full-width' : ''}`,
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
                    
                    <div className="features-grid">
                        {features.map((feature, index) => (
                            <div key={index} className="feature-card">
                                {showNumbers && (
                                    <div className="feature-number">{feature.number}</div>
                                )}
                                <RichText.Content
                                    tagName="h3"
                                    value={feature.title}
                                />
                                <RichText.Content
                                    tagName="p"
                                    value={feature.description}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}