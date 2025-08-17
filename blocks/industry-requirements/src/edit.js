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
        industryCards,
        backgroundColor,
        topPadding,
        bottomPadding,
        fullWidth,
        showIcons
    } = attributes;

    const blockProps = useBlockProps({
        className: `industry-requirements-section ${fullWidth ? 'full-width' : ''}`,
        style: {
            paddingTop: `${topPadding}px`,
            paddingBottom: `${bottomPadding}px`,
            backgroundColor: backgroundColor
        }
    });

    const updateCard = (index, field, value) => {
        const newCards = [...industryCards];
        newCards[index] = {
            ...newCards[index],
            [field]: value
        };
        setAttributes({ industryCards: newCards });
    };

    const updateCardRequirement = (cardIndex, reqIndex, value) => {
        const newCards = [...industryCards];
        const newRequirements = [...newCards[cardIndex].requirements];
        newRequirements[reqIndex] = value;
        newCards[cardIndex] = {
            ...newCards[cardIndex],
            requirements: newRequirements
        };
        setAttributes({ industryCards: newCards });
    };

    const addCardRequirement = (cardIndex) => {
        const newCards = [...industryCards];
        newCards[cardIndex] = {
            ...newCards[cardIndex],
            requirements: [...newCards[cardIndex].requirements, 'New requirement']
        };
        setAttributes({ industryCards: newCards });
    };

    const removeCardRequirement = (cardIndex, reqIndex) => {
        const newCards = [...industryCards];
        const newRequirements = newCards[cardIndex].requirements.filter((_, i) => i !== reqIndex);
        newCards[cardIndex] = {
            ...newCards[cardIndex],
            requirements: newRequirements
        };
        setAttributes({ industryCards: newCards });
    };

    const addCard = () => {
        setAttributes({
            industryCards: [...industryCards, { 
                icon: '🏢',
                title: 'New Industry',
                requirements: ['New requirement']
            }]
        });
    };

    const removeCard = (index) => {
        const newCards = industryCards.filter((_, i) => i !== index);
        setAttributes({ industryCards: newCards });
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
                        help={__('Show or hide emoji icons in industry card titles', 'simple-invoice-generator')}
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

                <PanelBody title={__('Industry Cards Management', 'simple-invoice-generator')} initialOpen={false}>
                    {industryCards.map((card, cardIndex) => (
                        <div key={cardIndex} style={{ 
                            marginBottom: '25px', 
                            padding: '20px', 
                            border: '1px solid #e0e0e0',
                            borderRadius: '4px',
                            backgroundColor: '#fff'
                        }}>
                            <TextControl
                                label={__('Icon (Emoji)', 'simple-invoice-generator')}
                                value={card.icon}
                                onChange={(value) => updateCard(cardIndex, 'icon', value)}
                                help={__('Use emoji characters like 🏗️, 💼, 🏭', 'simple-invoice-generator')}
                            />
                            <TextControl
                                label={__('Industry Title', 'simple-invoice-generator')}
                                value={card.title}
                                onChange={(value) => updateCard(cardIndex, 'title', value)}
                            />
                            <div style={{ marginTop: '15px' }}>
                                <strong>{__('Requirements:', 'simple-invoice-generator')}</strong>
                                {card.requirements.map((req, reqIndex) => (
                                    <div key={reqIndex} style={{ 
                                        display: 'flex', 
                                        gap: '10px', 
                                        marginTop: '10px',
                                        alignItems: 'flex-start'
                                    }}>
                                        <TextControl
                                            value={req}
                                            onChange={(value) => updateCardRequirement(cardIndex, reqIndex, value)}
                                            style={{ flex: 1 }}
                                        />
                                        <Button
                                            isSmall
                                            isDestructive
                                            onClick={() => removeCardRequirement(cardIndex, reqIndex)}
                                        >
                                            {__('Remove', 'simple-invoice-generator')}
                                        </Button>
                                    </div>
                                ))}
                                <Button
                                    isSmall
                                    isPrimary
                                    onClick={() => addCardRequirement(cardIndex)}
                                    style={{ marginTop: '10px' }}
                                >
                                    {__('Add Requirement', 'simple-invoice-generator')}
                                </Button>
                            </div>
                            <Button
                                isSmall
                                isDestructive
                                onClick={() => removeCard(cardIndex)}
                                style={{ marginTop: '15px' }}
                            >
                                {__('Remove Industry Card', 'simple-invoice-generator')}
                            </Button>
                        </div>
                    ))}
                    <Button
                        isPrimary
                        onClick={addCard}
                        style={{ width: '100%' }}
                    >
                        {__('Add New Industry Card', 'simple-invoice-generator')}
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
                        
                        <div className="industry-tabs">
                            {industryCards.map((card, index) => (
                                <div key={index} className="industry-card">
                                    <h3>
                                        {showIcons && <span>{card.icon}</span>}
                                        <RichText
                                            tagName="span"
                                            value={card.title}
                                            onChange={(value) => updateCard(index, 'title', value)}
                                            placeholder={__('Industry title...', 'simple-invoice-generator')}
                                        />
                                    </h3>
                                    <ul>
                                        {card.requirements.map((req, reqIndex) => (
                                            <li key={reqIndex}>{req}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    );
}