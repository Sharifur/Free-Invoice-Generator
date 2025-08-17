import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const {
        mainTitle,
        leadText,
        legalCards,
        backgroundColor,
        topPadding,
        bottomPadding,
        fullWidth
    } = attributes;

    const blockProps = useBlockProps.save({
        className: `legal-considerations-section ${fullWidth ? 'full-width' : ''}`,
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
                    
                    <div className="legal-grid">
                        {legalCards.map((card, index) => (
                            <div key={index} className="legal-card">
                                <RichText.Content
                                    tagName="h3"
                                    value={card.title}
                                />
                                <RichText.Content
                                    tagName="p"
                                    value={card.description}
                                />
                                <ul>
                                    {card.listItems.map((item, itemIndex) => (
                                        <li key={itemIndex}>{item}</li>
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