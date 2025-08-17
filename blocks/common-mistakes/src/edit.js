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
    ToggleControl,
    ColorPicker
} from '@wordpress/components';
import { Fragment } from '@wordpress/element';

export default function Edit({ attributes, setAttributes }) {
    const {
        mainTitle,
        leadText,
        mistakeCards,
        backgroundColor,
        topPadding,
        bottomPadding,
        fullWidth,
        showIcons
    } = attributes;

    const blockProps = useBlockProps({
        className: `common-mistakes-section ${fullWidth ? 'full-width' : ''}`,
        style: {
            paddingTop: `${topPadding}px`,
            paddingBottom: `${bottomPadding}px`,
            backgroundColor: backgroundColor
        }
    });

    const updateCard = (index, field, value) => {
        const newCards = [...mistakeCards];
        newCards[index] = {
            ...newCards[index],
            [field]: value
        };
        setAttributes({ mistakeCards: newCards });
    };

    const updateCardMistake = (cardIndex, mistakeIndex, field, value) => {
        const newCards = [...mistakeCards];
        const newMistakes = [...newCards[cardIndex].mistakes];
        newMistakes[mistakeIndex] = {
            ...newMistakes[mistakeIndex],
            [field]: value
        };
        newCards[cardIndex] = {
            ...newCards[cardIndex],
            mistakes: newMistakes
        };
        setAttributes({ mistakeCards: newCards });
    };

    const addCardMistake = (cardIndex) => {
        const newCards = [...mistakeCards];
        newCards[cardIndex] = {
            ...newCards[cardIndex],
            mistakes: [...newCards[cardIndex].mistakes, { title: 'New Mistake:', description: 'Description here...' }]
        };
        setAttributes({ mistakeCards: newCards });
    };

    const removeCardMistake = (cardIndex, mistakeIndex) => {
        const newCards = [...mistakeCards];
        const newMistakes = newCards[cardIndex].mistakes.filter((_, i) => i !== mistakeIndex);
        newCards[cardIndex] = {
            ...newCards[cardIndex],
            mistakes: newMistakes
        };
        setAttributes({ mistakeCards: newCards });
    };

    const addCard = () => {
        setAttributes({
            mistakeCards: [...mistakeCards, { 
                icon: '⚠️',
                title: 'New Mistake Category',
                backgroundColor: '#f9fafb',
                borderColor: '#e5e7eb',
                mistakes: [{ title: 'New Mistake:', description: 'Description here...' }]
            }]
        });
    };

    const removeCard = (index) => {
        const newCards = mistakeCards.filter((_, i) => i !== index);
        setAttributes({ mistakeCards: newCards });
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
                        help={__('Show or hide emoji icons in mistake cards', 'simple-invoice-generator')}
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
                    title={__('Section Color Settings', 'simple-invoice-generator')}
                    colorSettings={[
                        {
                            value: backgroundColor,
                            onChange: (color) => setAttributes({ backgroundColor: color }),
                            label: __('Section Background Color', 'simple-invoice-generator')
                        }
                    ]}
                />

                <PanelBody title={__('Card Colors', 'simple-invoice-generator')} initialOpen={false}>
                    {mistakeCards.map((card, index) => (
                        <div key={index} style={{ 
                            marginBottom: '20px', 
                            padding: '15px', 
                            border: '1px solid #e0e0e0',
                            borderRadius: '4px',
                            backgroundColor: '#f9f9f9'
                        }}>
                            <h4 style={{ margin: '0 0 15px 0', fontSize: '14px', fontWeight: '600' }}>
                                {card.title} - Colors
                            </h4>
                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', fontWeight: '500' }}>
                                    {__('Background Color', 'simple-invoice-generator')}
                                </label>
                                <ColorPicker
                                    color={card.backgroundColor}
                                    onChange={(color) => updateCard(index, 'backgroundColor', color)}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', fontWeight: '500' }}>
                                    {__('Border Color', 'simple-invoice-generator')}
                                </label>
                                <ColorPicker
                                    color={card.borderColor}
                                    onChange={(color) => updateCard(index, 'borderColor', color)}
                                />
                            </div>
                        </div>
                    ))}
                </PanelBody>

                <PanelBody title={__('Mistake Cards Management', 'simple-invoice-generator')} initialOpen={false}>
                    {mistakeCards.map((card, cardIndex) => (
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
                                help={__('Use emoji characters like ⚠️, ⚡, 📝', 'simple-invoice-generator')}
                            />
                            <TextControl
                                label={__('Card Title', 'simple-invoice-generator')}
                                value={card.title}
                                onChange={(value) => updateCard(cardIndex, 'title', value)}
                            />
                            <div style={{ marginTop: '15px' }}>
                                <strong>{__('Mistakes:', 'simple-invoice-generator')}</strong>
                                {card.mistakes.map((mistake, mistakeIndex) => (
                                    <div key={mistakeIndex} style={{ 
                                        marginTop: '10px',
                                        padding: '10px',
                                        border: '1px solid #e5e5e5',
                                        borderRadius: '3px'
                                    }}>
                                        <TextControl
                                            label={__('Mistake Title', 'simple-invoice-generator')}
                                            value={mistake.title}
                                            onChange={(value) => updateCardMistake(cardIndex, mistakeIndex, 'title', value)}
                                        />
                                        <TextControl
                                            label={__('Description', 'simple-invoice-generator')}
                                            value={mistake.description}
                                            onChange={(value) => updateCardMistake(cardIndex, mistakeIndex, 'description', value)}
                                        />
                                        <Button
                                            isSmall
                                            isDestructive
                                            onClick={() => removeCardMistake(cardIndex, mistakeIndex)}
                                            style={{ marginTop: '5px' }}
                                        >
                                            {__('Remove Mistake', 'simple-invoice-generator')}
                                        </Button>
                                    </div>
                                ))}
                                <Button
                                    isSmall
                                    isPrimary
                                    onClick={() => addCardMistake(cardIndex)}
                                    style={{ marginTop: '10px' }}
                                >
                                    {__('Add Mistake', 'simple-invoice-generator')}
                                </Button>
                            </div>
                            <Button
                                isSmall
                                isDestructive
                                onClick={() => removeCard(cardIndex)}
                                style={{ marginTop: '15px' }}
                            >
                                {__('Remove Card', 'simple-invoice-generator')}
                            </Button>
                        </div>
                    ))}
                    <Button
                        isPrimary
                        onClick={addCard}
                        style={{ width: '100%' }}
                    >
                        {__('Add New Mistake Card', 'simple-invoice-generator')}
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
                        
                        <div className="mistakes-grid">
                            {mistakeCards.map((card, index) => (
                                <div 
                                    key={index} 
                                    className="mistake-card"
                                    style={{
                                        backgroundColor: card.backgroundColor,
                                        borderColor: card.borderColor
                                    }}
                                >
                                    {showIcons && (
                                        <div className="mistake-icon">{card.icon}</div>
                                    )}
                                    <RichText
                                        tagName="h3"
                                        value={card.title}
                                        onChange={(value) => updateCard(index, 'title', value)}
                                        placeholder={__('Card title...', 'simple-invoice-generator')}
                                    />
                                    <ul>
                                        {card.mistakes.map((mistake, mistakeIndex) => (
                                            <li key={mistakeIndex}>
                                                <strong>{mistake.title}</strong> {mistake.description}
                                            </li>
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