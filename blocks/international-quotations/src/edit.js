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
        internationalCards,
        backgroundColor,
        topPadding,
        bottomPadding,
        fullWidth,
        showIcons
    } = attributes;

    const blockProps = useBlockProps({
        className: `international-quotations-section ${fullWidth ? 'full-width' : ''}`,
        style: {
            paddingTop: `${topPadding}px`,
            paddingBottom: `${bottomPadding}px`,
            backgroundColor: backgroundColor
        }
    });

    const updateCard = (index, field, value) => {
        const newCards = [...internationalCards];
        newCards[index] = {
            ...newCards[index],
            [field]: value
        };
        setAttributes({ internationalCards: newCards });
    };

    const updateCardItem = (cardIndex, itemIndex, value) => {
        const newCards = [...internationalCards];
        const newItems = [...newCards[cardIndex].items];
        newItems[itemIndex] = value;
        newCards[cardIndex] = {
            ...newCards[cardIndex],
            items: newItems
        };
        setAttributes({ internationalCards: newCards });
    };

    const addCardItem = (cardIndex) => {
        const newCards = [...internationalCards];
        newCards[cardIndex] = {
            ...newCards[cardIndex],
            items: [...newCards[cardIndex].items, 'New item']
        };
        setAttributes({ internationalCards: newCards });
    };

    const removeCardItem = (cardIndex, itemIndex) => {
        const newCards = [...internationalCards];
        const newItems = newCards[cardIndex].items.filter((_, i) => i !== itemIndex);
        newCards[cardIndex] = {
            ...newCards[cardIndex],
            items: newItems
        };
        setAttributes({ internationalCards: newCards });
    };

    const addCard = () => {
        setAttributes({
            internationalCards: [...internationalCards, { 
                icon: '🌐',
                title: 'New International Topic',
                borderColor: '#f59e0b',
                items: ['New item']
            }]
        });
    };

    const removeCard = (index) => {
        const newCards = internationalCards.filter((_, i) => i !== index);
        setAttributes({ internationalCards: newCards });
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
                        help={__('Show or hide emoji icons in card titles', 'simple-invoice-generator')}
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

                <PanelBody title={__('International Cards Management', 'simple-invoice-generator')} initialOpen={false}>
                    {internationalCards.map((card, cardIndex) => (
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
                                help={__('Use emoji characters like 💱, 📦, 🌍, ⚖️', 'simple-invoice-generator')}
                            />
                            <TextControl
                                label={__('Card Title', 'simple-invoice-generator')}
                                value={card.title}
                                onChange={(value) => updateCard(cardIndex, 'title', value)}
                            />
                            <div style={{ marginTop: '15px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', fontWeight: '500' }}>
                                    {__('Top Border Color', 'simple-invoice-generator')}
                                </label>
                                <ColorPicker
                                    color={card.borderColor}
                                    onChange={(color) => updateCard(cardIndex, 'borderColor', color)}
                                />
                            </div>
                            <div style={{ marginTop: '15px' }}>
                                <strong>{__('List Items:', 'simple-invoice-generator')}</strong>
                                {card.items.map((item, itemIndex) => (
                                    <div key={itemIndex} style={{ 
                                        display: 'flex', 
                                        gap: '10px', 
                                        marginTop: '10px',
                                        alignItems: 'flex-start'
                                    }}>
                                        <TextControl
                                            value={item}
                                            onChange={(value) => updateCardItem(cardIndex, itemIndex, value)}
                                            style={{ flex: 1 }}
                                        />
                                        <Button
                                            isSmall
                                            isDestructive
                                            onClick={() => removeCardItem(cardIndex, itemIndex)}
                                        >
                                            {__('Remove', 'simple-invoice-generator')}
                                        </Button>
                                    </div>
                                ))}
                                <Button
                                    isSmall
                                    isPrimary
                                    onClick={() => addCardItem(cardIndex)}
                                    style={{ marginTop: '10px' }}
                                >
                                    {__('Add List Item', 'simple-invoice-generator')}
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
                        {__('Add New International Card', 'simple-invoice-generator')}
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
                        
                        <div className="international-grid">
                            {internationalCards.map((card, index) => (
                                <div 
                                    key={index} 
                                    className="intl-card"
                                    style={{ borderTopColor: card.borderColor }}
                                >
                                    <h3>
                                        {showIcons && <span>{card.icon}</span>}
                                        <RichText
                                            tagName="span"
                                            value={card.title}
                                            onChange={(value) => updateCard(index, 'title', value)}
                                            placeholder={__('Card title...', 'simple-invoice-generator')}
                                        />
                                    </h3>
                                    <ul>
                                        {card.items.map((item, itemIndex) => (
                                            <li key={itemIndex}>{item}</li>
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