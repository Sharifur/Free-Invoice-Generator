import React, { useEffect } from 'react';
import { useInvoiceData } from '../hooks/useInvoiceData';
import { calculateTotals, formatCurrency } from '../utils/calculations';

const CalculationsPanel = () => {
    const { invoiceData, updateFinancial, updateAdditional, config } = useInvoiceData();
    const currencyInfo = config.currencies[invoiceData.invoice.currency];
    const currencySymbol = currencyInfo ? currencyInfo.symbol : '$';
    
    // Calculate totals whenever relevant data changes
    useEffect(() => {
        const totals = calculateTotals(invoiceData);
        
        // Update financial data if changed
        if (
            totals.subtotal !== invoiceData.financial.subtotal ||
            totals.discountAmount !== invoiceData.financial.discountAmount ||
            totals.tax !== invoiceData.financial.tax ||
            totals.total !== invoiceData.financial.total
        ) {
            updateFinancial('subtotal', totals.subtotal);
            updateFinancial('discountAmount', totals.discountAmount);
            updateFinancial('tax', totals.tax);
            updateFinancial('total', totals.total);
        }
    }, [
        invoiceData.lineItems,
        invoiceData.financial.discount,
        invoiceData.financial.discountType,
        invoiceData.financial.shipping,
        invoiceData.financial.taxRate
    ]);
    
    return (
        <div className="sig-section sig-calculations-section">
            <h3>Totals</h3>
            
            <div className="sig-calculations-grid">
                <div className="sig-calc-row">
                    <span className="sig-calc-label">Subtotal:</span>
                    <span className="sig-calc-value">
                        {formatCurrency(invoiceData.financial.subtotal, invoiceData.invoice.currency)}
                    </span>
                </div>
                
                <div className="sig-calc-row sig-discount-row">
                    <div className="sig-calc-label-group">
                        <span className="sig-calc-label">Discount:</span>
                        <div className="sig-discount-controls">
                            <input
                                type="number"
                                value={invoiceData.financial.discount}
                                onChange={(e) => updateFinancial('discount', parseFloat(e.target.value) || 0)}
                                min="0"
                                step="0.01"
                                className="sig-discount-input"
                            />
                            <select
                                value={invoiceData.financial.discountType}
                                onChange={(e) => updateFinancial('discountType', e.target.value)}
                                className="sig-discount-type"
                            >
                                <option value="percentage">%</option>
                                <option value="fixed">{currencySymbol}</option>
                            </select>
                        </div>
                    </div>
                    <span className="sig-calc-value sig-discount-amount">
                        -{formatCurrency(
                            invoiceData.financial.discountType === 'percentage' 
                                ? (invoiceData.financial.subtotal * invoiceData.financial.discount / 100)
                                : invoiceData.financial.discount,
                            invoiceData.invoice.currency
                        )}
                    </span>
                </div>
                
                <div className="sig-calc-row sig-shipping-row">
                    <div className="sig-calc-label-group">
                        <span className="sig-calc-label">Shipping:</span>
                        <input
                            type="text"
                            value={invoiceData.financial.shippingDescription}
                            onChange={(e) => updateFinancial('shippingDescription', e.target.value)}
                            placeholder="Shipping description"
                            className="sig-shipping-description"
                        />
                    </div>
                    <div className="sig-currency-input">
                        <span className="sig-currency-symbol">{currencySymbol}</span>
                        <input
                            type="number"
                            value={invoiceData.financial.shipping}
                            onChange={(e) => updateFinancial('shipping', parseFloat(e.target.value) || 0)}
                            min="0"
                            step="0.01"
                            className="sig-shipping-input"
                        />
                    </div>
                </div>
                
                <div className="sig-calc-row sig-tax-row">
                    <div className="sig-calc-label-group">
                        <span className="sig-calc-label">Tax:</span>
                        <div className="sig-tax-controls">
                            <input
                                type="number"
                                value={invoiceData.financial.taxRate}
                                onChange={(e) => updateFinancial('taxRate', parseFloat(e.target.value) || 0)}
                                min="0"
                                max="100"
                                step="0.01"
                                className="sig-tax-input"
                            />
                            <span>%</span>
                        </div>
                    </div>
                    <span className="sig-calc-value">
                        {formatCurrency(invoiceData.financial.tax, invoiceData.invoice.currency)}
                    </span>
                </div>
                
                <div className="sig-calc-row sig-total-row">
                    <span className="sig-calc-label">Total:</span>
                    <span className="sig-calc-value sig-total-value">
                        {formatCurrency(invoiceData.financial.total, invoiceData.invoice.currency)}
                    </span>
                </div>
            </div>
            
            <div className="sig-additional-fields">
                <div className="sig-form-group">
                    <label htmlFor="terms">Terms & Conditions</label>
                    <textarea
                        id="terms"
                        value={invoiceData.termsAndConditions}
                        onChange={(e) => updateAdditional('termsAndConditions', e.target.value)}
                        placeholder="Payment is due within 30 days..."
                        rows="3"
                    />
                </div>
                
                <div className="sig-form-group">
                    <label htmlFor="payment-instructions">Payment Instructions</label>
                    <textarea
                        id="payment-instructions"
                        value={invoiceData.paymentInstructions}
                        onChange={(e) => updateAdditional('paymentInstructions', e.target.value)}
                        placeholder="Bank details, payment methods accepted..."
                        rows="3"
                    />
                </div>
                
                <div className="sig-form-group">
                    <label htmlFor="notes">Notes</label>
                    <textarea
                        id="notes"
                        value={invoiceData.notes}
                        onChange={(e) => updateAdditional('notes', e.target.value)}
                        placeholder="Additional notes or comments..."
                        rows="2"
                    />
                </div>
                
                <div className="sig-form-group">
                    <label htmlFor="footer-message">Footer Message</label>
                    <input
                        id="footer-message"
                        type="text"
                        value={invoiceData.footerMessage}
                        onChange={(e) => updateAdditional('footerMessage', e.target.value)}
                        placeholder="Thank you for your business!"
                    />
                </div>
            </div>
        </div>
    );
};

export default CalculationsPanel;