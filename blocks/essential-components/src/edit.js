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
        components,
        backgroundColor,
        topPadding,
        bottomPadding,
        fullWidth,
        showIcons
    } = attributes;

    const blockProps = useBlockProps({
        className: 'essential-components-section',
        style: {
            paddingTop: `${topPadding}px`,
            paddingBottom: `${bottomPadding}px`,
            backgroundColor: backgroundColor
        }
    });

    const updateComponent = (index, field, value) => {
        const newComponents = [...components];
        newComponents[index] = {
            ...newComponents[index],
            [field]: value
        };
        setAttributes({ components: newComponents });
    };

    const addComponent = () => {
        setAttributes({
            components: [...components, { 
                icon: '🔧', 
                title: 'New Component', 
                description: 'Component description here...' 
            }]
        });
    };

    const removeComponent = (index) => {
        const newComponents = components.filter((_, i) => i !== index);
        setAttributes({ components: newComponents });
    };

    const moveComponent = (index, direction) => {
        const newComponents = [...components];
        const newIndex = index + direction;
        
        if (newIndex >= 0 && newIndex < components.length) {
            [newComponents[index], newComponents[newIndex]] = 
            [newComponents[newIndex], newComponents[index]];
            setAttributes({ components: newComponents });
        }
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
                        label={__('Show Icons', 'simple-invoice-generator')}
                        checked={showIcons}
                        onChange={(value) => setAttributes({ showIcons: value })}
                        help={__('Show or hide component icons', 'simple-invoice-generator')}
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

                <PanelBody title={__('Components', 'simple-invoice-generator')} initialOpen={false}>
                    {components.map((component, index) => (
                        <div key={index} style={{ 
                            marginBottom: '20px', 
                            padding: '15px', 
                            border: '1px solid #e0e0e0',
                            borderRadius: '4px',
                            backgroundColor: '#fff'
                        }}>
                            <div style={{ marginBottom: '10px' }}>
                                <TextControl
                                    label={__('Icon (Emoji)', 'simple-invoice-generator')}
                                    value={component.icon}
                                    onChange={(value) => updateComponent(index, 'icon', value)}
                                />
                            </div>
                            <div style={{ marginBottom: '10px' }}>
                                <TextControl
                                    label={__('Title', 'simple-invoice-generator')}
                                    value={component.title}
                                    onChange={(value) => updateComponent(index, 'title', value)}
                                />
                            </div>
                            <div style={{ marginBottom: '10px' }}>
                                <TextControl
                                    label={__('Description', 'simple-invoice-generator')}
                                    value={component.description}
                                    onChange={(value) => updateComponent(index, 'description', value)}
                                    help={__('Full description text', 'simple-invoice-generator')}
                                />
                            </div>
                            <div style={{ display: 'flex', gap: '5px' }}>
                                <Button
                                    isSmall
                                    onClick={() => moveComponent(index, -1)}
                                    disabled={index === 0}
                                >
                                    {__('↑ Up', 'simple-invoice-generator')}
                                </Button>
                                <Button
                                    isSmall
                                    onClick={() => moveComponent(index, 1)}
                                    disabled={index === components.length - 1}
                                >
                                    {__('↓ Down', 'simple-invoice-generator')}
                                </Button>
                                <Button
                                    isSmall
                                    isDestructive
                                    onClick={() => removeComponent(index)}
                                >
                                    {__('Remove', 'simple-invoice-generator')}
                                </Button>
                            </div>
                        </div>
                    ))}
                    <Button
                        isPrimary
                        onClick={addComponent}
                        style={{ width: '100%' }}
                    >
                        {__('Add Component', 'simple-invoice-generator')}
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
        </Fragment>
    );
}