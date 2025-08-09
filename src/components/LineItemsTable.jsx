import React from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useInvoiceData } from '../hooks/useInvoiceData';
import { formatCurrency } from '../utils/calculations';

const SortableItem = ({ item, onUpdate, onRemove, currency, currencySymbol }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: item.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <tr ref={setNodeRef} style={style} className="sig-line-item">
            <td className="sig-drag-cell" data-label="">
                <span className="sig-drag-handle" {...attributes} {...listeners}>
                    ⋮⋮
                </span>
            </td>
            <td className="sig-description-cell" data-label="Description">
                <textarea
                    value={item.description}
                    onChange={(e) => onUpdate(item.id, 'description', e.target.value)}
                    placeholder="Item description..."
                    rows="2"
                />
            </td>
            <td className="sig-quantity-cell" data-label="Quantity">
                <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => onUpdate(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                    min="0"
                    step="1"
                />
            </td>
            <td className="sig-rate-cell" data-label="Rate">
                <div className="sig-currency-input">
                    <span className="sig-currency-symbol">{currencySymbol}</span>
                    <input
                        type="number"
                        value={item.rate}
                        onChange={(e) => onUpdate(item.id, 'rate', parseFloat(e.target.value) || 0)}
                        min="0"
                        step="0.01"
                    />
                </div>
            </td>
            <td className="sig-amount-cell" data-label="Amount">
                {formatCurrency(item.amount, currency)}
            </td>
            <td className="sig-actions-cell" data-label="">
                <button
                    type="button"
                    onClick={() => onRemove(item.id)}
                    className="sig-btn-remove"
                    title="Remove item"
                >
                    ×
                </button>
            </td>
        </tr>
    );
};

const LineItemsTable = () => {
    const { invoiceData, updateLineItem, removeLineItem, addLineItem, updateLineItemsOrder, config } = useInvoiceData();
    const currencyInfo = config.currencies[invoiceData.invoice.currency];
    const currencySymbol = currencyInfo ? currencyInfo.symbol : '$';
    
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );
    
    const handleDragEnd = (event) => {
        const { active, over } = event;
        
        if (active.id !== over.id) {
            const oldIndex = invoiceData.lineItems.findIndex((item) => item.id === active.id);
            const newIndex = invoiceData.lineItems.findIndex((item) => item.id === over.id);
            
            const newItems = arrayMove(invoiceData.lineItems, oldIndex, newIndex);
            updateLineItemsOrder(newItems);
        }
    };
    
    const canAddMore = invoiceData.lineItems.length < 50;
    
    return (
        <div className="sig-section sig-line-items-section">
            <div className="sig-section-header">
                <h3>Line Items</h3>
                {!canAddMore && (
                    <span className="sig-limit-warning">Maximum 50 items reached</span>
                )}
            </div>
            
            <div className="sig-table-wrapper">
                <table className="sig-line-items-table">
                    <thead>
                        <tr>
                            <th className="sig-drag-header"></th>
                            <th>Description</th>
                            <th>Quantity</th>
                            <th>Rate</th>
                            <th>Amount</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <DndContext
                            sensors={sensors}
                            collisionDetection={closestCenter}
                            onDragEnd={handleDragEnd}
                        >
                            <SortableContext
                                items={invoiceData.lineItems.map(item => item.id)}
                                strategy={verticalListSortingStrategy}
                            >
                                {invoiceData.lineItems.map((item) => (
                                    <SortableItem
                                        key={item.id}
                                        item={item}
                                        onUpdate={updateLineItem}
                                        onRemove={removeLineItem}
                                        currency={invoiceData.invoice.currency}
                                        currencySymbol={currencySymbol}
                                    />
                                ))}
                            </SortableContext>
                        </DndContext>
                    </tbody>
                </table>
            </div>
            
            {canAddMore && (
                <button
                    type="button"
                    onClick={addLineItem}
                    className="sig-btn sig-btn-add-item"
                >
                    + Add Line Item
                </button>
            )}
        </div>
    );
};

export default LineItemsTable;