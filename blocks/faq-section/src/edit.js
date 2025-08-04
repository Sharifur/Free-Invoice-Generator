import { __ } from '@wordpress/i18n';
import {
    useBlockProps,
    RichText,
    InspectorControls,
    PanelColorSettings,
    URLInput
} from '@wordpress/block-editor';
import {
    PanelBody,
    TextControl,
    Button,
    TextareaControl,
    Flex,
    FlexItem,
    ToggleControl,
    SelectControl
} from '@wordpress/components';
import { Fragment, useState } from '@wordpress/element';

export default function Edit({ attributes, setAttributes }) {
    const {
        title,
        subtitle,
        backgroundColor,
        accentColor,
        categories,
        faqItems,
        showCTA,
        ctaTitle,
        ctaText,
        ctaButtonText,
        ctaButtonUrl,
        enableSchemaMarkup,
        ctaBackgroundStartColor,
        ctaBackgroundEndColor,
        ctaTextColor,
        ctaButtonBackgroundColor,
        ctaButtonTextColor,
        ctaButtonHoverColor
    } = attributes;

    const [activeCategory, setActiveCategory] = useState(categories.find(cat => cat.isActive)?.id || 'general');

    const blockProps = useBlockProps({
        className: 'ib-faq-section',
        style: {
            backgroundColor: backgroundColor
        }
    });

    // Category functions
    const updateCategory = (index, field, value) => {
        const newCategories = [...categories];
        newCategories[index] = { ...newCategories[index], [field]: value };
        setAttributes({ categories: newCategories });
    };

    const addCategory = () => {
        const newCategory = {
            id: `category-${Date.now()}`,
            name: 'New Category',
            isActive: false
        };
        setAttributes({ categories: [...categories, newCategory] });
    };

    const removeCategory = (index) => {
        const newCategories = categories.filter((_, i) => i !== index);
        setAttributes({ categories: newCategories });
    };

    // FAQ functions
    const updateFAQ = (index, field, value) => {
        const newFAQs = [...faqItems];
        newFAQs[index] = { ...newFAQs[index], [field]: value };
        setAttributes({ faqItems: newFAQs });
    };

    const addFAQ = () => {
        const newFAQ = {
            id: `faq-${Date.now()}`,
            category: activeCategory,
            question: 'New question?',
            answer: 'Add your answer here...'
        };
        setAttributes({ faqItems: [...faqItems, newFAQ] });
    };

    const removeFAQ = (index) => {
        const newFAQs = faqItems.filter((_, i) => i !== index);
        setAttributes({ faqItems: newFAQs });
    };

    const getActiveFAQs = () => {
        return faqItems.filter(faq => faq.category === activeCategory);
    };

    return (
        <Fragment>
            <InspectorControls>
                <PanelColorSettings
                    title={__('Color Settings', 'simple-invoice-generator')}
                    colorSettings={[
                        {
                            value: backgroundColor,
                            onChange: (color) => setAttributes({ backgroundColor: color }),
                            label: __('Background Color', 'simple-invoice-generator')
                        },
                        {
                            value: accentColor,
                            onChange: (color) => setAttributes({ accentColor: color }),
                            label: __('Accent Color', 'simple-invoice-generator')
                        }
                    ]}
                />

                <PanelBody title={__('FAQ Categories', 'simple-invoice-generator')} initialOpen={false}>
                    <p style={{ marginBottom: '15px', color: '#666', fontSize: '14px' }}>
                        {__('Organize your FAQs into categories. Each category will appear as a tab.', 'simple-invoice-generator')}
                    </p>
                    {categories.map((category, index) => (
                        <div key={category.id} style={{ marginBottom: '20px', padding: '15px', background: '#f9f9f9', borderRadius: '8px' }}>
                            <Flex style={{ alignItems: 'flex-end' }}>
                                <FlexItem style={{ flex: 1 }}>
                                    <TextControl
                                        label={__('Category Name', 'simple-invoice-generator')}
                                        value={category.name}
                                        onChange={(value) => updateCategory(index, 'name', value)}
                                        placeholder={__('e.g., General Questions', 'simple-invoice-generator')}
                                    />
                                </FlexItem>
                                <FlexItem>
                                    <Button
                                        isDestructive
                                        isSmall
                                        onClick={() => removeCategory(index)}
                                        disabled={categories.length <= 1}
                                        title={categories.length <= 1 ? __('At least one category is required', 'simple-invoice-generator') : __('Remove Category', 'simple-invoice-generator')}
                                    >
                                        {__('Remove', 'simple-invoice-generator')}
                                    </Button>
                                </FlexItem>
                            </Flex>
                        </div>
                    ))}
                    <Button isPrimary onClick={addCategory}>
                        {__('Add New Category', 'simple-invoice-generator')}
                    </Button>
                </PanelBody>

                <PanelBody title={__('FAQ Management', 'simple-invoice-generator')} initialOpen={false}>
                    <SelectControl
                        label={__('Edit FAQs for Category', 'simple-invoice-generator')}
                        value={activeCategory}
                        options={categories.map(cat => ({ label: cat.name, value: cat.id }))}
                        onChange={(value) => setActiveCategory(value)}
                    />
                    
                    {getActiveFAQs().map((faq, index) => {
                        const globalIndex = faqItems.findIndex(item => item.id === faq.id);
                        return (
                            <div key={faq.id} style={{ marginBottom: '20px', padding: '15px', background: '#f9f9f9', borderRadius: '8px' }}>
                                <TextControl
                                    label={__('Question', 'simple-invoice-generator')}
                                    value={faq.question}
                                    onChange={(value) => updateFAQ(globalIndex, 'question', value)}
                                />
                                <TextareaControl
                                    label={__('Answer', 'simple-invoice-generator')}
                                    value={faq.answer}
                                    onChange={(value) => updateFAQ(globalIndex, 'answer', value)}
                                    rows={4}
                                />
                                <Button
                                    isDestructive
                                    isSmall
                                    onClick={() => removeFAQ(globalIndex)}
                                    style={{ marginTop: '10px' }}
                                >
                                    {__('Remove FAQ', 'simple-invoice-generator')}
                                </Button>
                            </div>
                        );
                    })}
                    <Button isPrimary onClick={addFAQ}>
                        {__('Add FAQ', 'simple-invoice-generator')}
                    </Button>
                </PanelBody>

                <PanelBody title={__('CTA Settings', 'simple-invoice-generator')}>
                    <ToggleControl
                        label={__('Show CTA Section', 'simple-invoice-generator')}
                        checked={showCTA}
                        onChange={(value) => setAttributes({ showCTA: value })}
                    />
                    
                    {showCTA && (
                        <>
                            <TextControl
                                label={__('CTA Title', 'simple-invoice-generator')}
                                value={ctaTitle}
                                onChange={(value) => setAttributes({ ctaTitle: value })}
                            />
                            <TextControl
                                label={__('CTA Text', 'simple-invoice-generator')}
                                value={ctaText}
                                onChange={(value) => setAttributes({ ctaText: value })}
                            />
                            <TextControl
                                label={__('Button Text', 'simple-invoice-generator')}
                                value={ctaButtonText}
                                onChange={(value) => setAttributes({ ctaButtonText: value })}
                            />
                            <URLInput
                                label={__('Button URL', 'simple-invoice-generator')}
                                value={ctaButtonUrl}
                                onChange={(value) => setAttributes({ ctaButtonUrl: value })}
                            />
                        </>
                    )}
                </PanelBody>

                <PanelBody title={__('CTA Colors', 'simple-invoice-generator')} initialOpen={false}>
                    <PanelColorSettings
                        title={__('CTA Section Colors', 'simple-invoice-generator')}
                        colorSettings={[
                            {
                                value: ctaBackgroundStartColor,
                                onChange: (color) => setAttributes({ ctaBackgroundStartColor: color }),
                                label: __('Background Start Color', 'simple-invoice-generator')
                            },
                            {
                                value: ctaBackgroundEndColor,
                                onChange: (color) => setAttributes({ ctaBackgroundEndColor: color }),
                                label: __('Background End Color', 'simple-invoice-generator')
                            },
                            {
                                value: ctaTextColor,
                                onChange: (color) => setAttributes({ ctaTextColor: color }),
                                label: __('Text Color', 'simple-invoice-generator')
                            },
                            {
                                value: ctaButtonBackgroundColor,
                                onChange: (color) => setAttributes({ ctaButtonBackgroundColor: color }),
                                label: __('Button Background Color', 'simple-invoice-generator')
                            },
                            {
                                value: ctaButtonTextColor,
                                onChange: (color) => setAttributes({ ctaButtonTextColor: color }),
                                label: __('Button Text Color', 'simple-invoice-generator')
                            },
                            {
                                value: ctaButtonHoverColor,
                                onChange: (color) => setAttributes({ ctaButtonHoverColor: color }),
                                label: __('Button Hover Color', 'simple-invoice-generator')
                            }
                        ]}
                    />
                </PanelBody>

                <PanelBody title={__('SEO Settings', 'simple-invoice-generator')}>
                    <ToggleControl
                        label={__('Enable Schema Markup', 'simple-invoice-generator')}
                        checked={enableSchemaMarkup}
                        onChange={(value) => setAttributes({ enableSchemaMarkup: value })}
                        help={__('Generate structured data for better search engine visibility', 'simple-invoice-generator')}
                    />
                </PanelBody>
            </InspectorControls>

            <section {...blockProps}>
                <div className="ib-container">
                    <div className="ib-section-header">
                        <RichText
                            tagName="h2"
                            className="ib-section-title"
                            value={title}
                            onChange={(value) => setAttributes({ title: value })}
                            placeholder={__('Enter FAQ title...', 'simple-invoice-generator')}
                        />
                        <RichText
                            tagName="p"
                            className="ib-section-subtitle"
                            value={subtitle}
                            onChange={(value) => setAttributes({ subtitle: value })}
                            placeholder={__('Enter FAQ subtitle...', 'simple-invoice-generator')}
                        />
                    </div>
                    
                    <div className="ib-faq-categories">
                        {categories.map((category, index) => (
                            <button
                                key={category.id}
                                className={`ib-category-btn ${activeCategory === category.id ? 'active' : ''}`}
                                onClick={() => setActiveCategory(category.id)}
                                style={{
                                    backgroundColor: activeCategory === category.id ? accentColor : '#f8f9fa',
                                    color: activeCategory === category.id ? '#fff' : '#666'
                                }}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>
                    
                    <div className="ib-faq-container">
                        <div className="ib-faq-group active">
                            <h3 className="ib-group-title">
                                {categories.find(cat => cat.id === activeCategory)?.name || 'Questions'}
                            </h3>
                            
                            {getActiveFAQs().map((faq, index) => {
                                const globalIndex = faqItems.findIndex(item => item.id === faq.id);
                                return (
                                    <div key={faq.id} className="ib-faq-item">
                                        <div className="ib-faq-question">
                                            <RichText
                                                tagName="div"
                                                value={faq.question}
                                                onChange={(value) => updateFAQ(globalIndex, 'question', value)}
                                                placeholder={__('Enter question...', 'simple-invoice-generator')}
                                            />
                                            <span className="ib-faq-icon" style={{ color: accentColor }}>+</span>
                                        </div>
                                        <div className="ib-faq-answer">
                                            <RichText
                                                tagName="div"
                                                value={faq.answer}
                                                onChange={(value) => updateFAQ(globalIndex, 'answer', value)}
                                                placeholder={__('Enter answer...', 'simple-invoice-generator')}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    
                    {showCTA && (
                        <div 
                            className="ib-cta-section" 
                            style={{ 
                                background: `linear-gradient(135deg, ${ctaBackgroundStartColor} 0%, ${ctaBackgroundEndColor} 100%)`,
                                '--cta-button-hover-color': ctaButtonHoverColor
                            }}
                        >
                            <RichText
                                tagName="h3"
                                className="ib-cta-title"
                                value={ctaTitle}
                                onChange={(value) => setAttributes({ ctaTitle: value })}
                                placeholder={__('Enter CTA title...', 'simple-invoice-generator')}
                                style={{ color: ctaTextColor }}
                            />
                            <RichText
                                tagName="p"
                                className="ib-cta-text"
                                value={ctaText}
                                onChange={(value) => setAttributes({ ctaText: value })}
                                placeholder={__('Enter CTA text...', 'simple-invoice-generator')}
                                style={{ color: ctaTextColor }}
                            />
                            <a 
                                href={ctaButtonUrl} 
                                className="ib-cta-button"
                                style={{ 
                                    backgroundColor: ctaButtonBackgroundColor,
                                    color: ctaButtonTextColor
                                }}
                            >
                                {ctaButtonText}
                            </a>
                        </div>
                    )}
                </div>
            </section>
        </Fragment>
    );
}