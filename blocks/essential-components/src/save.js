import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const {
        mainTitle,
        leadText,
        components,
        backgroundColor,
        topPadding,
        bottomPadding,
        fullWidth,
        showIcons
    } = attributes;

    const blockProps = useBlockProps.save({
        className: `essential-components-section ${fullWidth ? 'full-width' : ''}`,
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
                    
                    <div className="components-grid">
                        {components.map((component, index) => (
                            <div key={index} className="component-card">
                                {showIcons && <div className="component-icon">{component.icon}</div>}
                                <h3>{component.title}</h3>
                                <p>{component.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}