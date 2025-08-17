import { __ } from '@wordpress/i18n';
import { 
    InspectorControls, 
    RichText,
    PanelColorSettings,
    useBlockProps 
} from '@wordpress/block-editor';
import { 
    PanelBody, 
    RangeControl,
    Button,
    ToggleControl
} from '@wordpress/components';
import { Fragment, useState } from '@wordpress/element';

export default function Edit({ attributes, setAttributes }) {
    const {
        mainTitle,
        faqItems,
        backgroundColor,
        topPadding,
        bottomPadding,
        fullWidth,
        enableSchemaMarkup
    } = attributes;

    const [openItems, setOpenItems] = useState({});

    const blockProps = useBlockProps({
        className: `quotation-faq-section ${fullWidth ? 'full-width' : ''}`,
        style: {
            paddingTop: `${topPadding}px`,
            paddingBottom: `${bottomPadding}px`,
            backgroundColor: backgroundColor
        }
    });

    const updateFaqItem = (index, field, value) => {
        const newFaqItems = [...faqItems];
        newFaqItems[index] = {
            ...newFaqItems[index],
            [field]: value
        };
        setAttributes({ faqItems: newFaqItems });
    };

    const addFaqItem = () => {
        setAttributes({
            faqItems: [...faqItems, { 
                question: 'New FAQ Question?',
                answer: 'Your answer goes here...'
            }]
        });
    };

    const removeFaqItem = (index) => {
        const newFaqItems = faqItems.filter((_, i) => i !== index);
        setAttributes({ faqItems: newFaqItems });
    };

    const toggleFaqItem = (index) => {
        setOpenItems(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    return (
        <Fragment>
            <InspectorControls>
                <PanelBody title={__('Layout Settings', 'simple-invoice-generator')}>
                    <ToggleControl
                        label={__('Full Width', 'simple-invoice-generator')}
                        checked={fullWidth}
                        onChange={(value) => setAttributes({ fullWidth: value })}
                        help={__('Make section background span full browser width', 'simple-invoice-generator')}
                    />
                </PanelBody>
                
                <PanelBody title={__('FAQ Settings', 'simple-invoice-generator')}>
                    <ToggleControl
                        label={__('Enable Schema Markup', 'simple-invoice-generator')}
                        checked={enableSchemaMarkup}
                        onChange={(value) => setAttributes({ enableSchemaMarkup: value })}
                        help={__('Add FAQ schema markup for better SEO', 'simple-invoice-generator')}
                    />
                </PanelBody>
                
                <PanelBody title={__('Spacing Settings', 'simple-invoice-generator')}>
                    <RangeControl
                        label={__('Top Padding', 'simple-invoice-generator')}
                        value={topPadding}
                        onChange={(value) => setAttributes({ topPadding: value })}
                        min={0}
                        max={200}
                    />
                    <RangeControl
                        label={__('Bottom Padding', 'simple-invoice-generator')}
                        value={bottomPadding}
                        onChange={(value) => setAttributes({ bottomPadding: value })}
                        min={0}
                        max={200}
                    />
                </PanelBody>
                
                <PanelColorSettings
                    title={__('Color Settings', 'simple-invoice-generator')}
                    colorSettings={[
                        {
                            value: backgroundColor,
                            onChange: (color) => setAttributes({ backgroundColor: color }),
                            label: __('Background Color', 'simple-invoice-generator')
                        }
                    ]}
                />

                <PanelBody title={__('FAQ Management', 'simple-invoice-generator')} initialOpen={false}>
                    {faqItems.map((item, index) => (
                        <div key={index} style={{ 
                            marginBottom: '20px', 
                            padding: '15px', 
                            border: '1px solid #e0e0e0',
                            borderRadius: '4px',
                            backgroundColor: '#fff'
                        }}>
                            <h4 style={{ margin: '0 0 10px 0', fontSize: '14px', fontWeight: '600' }}>
                                {__('FAQ Item', 'simple-invoice-generator')} #{index + 1}
                            </h4>
                            <div style={{ marginBottom: '10px' }}>
                                <label style={{ display: 'block', marginBottom: '5px', fontSize: '12px', fontWeight: '500' }}>
                                    {__('Question', 'simple-invoice-generator')}
                                </label>
                                <RichText
                                    tagName="div"
                                    value={item.question}
                                    onChange={(value) => updateFaqItem(index, 'question', value)}
                                    placeholder={__('Enter FAQ question...', 'simple-invoice-generator')}
                                    style={{ 
                                        border: '1px solid #ddd', 
                                        padding: '8px', 
                                        borderRadius: '3px',
                                        minHeight: '40px'
                                    }}
                                />
                            </div>
                            <div style={{ marginBottom: '10px' }}>
                                <label style={{ display: 'block', marginBottom: '5px', fontSize: '12px', fontWeight: '500' }}>
                                    {__('Answer', 'simple-invoice-generator')}
                                </label>
                                <RichText
                                    tagName="div"
                                    value={item.answer}
                                    onChange={(value) => updateFaqItem(index, 'answer', value)}
                                    placeholder={__('Enter FAQ answer...', 'simple-invoice-generator')}
                                    style={{ 
                                        border: '1px solid #ddd', 
                                        padding: '8px', 
                                        borderRadius: '3px',
                                        minHeight: '80px'
                                    }}
                                />
                            </div>
                            <Button
                                isSmall
                                isDestructive
                                onClick={() => removeFaqItem(index)}
                            >
                                {__('Remove FAQ', 'simple-invoice-generator')}
                            </Button>
                        </div>
                    ))}
                    <Button
                        isPrimary
                        onClick={addFaqItem}
                        style={{ width: '100%' }}
                    >
                        {__('Add New FAQ', 'simple-invoice-generator')}
                    </Button>
                </PanelBody>
            </InspectorControls>

            <section {...blockProps}>
                <div className="container">
                    <RichText
                        tagName="h2"
                        value={mainTitle}
                        onChange={(value) => setAttributes({ mainTitle: value })}
                        placeholder={__('Enter FAQ section title...', 'simple-invoice-generator')}
                    />
                    
                    <div className="faq-container">
                        {faqItems.map((item, index) => (
                            <div 
                                key={index} 
                                className={`faq-item ${openItems[index] ? 'active' : ''}`}
                            >
                                <div 
                                    className="faq-question"
                                    onClick={() => toggleFaqItem(index)}
                                >
                                    <RichText
                                        tagName="span"
                                        value={item.question}
                                        onChange={(value) => updateFaqItem(index, 'question', value)}
                                        placeholder={__('FAQ question...', 'simple-invoice-generator')}
                                    />
                                    <span className="faq-icon">+</span>
                                </div>
                                <div className="faq-answer">
                                    <RichText
                                        tagName="div"
                                        value={item.answer}
                                        onChange={(value) => updateFaqItem(index, 'answer', value)}
                                        placeholder={__('FAQ answer...', 'simple-invoice-generator')}
                                        allowedFormats={['core/bold', 'core/italic', 'core/link', 'core/list', 'core/paragraph']}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </Fragment>
    );
}