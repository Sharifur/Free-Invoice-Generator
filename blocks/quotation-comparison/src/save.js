import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
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

    const blockProps = useBlockProps.save({
        className: `quotation-comparison-section ${fullWidth ? 'full-width' : ''}`,
        style: {
            paddingTop: `${topPadding}px`,
            paddingBottom: `${bottomPadding}px`,
            backgroundColor: backgroundColor
        }
    });

    return (
        <section {...blockProps}>
            <div className="container">
                <RichText.Content
                    tagName="h2"
                    value={mainTitle}
                />
                
                <div className="content-wrapper">
                    <RichText.Content
                        tagName="p"
                        className="lead-text"
                        value={leadText}
                    />
                    
                    <div className="comparison-table">
                        <table>
                            <thead>
                                <tr>
                                    {tableColumns && tableColumns.map((column) => (
                                        <th key={column.id}>{column.label}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {tableData.map((row, index) => (
                                    <tr key={index}>
                                        {tableColumns && tableColumns.map((column, colIndex) => (
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
                                <RichText.Content
                                    tagName="h3"
                                    value={detailsTitle}
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
    );
}