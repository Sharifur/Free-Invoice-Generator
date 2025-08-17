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
    TextareaControl,
    ToggleControl
} from '@wordpress/components';
import { Fragment } from '@wordpress/element';

export default function Edit({ attributes, setAttributes }) {
    const {
        mainTitle,
        leadText,
        legalCards,
        backgroundColor,
        topPadding,
        bottomPadding,
        fullWidth
    } = attributes;

    const blockProps = useBlockProps({
        className: `legal-considerations-section ${fullWidth ? 'full-width' : ''}`,
        style: {
            paddingTop: `${topPadding}px`,
            paddingBottom: `${bottomPadding}px`,
            backgroundColor: backgroundColor
        }
    });

    const updateCard = (index, field, value) => {
        const newCards = [...legalCards];
        newCards[index] = {
            ...newCards[index],
            [field]: value
        };
        setAttributes({ legalCards: newCards });
    };

    const updateCardListItem = (cardIndex, itemIndex, value) => {
        const newCards = [...legalCards];
        const newListItems = [...newCards[cardIndex].listItems];
        newListItems[itemIndex] = value;
        newCards[cardIndex] = {
            ...newCards[cardIndex],
            listItems: newListItems
        };
        setAttributes({ legalCards: newCards });
    };

    const addCardListItem = (cardIndex) => {
        const newCards = [...legalCards];
        newCards[cardIndex] = {
            ...newCards[cardIndex],
            listItems: [...newCards[cardIndex].listItems, 'New item']
        };
        setAttributes({ legalCards: newCards });
    };

    const removeCardListItem = (cardIndex, itemIndex) => {
        const newCards = [...legalCards];
        const newListItems = newCards[cardIndex].listItems.filter((_, i) => i !== itemIndex);
        newCards[cardIndex] = {
            ...newCards[cardIndex],
            listItems: newListItems
        };
        setAttributes({ legalCards: newCards });
    };

    const addCard = () => {
        setAttributes({
            legalCards: [...legalCards, { 
                title: 'New Legal Consideration',
                description: 'Description here...',
                listItems: ['New item']
            }]
        });
    };

    const removeCard = (index) => {
        const newCards = legalCards.filter((_, i) => i !== index);
        setAttributes({ legalCards: newCards });
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

                <PanelBody title={__('Legal Cards Management', 'simple-invoice-generator')} initialOpen={false}>
                    {legalCards.map((card, cardIndex) => (
                        <div key={cardIndex} style={{ 
                            marginBottom: '25px', 
                            padding: '20px', 
                            border: '1px solid #e0e0e0',
                            borderRadius: '4px',
                            backgroundColor: '#fff'
                        }}>
                            <TextControl
                                label={__('Card Title', 'simple-invoice-generator')}
                                value={card.title}
                                onChange={(value) => updateCard(cardIndex, 'title', value)}
                            />
                            <TextareaControl
                                label={__('Description', 'simple-invoice-generator')}
                                value={card.description}
                                onChange={(value) => updateCard(cardIndex, 'description', value)}
                                rows={3}
                            />
                            <div style={{ marginTop: '15px' }}>
                                <strong>{__('List Items:', 'simple-invoice-generator')}</strong>
                                {card.listItems.map((item, itemIndex) => (
                                    <div key={itemIndex} style={{ 
                                        display: 'flex', 
                                        gap: '10px', 
                                        marginTop: '10px',
                                        alignItems: 'flex-start'
                                    }}>
                                        <TextControl
                                            value={item}
                                            onChange={(value) => updateCardListItem(cardIndex, itemIndex, value)}
                                            style={{ flex: 1 }}
                                        />
                                        <Button
                                            isSmall
                                            isDestructive
                                            onClick={() => removeCardListItem(cardIndex, itemIndex)}
                                        >
                                            {__('Remove', 'simple-invoice-generator')}
                                        </Button>
                                    </div>
                                ))}
                                <Button
                                    isSmall
                                    isPrimary
                                    onClick={() => addCardListItem(cardIndex)}
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
                        {__('Add New Legal Card', 'simple-invoice-generator')}
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
                        
                        <div className="legal-grid">
                            {legalCards.map((card, index) => (
                                <div key={index} className="legal-card">
                                    <RichText
                                        tagName="h3"
                                        value={card.title}
                                        onChange={(value) => updateCard(index, 'title', value)}
                                        placeholder={__('Card title...', 'simple-invoice-generator')}
                                    />
                                    <RichText
                                        tagName="p"
                                        value={card.description}
                                        onChange={(value) => updateCard(index, 'description', value)}
                                        placeholder={__('Card description...', 'simple-invoice-generator')}
                                    />
                                    <ul>
                                        {card.listItems.map((item, itemIndex) => (
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