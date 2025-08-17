import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const {
        mainTitle,
        leadText,
        mistakeCards,
        backgroundColor,
        topPadding,
        bottomPadding,
        fullWidth,
        showIcons
    } = attributes;

    const blockProps = useBlockProps.save({
        className: `common-mistakes-section ${fullWidth ? 'full-width' : ''}`,
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
                    
                    <div className="mistakes-grid">
                        {mistakeCards.map((card, index) => (
                            <div 
                                key={index} 
                                className="mistake-card"
                                style={{
                                    backgroundColor: card.backgroundColor,
                                    borderColor: card.borderColor
                                }}
                            >
                                {showIcons && (
                                    <div className="mistake-icon">{card.icon}</div>
                                )}
                                <RichText.Content
                                    tagName="h3"
                                    value={card.title}
                                />
                                <ul>
                                    {card.mistakes.map((mistake, mistakeIndex) => (
                                        <li key={mistakeIndex}>
                                            <strong>{mistake.title}</strong> {mistake.description}
                                        </li>
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