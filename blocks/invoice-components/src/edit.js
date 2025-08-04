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

export default function Edit({ attributes, setAttributes }) {
    const {
        title,
        subtitle,
        backgroundColor,
        accentColor,
        mockupData,
        components,
        topPadding,
        bottomPadding
    } = attributes;

    const blockProps = useBlockProps({
        className: 'ib-components-section',
        style: {
            backgroundColor: backgroundColor,
            paddingTop: `${topPadding}px`,
            paddingBottom: `${bottomPadding}px`
        }
    });

    const updateMockupData = (field, value) => {
        setAttributes({
            mockupData: { ...mockupData, [field]: value }
        });
    };

    const updateComponent = (index, field, value) => {
        const newComponents = [...components];
        newComponents[index] = { ...newComponents[index], [field]: value };
        setAttributes({ components: newComponents });
    };

    const updateComponentDetail = (componentIndex, detailIndex, value) => {
        const newComponents = [...components];
        const newDetails = [...newComponents[componentIndex].details];
        newDetails[detailIndex] = value;
        newComponents[componentIndex] = { ...newComponents[componentIndex], details: newDetails };
        setAttributes({ components: newComponents });
    };

    const addComponent = () => {
        const newComponent = {
            title: 'New Component',
            description: 'Add component description',
            details: ['Detail 1', 'Detail 2'],
            isActive: false
        };
        setAttributes({ components: [...components, newComponent] });
    };

    const removeComponent = (index) => {
        const newComponents = components.filter((_, i) => i !== index);
        setAttributes({ components: newComponents });
    };

    const addDetail = (componentIndex) => {
        const newComponents = [...components];
        newComponents[componentIndex].details.push('New detail');
        setAttributes({ components: newComponents });
    };

    const removeDetail = (componentIndex, detailIndex) => {
        const newComponents = [...components];
        newComponents[componentIndex].details = newComponents[componentIndex].details.filter((_, i) => i !== detailIndex);
        setAttributes({ components: newComponents });
    };

    const setActiveComponent = (index) => {
        const newComponents = components.map((comp, i) => ({
            ...comp,
            isActive: i === index
        }));
        setAttributes({ components: newComponents });
    };

    return (
        <Fragment>
            <InspectorControls>
                <PanelBody title={__('Mockup Settings', 'simple-invoice-generator')}>
                    <TextControl
                        label={__('Company Name', 'simple-invoice-generator')}
                        value={mockupData.companyName}
                        onChange={(value) => updateMockupData('companyName', value)}
                    />
                    <TextControl
                        label={__('Company Address', 'simple-invoice-generator')}
                        value={mockupData.companyAddress}
                        onChange={(value) => updateMockupData('companyAddress', value)}
                    />
                    <TextControl
                        label={__('Company Phone', 'simple-invoice-generator')}
                        value={mockupData.companyPhone}
                        onChange={(value) => updateMockupData('companyPhone', value)}
                    />
                    <TextControl
                        label={__('Company Email', 'simple-invoice-generator')}
                        value={mockupData.companyEmail}
                        onChange={(value) => updateMockupData('companyEmail', value)}
                    />
                    <TextControl
                        label={__('Invoice Number', 'simple-invoice-generator')}
                        value={mockupData.invoiceNumber}
                        onChange={(value) => updateMockupData('invoiceNumber', value)}
                    />
                    <TextControl
                        label={__('Invoice Date', 'simple-invoice-generator')}
                        value={mockupData.invoiceDate}
                        onChange={(value) => updateMockupData('invoiceDate', value)}
                    />
                    <TextControl
                        label={__('Client Name', 'simple-invoice-generator')}
                        value={mockupData.clientName}
                        onChange={(value) => updateMockupData('clientName', value)}
                    />
                    <TextControl
                        label={__('Client Address', 'simple-invoice-generator')}
                        value={mockupData.clientAddress}
                        onChange={(value) => updateMockupData('clientAddress', value)}
                    />
                    <TextControl
                        label={__('Due Date', 'simple-invoice-generator')}
                        value={mockupData.dueDate}
                        onChange={(value) => updateMockupData('dueDate', value)}
                    />
                    <TextControl
                        label={__('Subtotal', 'simple-invoice-generator')}
                        value={mockupData.subtotal}
                        onChange={(value) => updateMockupData('subtotal', value)}
                    />
                    <TextControl
                        label={__('Discount Amount', 'simple-invoice-generator')}
                        value={mockupData.discount}
                        onChange={(value) => updateMockupData('discount', value)}
                    />
                    <TextControl
                        label={__('Tax Amount', 'simple-invoice-generator')}
                        value={mockupData.tax}
                        onChange={(value) => updateMockupData('tax', value)}
                    />
                    <TextControl
                        label={__('Total Amount', 'simple-invoice-generator')}
                        value={mockupData.totalAmount}
                        onChange={(value) => updateMockupData('totalAmount', value)}
                    />
                    <TextareaControl
                        label={__('Notes', 'simple-invoice-generator')}
                        value={mockupData.notes}
                        onChange={(value) => updateMockupData('notes', value)}
                        rows={3}
                    />
                    <TextareaControl
                        label={__('Payment Terms', 'simple-invoice-generator')}
                        value={mockupData.paymentTerms}
                        onChange={(value) => updateMockupData('paymentTerms', value)}
                        rows={3}
                    />
                    <ToggleControl
                        label={__('Show Logo', 'simple-invoice-generator')}
                        checked={mockupData.showLogo}
                        onChange={(value) => updateMockupData('showLogo', value)}
                    />
                    {mockupData.showLogo && (
                        <MediaUploadCheck>
                            <MediaUpload
                                onSelect={(media) => {
                                    updateMockupData('logoUrl', media.url);
                                    updateMockupData('logoId', media.id);
                                }}
                                allowedTypes={['image']}
                                value={mockupData.logoId}
                                render={({ open }) => (
                                    <div>
                                        {mockupData.logoUrl ? (
                                            <div>
                                                <img 
                                                    src={mockupData.logoUrl} 
                                                    alt="Company logo"
                                                    style={{ width: '60px', height: '60px', objectFit: 'contain', marginBottom: '10px' }}
                                                />
                                                <div>
                                                    <Button onClick={open} isSecondary isSmall>
                                                        {__('Replace Logo', 'simple-invoice-generator')}
                                                    </Button>
                                                    <Button 
                                                        onClick={() => {
                                                            updateMockupData('logoUrl', '');
                                                            updateMockupData('logoId', null);
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
                                            <Button onClick={open} isPrimary>
                                                {__('Upload Logo', 'simple-invoice-generator')}
                                            </Button>
                                        )}
                                    </div>
                                )}
                            />
                        </MediaUploadCheck>
                    )}
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
                            value: accentColor,
                            onChange: (color) => setAttributes({ accentColor: color }),
                            label: __('Accent Color', 'simple-invoice-generator')
                        }
                    ]}
                />

                <PanelBody title={__('Components Management', 'simple-invoice-generator')} initialOpen={false}>
                    <Button isPrimary onClick={addComponent}>
                        {__('Add New Component', 'simple-invoice-generator')}
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
                        />
                        <RichText
                            tagName="p"
                            className="ib-section-subtitle"
                            value={subtitle}
                            onChange={(value) => setAttributes({ subtitle: value })}
                            placeholder={__('Enter section subtitle...', 'simple-invoice-generator')}
                        />
                    </div>

                    <div className="ib-components-layout">
                        <div className="ib-invoice-visual">
                            <div className="ib-invoice-mockup">
                                <div className="ib-mockup-header">
                                    {mockupData.showLogo && (
                                        mockupData.logoUrl ? (
                                            <img 
                                                src={mockupData.logoUrl} 
                                                alt="Logo"
                                                className="ib-mockup-logo"
                                            />
                                        ) : (
                                            <div 
                                                className="ib-mockup-logo" 
                                                style={{ backgroundColor: accentColor }}
                                            ></div>
                                        )
                                    )}
                                    <div className="ib-mockup-company">{mockupData.companyName}</div>
                                    <div style={{ fontSize: '14px', color: '#666' }}>{mockupData.companyAddress}</div>
                                    <div style={{ fontSize: '13px', color: '#888' }}>
                                        {mockupData.companyPhone} • {mockupData.companyEmail}
                                    </div>
                                </div>

                                <div className="ib-mockup-content">
                                    <div className="ib-mockup-row">
                                        <div>
                                            <div className="ib-mockup-label">Invoice #</div>
                                            <div className="ib-mockup-value">{mockupData.invoiceNumber}</div>
                                        </div>
                                        <div>
                                            <div className="ib-mockup-label">Date</div>
                                            <div className="ib-mockup-value">{mockupData.invoiceDate}</div>
                                        </div>
                                    </div>

                                    <div className="ib-mockup-row">
                                        <div>
                                            <div className="ib-mockup-label">Bill To:</div>
                                            <div className="ib-mockup-value">{mockupData.clientName}</div>
                                            <div style={{ fontSize: '12px', color: '#888' }}>{mockupData.clientAddress}</div>
                                        </div>
                                        <div>
                                            <div className="ib-mockup-label">Due Date</div>
                                            <div className="ib-mockup-value">{mockupData.dueDate}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="ib-mockup-table">
                                    <div className="ib-table-header">
                                        <div className="ib-table-row" style={{ fontWeight: '600', borderBottom: '2px solid #e0e0e0', paddingBottom: '10px', marginBottom: '10px' }}>
                                            <div style={{ flex: 2 }}>Description</div>
                                            <div style={{ flex: 1, textAlign: 'center' }}>Qty</div>
                                            <div style={{ flex: 1, textAlign: 'right' }}>Rate</div>
                                            <div style={{ flex: 1, textAlign: 'right' }}>Amount</div>
                                        </div>
                                    </div>
                                    <div className="ib-table-body">
                                        {mockupData.items.map((item, index) => (
                                            <div key={index} className="ib-table-row" style={{ paddingBottom: '8px' }}>
                                                <div style={{ flex: 2, fontSize: '14px' }}>{item.description}</div>
                                                <div style={{ flex: 1, textAlign: 'center', fontSize: '14px' }}>{item.quantity}</div>
                                                <div style={{ flex: 1, textAlign: 'right', fontSize: '14px' }}>{item.rate}</div>
                                                <div style={{ flex: 1, textAlign: 'right', fontSize: '14px', fontWeight: '500' }}>{item.amount}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="ib-mockup-summary">
                                    <div className="ib-summary-row">
                                        <div className="ib-mockup-label">Subtotal</div>
                                        <div className="ib-mockup-value">{mockupData.subtotal}</div>
                                    </div>
                                    {mockupData.discount && mockupData.discount !== "$0.00" && (
                                        <div className="ib-summary-row">
                                            <div className="ib-mockup-label">Discount ({mockupData.discountPercent})</div>
                                            <div className="ib-mockup-value" style={{ color: '#22c55e' }}>-{mockupData.discount}</div>
                                        </div>
                                    )}
                                    {mockupData.shipping && mockupData.shipping !== "$0.00" && (
                                        <div className="ib-summary-row">
                                            <div className="ib-mockup-label">Shipping</div>
                                            <div className="ib-mockup-value">{mockupData.shipping}</div>
                                        </div>
                                    )}
                                    <div className="ib-summary-row">
                                        <div className="ib-mockup-label">Tax ({mockupData.taxPercent})</div>
                                        <div className="ib-mockup-value">{mockupData.tax}</div>
                                    </div>
                                    <div className="ib-summary-row" style={{ borderTop: '2px solid #e0e0e0', paddingTop: '10px', marginTop: '10px' }}>
                                        <div className="ib-mockup-label" style={{ fontSize: '18px', fontWeight: '600' }}>Total Due</div>
                                        <div 
                                            className="ib-mockup-value" 
                                            style={{ fontSize: '24px', fontWeight: '700', color: accentColor }}
                                        >
                                            {mockupData.totalAmount}
                                        </div>
                                    </div>
                                </div>

                                {mockupData.notes && (
                                    <div className="ib-mockup-notes" style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
                                        <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '5px', color: '#333' }}>Notes:</div>
                                        <div style={{ fontSize: '14px', color: '#666' }}>{mockupData.notes}</div>
                                    </div>
                                )}

                                {mockupData.paymentTerms && (
                                    <div className="ib-mockup-terms" style={{ marginTop: '15px', padding: '15px', backgroundColor: '#fff3cd', borderRadius: '8px', border: '1px solid #ffeaa7' }}>
                                        <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '5px', color: '#333' }}>Payment Terms:</div>
                                        <div style={{ fontSize: '13px', color: '#666', lineHeight: '1.4' }}>{mockupData.paymentTerms}</div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="ib-components-list">
                            {components.map((component, index) => (
                                <div key={index} className="ib-component-item-wrapper">
                                    <div 
                                        className={`ib-component-item ${component.isActive ? 'active' : ''}`}
                                        onClick={() => setActiveComponent(index)}
                                        style={component.isActive ? { borderColor: accentColor } : {}}
                                    >
                                        <div className="ib-component-controls">
                                            <Button
                                                isDestructive
                                                isSmall
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    removeComponent(index);
                                                }}
                                            >
                                                {__('Remove', 'simple-invoice-generator')}
                                            </Button>
                                        </div>


                                        <RichText
                                            tagName="h3"
                                            className="ib-component-title"
                                            value={component.title}
                                            onChange={(value) => updateComponent(index, 'title', value)}
                                            placeholder={__('Component title...', 'simple-invoice-generator')}
                                            onClick={(e) => e.stopPropagation()}
                                        />

                                        <RichText
                                            tagName="p"
                                            className="ib-component-description"
                                            value={component.description}
                                            onChange={(value) => updateComponent(index, 'description', value)}
                                            placeholder={__('Component description...', 'simple-invoice-generator')}
                                            onClick={(e) => e.stopPropagation()}
                                        />

                                        <div className="ib-component-details">
                                            <strong>{__('Details:', 'simple-invoice-generator')}</strong>
                                            {component.details.map((detail, detailIndex) => (
                                                <Flex key={detailIndex} style={{ marginBottom: '10px' }}>
                                                    <FlexItem>
                                                        <TextControl
                                                            value={detail}
                                                            onChange={(value) => updateComponentDetail(index, detailIndex, value)}
                                                            placeholder={__('Detail...', 'simple-invoice-generator')}
                                                            onClick={(e) => e.stopPropagation()}
                                                        />
                                                    </FlexItem>
                                                    <FlexItem>
                                                        <Button
                                                            isDestructive
                                                            isSmall
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                removeDetail(index, detailIndex);
                                                            }}
                                                        >
                                                            {__('Remove', 'simple-invoice-generator')}
                                                        </Button>
                                                    </FlexItem>
                                                </Flex>
                                            ))}
                                            <Button
                                                isSecondary
                                                isSmall
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    addDetail(index);
                                                }}
                                            >
                                                {__('Add Detail', 'simple-invoice-generator')}
                                            </Button>
                                        </div>
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