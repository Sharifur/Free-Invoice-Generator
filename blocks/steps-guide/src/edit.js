import { __ } from '@wordpress/i18n';
import {
    useBlockProps,
    RichText,
    InspectorControls,
    MediaUpload,
    MediaUploadCheck,
    PanelColorSettings
} from '@wordpress/block-editor';
import {
    PanelBody,
    TextControl,
    Button,
    ToggleControl,
    TextareaControl,
    Flex,
    FlexItem,
    RangeControl
} from '@wordpress/components';
import { Fragment } from '@wordpress/element';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export default function Edit({ attributes, setAttributes }) {
    const {
        title,
        subtitle,
        backgroundColor,
        titleColor,
        subtitleColor,
        stepNumberColor,
        stepCardBackground,
        steps,
        ctaText,
        ctaLink,
        showCta,
        topPadding,
        bottomPadding
    } = attributes;

    const blockProps = useBlockProps({
        className: 'ib-steps-section',
        style: {
            backgroundColor: backgroundColor,
            paddingTop: `${topPadding}px`,
            paddingBottom: `${bottomPadding}px`
        }
    });

    const updateStep = (index, field, value) => {
        const newSteps = [...steps];
        newSteps[index] = { ...newSteps[index], [field]: value };
        setAttributes({ steps: newSteps });
    };

    const updateStepFeature = (stepIndex, featureIndex, value) => {
        const newSteps = [...steps];
        const newFeatures = [...newSteps[stepIndex].features];
        newFeatures[featureIndex] = value;
        newSteps[stepIndex] = { ...newSteps[stepIndex], features: newFeatures };
        setAttributes({ steps: newSteps });
    };

    const addStep = () => {
        const newStep = {
            title: 'New Step',
            description: 'Add your step description here.',
            features: ['Feature 1', 'Feature 2'],
            imageUrl: '',
            imageId: null,
            showVisual: true
        };
        setAttributes({ steps: [...steps, newStep] });
    };

    const removeStep = (index) => {
        const newSteps = steps.filter((_, i) => i !== index);
        setAttributes({ steps: newSteps });
    };

    const addFeature = (stepIndex) => {
        const newSteps = [...steps];
        newSteps[stepIndex].features.push('New feature');
        setAttributes({ steps: newSteps });
    };

    const removeFeature = (stepIndex, featureIndex) => {
        const newSteps = [...steps];
        newSteps[stepIndex].features = newSteps[stepIndex].features.filter((_, i) => i !== featureIndex);
        setAttributes({ steps: newSteps });
    };

    const onDragEnd = (result) => {
        if (!result.destination) return;

        const newSteps = Array.from(steps);
        const [reorderedItem] = newSteps.splice(result.source.index, 1);
        newSteps.splice(result.destination.index, 0, reorderedItem);

        setAttributes({ steps: newSteps });
    };

    return (
        <Fragment>
            <InspectorControls>
                <PanelBody title={__('General Settings', 'simple-invoice-generator')}>
                    <TextControl
                        label={__('CTA Button Text', 'simple-invoice-generator')}
                        value={ctaText}
                        onChange={(value) => setAttributes({ ctaText: value })}
                    />
                    <TextControl
                        label={__('CTA Button Link', 'simple-invoice-generator')}
                        value={ctaLink}
                        onChange={(value) => setAttributes({ ctaLink: value })}
                    />
                    <ToggleControl
                        label={__('Show CTA Button', 'simple-invoice-generator')}
                        checked={showCta}
                        onChange={(value) => setAttributes({ showCta: value })}
                    />
                </PanelBody>

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
                            value: subtitleColor,
                            onChange: (color) => setAttributes({ subtitleColor: color }),
                            label: __('Subtitle Color', 'simple-invoice-generator')
                        },
                        {
                            value: stepNumberColor,
                            onChange: (color) => setAttributes({ stepNumberColor: color }),
                            label: __('Step Number Color', 'simple-invoice-generator')
                        },
                        {
                            value: stepCardBackground,
                            onChange: (color) => setAttributes({ stepCardBackground: color }),
                            label: __('Step Card Background', 'simple-invoice-generator')
                        }
                    ]}
                />

                <PanelBody title={__('Steps Management', 'simple-invoice-generator')} initialOpen={false}>
                    <p>{__('Drag and drop to reorder steps, or use the buttons below to manage them.', 'simple-invoice-generator')}</p>
                    <Button isPrimary onClick={addStep}>
                        {__('Add New Step', 'simple-invoice-generator')}
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
                            style={{ color: titleColor }}
                        />
                        <RichText
                            tagName="p"
                            className="ib-section-subtitle"
                            value={subtitle}
                            onChange={(value) => setAttributes({ subtitle: value })}
                            placeholder={__('Enter section subtitle...', 'simple-invoice-generator')}
                            style={{ color: subtitleColor }}
                        />
                    </div>

                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="steps">
                            {(provided) => (
                                <div
                                    className="ib-steps-container"
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    {steps.map((step, index) => (
                                        <Draggable key={index} draggableId={`step-${index}`} index={index}>
                                            {(provided, snapshot) => (
                                                <div
                                                    className={`ib-step-card ${snapshot.isDragging ? 'dragging' : ''}`}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    ref={provided.innerRef}
                                                    style={{
                                                        backgroundColor: stepCardBackground,
                                                        ...provided.draggableProps.style
                                                    }}
                                                >
                                                    <div className="ib-step-controls">
                                                        <Button
                                                            isDestructive
                                                            isSmall
                                                            onClick={() => removeStep(index)}
                                                        >
                                                            {__('Remove Step', 'simple-invoice-generator')}
                                                        </Button>
                                                    </div>

                                                    <div className="ib-step-number" style={{ backgroundColor: stepNumberColor }}>
                                                        {index + 1}
                                                    </div>

                                                    <RichText
                                                        tagName="h3"
                                                        className="ib-step-title"
                                                        value={step.title}
                                                        onChange={(value) => updateStep(index, 'title', value)}
                                                        placeholder={__('Step title...', 'simple-invoice-generator')}
                                                    />

                                                    <RichText
                                                        tagName="p"
                                                        className="ib-step-description"
                                                        value={step.description}
                                                        onChange={(value) => updateStep(index, 'description', value)}
                                                        placeholder={__('Step description...', 'simple-invoice-generator')}
                                                    />

                                                    <div className="ib-step-features-editor">
                                                        <strong>{__('Features:', 'simple-invoice-generator')}</strong>
                                                        {step.features.map((feature, featureIndex) => (
                                                            <Flex key={featureIndex} style={{ marginBottom: '10px' }}>
                                                                <FlexItem>
                                                                    <TextControl
                                                                        value={feature}
                                                                        onChange={(value) => updateStepFeature(index, featureIndex, value)}
                                                                        placeholder={__('Feature description...', 'simple-invoice-generator')}
                                                                    />
                                                                </FlexItem>
                                                                <FlexItem>
                                                                    <Button
                                                                        isDestructive
                                                                        isSmall
                                                                        onClick={() => removeFeature(index, featureIndex)}
                                                                    >
                                                                        {__('Remove', 'simple-invoice-generator')}
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

                                                    <div className="ib-step-visual-settings">
                                                        <ToggleControl
                                                            label={__('Show Step Visual', 'simple-invoice-generator')}
                                                            checked={step.showVisual}
                                                            onChange={(value) => updateStep(index, 'showVisual', value)}
                                                        />
                                                    </div>

                                                    {step.showVisual && (
                                                        <div className="ib-step-image-editor">
                                                            <strong>{__('Step Visual:', 'simple-invoice-generator')}</strong>
                                                            <MediaUploadCheck>
                                                            <MediaUpload
                                                                onSelect={(media) => {
                                                                    updateStep(index, 'imageUrl', media.url);
                                                                    updateStep(index, 'imageId', media.id);
                                                                }}
                                                                allowedTypes={['image']}
                                                                value={step.imageId}
                                                                render={({ open }) => (
                                                                    <div style={{ marginTop: '10px' }}>
                                                                        {step.imageUrl ? (
                                                                            <div>
                                                                                <img 
                                                                                    src={step.imageUrl} 
                                                                                    alt={step.title}
                                                                                    style={{ width: '100%', maxHeight: '150px', objectFit: 'cover', borderRadius: '8px' }}
                                                                                />
                                                                                <div style={{ marginTop: '10px' }}>
                                                                                    <Button onClick={open} isSecondary isSmall>
                                                                                        {__('Replace Image', 'simple-invoice-generator')}
                                                                                    </Button>
                                                                                    <Button 
                                                                                        onClick={() => {
                                                                                            updateStep(index, 'imageUrl', '');
                                                                                            updateStep(index, 'imageId', null);
                                                                                        }}
                                                                                        isDestructive 
                                                                                        isSmall
                                                                                        style={{ marginLeft: '10px' }}
                                                                                    >
                                                                                        {__('Remove', 'simple-invoice-generator')}
                                                                                    </Button>
                                                                                </div>
                                                                            </div>
                                                                        ) : (
                                                                            <div className="ib-step-visual">
                                                                                <div className="ib-visual-placeholder">
                                                                                    <Button onClick={open} isPrimary>
                                                                                        {__('Upload Step Image', 'simple-invoice-generator')}
                                                                                    </Button>
                                                                                </div>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                )}
                                                            />
                                                        </MediaUploadCheck>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>

                    {showCta && (
                        <div className="ib-cta-section">
                            <RichText
                                tagName="a"
                                className="ib-cta-button"
                                value={ctaText}
                                onChange={(value) => setAttributes({ ctaText: value })}
                                placeholder={__('CTA button text...', 'simple-invoice-generator')}
                            />
                        </div>
                    )}
                </div>
            </section>
        </Fragment>
    );
}