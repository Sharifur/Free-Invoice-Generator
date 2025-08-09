import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const {
        title,
        subtitle,
        backgroundColor,
        accentColor,
        gradientStartColor,
        gradientEndColor,
        headerTextColor,
        tools,
        topPadding,
        bottomPadding
    } = attributes;

    const blockProps = useBlockProps.save({
        className: 'ib-related-tools-section',
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
                    />
                    <RichText.Content
                        tagName="p"
                        className="ib-section-subtitle"
                        value={subtitle}
                    />
                </div>

                <div className="ib-tools-grid">
                    {tools.map((tool, index) => (
                        <div key={tool.id} className="ib-tool-card">
                            {tool.badge && (
                                <div className={`ib-badge-${tool.badgeType}`}>
                                    {tool.badge}
                                </div>
                            )}

                            <div className="ib-tool-header" style={{ 
                                background: `linear-gradient(135deg, ${gradientStartColor} 0%, ${gradientEndColor} 100%)`,
                                color: headerTextColor
                            }}>
                                <RichText.Content
                                    tagName="h3"
                                    className="ib-tool-name"
                                    value={tool.name}
                                    style={{ color: headerTextColor }}
                                />
                                <RichText.Content
                                    tagName="p"
                                    className="ib-tool-tagline"
                                    value={tool.tagline}
                                    style={{ color: headerTextColor }}
                                />
                            </div>

                            <div className="ib-tool-body">
                                <RichText.Content
                                    tagName="p"
                                    className="ib-tool-description"
                                    value={tool.description}
                                />

                                <ul className="ib-tool-features">
                                    {tool.features.map((feature, featureIndex) => (
                                        <li key={featureIndex}>{feature}</li>
                                    ))}
                                </ul>

                                <div className="ib-tool-cta">
                                    <a href={tool.url} style={{ color: accentColor }}>
                                        <span>Try {tool.name}</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}