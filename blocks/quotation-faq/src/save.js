import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const {
        mainTitle,
        faqItems,
        backgroundColor,
        topPadding,
        bottomPadding,
        fullWidth,
        enableSchemaMarkup
    } = attributes;

    const blockProps = useBlockProps.save({
        className: `quotation-faq-section ${fullWidth ? 'full-width' : ''}`,
        style: {
            paddingTop: `${topPadding}px`,
            paddingBottom: `${bottomPadding}px`,
            backgroundColor: backgroundColor
        }
    });

    // Store FAQ data for PHP schema generation
    const schemaData = enableSchemaMarkup && faqItems.length ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqItems.map(item => ({
            "@type": "Question",
            "name": item.question.replace(/<[^>]*>/g, ''), // Strip HTML tags
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer.replace(/<[^>]*>/g, '') // Strip HTML tags
            }
        }))
    } : null;

    return (
        <section {...blockProps} data-schema={schemaData ? JSON.stringify(schemaData) : ''}>
            <div className="container">
                <RichText.Content
                    tagName="h2"
                    value={mainTitle}
                />
                
                <div className="faq-container">
                    {faqItems.map((item, index) => (
                        <div key={index} className="faq-item">
                            <div className="faq-question">
                                <RichText.Content
                                    tagName="span"
                                    value={item.question}
                                />
                                <span className="faq-icon">+</span>
                            </div>
                            <div className="faq-answer">
                                <RichText.Content
                                    tagName="div"
                                    value={item.answer}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}