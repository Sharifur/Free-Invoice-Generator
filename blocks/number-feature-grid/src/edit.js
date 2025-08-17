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
    TextControl,
    ToggleControl
} from '@wordpress/components';
import { Fragment } from '@wordpress/element';

export default function Edit({ attributes, setAttributes }) {
    const {
        mainTitle,
        leadText,
        features,
        backgroundColor,
        topPadding,
        bottomPadding,
        fullWidth,
        showNumbers
    } = attributes;

    const blockProps = useBlockProps({
        className: `number-feature-grid-section ${fullWidth ? 'full-width' : ''}`,
        style: {
            paddingTop: `${topPadding}px`,
            paddingBottom: `${bottomPadding}px`,
            backgroundColor: backgroundColor
        }
    });

    const updateFeature = (index, field, value) => {
        const newFeatures = [...features];
        newFeatures[index] = {
            ...newFeatures[index],
            [field]: value
        };
        setAttributes({ features: newFeatures });
    };

    const addFeature = () => {
        const newNumber = (features.length + 1).toString();
        setAttributes({
            features: [...features, { 
                number: newNumber,
                title: 'New Feature Title',
                description: 'Feature description here...'
            }]
        });
    };

    const removeFeature = (index) => {
        const newFeatures = features.filter((_, i) => i !== index);
        // Renumber the remaining features
        const renumberedFeatures = newFeatures.map((feature, i) => ({
            ...feature,
            number: (i + 1).toString()
        }));
        setAttributes({ features: renumberedFeatures });
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
                
                <PanelBody title={__('Display Settings', 'simple-invoice-generator')}>
                    <ToggleControl
                        label={__('Show Numbers', 'simple-invoice-generator')}
                        checked={showNumbers}
                        onChange={(value) => setAttributes({ showNumbers: value })}
                        help={__('Show or hide numbered circles in feature cards', 'simple-invoice-generator')}
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

                <PanelBody title={__('Features Management', 'simple-invoice-generator')} initialOpen={false}>
                    {features.map((feature, index) => (
                        <div key={index} style={{ 
                            marginBottom: '20px', 
                            padding: '15px', 
                            border: '1px solid #e0e0e0',
                            borderRadius: '4px',
                            backgroundColor: '#fff'
                        }}>
                            <TextControl
                                label={__('Number', 'simple-invoice-generator')}
                                value={feature.number}
                                onChange={(value) => updateFeature(index, 'number', value)}
                            />
                            <TextControl
                                label={__('Title', 'simple-invoice-generator')}
                                value={feature.title}
                                onChange={(value) => updateFeature(index, 'title', value)}
                            />
                            <TextControl
                                label={__('Description', 'simple-invoice-generator')}
                                value={feature.description}
                                onChange={(value) => updateFeature(index, 'description', value)}
                                help={__('Feature description text', 'simple-invoice-generator')}
                            />
                            <Button
                                isSmall
                                isDestructive
                                onClick={() => removeFeature(index)}
                                style={{ marginTop: '10px' }}
                            >
                                {__('Remove Feature', 'simple-invoice-generator')}
                            </Button>
                        </div>
                    ))}
                    <Button
                        isPrimary
                        onClick={addFeature}
                        style={{ width: '100%' }}
                    >
                        {__('Add New Feature', 'simple-invoice-generator')}
                    </Button>
                </PanelBody>
            </InspectorControls>

            <section {...blockProps}>
                <div className="container">
                    <RichText
                        tagName="h2"
                        value={mainTitle}
                        onChange={(value) => setAttributes({ mainTitle: value })}
                        placeholder={__('Enter main title...', 'simple-invoice-generator')}
                    />
                    
                    <div className="content-wrapper">
                        <RichText
                            tagName="p"
                            className="lead-text"
                            value={leadText}
                            onChange={(value) => setAttributes({ leadText: value })}
                            placeholder={__('Enter lead text...', 'simple-invoice-generator')}
                        />
                        
                        <div className="features-grid">
                            {features.map((feature, index) => (
                                <div key={index} className="feature-card">
                                    {showNumbers && (
                                        <div className="feature-number">{feature.number}</div>
                                    )}
                                    <RichText
                                        tagName="h3"
                                        value={feature.title}
                                        onChange={(value) => updateFeature(index, 'title', value)}
                                        placeholder={__('Feature title...', 'simple-invoice-generator')}
                                    />
                                    <RichText
                                        tagName="p"
                                        value={feature.description}
                                        onChange={(value) => updateFeature(index, 'description', value)}
                                        placeholder={__('Feature description...', 'simple-invoice-generator')}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    );
}