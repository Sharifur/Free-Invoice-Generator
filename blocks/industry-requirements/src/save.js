import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const {
        mainTitle,
        leadText,
        industryCards,
        backgroundColor,
        topPadding,
        bottomPadding,
        fullWidth,
        showIcons
    } = attributes;

    const blockProps = useBlockProps.save({
        className: `industry-requirements-section ${fullWidth ? 'full-width' : ''}`,
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
                    
                    <div className="industry-tabs">
                        {industryCards.map((card, index) => (
                            <div key={index} className="industry-card">
                                <h3>
                                    {showIcons && <span>{card.icon}</span>}
                                    <RichText.Content
                                        tagName="span"
                                        value={card.title}
                                    />
                                </h3>
                                <ul>
                                    {card.requirements.map((req, reqIndex) => (
                                        <li key={reqIndex}>{req}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}