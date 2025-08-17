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
        tableColumns,
        tableData,
        detailsTitle,
        detailsList,
        backgroundColor,
        topPadding,
        bottomPadding,
        fullWidth,
        showDetails
    } = attributes;

    const blockProps = useBlockProps({
        className: `quotation-comparison-section ${fullWidth ? 'full-width' : ''}`,
        style: {
            paddingTop: `${topPadding}px`,
            paddingBottom: `${bottomPadding}px`,
            backgroundColor: backgroundColor
        }
    });

    const updateTableRow = (index, field, value) => {
        const newTableData = [...tableData];
        newTableData[index] = {
            ...newTableData[index],
            [field]: value
        };
        setAttributes({ tableData: newTableData });
    };

    const updateColumn = (index, field, value) => {
        const newColumns = [...tableColumns];
        newColumns[index] = {
            ...newColumns[index],
            [field]: value
        };
        setAttributes({ tableColumns: newColumns });
    };

    const addColumn = () => {
        const newColumnId = `column${Date.now()}`;
        const newColumn = {
            id: newColumnId,
            label: 'New Column',
            key: newColumnId
        };
        
        const newColumns = [...tableColumns, newColumn];
        const newTableData = tableData.map(row => ({
            ...row,
            [newColumnId]: 'New data'
        }));
        
        setAttributes({ 
            tableColumns: newColumns,
            tableData: newTableData
        });
    };

    const removeColumn = (index) => {
        const newColumns = tableColumns.filter((_, i) => i !== index);
        const columnToRemove = tableColumns[index];
        
        const newTableData = tableData.map(row => {
            const { [columnToRemove.key]: removedField, ...rest } = row;
            return rest;
        });
        
        setAttributes({ 
            tableColumns: newColumns,
            tableData: newTableData
        });
    };

    const addTableRow = () => {
        const newRow = {};
        tableColumns.forEach(column => {
            newRow[column.key] = 'New data';
        });
        setAttributes({
            tableData: [...tableData, newRow]
        });
    };

    const removeTableRow = (index) => {
        const newTableData = tableData.filter((_, i) => i !== index);
        setAttributes({ tableData: newTableData });
    };

    const updateDetailItem = (index, field, value) => {
        const newDetailsList = [...detailsList];
        newDetailsList[index] = {
            ...newDetailsList[index],
            [field]: value
        };
        setAttributes({ detailsList: newDetailsList });
    };

    const addDetailItem = () => {
        setAttributes({
            detailsList: [...detailsList, { 
                label: 'New Item:',
                description: 'Description here...'
            }]
        });
    };

    const removeDetailItem = (index) => {
        const newDetailsList = detailsList.filter((_, i) => i !== index);
        setAttributes({ detailsList: newDetailsList });
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
                        label={__('Show Details Section', 'simple-invoice-generator')}
                        checked={showDetails}
                        onChange={(value) => setAttributes({ showDetails: value })}
                        help={__('Show or hide the details section below the table', 'simple-invoice-generator')}
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

                <PanelBody title={__('Column Management', 'simple-invoice-generator')} initialOpen={false}>
                    {tableColumns.map((column, index) => (
                        <div key={column.id} style={{ 
                            marginBottom: '15px', 
                            padding: '10px', 
                            border: '1px solid #e0e0e0',
                            borderRadius: '4px',
                            backgroundColor: '#f9f9f9'
                        }}>
                            <TextControl
                                label={__('Column Label', 'simple-invoice-generator')}
                                value={column.label}
                                onChange={(value) => updateColumn(index, 'label', value)}
                            />
                            <TextControl
                                label={__('Column Key', 'simple-invoice-generator')}
                                value={column.key}
                                onChange={(value) => updateColumn(index, 'key', value)}
                                help={__('Unique identifier for this column', 'simple-invoice-generator')}
                            />
                            {tableColumns.length > 1 && (
                                <Button
                                    isSmall
                                    isDestructive
                                    onClick={() => removeColumn(index)}
                                    style={{ marginTop: '10px' }}
                                >
                                    {__('Remove Column', 'simple-invoice-generator')}
                                </Button>
                            )}
                        </div>
                    ))}
                    <Button
                        isPrimary
                        onClick={addColumn}
                        style={{ width: '100%' }}
                    >
                        {__('Add New Column', 'simple-invoice-generator')}
                    </Button>
                </PanelBody>

                <PanelBody title={__('Table Management', 'simple-invoice-generator')} initialOpen={false}>
                    {tableData.map((row, index) => (
                        <div key={index} style={{ 
                            marginBottom: '20px', 
                            padding: '15px', 
                            border: '1px solid #e0e0e0',
                            borderRadius: '4px',
                            backgroundColor: '#fff'
                        }}>
                            {tableColumns.map((column) => (
                                <TextControl
                                    key={column.key}
                                    label={column.label}
                                    value={row[column.key] || ''}
                                    onChange={(value) => updateTableRow(index, column.key, value)}
                                />
                            ))}
                            <Button
                                isSmall
                                isDestructive
                                onClick={() => removeTableRow(index)}
                                style={{ marginTop: '10px' }}
                            >
                                {__('Remove Row', 'simple-invoice-generator')}
                            </Button>
                        </div>
                    ))}
                    <Button
                        isPrimary
                        onClick={addTableRow}
                        style={{ width: '100%' }}
                    >
                        {__('Add Table Row', 'simple-invoice-generator')}
                    </Button>
                </PanelBody>

                <PanelBody title={__('Details Management', 'simple-invoice-generator')} initialOpen={false}>
                    {detailsList.map((item, index) => (
                        <div key={index} style={{ 
                            marginBottom: '15px', 
                            padding: '10px', 
                            border: '1px solid #e0e0e0',
                            borderRadius: '4px'
                        }}>
                            <TextControl
                                label={__('Label', 'simple-invoice-generator')}
                                value={item.label}
                                onChange={(value) => updateDetailItem(index, 'label', value)}
                            />
                            <TextControl
                                label={__('Description', 'simple-invoice-generator')}
                                value={item.description}
                                onChange={(value) => updateDetailItem(index, 'description', value)}
                            />
                            <Button
                                isSmall
                                isDestructive
                                onClick={() => removeDetailItem(index)}
                            >
                                {__('Remove', 'simple-invoice-generator')}
                            </Button>
                        </div>
                    ))}
                    <Button
                        isPrimary
                        onClick={addDetailItem}
                        style={{ width: '100%' }}
                    >
                        {__('Add Detail Item', 'simple-invoice-generator')}
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
                        
                        <div className="comparison-table">
                            <table>
                                <thead>
                                    <tr>
                                        {tableColumns.map((column) => (
                                            <th key={column.id}>{column.label}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {tableData.map((row, index) => (
                                        <tr key={index}>
                                            {tableColumns.map((column, colIndex) => (
                                                <td key={column.id}>
                                                    {colIndex === 0 ? <strong>{row[column.key] || ''}</strong> : (row[column.key] || '')}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        
                        {showDetails && (
                            <div className="document-details">
                                <div className="detail-card">
                                    <RichText
                                        tagName="h3"
                                        value={detailsTitle}
                                        onChange={(value) => setAttributes({ detailsTitle: value })}
                                        placeholder={__('Enter details title...', 'simple-invoice-generator')}
                                    />
                                    <ul>
                                        {detailsList.map((item, index) => (
                                            <li key={index}>
                                                <strong>{item.label}</strong> {item.description}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </Fragment>
    );
}