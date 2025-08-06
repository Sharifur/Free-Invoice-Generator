import { __ } from '@wordpress/i18n';
import {
    useBlockProps,
    RichText,
    InspectorControls,
    PanelColorSettings,
    URLInput,
    MediaUpload,
    MediaUploadCheck
} from '@wordpress/block-editor';
import {
    PanelBody,
    TextControl,
    Button,
    TextareaControl,
    Flex,
    FlexItem,
    ToggleControl,
    RangeControl
} from '@wordpress/components';
import { Fragment } from '@wordpress/element';

export default function Edit({ attributes, setAttributes }) {
    const {
        title,
        subtitle,
        description,
        ctaButtonText,
        ctaButtonUrl,
        secondaryButtonText,
        secondaryButtonUrl,
        backgroundColor,
        gradientStartColor,
        gradientEndColor,
        titleColor,
        textColor,
        ctaButtonBackgroundColor,
        ctaButtonTextColor,
        ctaButtonHoverColor,
        secondaryButtonTextColor,
        features,
        showFeatures,
        showTestimonial,
        testimonialText,
        testimonialAuthor,
        testimonialRole,
        testimonialAvatar,
        topPadding,
        bottomPadding
    } = attributes;

    const blockProps = useBlockProps({
        className: 'ib-taskip-cta-section',
        style: {
            backgroundColor: backgroundColor,
            paddingTop: `${topPadding}px`,
            paddingBottom: `${bottomPadding}px`
        }
    });

    const updateFeature = (index, field, value) => {
        const newFeatures = [...features];
        newFeatures[index] = { ...newFeatures[index], [field]: value };
        setAttributes({ features: newFeatures });
    };

    const addFeature = () => {
        const newFeature = {
            id: `feature-${Date.now()}`,
            icon: '⚡',
            title: 'New Feature',
            description: 'Feature description...'
        };
        setAttributes({ features: [...features, newFeature] });
    };

    const removeFeature = (index) => {
        const newFeatures = features.filter((_, i) => i !== index);
        setAttributes({ features: newFeatures });
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
                            value: titleColor,
                            onChange: (color) => setAttributes({ titleColor: color }),
                            label: __('Title Color', 'simple-invoice-generator')
                        },
                        {
                            value: textColor,
                            onChange: (color) => setAttributes({ textColor: color }),
                            label: __('Text Color', 'simple-invoice-generator')
                        }
                    ]}
                />

                <PanelColorSettings
                    title={__('Button Colors', 'simple-invoice-generator')}
                    colorSettings={[
                        {
                            value: ctaButtonBackgroundColor,
                            onChange: (color) => setAttributes({ ctaButtonBackgroundColor: color }),
                            label: __('CTA Button Background', 'simple-invoice-generator')
                        },
                        {
                            value: ctaButtonTextColor,
                            onChange: (color) => setAttributes({ ctaButtonTextColor: color }),
                            label: __('CTA Button Text', 'simple-invoice-generator')
                        },
                        {
                            value: ctaButtonHoverColor,
                            onChange: (color) => setAttributes({ ctaButtonHoverColor: color }),
                            label: __('CTA Button Hover', 'simple-invoice-generator')
                        },
                        {
                            value: secondaryButtonTextColor,
                            onChange: (color) => setAttributes({ secondaryButtonTextColor: color }),
                            label: __('Secondary Button Text', 'simple-invoice-generator')
                        }
                    ]}
                />

                <PanelBody title={__('Spacing Settings', 'simple-invoice-generator')} initialOpen={false}>
                    <RangeControl
                        label={__('Top Padding (px)', 'simple-invoice-generator')}
                        value={topPadding}
                        onChange={(value) => setAttributes({ topPadding: value })}
                        min={0}
                        max={200}
                        step={5}
                    />
                    <RangeControl
                        label={__('Bottom Padding (px)', 'simple-invoice-generator')}
                        value={bottomPadding}
                        onChange={(value) => setAttributes({ bottomPadding: value })}
                        min={0}
                        max={200}
                        step={5}
                    />
                </PanelBody>

                <PanelBody title={__('Display Settings', 'simple-invoice-generator')} initialOpen={false}>
                    <ToggleControl
                        label={__('Show Features', 'simple-invoice-generator')}
                        checked={showFeatures}
                        onChange={(value) => setAttributes({ showFeatures: value })}
                    />
                    <ToggleControl
                        label={__('Show Testimonial', 'simple-invoice-generator')}
                        checked={showTestimonial}
                        onChange={(value) => setAttributes({ showTestimonial: value })}
                    />
                </PanelBody>

                <PanelBody title={__('CTA Settings', 'simple-invoice-generator')} initialOpen={false}>
                    <TextControl
                        label={__('CTA Button URL', 'simple-invoice-generator')}
                        value={ctaButtonUrl}
                        onChange={(value) => setAttributes({ ctaButtonUrl: value })}
                    />
                    <TextControl
                        label={__('Secondary Button URL', 'simple-invoice-generator')}
                        value={secondaryButtonUrl}
                        onChange={(value) => setAttributes({ secondaryButtonUrl: value })}
                    />
                </PanelBody>

                <PanelBody title={__('Features Management', 'simple-invoice-generator')} initialOpen={false}>
                    {features.map((feature, index) => (
                        <div key={feature.id} style={{ marginBottom: '20px', padding: '15px', background: '#f9f9f9', borderRadius: '8px' }}>
                            <TextControl
                                label={__('Icon (Emoji)', 'simple-invoice-generator')}
                                value={feature.icon}
                                onChange={(value) => updateFeature(index, 'icon', value)}
                            />
                            <TextControl
                                label={__('Title', 'simple-invoice-generator')}
                                value={feature.title}
                                onChange={(value) => updateFeature(index, 'title', value)}
                            />
                            <TextareaControl
                                label={__('Description', 'simple-invoice-generator')}
                                value={feature.description}
                                onChange={(value) => updateFeature(index, 'description', value)}
                                rows={3}
                            />
                            <Button
                                isDestructive
                                isSmall
                                onClick={() => removeFeature(index)}
                                style={{ marginTop: '10px' }}
                            >
                                {__('Remove Feature', 'simple-invoice-generator')}
                            </Button>
                        </div>
                    ))}
                    <Button isPrimary onClick={addFeature}>
                        {__('Add Feature', 'simple-invoice-generator')}
                    </Button>
                </PanelBody>

                <PanelBody title={__('Testimonial Settings', 'simple-invoice-generator')} initialOpen={false}>
                    <TextareaControl
                        label={__('Testimonial Text', 'simple-invoice-generator')}
                        value={testimonialText}
                        onChange={(value) => setAttributes({ testimonialText: value })}
                        rows={3}
                    />
                    <TextControl
                        label={__('Author Name', 'simple-invoice-generator')}
                        value={testimonialAuthor}
                        onChange={(value) => setAttributes({ testimonialAuthor: value })}
                    />
                    <TextControl
                        label={__('Author Role', 'simple-invoice-generator')}
                        value={testimonialRole}
                        onChange={(value) => setAttributes({ testimonialRole: value })}
                    />
                </PanelBody>
            </InspectorControls>

            <section {...blockProps}>
                <div className="ib-container">
                    <div className="ib-taskip-content">
                        <div className="ib-taskip-header">
                            <RichText
                                tagName="h2"
                                className="ib-taskip-title"
                                value={title}
                                onChange={(value) => setAttributes({ title: value })}
                                placeholder={__('Enter CTA title...', 'simple-invoice-generator')}
                                style={{ color: titleColor }}
                            />
                            <RichText
                                tagName="h3"
                                className="ib-taskip-subtitle"
                                value={subtitle}
                                onChange={(value) => setAttributes({ subtitle: value })}
                                placeholder={__('Enter subtitle...', 'simple-invoice-generator')}
                                style={{ color: textColor }}
                            />
                            <RichText
                                tagName="p"
                                className="ib-taskip-description"
                                value={description}
                                onChange={(value) => setAttributes({ description: value })}
                                placeholder={__('Enter description...', 'simple-invoice-generator')}
                                style={{ color: textColor }}
                            />
                        </div>

                        {showFeatures && (
                            <div className="ib-taskip-features">
                                <div className="ib-features-grid">
                                    {features.map((feature, index) => (
                                        <div key={feature.id} className="ib-feature-card">
                                            <div className="ib-feature-icon">{feature.icon}</div>
                                            <div className="ib-feature-content">
                                                <h4 className="ib-feature-title" style={{ color: titleColor }}>
                                                    {feature.title}
                                                </h4>
                                                <p className="ib-feature-description" style={{ color: textColor }}>
                                                    {feature.description}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {showTestimonial && (
                            <div className="ib-taskip-testimonial">
                                <div className="ib-testimonial-content">
                                    <div className="ib-testimonial-quote">
                                        <span className="ib-quote-mark">"</span>
                                        <p style={{ color: textColor }}>{testimonialText}</p>
                                    </div>
                                    <div className="ib-testimonial-author">
                                        <div className="ib-author-info">
                                            <strong style={{ color: titleColor }}>{testimonialAuthor}</strong>
                                            <span style={{ color: textColor }}>{testimonialRole}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="ib-taskip-actions">
                            <RichText
                                tagName="a"
                                className="ib-cta-button ib-cta-primary"
                                value={ctaButtonText}
                                onChange={(value) => setAttributes({ ctaButtonText: value })}
                                placeholder={__('CTA Button Text', 'simple-invoice-generator')}
                                style={{
                                    backgroundColor: ctaButtonBackgroundColor,
                                    color: ctaButtonTextColor,
                                    '--cta-button-hover-color': ctaButtonHoverColor
                                }}
                            />
                            <RichText
                                tagName="a"
                                className="ib-cta-button ib-cta-secondary"
                                value={secondaryButtonText}
                                onChange={(value) => setAttributes({ secondaryButtonText: value })}
                                placeholder={__('Secondary Button Text', 'simple-invoice-generator')}
                                style={{
                                    color: secondaryButtonTextColor,
                                    borderColor: secondaryButtonTextColor
                                }}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    );
}