import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const {
        title,
        subtitle,
        backgroundColor,
        accentColor,
        proTipsBackgroundStart,
        proTipsBackgroundEnd,
        practiceGroups,
        showMistakes,
        mistakesTitle,
        mistakes,
        showProTips,
        proTipsTitle,
        proTipsContent,
        ctaText,
        ctaUrl,
        showIcons
    } = attributes;

    const blockProps = useBlockProps.save({
        className: 'ib-practices-section',
        style: {
            backgroundColor: backgroundColor
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

                <div className="ib-practices-container">
                    {practiceGroups.map((group, groupIndex) => (
                        <div key={groupIndex} className="ib-practice-group">
                            <div className="ib-group-header" style={{ textAlign: 'center' }}>
                                <RichText.Content
                                    tagName="h3"
                                    className="ib-group-title"
                                    value={group.title}
                                />
                                <p style={{ color: '#666', margin: '10px auto 20px', maxWidth: '750px' }}>Essential practices that will help you maintain professionalism and get paid faster.</p>
                            </div>

                            <div className="ib-practices-grid">
                                {group.practices.map((practice, practiceIndex) => (
                                    <div key={practiceIndex} className="ib-practice-card">
                                        <h4 className="ib-practice-title">
                                            {showIcons && (
                                                <span className="ib-practice-icon" style={{ color: accentColor }}>
                                                    {practice.useImage && practice.imageUrl ? (
                                                        <img 
                                                            src={practice.imageUrl} 
                                                            alt="Practice icon"
                                                            className="ib-practice-image"
                                                        />
                                                    ) : (
                                                        practice.icon
                                                    )}
                                                </span>
                                            )}
                                            <RichText.Content value={practice.title} />
                                        </h4>

                                        <RichText.Content
                                            tagName="p"
                                            className="ib-practice-content"
                                            value={practice.content}
                                        />

                                        <div className="ib-practice-tips">
                                            {practice.tips.map((tip, tipIndex) => (
                                                <div key={tipIndex} className="ib-tip-item">
                                                    <span className="ib-tip-icon">✓</span>
                                                    <span>{tip}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                    {showMistakes && (
                        <div className="ib-mistakes-section">
                            <div className="ib-mistakes-header" style={{ textAlign: 'center' }}>
                                <RichText.Content
                                    tagName="h3"
                                    className="ib-mistakes-title"
                                    value={mistakesTitle}
                                />
                                <p style={{ color: '#666', margin: '10px auto 20px', maxWidth: '750px' }}>Avoid these common pitfalls that can delay payments and damage your professional reputation.</p>
                            </div>

                            <div className="ib-mistakes-grid">
                                {mistakes.map((mistake, index) => (
                                    <div key={index} className="ib-mistake-item">
                                        <div>
                                            <RichText.Content
                                                tagName="strong"
                                                value={mistake.title}
                                            />
                                            <RichText.Content
                                                tagName="p"
                                                className="ib-mistake-text"
                                                value={mistake.description}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {showProTips && (
                        <div 
                            className="ib-pro-tips"
                            style={{ background: `linear-gradient(135deg, ${proTipsBackgroundStart} 0%, ${proTipsBackgroundEnd} 100%)` }}
                        >
                            <RichText.Content
                                tagName="h3"
                                className="ib-pro-tips-title"
                                value={proTipsTitle}
                            />
                            <RichText.Content
                                tagName="p"
                                className="ib-pro-tips-content"
                                value={proTipsContent}
                            />
                            <a href={ctaUrl} className="ib-download-guide-btn">
                                {ctaText}
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}