import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const {
        mainTitle,
        leadText,
        sectionTitle1,
        sectionContent1,
        sectionTitle2,
        sectionContent2,
        stats,
        backgroundColor,
        topPadding,
        bottomPadding
    } = attributes;

    const blockProps = useBlockProps.save({
        className: 'quotation-definition-section',
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
                    
                    <div className="content-box">
                        <RichText.Content
                            tagName="h3"
                            value={sectionTitle1}
                        />
                        <RichText.Content
                            tagName="p"
                            value={sectionContent1}
                            className="content-paragraph"
                        />
                    </div>

                    <div className="content-box">
                        <RichText.Content
                            tagName="h3"
                            value={sectionTitle2}
                        />
                        <RichText.Content
                            tagName="p"
                            value={sectionContent2}
                            className="content-paragraph"
                        />
                    </div>

                    <div className="stats-grid">
                        {stats.map((stat, index) => (
                            <div key={index} className="stat-card">
                                <div className="stat-number">{stat.number}</div>
                                <div className="stat-label">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}