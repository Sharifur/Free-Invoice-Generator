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
        benefitSections,
        backgroundColor,
        topPadding,
        bottomPadding,
        fullWidth,
        showIcons
    } = attributes;

    const blockProps = useBlockProps({
        className: `digital-transformation-section ${fullWidth ? 'full-width' : ''}`,
        style: {
            paddingTop: `${topPadding}px`,
            paddingBottom: `${bottomPadding}px`,
            backgroundColor: backgroundColor
        }
    });

    const updateSection = (index, field, value) => {
        const newSections = [...benefitSections];
        newSections[index] = {
            ...newSections[index],
            [field]: value
        };
        setAttributes({ benefitSections: newSections });
    };

    const updateBenefit = (sectionIndex, benefitIndex, field, value) => {
        const newSections = [...benefitSections];
        const newBenefits = [...newSections[sectionIndex].benefits];
        newBenefits[benefitIndex] = {
            ...newBenefits[benefitIndex],
            [field]: value
        };
        newSections[sectionIndex] = {
            ...newSections[sectionIndex],
            benefits: newBenefits
        };
        setAttributes({ benefitSections: newSections });
    };

    const addBenefit = (sectionIndex) => {
        const newSections = [...benefitSections];
        newSections[sectionIndex] = {
            ...newSections[sectionIndex],
            benefits: [...newSections[sectionIndex].benefits, { 
                title: 'New Benefit:',
                description: 'Description here...'
            }]
        };
        setAttributes({ benefitSections: newSections });
    };

    const removeBenefit = (sectionIndex, benefitIndex) => {
        const newSections = [...benefitSections];
        const newBenefits = newSections[sectionIndex].benefits.filter((_, i) => i !== benefitIndex);
        newSections[sectionIndex] = {
            ...newSections[sectionIndex],
            benefits: newBenefits
        };
        setAttributes({ benefitSections: newSections });
    };

    const addSection = () => {
        setAttributes({
            benefitSections: [...benefitSections, { 
                icon: '🚀',
                title: 'New Section',
                benefits: [{ 
                    title: 'New Benefit:',
                    description: 'Description here...'
                }]
            }]
        });
    };

    const removeSection = (index) => {
        const newSections = benefitSections.filter((_, i) => i !== index);
        setAttributes({ benefitSections: newSections });
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
                        help={__('Show or hide emoji icons in section titles', 'simple-invoice-generator')}
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

                <PanelBody title={__('Benefit Sections Management', 'simple-invoice-generator')} initialOpen={false}>
                    {benefitSections.map((section, sectionIndex) => (
                        <div key={sectionIndex} style={{ 
                            marginBottom: '25px', 
                            padding: '20px', 
                            border: '1px solid #e0e0e0',
                            borderRadius: '4px',
                            backgroundColor: '#fff'
                        }}>
                            <TextControl
                                label={__('Icon (Emoji)', 'simple-invoice-generator')}
                                value={section.icon}
                                onChange={(value) => updateSection(sectionIndex, 'icon', value)}
                                help={__('Use emoji characters like ⚡, 🔗, 📊', 'simple-invoice-generator')}
                            />
                            <TextControl
                                label={__('Section Title', 'simple-invoice-generator')}
                                value={section.title}
                                onChange={(value) => updateSection(sectionIndex, 'title', value)}
                            />
                            <div style={{ marginTop: '15px' }}>
                                <strong>{__('Benefits:', 'simple-invoice-generator')}</strong>
                                {section.benefits.map((benefit, benefitIndex) => (
                                    <div key={benefitIndex} style={{ 
                                        marginTop: '10px',
                                        padding: '10px',
                                        border: '1px solid #e5e5e5',
                                        borderRadius: '3px'
                                    }}>
                                        <TextControl
                                            label={__('Benefit Title', 'simple-invoice-generator')}
                                            value={benefit.title}
                                            onChange={(value) => updateBenefit(sectionIndex, benefitIndex, 'title', value)}
                                        />
                                        <TextControl
                                            label={__('Description', 'simple-invoice-generator')}
                                            value={benefit.description}
                                            onChange={(value) => updateBenefit(sectionIndex, benefitIndex, 'description', value)}
                                        />
                                        <Button
                                            isSmall
                                            isDestructive
                                            onClick={() => removeBenefit(sectionIndex, benefitIndex)}
                                            style={{ marginTop: '5px' }}
                                        >
                                            {__('Remove Benefit', 'simple-invoice-generator')}
                                        </Button>
                                    </div>
                                ))}
                                <Button
                                    isSmall
                                    isPrimary
                                    onClick={() => addBenefit(sectionIndex)}
                                    style={{ marginTop: '10px' }}
                                >
                                    {__('Add Benefit', 'simple-invoice-generator')}
                                </Button>
                            </div>
                            <Button
                                isSmall
                                isDestructive
                                onClick={() => removeSection(sectionIndex)}
                                style={{ marginTop: '15px' }}
                            >
                                {__('Remove Section', 'simple-invoice-generator')}
                            </Button>
                        </div>
                    ))}
                    <Button
                        isPrimary
                        onClick={addSection}
                        style={{ width: '100%' }}
                    >
                        {__('Add New Benefit Section', 'simple-invoice-generator')}
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
                        
                        <div className="digital-benefits">
                            {benefitSections.map((section, index) => (
                                <div key={index} className="benefit-section">
                                    <h3>
                                        {showIcons && <span>{section.icon}</span>}
                                        <RichText
                                            tagName="span"
                                            value={section.title}
                                            onChange={(value) => updateSection(index, 'title', value)}
                                            placeholder={__('Section title...', 'simple-invoice-generator')}
                                        />
                                    </h3>
                                    <div className="benefit-list">
                                        {section.benefits.map((benefit, benefitIndex) => (
                                            <div key={benefitIndex} className="benefit-item">
                                                <strong>{benefit.title}</strong> {benefit.description}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    );
}