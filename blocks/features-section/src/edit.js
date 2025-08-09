import { __ } from '@wordpress/i18n';
import {
    useBlockProps,
    RichText,
    InspectorControls,
    PanelColorSettings
} from '@wordpress/block-editor';
import {
    PanelBody,
    TextControl,
    Button,
    RangeControl
} from '@wordpress/components';
import { Fragment } from '@wordpress/element';

export default function Edit({ attributes, setAttributes }) {
    const {
        title,
        subtitle,
        backgroundColor,
        features,
        topPadding,
        bottomPadding
    } = attributes;

    const blockProps = useBlockProps({
        className: 'ib-features-section',
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
            icon: '✨',
            title: 'New Feature',
            description: 'Add feature description here...'
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
                        }
                    ]}
                />

                <PanelBody title={__('Features Management', 'simple-invoice-generator')} initialOpen={false}>
                    <Button isPrimary onClick={addFeature}>
                        {__('Add New Feature', 'simple-invoice-generator')}
                    </Button>
                </PanelBody>

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
            </InspectorControls>

            <section {...blockProps}>
                <div className="container">
                    <div className="ib-section-header">
                        <RichText
                            tagName="h2"
                            value={title}
                            onChange={(value) => setAttributes({ title: value })}
                            placeholder={__('Enter section title...', 'simple-invoice-generator')}
                        />
                        <RichText
                            tagName="p"
                            value={subtitle}
                            onChange={(value) => setAttributes({ subtitle: value })}
                            placeholder={__('Enter section subtitle...', 'simple-invoice-generator')}
                        />
                    </div>

                    <div className="features-grid">
                        {features.map((feature, index) => (
                            <div key={index} className="feature-card">
                                <div className="ib-feature-controls">
                                    <Button
                                        isDestructive
                                        isSmall
                                        onClick={() => removeFeature(index)}
                                    >
                                        {__('Remove', 'simple-invoice-generator')}
                                    </Button>
                                </div>

                                <div className="feature-icon">
                                    <TextControl
                                        value={feature.icon}
                                        onChange={(value) => updateFeature(index, 'icon', value)}
                                        placeholder="⚡"
                                        label={__('Icon (emoji)', 'simple-invoice-generator')}
                                    />
                                </div>

                                <RichText
                                    tagName="h3"
                                    className="feature-title"
                                    value={feature.title}
                                    onChange={(value) => updateFeature(index, 'title', value)}
                                    placeholder={__('Feature title...', 'simple-invoice-generator')}
                                />

                                <RichText
                                    tagName="p"
                                    className="feature-description"
                                    value={feature.description}
                                    onChange={(value) => updateFeature(index, 'description', value)}
                                    placeholder={__('Feature description...', 'simple-invoice-generator')}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </Fragment>
    );
}