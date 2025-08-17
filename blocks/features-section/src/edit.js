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
    RangeControl,
    ToggleControl
} from '@wordpress/components';
import { Fragment } from '@wordpress/element';

export default function Edit({ attributes, setAttributes }) {
    const {
        title,
        subtitle,
        backgroundColor,
        features,
        topPadding,
        bottomPadding,
        fullWidth,
        showIcons
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
                <PanelBody title={__('Layout Settings', 'simple-invoice-generator')}>
                    <ToggleControl
                        label={__('Full Width', 'simple-invoice-generator')}
                        checked={fullWidth}
                        onChange={(value) => setAttributes({ fullWidth: value })}
                        help={__('Make section background span full browser width', 'simple-invoice-generator')}
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

                <PanelBody title={__('Display Settings', 'simple-invoice-generator')}>
                    <ToggleControl
                        label={__('Show Icons', 'simple-invoice-generator')}
                        checked={showIcons}
                        onChange={(value) => setAttributes({ showIcons: value })}
                        help={__('Toggle to show or hide feature icons', 'simple-invoice-generator')}
                    />
                </PanelBody>

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
                <div className="ib-container">
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

                    <div className="ib-features-grid">
                        {features.map((feature, index) => (
                            <div key={index} className="ib-feature-card">
                                <div className="ib-feature-controls">
                                    <Button
                                        isDestructive
                                        isSmall
                                        onClick={() => removeFeature(index)}
                                    >
                                        {__('Remove', 'simple-invoice-generator')}
                                    </Button>
                                </div>

                                {showIcons && (
                                    <div className="feature-icon">
                                        <TextControl
                                            value={feature.icon}
                                            onChange={(value) => updateFeature(index, 'icon', value)}
                                            placeholder="⚡"
                                            label={__('Icon (emoji)', 'simple-invoice-generator')}
                                        />
                                    </div>
                                )}

                                <RichText
                                    tagName="h3"
                                    className="ib-feature-title"
                                    value={feature.title}
                                    onChange={(value) => updateFeature(index, 'title', value)}
                                    placeholder={__('Feature title...', 'simple-invoice-generator')}
                                />

                                <RichText
                                    tagName="p"
                                    className="ib-feature-description"
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