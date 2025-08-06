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
    ToggleControl,
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
        proTipsBackgroundStart,
        proTipsBackgroundEnd,
        practiceGroups,
        showMistakes,
        mistakesTitle,
        mistakesDescription,
        mistakes,
        showProTips,
        proTipsTitle,
        proTipsContent,
        ctaText,
        ctaUrl,
        showIcons,
        topPadding,
        bottomPadding
    } = attributes;

    const blockProps = useBlockProps({
        className: 'ib-practices-section',
        style: {
            backgroundColor: backgroundColor,
            paddingTop: `${topPadding}px`,
            paddingBottom: `${bottomPadding}px`
        }
    });

    const updatePracticeGroup = (groupIndex, field, value) => {
        const newGroups = [...practiceGroups];
        newGroups[groupIndex] = { ...newGroups[groupIndex], [field]: value };
        setAttributes({ practiceGroups: newGroups });
    };

    const updatePractice = (groupIndex, practiceIndex, field, value) => {
        const newGroups = [...practiceGroups];
        const newPractices = [...newGroups[groupIndex].practices];
        newPractices[practiceIndex] = { ...newPractices[practiceIndex], [field]: value };
        newGroups[groupIndex] = { ...newGroups[groupIndex], practices: newPractices };
        setAttributes({ practiceGroups: newGroups });
    };

    const updatePracticeTip = (groupIndex, practiceIndex, tipIndex, value) => {
        const newGroups = [...practiceGroups];
        const newPractices = [...newGroups[groupIndex].practices];
        const newTips = [...newPractices[practiceIndex].tips];
        newTips[tipIndex] = value;
        newPractices[practiceIndex] = { ...newPractices[practiceIndex], tips: newTips };
        newGroups[groupIndex] = { ...newGroups[groupIndex], practices: newPractices };
        setAttributes({ practiceGroups: newGroups });
    };

    const addPracticeGroup = () => {
        const newGroup = {
            icon: '📋',
            title: 'New Practice Group',
            description: 'Essential practices that will help you maintain professionalism and get paid faster.',
            useImage: false,
            imageUrl: '',
            imageId: null,
            practices: [
                {
                    icon: '✨',
                    title: 'New Practice',
                    content: 'Add practice description here...',
                    useImage: false,
                    imageUrl: '',
                    imageId: null,
                    tips: ['Tip 1', 'Tip 2']
                }
            ]
        };
        setAttributes({ practiceGroups: [...practiceGroups, newGroup] });
    };

    const removePracticeGroup = (index) => {
        const newGroups = practiceGroups.filter((_, i) => i !== index);
        setAttributes({ practiceGroups: newGroups });
    };

    const addPractice = (groupIndex) => {
        const newGroups = [...practiceGroups];
        const newPractice = {
            icon: '✨',
            title: 'New Practice',
            content: 'Add practice description here...',
            useImage: false,
            imageUrl: '',
            imageId: null,
            tips: ['Tip 1', 'Tip 2']
        };
        newGroups[groupIndex].practices.push(newPractice);
        setAttributes({ practiceGroups: newGroups });
    };

    const removePractice = (groupIndex, practiceIndex) => {
        const newGroups = [...practiceGroups];
        newGroups[groupIndex].practices = newGroups[groupIndex].practices.filter((_, i) => i !== practiceIndex);
        setAttributes({ practiceGroups: newGroups });
    };

    const addTip = (groupIndex, practiceIndex) => {
        const newGroups = [...practiceGroups];
        newGroups[groupIndex].practices[practiceIndex].tips.push('New tip');
        setAttributes({ practiceGroups: newGroups });
    };

    const removeTip = (groupIndex, practiceIndex, tipIndex) => {
        const newGroups = [...practiceGroups];
        newGroups[groupIndex].practices[practiceIndex].tips = newGroups[groupIndex].practices[practiceIndex].tips.filter((_, i) => i !== tipIndex);
        setAttributes({ practiceGroups: newGroups });
    };

    const updateMistake = (index, field, value) => {
        const newMistakes = [...mistakes];
        newMistakes[index] = { ...newMistakes[index], [field]: value };
        setAttributes({ mistakes: newMistakes });
    };

    const addMistake = () => {
        const newMistake = {
            title: 'New Mistake',
            description: 'Add mistake description here...'
        };
        setAttributes({ mistakes: [...mistakes, newMistake] });
    };

    const removeMistake = (index) => {
        const newMistakes = mistakes.filter((_, i) => i !== index);
        setAttributes({ mistakes: newMistakes });
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

                {showProTips && (
                    <PanelColorSettings
                        title={__('Pro Tips Colors', 'simple-invoice-generator')}
                        colorSettings={[
                            {
                                value: proTipsBackgroundStart,
                                onChange: (color) => setAttributes({ proTipsBackgroundStart: color }),
                                label: __('Pro Tips Background Start', 'simple-invoice-generator')
                            },
                            {
                                value: proTipsBackgroundEnd,
                                onChange: (color) => setAttributes({ proTipsBackgroundEnd: color }),
                                label: __('Pro Tips Background End', 'simple-invoice-generator')
                            }
                        ]}
                    />
                )}

                <PanelBody title={__('Section Toggles', 'simple-invoice-generator')}>
                    <ToggleControl
                        label={__('Show Icons', 'simple-invoice-generator')}
                        help={__('Show or hide icons for practice groups and individual practices', 'simple-invoice-generator')}
                        checked={showIcons}
                        onChange={(value) => setAttributes({ showIcons: value })}
                    />
                    <ToggleControl
                        label={__('Show Mistakes Section', 'simple-invoice-generator')}
                        checked={showMistakes}
                        onChange={(value) => setAttributes({ showMistakes: value })}
                    />
                    <ToggleControl
                        label={__('Show Pro Tips Section', 'simple-invoice-generator')}
                        checked={showProTips}
                        onChange={(value) => setAttributes({ showProTips: value })}
                    />
                </PanelBody>

                {showProTips && (
                    <PanelBody title={__('Pro Tips Settings', 'simple-invoice-generator')}>
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
                    </PanelBody>
                )}

                <PanelBody title={__('Content Management', 'simple-invoice-generator')} initialOpen={false}>
                    <Button isPrimary onClick={addPracticeGroup}>
                        {__('Add Practice Group', 'simple-invoice-generator')}
                    </Button>
                    {showMistakes && (
                        <Button isPrimary onClick={addMistake} style={{ marginLeft: '10px' }}>
                            {__('Add Mistake', 'simple-invoice-generator')}
                        </Button>
                    )}
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

                    <div className="ib-practices-container">
                        {practiceGroups.map((group, groupIndex) => (
                            <div key={groupIndex} className="ib-practice-group">
                                <div className="ib-group-controls">
                                    <Button
                                        isDestructive
                                        isSmall
                                        onClick={() => removePracticeGroup(groupIndex)}
                                    >
                                        {__('Remove Group', 'simple-invoice-generator')}
                                    </Button>
                                </div>

                                <div className="ib-group-header" style={{ textAlign: 'center' }}>
                                    <RichText
                                        tagName="h3"
                                        className="ib-group-title"
                                        value={group.title}
                                        onChange={(value) => updatePracticeGroup(groupIndex, 'title', value)}
                                        placeholder={__('Group title...', 'simple-invoice-generator')}
                                    />
                                    <RichText
                                        tagName="p"
                                        className="ib-group-description"
                                        value={group.description || 'Essential practices that will help you maintain professionalism and get paid faster.'}
                                        onChange={(value) => updatePracticeGroup(groupIndex, 'description', value)}
                                        placeholder={__('Group description...', 'simple-invoice-generator')}
                                        style={{ color: '#666', margin: '10px auto 20px', maxWidth: '750px' }}
                                    />
                                </div>

                                <div className="ib-practices-grid">
                                    {group.practices.map((practice, practiceIndex) => (
                                        <div key={practiceIndex} className="ib-practice-card">
                                            <div className="ib-practice-controls">
                                                <Button
                                                    isDestructive
                                                    isSmall
                                                    onClick={() => removePractice(groupIndex, practiceIndex)}
                                                >
                                                    {__('Remove', 'simple-invoice-generator')}
                                                </Button>
                                            </div>

                                            <div className="ib-practice-header">
                                                {showIcons && (
                                                    <div className="ib-practice-icon-section">
                                                        <ToggleControl
                                                            label={__('Use Image for Practice Icon', 'simple-invoice-generator')}
                                                            checked={practice.useImage || false}
                                                            onChange={(value) => updatePractice(groupIndex, practiceIndex, 'useImage', value)}
                                                        />
                                                        
                                                        {practice.useImage ? (
                                                        <MediaUploadCheck>
                                                            <MediaUpload
                                                                onSelect={(media) => {
                                                                    updatePractice(groupIndex, practiceIndex, 'imageUrl', media.url);
                                                                    updatePractice(groupIndex, practiceIndex, 'imageId', media.id);
                                                                }}
                                                                allowedTypes={['image']}
                                                                value={practice.imageId}
                                                                render={({ open }) => (
                                                                    <div className="ib-practice-image-upload">
                                                                        {practice.imageUrl ? (
                                                                            <div>
                                                                                <span 
                                                                                    className="ib-practice-icon ib-practice-icon-image"
                                                                                    style={{ color: accentColor }}
                                                                                >
                                                                                    <img 
                                                                                        src={practice.imageUrl} 
                                                                                        alt="Practice icon"
                                                                                        style={{ width: '24px', height: '24px', objectFit: 'cover', borderRadius: '4px' }}
                                                                                    />
                                                                                </span>
                                                                                <div style={{ marginLeft: '10px' }}>
                                                                                    <Button onClick={open} isSecondary isSmall>
                                                                                        {__('Replace', 'simple-invoice-generator')}
                                                                                    </Button>
                                                                                    <Button 
                                                                                        onClick={() => {
                                                                                            updatePractice(groupIndex, practiceIndex, 'imageUrl', '');
                                                                                            updatePractice(groupIndex, practiceIndex, 'imageId', null);
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
                                                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                                                <span 
                                                                                    className="ib-practice-icon ib-practice-icon-placeholder"
                                                                                    style={{ color: accentColor }}
                                                                                >
                                                                                    📷
                                                                                </span>
                                                                                <Button onClick={open} isPrimary isSmall>
                                                                                    {__('Upload Image', 'simple-invoice-generator')}
                                                                                </Button>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                )}
                                                            />
                                                        </MediaUploadCheck>
                                                    ) : (
                                                        <TextControl
                                                            className="ib-practice-icon-input"
                                                            value={practice.icon}
                                                            onChange={(value) => updatePractice(groupIndex, practiceIndex, 'icon', value)}
                                                            placeholder="✨"
                                                            label={__('Icon (emoji)', 'simple-invoice-generator')}
                                                        />
                                                    )}
                                                    </div>
                                                )}
                                                
                                                <div className="ib-practice-title">
                                                    <RichText
                                                        tagName="span"
                                                        value={practice.title}
                                                        onChange={(value) => updatePractice(groupIndex, practiceIndex, 'title', value)}
                                                        placeholder={__('Practice title...', 'simple-invoice-generator')}
                                                    />
                                                </div>
                                            </div>

                                            <RichText
                                                tagName="p"
                                                className="ib-practice-content"
                                                value={practice.content}
                                                onChange={(value) => updatePractice(groupIndex, practiceIndex, 'content', value)}
                                                placeholder={__('Practice description...', 'simple-invoice-generator')}
                                            />

                                            <div className="ib-practice-tips">
                                                <strong>{__('Tips:', 'simple-invoice-generator')}</strong>
                                                {practice.tips.map((tip, tipIndex) => (
                                                    <Flex key={tipIndex} style={{ marginBottom: '10px' }}>
                                                        <FlexItem>
                                                            <TextControl
                                                                value={tip}
                                                                onChange={(value) => updatePracticeTip(groupIndex, practiceIndex, tipIndex, value)}
                                                                placeholder={__('Tip...', 'simple-invoice-generator')}
                                                            />
                                                        </FlexItem>
                                                        <FlexItem>
                                                            <Button
                                                                isDestructive
                                                                isSmall
                                                                onClick={() => removeTip(groupIndex, practiceIndex, tipIndex)}
                                                            >
                                                                {__('×', 'simple-invoice-generator')}
                                                            </Button>
                                                        </FlexItem>
                                                    </Flex>
                                                ))}
                                                <Button
                                                    isSecondary
                                                    isSmall
                                                    onClick={() => addTip(groupIndex, practiceIndex)}
                                                >
                                                    {__('Add Tip', 'simple-invoice-generator')}
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <Button
                                    isSecondary
                                    onClick={() => addPractice(groupIndex)}
                                    style={{ marginTop: '20px' }}
                                >
                                    {__('Add Practice to Group', 'simple-invoice-generator')}
                                </Button>
                            </div>
                        ))}

                        {showMistakes && (
                            <div className="ib-mistakes-section">
                                <div className="ib-mistakes-header" style={{ textAlign: 'center' }}>
                                    <RichText
                                        tagName="h3"
                                        className="ib-mistakes-title"
                                        value={mistakesTitle}
                                        onChange={(value) => setAttributes({ mistakesTitle: value })}
                                        placeholder={__('Mistakes section title...', 'simple-invoice-generator')}
                                    />
                                    <RichText
                                        tagName="p"
                                        className="ib-mistakes-description"
                                        value={mistakesDescription || 'Avoid these common pitfalls that can delay payments and damage your professional reputation.'}
                                        onChange={(value) => setAttributes({ mistakesDescription: value })}
                                        placeholder={__('Mistakes section description...', 'simple-invoice-generator')}
                                        style={{ color: '#666', margin: '10px auto 20px', maxWidth: '750px' }}
                                    />
                                </div>

                                <div className="ib-mistakes-grid">
                                    {mistakes.map((mistake, index) => (
                                        <div key={index} className="ib-mistake-item">
                                            <div className="ib-mistake-controls">
                                                <Button
                                                    isDestructive
                                                    isSmall
                                                    onClick={() => removeMistake(index)}
                                                >
                                                    {__('×', 'simple-invoice-generator')}
                                                </Button>
                                            </div>

                                            <div>
                                                <RichText
                                                    tagName="strong"
                                                    value={mistake.title}
                                                    onChange={(value) => updateMistake(index, 'title', value)}
                                                    placeholder={__('Mistake title...', 'simple-invoice-generator')}
                                                />
                                                <RichText
                                                    tagName="p"
                                                    className="ib-mistake-text"
                                                    value={mistake.description}
                                                    onChange={(value) => updateMistake(index, 'description', value)}
                                                    placeholder={__('Mistake description...', 'simple-invoice-generator')}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {showProTips && (
                            <div 
                                className="ib-pro-tips"
                                style={{ background: `linear-gradient(135deg, ${proTipsBackgroundStart} 0%, ${proTipsBackgroundEnd} 100%)` }}
                            >
                                <RichText
                                    tagName="h3"
                                    className="ib-pro-tips-title"
                                    value={proTipsTitle}
                                    onChange={(value) => setAttributes({ proTipsTitle: value })}
                                    placeholder={__('Pro tips title...', 'simple-invoice-generator')}
                                />
                                <RichText
                                    tagName="p"
                                    className="ib-pro-tips-content"
                                    value={proTipsContent}
                                    onChange={(value) => setAttributes({ proTipsContent: value })}
                                    placeholder={__('Pro tips content...', 'simple-invoice-generator')}
                                />
                                <a href={ctaUrl} className="ib-download-guide-btn">
                                    {ctaText}
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </Fragment>
    );
}