import { useBlockProps, RichText } from '@wordpress/block-editor';

// Green checkmark SVG icon component
const GreenCheckIcon = () => (
    <svg className="ib-trust-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="12" fill="#10B981"/>
        <path d="M8.5 12.5L10.5 14.5L15.5 9.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export default function save({ attributes }) {
    const {
        title,
        subtitle,
        backgroundType,
        backgroundColor,
        gradientColor1,
        gradientColor2,
        gradientDirection,
        titleColor,
        subtitleColor,
        trustSignalColor,
        buttonText,
        buttonLink,
        trustSignals,
        previewCards
    } = attributes;

    const getBackgroundStyle = () => {
        if (backgroundType === 'gradient') {
            return `linear-gradient(${gradientDirection}deg, ${gradientColor1} 0%, ${gradientColor2} 100%)`;
        }
        return backgroundColor;
    };

    const blockProps = useBlockProps.save({
        className: 'ib-hero-section',
        style: {
            background: getBackgroundStyle()
        }
    });

    return (
        <section {...blockProps}>
            <div className="ib-hero-container">
                <div className="ib-hero-content">
                    <RichText.Content
                        tagName="h1"
                        className="ib-hero-title"
                        value={title}
                        style={{ color: titleColor }}
                    />
                    <RichText.Content
                        tagName="p"
                        className="ib-hero-subtitle"
                        value={subtitle}
                        style={{ color: subtitleColor }}
                    />
                    
                    <div className="ib-trust-signals" style={{ color: trustSignalColor }}>
                        {trustSignals.map((signal, index) => (
                            <div key={index} className="ib-trust-item">
                                <GreenCheckIcon />
                                <span>{signal.text}</span>
                            </div>
                        ))}
                    </div>
                    
                    <a href={buttonLink} className="ib-cta-button">
                        <RichText.Content value={buttonText} />
                    </a>
                </div>
                
                <div className="ib-hero-preview">
                    {previewCards.map((card, index) => (
                        <div key={index} className="ib-preview-card">
                            {card.imageUrl ? (
                                <div className="ib-preview-image">
                                    <img 
                                        src={card.imageUrl} 
                                        alt={card.label}
                                        style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px' }}
                                    />
                                </div>
                            ) : (
                                <div>
                                    <div className="ib-preview-header" style={{ backgroundColor: card.headerColor }}></div>
                                    <div className="ib-preview-lines">
                                        <div className="ib-preview-line"></div>
                                        <div className="ib-preview-line"></div>
                                        <div className="ib-preview-line"></div>
                                    </div>
                                </div>
                            )}
                            <p className="ib-preview-label">{card.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}