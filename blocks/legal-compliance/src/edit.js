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
    SelectControl,
    RangeControl
} from '@wordpress/components';
import { Fragment, useState } from '@wordpress/element';

export default function Edit({ attributes, setAttributes }) {
    const {
        title,
        subtitle,
        backgroundColor,
        gradientEndColor,
        accentColor,
        essentialElements,
        essentialsSectionTitle,
        taxRegions,
        taxSectionTitle,
        internationalCards,
        internationalSectionTitle,
        checklist,
        checklistSectionTitle,
        showCTA,
        ctaText,
        ctaUrl,
        ctaDescription,
        ctaSectionBackgroundColor,
        ctaTextColor,
        ctaButtonBackgroundColor,
        ctaButtonHoverColor,
        ctaButtonTextColor,
        topPadding,
        bottomPadding
    } = attributes;

    const [activeTab, setActiveTab] = useState('us');

    const blockProps = useBlockProps({
        className: 'ib-legal-section',
        style: {
            background: `linear-gradient(to bottom, ${backgroundColor}, ${gradientEndColor})`,
            paddingTop: `${topPadding}px`,
            paddingBottom: `${bottomPadding}px`
        }
    });

    // Essential Elements functions
    const updateEssentialElement = (index, field, value) => {
        const newElements = [...essentialElements];
        newElements[index] = { ...newElements[index], [field]: value };
        setAttributes({ essentialElements: newElements });
    };

    const addEssentialElement = () => {
        const newElement = {
            number: (essentialElements.length + 1).toString(),
            name: 'New Element',
            description: 'Add description here...'
        };
        setAttributes({ essentialElements: [...essentialElements, newElement] });
    };

    const removeEssentialElement = (index) => {
        const newElements = essentialElements.filter((_, i) => i !== index);
        setAttributes({ essentialElements: newElements });
    };

    // Tax Region functions
    const updateTaxRegion = (index, field, value) => {
        const newRegions = [...taxRegions];
        newRegions[index] = { ...newRegions[index], [field]: value };
        setAttributes({ taxRegions: newRegions });
    };

    const updateRequirement = (regionIndex, reqIndex, value) => {
        const newRegions = [...taxRegions];
        const newRequirements = [...newRegions[regionIndex].requirements];
        newRequirements[reqIndex] = value;
        newRegions[regionIndex] = { ...newRegions[regionIndex], requirements: newRequirements };
        setAttributes({ taxRegions: newRegions });
    };

    const addTaxRegion = () => {
        const newRegion = {
            id: 'new-region',
            name: 'New Region',
            title: 'New Region Requirements',
            requirements: ['Requirement 1', 'Requirement 2']
        };
        setAttributes({ taxRegions: [...taxRegions, newRegion] });
    };

    const removeTaxRegion = (index) => {
        const newRegions = taxRegions.filter((_, i) => i !== index);
        setAttributes({ taxRegions: newRegions });
        if (activeTab === taxRegions[index].id) {
            setActiveTab(newRegions[0]?.id || 'us');
        }
    };

    const addRequirement = (regionIndex) => {
        const newRegions = [...taxRegions];
        newRegions[regionIndex].requirements.push('New requirement');
        setAttributes({ taxRegions: newRegions });
    };

    const removeRequirement = (regionIndex, reqIndex) => {
        const newRegions = [...taxRegions];
        newRegions[regionIndex].requirements = newRegions[regionIndex].requirements.filter((_, i) => i !== reqIndex);
        setAttributes({ taxRegions: newRegions });
    };

    // International Cards functions
    const updateInternationalCard = (index, field, value) => {
        const newCards = [...internationalCards];
        newCards[index] = { ...newCards[index], [field]: value };
        setAttributes({ internationalCards: newCards });
    };

    const addInternationalCard = () => {
        const newCard = {
            flag: '🌍',
            name: 'New Region',
            requirement: 'Add requirement here...'
        };
        setAttributes({ internationalCards: [...internationalCards, newCard] });
    };

    const removeInternationalCard = (index) => {
        const newCards = internationalCards.filter((_, i) => i !== index);
        setAttributes({ internationalCards: newCards });
    };

    // Checklist functions
    const updateChecklistItem = (index, value) => {
        const newChecklist = [...checklist];
        newChecklist[index] = value;
        setAttributes({ checklist: newChecklist });
    };

    const addChecklistItem = () => {
        setAttributes({ checklist: [...checklist, 'New checklist item'] });
    };

    const removeChecklistItem = (index) => {
        const newChecklist = checklist.filter((_, i) => i !== index);
        setAttributes({ checklist: newChecklist });
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
                            value: gradientEndColor,
                            onChange: (color) => setAttributes({ gradientEndColor: color }),
                            label: __('Background End Color', 'simple-invoice-generator')
                        },
                        {
                            value: accentColor,
                            onChange: (color) => setAttributes({ accentColor: color }),
                            label: __('Accent Color', 'simple-invoice-generator')
                        }
                    ]}
                />

                <PanelBody title={__('Section Titles', 'simple-invoice-generator')} initialOpen={false}>
                    {/* Essential Elements Section Title */}
                    <h4>{__('Essential Elements Section', 'simple-invoice-generator')}</h4>
                    <TextControl
                        label={__('Section Title', 'simple-invoice-generator')}
                        value={essentialsSectionTitle}
                        onChange={(value) => setAttributes({ essentialsSectionTitle: value })}
                        placeholder={__('Enter section title...', 'simple-invoice-generator')}
                    />
                    
                    <hr />
                    
                    {/* Tax Section Title */}
                    <h4>{__('Tax Requirements Section', 'simple-invoice-generator')}</h4>
                    <TextControl
                        label={__('Section Title', 'simple-invoice-generator')}
                        value={taxSectionTitle}
                        onChange={(value) => setAttributes({ taxSectionTitle: value })}
                        placeholder={__('Enter section title...', 'simple-invoice-generator')}
                    />

                    
                    <hr />
                    
                    {/* International Section Title */}
                    <h4>{__('International Section', 'simple-invoice-generator')}</h4>
                    <TextControl
                        label={__('Section Title', 'simple-invoice-generator')}
                        value={internationalSectionTitle}
                        onChange={(value) => setAttributes({ internationalSectionTitle: value })}
                        placeholder={__('Enter section title...', 'simple-invoice-generator')}
                    />

                    <hr />
                    
                    {/* Checklist Section Title */}
                    <h4>{__('Checklist Section', 'simple-invoice-generator')}</h4>
                    <TextControl
                        label={__('Section Title', 'simple-invoice-generator')}
                        value={checklistSectionTitle}
                        onChange={(value) => setAttributes({ checklistSectionTitle: value })}
                        placeholder={__('Enter section title...', 'simple-invoice-generator')}
                    />

                </PanelBody>

                <PanelBody title={__('CTA Settings', 'simple-invoice-generator')}>
                    <ToggleControl
                        label={__('Show CTA Section', 'simple-invoice-generator')}
                        checked={showCTA}
                        onChange={(value) => setAttributes({ showCTA: value })}
                        help={__('Toggle to show/hide the "Create Compliant Invoices Now" section', 'simple-invoice-generator')}
                    />
                    
                    {showCTA && (
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
                            <TextControl
                                label={__('CTA Description', 'simple-invoice-generator')}
                                value={ctaDescription}
                                onChange={(value) => setAttributes({ ctaDescription: value })}
                            />
                        </>
                    )}
                </PanelBody>

                <PanelBody title={__('CTA Colors', 'simple-invoice-generator')} initialOpen={false}>
                    <PanelColorSettings
                        title={__('CTA Section Colors', 'simple-invoice-generator')}
                        colorSettings={[
                            {
                                value: ctaSectionBackgroundColor,
                                onChange: (color) => setAttributes({ ctaSectionBackgroundColor: color }),
                                label: __('Section Background Color', 'simple-invoice-generator')
                            },
                            {
                                value: ctaTextColor,
                                onChange: (color) => setAttributes({ ctaTextColor: color }),
                                label: __('Text Color', 'simple-invoice-generator')
                            },
                            {
                                value: ctaButtonBackgroundColor,
                                onChange: (color) => setAttributes({ ctaButtonBackgroundColor: color }),
                                label: __('Button Background Color', 'simple-invoice-generator')
                            },
                            {
                                value: ctaButtonHoverColor,
                                onChange: (color) => setAttributes({ ctaButtonHoverColor: color }),
                                label: __('Button Hover Color', 'simple-invoice-generator')
                            },
                            {
                                value: ctaButtonTextColor,
                                onChange: (color) => setAttributes({ ctaButtonTextColor: color }),
                                label: __('Button Text Color', 'simple-invoice-generator')
                            }
                        ]}
                    />
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

                <PanelBody title={__('Content Management', 'simple-invoice-generator')} initialOpen={false}>
                    <Button isPrimary onClick={addEssentialElement}>
                        {__('Add Essential Element', 'simple-invoice-generator')}
                    </Button>
                    <Button isPrimary onClick={addTaxRegion} style={{ marginLeft: '10px' }}>
                        {__('Add Tax Region', 'simple-invoice-generator')}
                    </Button>
                    <br /><br />
                    <Button isPrimary onClick={addInternationalCard}>
                        {__('Add International Card', 'simple-invoice-generator')}
                    </Button>
                    <Button isPrimary onClick={addChecklistItem} style={{ marginLeft: '10px' }}>
                        {__('Add Checklist Item', 'simple-invoice-generator')}
                    </Button>
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

                    <div className="ib-legal-container">
                        {/* Essential Elements */}
                        <div className="ib-essentials-card">
                            <div className="ib-essentials-header" style={{ textAlign: 'center' }}>
                                <RichText
                                    tagName="h3"
                                    className="ib-essentials-title"
                                    value={essentialsSectionTitle}
                                    onChange={(value) => setAttributes({ essentialsSectionTitle: value })}
                                    placeholder={__('Section title...', 'simple-invoice-generator')}
                                />
                                <p style={{ color: '#666', margin: '10px 0 20px', maxWidth: '750px', marginLeft: 'auto', marginRight: 'auto' }}>These fundamental elements must be present on every invoice to ensure legal compliance and professional standards.</p>
                            </div>

                            <div className="ib-essentials-grid">
                                {essentialElements.map((element, index) => (
                                    <div key={index} className="ib-essential-item">
                                        <div className="ib-essential-controls">
                                            <Button
                                                isDestructive
                                                isSmall
                                                onClick={() => removeEssentialElement(index)}
                                            >
                                                {__('Remove', 'simple-invoice-generator')}
                                            </Button>
                                        </div>

                                        <div 
                                            className="ib-essential-number"
                                            style={{ backgroundColor: accentColor }}
                                        >
                                            <TextControl
                                                value={element.number}
                                                onChange={(value) => updateEssentialElement(index, 'number', value)}
                                                style={{ textAlign: 'center', fontWeight: '600', color: '#fff', background: 'transparent', border: 'none' }}
                                            />
                                        </div>
                                        
                                        <div className="ib-essential-content">
                                            <RichText
                                                tagName="div"
                                                className="ib-essential-name"
                                                value={element.name}
                                                onChange={(value) => updateEssentialElement(index, 'name', value)}
                                                placeholder={__('Element name...', 'simple-invoice-generator')}
                                            />
                                            <RichText
                                                tagName="div"
                                                className="ib-essential-desc"
                                                value={element.description}
                                                onChange={(value) => updateEssentialElement(index, 'description', value)}
                                                placeholder={__('Element description...', 'simple-invoice-generator')}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Tax Requirements */}
                        <div className="ib-tax-section">
                            <div className="ib-tax-header" style={{ textAlign: 'center' }}>
                                <RichText
                                    tagName="h3"
                                    className="ib-tax-title"
                                    value={taxSectionTitle}
                                    onChange={(value) => setAttributes({ taxSectionTitle: value })}
                                    placeholder={__('Section title...', 'simple-invoice-generator')}
                                />
                                <p style={{ color: '#666', margin: '10px 0 20px', maxWidth: '750px', marginLeft: 'auto', marginRight: 'auto' }}>Different countries and regions have specific tax requirements that must be included on invoices.</p>
                            </div>

                            <div className="ib-tax-tabs">
                                {taxRegions.map((region, index) => (
                                    <div key={region.id} className="ib-tab-wrapper">
                                        <div 
                                            className={`ib-tax-tab ${activeTab === region.id ? 'active' : ''}`}
                                            onClick={() => setActiveTab(region.id)}
                                            style={activeTab === region.id ? { backgroundColor: accentColor, color: '#fff' } : {}}
                                        >
                                            <RichText
                                                tagName="span"
                                                value={region.name}
                                                onChange={(value) => updateTaxRegion(index, 'name', value)}
                                                placeholder={__('Region name...', 'simple-invoice-generator')}
                                            />
                                        </div>
                                        <Button
                                            isDestructive
                                            isSmall
                                            onClick={() => removeTaxRegion(index)}
                                            style={{ marginLeft: '5px' }}
                                        >
                                            {__('×', 'simple-invoice-generator')}
                                        </Button>
                                    </div>
                                ))}
                            </div>

                            {taxRegions.map((region, regionIndex) => (
                                activeTab === region.id && (
                                    <div key={region.id} className="ib-tax-content active">
                                        <div className="ib-tax-info">
                                            <RichText
                                                tagName="h4"
                                                value={region.title}
                                                onChange={(value) => updateTaxRegion(regionIndex, 'title', value)}
                                                placeholder={__('Region title...', 'simple-invoice-generator')}
                                            />
                                            <ul className="ib-tax-list">
                                                {region.requirements.map((req, reqIndex) => (
                                                    <li key={reqIndex} className="ib-requirement-item">
                                                        <Flex>
                                                            <FlexItem>
                                                                <TextControl
                                                                    value={req}
                                                                    onChange={(value) => updateRequirement(regionIndex, reqIndex, value)}
                                                                    placeholder={__('Requirement...', 'simple-invoice-generator')}
                                                                />
                                                            </FlexItem>
                                                            <FlexItem>
                                                                <Button
                                                                    isDestructive
                                                                    isSmall
                                                                    onClick={() => removeRequirement(regionIndex, reqIndex)}
                                                                >
                                                                    {__('×', 'simple-invoice-generator')}
                                                                </Button>
                                                            </FlexItem>
                                                        </Flex>
                                                    </li>
                                                ))}
                                            </ul>
                                            <Button
                                                isSecondary
                                                isSmall
                                                onClick={() => addRequirement(regionIndex)}
                                            >
                                                {__('Add Requirement', 'simple-invoice-generator')}
                                            </Button>
                                        </div>
                                    </div>
                                )
                            ))}
                        </div>

                        {/* International Section */}
                        <div className="ib-international-section">
                            <div className="ib-international-header" style={{ textAlign: 'center' }}>
                                <RichText
                                    tagName="h3"
                                    className="ib-tax-title"
                                    value={internationalSectionTitle}
                                    onChange={(value) => setAttributes({ internationalSectionTitle: value })}
                                    placeholder={__('Section title...', 'simple-invoice-generator')}
                                />
                                <p style={{ color: '#666', margin: '10px 0 20px', maxWidth: '750px', marginLeft: 'auto', marginRight: 'auto' }}>When invoicing internationally, additional considerations apply based on the nature of your business and destination country.</p>
                            </div>

                            <div className="ib-international-grid">
                                {internationalCards.map((card, index) => (
                                    <div key={index} className="ib-international-card">
                                        <div className="ib-card-controls">
                                            <Button
                                                isDestructive
                                                isSmall
                                                onClick={() => removeInternationalCard(index)}
                                            >
                                                {__('×', 'simple-invoice-generator')}
                                            </Button>
                                        </div>

                                        <TextControl
                                            className="ib-country-flag"
                                            value={card.flag}
                                            onChange={(value) => updateInternationalCard(index, 'flag', value)}
                                            placeholder="🌍"
                                            style={{ fontSize: '48px', textAlign: 'center', marginBottom: '15px' }}
                                        />
                                        
                                        <RichText
                                            tagName="div"
                                            className="ib-country-name"
                                            value={card.name}
                                            onChange={(value) => updateInternationalCard(index, 'name', value)}
                                            placeholder={__('Country/Region name...', 'simple-invoice-generator')}
                                        />
                                        
                                        <RichText
                                            tagName="div"
                                            className="ib-country-requirement"
                                            value={card.requirement}
                                            onChange={(value) => updateInternationalCard(index, 'requirement', value)}
                                            placeholder={__('Requirement description...', 'simple-invoice-generator')}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Checklist Section */}
                        <div className="ib-checklist-section">
                            <div className="ib-checklist-header" style={{ textAlign: 'center' }}>
                                <RichText
                                    tagName="h3"
                                    className="ib-checklist-title"
                                    value={checklistSectionTitle}
                                    onChange={(value) => setAttributes({ checklistSectionTitle: value })}
                                    placeholder={__('Section title...', 'simple-invoice-generator')}
                                />
                                <p style={{ color: '#666', margin: '10px 0 20px', maxWidth: '750px', marginLeft: 'auto', marginRight: 'auto' }}>Maintain proper records for tax compliance and audits</p>
                            </div>

                            <div className="ib-checklist-grid">
                                {checklist.map((item, index) => (
                                    <div key={index} className="ib-checklist-item">
                                        <div className="ib-checkbox" style={{ borderColor: accentColor, color: accentColor }}>✓</div>
                                        <Flex style={{ flex: 1 }}>
                                            <FlexItem style={{ flex: 1 }}>
                                                <TextControl
                                                    className="ib-checklist-text"
                                                    value={item}
                                                    onChange={(value) => updateChecklistItem(index, value)}
                                                    placeholder={__('Checklist item...', 'simple-invoice-generator')}
                                                />
                                            </FlexItem>
                                            <FlexItem>
                                                <Button
                                                    isDestructive
                                                    isSmall
                                                    onClick={() => removeChecklistItem(index)}
                                                >
                                                    {__('×', 'simple-invoice-generator')}
                                                </Button>
                                            </FlexItem>
                                        </Flex>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* CTA Section */}
                        {showCTA && (
                            <div 
                                className="ib-cta-section" 
                                style={{ 
                                    backgroundColor: ctaSectionBackgroundColor,
                                    '--cta-button-hover-color': ctaButtonHoverColor
                                }}
                            >
                                <RichText
                                    tagName="p"
                                    value={ctaDescription}
                                    onChange={(value) => setAttributes({ ctaDescription: value })}
                                    placeholder={__('CTA description...', 'simple-invoice-generator')}
                                    style={{ fontSize: '18px', color: ctaTextColor, marginBottom: '20px' }}
                                />
                                <a 
                                    href={ctaUrl} 
                                    className="ib-cta-button"
                                    style={{ 
                                        backgroundColor: ctaButtonBackgroundColor,
                                        color: ctaButtonTextColor
                                    }}
                                >
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