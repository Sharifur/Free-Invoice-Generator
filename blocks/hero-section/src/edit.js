import { __ } from '@wordpress/i18n';
import {
    useBlockProps,
    RichText,
    InspectorControls,
    MediaUpload,
    MediaUploadCheck,
    PanelColorSettings,
    URLInput
} from '@wordpress/block-editor';
import {
    PanelBody,
    PanelRow,
    TextControl,
    Button,
    IconButton,
    Placeholder,
    TextareaControl,
    SelectControl,
    RangeControl
} from '@wordpress/components';
import { Fragment } from '@wordpress/element';

// Green checkmark SVG icon component
const GreenCheckIcon = () => (
    <svg className="ib-trust-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="12" fill="#10B981"/>
        <path d="M8.5 12.5L10.5 14.5L15.5 9.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export default function Edit({ attributes, setAttributes }) {
    const {
        title,
        subtitle,
        backgroundType,
        backgroundColor,
        gradientColor1,
        gradientColor2,
        gradientDirection,
        titleColor,
        subtitleColor,
        trustSignalColor,
        buttonText,
        buttonLink,
        trustSignals,
        previewCards,
        topPadding,
        bottomPadding
    } = attributes;

    const getBackgroundStyle = () => {
        if (backgroundType === 'gradient') {
            return `linear-gradient(${gradientDirection}deg, ${gradientColor1} 0%, ${gradientColor2} 100%)`;
        }
        return backgroundColor;
    };

    const blockProps = useBlockProps({
        className: 'ib-hero-section',
        style: {
            background: getBackgroundStyle(),
            paddingTop: `${topPadding}px`,
            paddingBottom: `${bottomPadding}px`
        }
    });

    const updateTrustSignal = (index, field, value) => {
        const newTrustSignals = [...trustSignals];
        newTrustSignals[index] = { ...newTrustSignals[index], [field]: value };
        setAttributes({ trustSignals: newTrustSignals });
    };

    const updatePreviewCard = (index, field, value) => {
        const newPreviewCards = [...previewCards];
        newPreviewCards[index] = { ...newPreviewCards[index], [field]: value };
        setAttributes({ previewCards: newPreviewCards });
    };

    const addTrustSignal = () => {
        const newTrustSignals = [...trustSignals, { text: '' }];
        setAttributes({ trustSignals: newTrustSignals });
    };

    const removeTrustSignal = (index) => {
        const newTrustSignals = trustSignals.filter((_, i) => i !== index);
        setAttributes({ trustSignals: newTrustSignals });
    };

    const addPreviewCard = () => {
        const newPreviewCards = [...previewCards, { label: '', headerColor: '#f5f5f5', imageUrl: '', imageId: null }];
        setAttributes({ previewCards: newPreviewCards });
    };

    const removePreviewCard = (index) => {
        const newPreviewCards = previewCards.filter((_, i) => i !== index);
        setAttributes({ previewCards: newPreviewCards });
    };

    return (
        <Fragment>
            <InspectorControls>
                <PanelBody title={__('Hero Settings', 'simple-invoice-generator')}>
                    <TextControl
                        label={__('Button Link', 'simple-invoice-generator')}
                        value={buttonLink}
                        onChange={(value) => setAttributes({ buttonLink: value })}
                    />
                </PanelBody>

                <PanelBody title={__('Background Settings', 'simple-invoice-generator')}>
                    <SelectControl
                        label={__('Background Type', 'simple-invoice-generator')}
                        value={backgroundType}
                        options={[
                            { label: __('Solid Color', 'simple-invoice-generator'), value: 'solid' },
                            { label: __('Gradient', 'simple-invoice-generator'), value: 'gradient' }
                        ]}
                        onChange={(value) => setAttributes({ backgroundType: value })}
                    />
                    
                    {backgroundType === 'solid' && (
                        <PanelColorSettings
                            colorSettings={[
                                {
                                    value: backgroundColor,
                                    onChange: (color) => setAttributes({ backgroundColor: color }),
                                    label: __('Background Color', 'simple-invoice-generator')
                                }
                            ]}
                        />
                    )}
                    
                    {backgroundType === 'gradient' && (
                        <Fragment>
                            <PanelColorSettings
                                colorSettings={[
                                    {
                                        value: gradientColor1,
                                        onChange: (color) => setAttributes({ gradientColor1: color }),
                                        label: __('Gradient Start Color', 'simple-invoice-generator')
                                    },
                                    {
                                        value: gradientColor2,
                                        onChange: (color) => setAttributes({ gradientColor2: color }),
                                        label: __('Gradient End Color', 'simple-invoice-generator')
                                    }
                                ]}
                            />
                            <RangeControl
                                label={__('Gradient Direction (degrees)', 'simple-invoice-generator')}
                                value={gradientDirection}
                                onChange={(value) => setAttributes({ gradientDirection: value })}
                                min={0}
                                max={360}
                                step={1}
                            />
                        </Fragment>
                    )}
                </PanelBody>

                <PanelColorSettings
                    title={__('Text Colors', 'simple-invoice-generator')}
                    colorSettings={[
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
                            value: trustSignalColor,
                            onChange: (color) => setAttributes({ trustSignalColor: color }),
                            label: __('Trust Signals Color', 'simple-invoice-generator')
                        }
                    ]}
                />

                <PanelBody title={__('Trust Signals', 'simple-invoice-generator')} initialOpen={false}>
                    {trustSignals.map((signal, index) => (
                        <div key={index} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ddd' }}>
                            <TextControl
                                label={__('Text', 'simple-invoice-generator')}
                                value={signal.text}
                                onChange={(value) => updateTrustSignal(index, 'text', value)}
                            />
                            <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <GreenCheckIcon />
                                <span style={{ color: '#666', fontSize: '14px' }}>{__('Fixed green checkmark icon', 'simple-invoice-generator')}</span>
                            </div>
                            <Button
                                isDestructive
                                isSmall
                                onClick={() => removeTrustSignal(index)}
                            >
                                {__('Remove Trust Signal', 'simple-invoice-generator')}
                            </Button>
                        </div>
                    ))}
                    <Button isPrimary onClick={addTrustSignal}>
                        {__('Add Trust Signal', 'simple-invoice-generator')}
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

                <PanelBody title={__('Preview Cards', 'simple-invoice-generator')} initialOpen={false}>
                    {previewCards.map((card, index) => (
                        <div key={index} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ddd' }}>
                            <TextControl
                                label={__('Label', 'simple-invoice-generator')}
                                value={card.label}
                                onChange={(value) => updatePreviewCard(index, 'label', value)}
                            />
                            <PanelColorSettings
                                colorSettings={[
                                    {
                                        value: card.headerColor,
                                        onChange: (color) => updatePreviewCard(index, 'headerColor', color),
                                        label: __('Header Color', 'simple-invoice-generator')
                                    }
                                ]}
                            />
                            <div style={{ marginBottom: '10px' }}>
                                <strong>{__('Layout Image', 'simple-invoice-generator')}</strong>
                                <MediaUploadCheck>
                                    <MediaUpload
                                        onSelect={(media) => {
                                            updatePreviewCard(index, 'imageUrl', media.url);
                                            updatePreviewCard(index, 'imageId', media.id);
                                        }}
                                        allowedTypes={['image']}
                                        value={card.imageId}
                                        render={({ open }) => (
                                            <div>
                                                {card.imageUrl ? (
                                                    <div style={{ marginBottom: '10px' }}>
                                                        <img 
                                                            src={card.imageUrl} 
                                                            alt={card.label}
                                                            style={{ width: '100px', height: '60px', objectFit: 'cover', borderRadius: '4px' }}
                                                        />
                                                        <div>
                                                            <Button
                                                                onClick={open}
                                                                isSecondary
                                                                isSmall
                                                            >
                                                                {__('Replace Image', 'simple-invoice-generator')}
                                                            </Button>
                                                            <Button
                                                                onClick={() => {
                                                                    updatePreviewCard(index, 'imageUrl', '');
                                                                    updatePreviewCard(index, 'imageId', null);
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
                                                    <Button
                                                        onClick={open}
                                                        isPrimary
                                                    >
                                                        {__('Upload Layout Image', 'simple-invoice-generator')}
                                                    </Button>
                                                )}
                                            </div>
                                        )}
                                    />
                                </MediaUploadCheck>
                            </div>
                            <Button
                                isDestructive
                                isSmall
                                onClick={() => removePreviewCard(index)}
                            >
                                {__('Remove Preview Card', 'simple-invoice-generator')}
                            </Button>
                        </div>
                    ))}
                    <Button isPrimary onClick={addPreviewCard}>
                        {__('Add Preview Card', 'simple-invoice-generator')}
                    </Button>
                </PanelBody>
            </InspectorControls>

            <section {...blockProps}>
                <div className="ib-hero-container">
                    <div className="ib-hero-content">
                        <RichText
                            tagName="h1"
                            className="ib-hero-title"
                            value={title}
                            onChange={(value) => setAttributes({ title: value })}
                            placeholder={__('Enter hero title...', 'simple-invoice-generator')}
                            style={{ color: titleColor }}
                        />
                        <RichText
                            tagName="p"
                            className="ib-hero-subtitle"
                            value={subtitle}
                            onChange={(value) => setAttributes({ subtitle: value })}
                            placeholder={__('Enter hero subtitle...', 'simple-invoice-generator')}
                            style={{ color: subtitleColor }}
                        />
                        
                        <div className="ib-trust-signals" style={{ color: trustSignalColor }}>
                            {trustSignals.map((signal, index) => (
                                <div key={index} className="ib-trust-item">
                                    <GreenCheckIcon />
                                    <span>{signal.text}</span>
                                </div>
                            ))}
                        </div>
                        
                        <RichText
                            tagName="a"
                            className="ib-cta-button"
                            value={buttonText}
                            onChange={(value) => setAttributes({ buttonText: value })}
                            placeholder={__('Button text...', 'simple-invoice-generator')}
                        />
                    </div>
                    
                    <div className="ib-hero-preview">
                        {previewCards.map((card, index) => (
                            <div key={index} className="ib-preview-card">
                                {card.imageUrl ? (
                                    <div className="ib-preview-image">
                                        <img 
                                            src={card.imageUrl} 
                                            alt={card.label}
                                            style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px' }}
                                        />
                                    </div>
                                ) : (
                                    <div>
                                        <div className="ib-preview-header" style={{ backgroundColor: card.headerColor }}></div>
                                        <div className="ib-preview-lines">
                                            <div className="ib-preview-line"></div>
                                            <div className="ib-preview-line"></div>
                                            <div className="ib-preview-line"></div>
                                        </div>
                                    </div>
                                )}
                                <p className="ib-preview-label">{card.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </Fragment>
    );
}