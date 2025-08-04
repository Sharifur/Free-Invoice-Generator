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
        backgroundColor,
        gradientColor,
        accentColor,
        benefits,
        showHighlight,
        highlightTitle,
        highlightSubtitle,
        stats,
        ctaText,
        ctaUrl,
        showIcons,
        topPadding,
        bottomPadding
    } = attributes;

    const blockProps = useBlockProps({
        className: 'ib-benefits-section',
        style: {
            background: `linear-gradient(135deg, ${backgroundColor} 0%, ${gradientColor} 100%)`,
            paddingTop: `${topPadding}px`,
            paddingBottom: `${bottomPadding}px`
        }
    });

    const updateBenefit = (index, field, value) => {
        const newBenefits = [...benefits];
        newBenefits[index] = { ...newBenefits[index], [field]: value };
        setAttributes({ benefits: newBenefits });
    };

    const addBenefit = () => {
        const newBenefit = {
            icon: '✨',
            title: 'New Benefit',
            description: 'Add benefit description here...',
            useImage: false,
            imageUrl: '',
            imageId: null
        };
        setAttributes({ benefits: [...benefits, newBenefit] });
    };

    const removeBenefit = (index) => {
        const newBenefits = benefits.filter((_, i) => i !== index);
        setAttributes({ benefits: newBenefits });
    };

    const updateStat = (index, field, value) => {
        const newStats = [...stats];
        newStats[index] = { ...newStats[index], [field]: value };
        setAttributes({ stats: newStats });
    };

    const addStat = () => {
        const newStat = {
            number: '0',
            label: 'New Stat'
        };
        setAttributes({ stats: [...stats, newStat] });
    };

    const removeStat = (index) => {
        const newStats = stats.filter((_, i) => i !== index);
        setAttributes({ stats: newStats });
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
                            label: __('Background Start Color', 'simple-invoice-generator')
                        },
                        {
                            value: gradientColor,
                            onChange: (color) => setAttributes({ gradientColor: color }),
                            label: __('Background End Color', 'simple-invoice-generator')
                        },
                        {
                            value: accentColor,
                            onChange: (color) => setAttributes({ accentColor: color }),
                            label: __('Accent Color', 'simple-invoice-generator')
                        }
                    ]}
                />

                <PanelBody title={__('Display Settings', 'simple-invoice-generator')}>
                    <ToggleControl
                        label={__('Show Icons', 'simple-invoice-generator')}
                        help={__('Show or hide icons for each benefit', 'simple-invoice-generator')}
                        checked={showIcons}
                        onChange={(value) => setAttributes({ showIcons: value })}
                    />
                    <ToggleControl
                        label={__('Show Highlight Section', 'simple-invoice-generator')}
                        help={__('Show or hide the "Join Thousands of Happy Users" section', 'simple-invoice-generator')}
                        checked={showHighlight}
                        onChange={(value) => setAttributes({ showHighlight: value })}
                    />
                    {showHighlight && (
                        <>
                            <TextControl
                                label={__('CTA Button Text', 'simple-invoice-generator')}
                                value={ctaText}
                                onChange={(value) => setAttributes({ ctaText: value })}
                            />
                            <URLInput
                                label={__('CTA URL', 'simple-invoice-generator')}
                                value={ctaUrl}
                                onChange={(value) => setAttributes({ ctaUrl: value })}
                            />
                        </>
                    )}
                </PanelBody>

                <PanelBody title={__('Benefits Management', 'simple-invoice-generator')} initialOpen={false}>
                    <Button isPrimary onClick={addBenefit}>
                        {__('Add New Benefit', 'simple-invoice-generator')}
                    </Button>
                </PanelBody>

                {showHighlight && (
                    <PanelBody title={__('Stats Management', 'simple-invoice-generator')} initialOpen={false}>
                        <Button isPrimary onClick={addStat}>
                            {__('Add New Stat', 'simple-invoice-generator')}
                        </Button>
                    </PanelBody>
                )}

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

                    <div className="ib-benefits-grid">
                        {benefits.map((benefit, index) => (
                            <div key={index} className="ib-benefit-card">
                                <div className="ib-benefit-controls">
                                    <Button
                                        isDestructive
                                        isSmall
                                        onClick={() => removeBenefit(index)}
                                    >
                                        {__('Remove', 'simple-invoice-generator')}
                                    </Button>
                                </div>

                                {showIcons && (
                                    <div className="ib-benefit-icon-section">
                                        <ToggleControl
                                            label={__('Use Image Instead of Icon', 'simple-invoice-generator')}
                                            checked={benefit.useImage || false}
                                            onChange={(value) => updateBenefit(index, 'useImage', value)}
                                        />
                                        
                                        {benefit.useImage ? (
                                        <MediaUploadCheck>
                                            <MediaUpload
                                                onSelect={(media) => {
                                                    updateBenefit(index, 'imageUrl', media.url);
                                                    updateBenefit(index, 'imageId', media.id);
                                                }}
                                                allowedTypes={['image']}
                                                value={benefit.imageId}
                                                render={({ open }) => (
                                                    <div className="ib-benefit-image-upload">
                                                        {benefit.imageUrl ? (
                                                            <div>
                                                                <div 
                                                                    className="ib-benefit-icon ib-benefit-icon-image"
                                                                    style={{ background: `linear-gradient(135deg, ${accentColor} 0%, #764ba2 100%)` }}
                                                                >
                                                                    <img 
                                                                        src={benefit.imageUrl} 
                                                                        alt="Benefit icon"
                                                                        style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }}
                                                                    />
                                                                </div>
                                                                <div style={{ marginTop: '10px' }}>
                                                                    <Button onClick={open} isSecondary isSmall>
                                                                        {__('Replace Image', 'simple-invoice-generator')}
                                                                    </Button>
                                                                    <Button 
                                                                        onClick={() => {
                                                                            updateBenefit(index, 'imageUrl', '');
                                                                            updateBenefit(index, 'imageId', null);
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
                                                            <div>
                                                                <div 
                                                                    className="ib-benefit-icon ib-benefit-icon-placeholder"
                                                                    style={{ background: `linear-gradient(135deg, ${accentColor} 0%, #764ba2 100%)` }}
                                                                >
                                                                    📷
                                                                </div>
                                                                <Button onClick={open} isPrimary isSmall style={{ marginTop: '10px' }}>
                                                                    {__('Upload Image', 'simple-invoice-generator')}
                                                                </Button>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            />
                                        </MediaUploadCheck>
                                    ) : (
                                        <div 
                                            className="ib-benefit-icon" 
                                            style={{ background: `linear-gradient(135deg, ${accentColor} 0%, #764ba2 100%)` }}
                                        >
                                            <TextControl
                                                value={benefit.icon}
                                                onChange={(value) => updateBenefit(index, 'icon', value)}
                                                placeholder="🎯"
                                                label={__('Icon (emoji)', 'simple-invoice-generator')}
                                                style={{ fontSize: '32px', textAlign: 'center', border: 'none', background: 'transparent', color: '#fff' }}
                                            />
                                        </div>
                                    )}
                                    </div>
                                )}

                                <div className="ib-benefit-title">
                                    <RichText
                                        tagName="h3"
                                        value={benefit.title}
                                        onChange={(value) => updateBenefit(index, 'title', value)}
                                        placeholder={__('Benefit title...', 'simple-invoice-generator')}
                                    />
                                </div>

                                <RichText
                                    tagName="p"
                                    className="ib-benefit-description"
                                    value={benefit.description}
                                    onChange={(value) => updateBenefit(index, 'description', value)}
                                    placeholder={__('Benefit description...', 'simple-invoice-generator')}
                                />
                            </div>
                        ))}
                    </div>

                    {showHighlight && (
                        <div className="ib-highlight-box" style={{ borderColor: accentColor }}>
                            <RichText
                                tagName="h3"
                                className="ib-highlight-title"
                                value={highlightTitle}
                                onChange={(value) => setAttributes({ highlightTitle: value })}
                                placeholder={__('Highlight title...', 'simple-invoice-generator')}
                            />
                            <RichText
                                tagName="p"
                                className="ib-highlight-subtitle"
                                value={highlightSubtitle}
                                onChange={(value) => setAttributes({ highlightSubtitle: value })}
                                placeholder={__('Highlight subtitle...', 'simple-invoice-generator')}
                            />

                            <div className="ib-stats-grid">
                                {stats.map((stat, index) => (
                                    <div key={index} className="ib-stat-item">
                                        <div className="ib-stat-controls">
                                            <Button
                                                isDestructive
                                                isSmall
                                                onClick={() => removeStat(index)}
                                            >
                                                {__('×', 'simple-invoice-generator')}
                                            </Button>
                                        </div>

                                        <RichText
                                            tagName="div"
                                            className="ib-stat-number"
                                            style={{ color: accentColor }}
                                            value={stat.number}
                                            onChange={(value) => updateStat(index, 'number', value)}
                                            placeholder={__('0', 'simple-invoice-generator')}
                                        />
                                        <RichText
                                            tagName="div"
                                            className="ib-stat-label"
                                            value={stat.label}
                                            onChange={(value) => updateStat(index, 'label', value)}
                                            placeholder={__('Stat label...', 'simple-invoice-generator')}
                                        />
                                    </div>
                                ))}
                            </div>

                            <div className="ib-cta-button-wrapper">
                                <a 
                                    href={ctaUrl} 
                                    className="ib-cta-button"
                                    style={{ background: `linear-gradient(135deg, ${accentColor} 0%, #764ba2 100%)` }}
                                >
                                    {ctaText}
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </Fragment>
    );
}