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
    SelectControl,
    Flex,
    FlexItem,
    RangeControl
} from '@wordpress/components';
import { Fragment } from '@wordpress/element';

export default function Edit({ attributes, setAttributes }) {
    const {
        title,
        subtitle,
        backgroundColor,
        accentColor,
        gradientStartColor,
        gradientEndColor,
        headerTextColor,
        tools,
        topPadding,
        bottomPadding
    } = attributes;

    const blockProps = useBlockProps({
        className: 'ib-related-tools-section',
        style: {
            backgroundColor: backgroundColor,
            paddingTop: `${topPadding}px`,
            paddingBottom: `${bottomPadding}px`
        }
    });

    const updateTool = (index, field, value) => {
        const newTools = [...tools];
        newTools[index] = { ...newTools[index], [field]: value };
        setAttributes({ tools: newTools });
    };

    const updateToolFeature = (toolIndex, featureIndex, value) => {
        const newTools = [...tools];
        const newFeatures = [...newTools[toolIndex].features];
        newFeatures[featureIndex] = value;
        newTools[toolIndex] = { ...newTools[toolIndex], features: newFeatures };
        setAttributes({ tools: newTools });
    };

    const addTool = () => {
        const newTool = {
            id: `tool-${Date.now()}`,
            name: 'New Tool',
            tagline: 'Tool description',
            description: 'Add tool description here...',
            url: '#',
            badge: '',
            badgeType: '',
            features: ['Feature 1', 'Feature 2', 'Feature 3']
        };
        setAttributes({ tools: [...tools, newTool] });
    };

    const removeTool = (index) => {
        const newTools = tools.filter((_, i) => i !== index);
        setAttributes({ tools: newTools });
    };

    const addFeature = (toolIndex) => {
        const newTools = [...tools];
        newTools[toolIndex].features.push('New feature');
        setAttributes({ tools: newTools });
    };

    const removeFeature = (toolIndex, featureIndex) => {
        const newTools = [...tools];
        newTools[toolIndex].features = newTools[toolIndex].features.filter((_, i) => i !== featureIndex);
        setAttributes({ tools: newTools });
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

                <PanelColorSettings
                    title={__('Tool Card Colors', 'simple-invoice-generator')}
                    colorSettings={[
                        {
                            value: gradientStartColor,
                            onChange: (color) => setAttributes({ gradientStartColor: color }),
                            label: __('Header Gradient Start Color', 'simple-invoice-generator')
                        },
                        {
                            value: gradientEndColor,
                            onChange: (color) => setAttributes({ gradientEndColor: color }),
                            label: __('Header Gradient End Color', 'simple-invoice-generator')
                        },
                        {
                            value: headerTextColor,
                            onChange: (color) => setAttributes({ headerTextColor: color }),
                            label: __('Header Text Color', 'simple-invoice-generator')
                        }
                    ]}
                />

                <PanelBody title={__('Tools Management', 'simple-invoice-generator')} initialOpen={false}>
                    <Button isPrimary onClick={addTool}>
                        {__('Add New Tool', 'simple-invoice-generator')}
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
                            className="ib-section-title"
                            value={title}
                            onChange={(value) => setAttributes({ title: value })}
                            placeholder={__('Enter section title...', 'simple-invoice-generator')}
                        />
                        <RichText
                            tagName="p"
                            className="ib-section-subtitle"
                            value={subtitle}
                            onChange={(value) => setAttributes({ subtitle: value })}
                            placeholder={__('Enter section subtitle...', 'simple-invoice-generator')}
                        />
                    </div>

                    <div className="ib-tools-grid">
                        {tools.map((tool, index) => (
                            <div key={tool.id} className="ib-tool-card">
                                <div className="ib-tool-controls">
                                    <Button
                                        isDestructive
                                        isSmall
                                        onClick={() => removeTool(index)}
                                    >
                                        {__('Remove Tool', 'simple-invoice-generator')}
                                    </Button>
                                </div>

                                {tool.badge && (
                                    <div className={`ib-badge-${tool.badgeType}`}>
                                        {tool.badge}
                                    </div>
                                )}

                                <div className="ib-tool-header" style={{ 
                                    background: `linear-gradient(135deg, ${gradientStartColor} 0%, ${gradientEndColor} 100%)`,
                                    color: headerTextColor
                                }}>
                                    <RichText
                                        tagName="h3"
                                        className="ib-tool-name"
                                        value={tool.name}
                                        onChange={(value) => updateTool(index, 'name', value)}
                                        placeholder={__('Tool name...', 'simple-invoice-generator')}
                                        style={{ color: headerTextColor }}
                                    />
                                    <RichText
                                        tagName="p"
                                        className="ib-tool-tagline"
                                        value={tool.tagline}
                                        onChange={(value) => updateTool(index, 'tagline', value)}
                                        placeholder={__('Tool tagline...', 'simple-invoice-generator')}
                                        style={{ color: headerTextColor }}
                                    />
                                </div>

                                <div className="ib-tool-body">
                                    <RichText
                                        tagName="p"
                                        className="ib-tool-description"
                                        value={tool.description}
                                        onChange={(value) => updateTool(index, 'description', value)}
                                        placeholder={__('Tool description...', 'simple-invoice-generator')}
                                    />

                                    <div className="ib-tool-features">
                                        <strong>{__('Features:', 'simple-invoice-generator')}</strong>
                                        {tool.features.map((feature, featureIndex) => (
                                            <Flex key={featureIndex} style={{ marginBottom: '10px' }}>
                                                <FlexItem>
                                                    <TextControl
                                                        value={feature}
                                                        onChange={(value) => updateToolFeature(index, featureIndex, value)}
                                                        placeholder={__('Feature...', 'simple-invoice-generator')}
                                                    />
                                                </FlexItem>
                                                <FlexItem>
                                                    <Button
                                                        isDestructive
                                                        isSmall
                                                        onClick={() => removeFeature(index, featureIndex)}
                                                    >
                                                        {__('×', 'simple-invoice-generator')}
                                                    </Button>
                                                </FlexItem>
                                            </Flex>
                                        ))}
                                        <Button
                                            isSecondary
                                            isSmall
                                            onClick={() => addFeature(index)}
                                        >
                                            {__('Add Feature', 'simple-invoice-generator')}
                                        </Button>
                                    </div>

                                    <div className="ib-tool-settings" style={{ marginTop: '20px', padding: '15px', background: '#f8f9fa', borderRadius: '8px' }}>
                                        <TextControl
                                            label={__('Tool URL', 'simple-invoice-generator')}
                                            value={tool.url}
                                            onChange={(value) => updateTool(index, 'url', value)}
                                        />
                                        <TextControl
                                            label={__('Badge Text', 'simple-invoice-generator')}
                                            value={tool.badge}
                                            onChange={(value) => updateTool(index, 'badge', value)}
                                        />
                                        <SelectControl
                                            label={__('Badge Type', 'simple-invoice-generator')}
                                            value={tool.badgeType}
                                            options={[
                                                { label: __('None', 'simple-invoice-generator'), value: '' },
                                                { label: __('Popular', 'simple-invoice-generator'), value: 'popular' },
                                                { label: __('New', 'simple-invoice-generator'), value: 'new' }
                                            ]}
                                            onChange={(value) => updateTool(index, 'badgeType', value)}
                                        />
                                    </div>
                                    <div className="ib-tool-cta">
                                        <a href={tool.url} style={{ color: accentColor }}>
                                            <span>Try {tool.name}</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </Fragment>
    );
}