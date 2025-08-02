import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const InvoiceContext = createContext();

export const useInvoiceData = () => {
    const context = useContext(InvoiceContext);
    if (!context) {
        throw new Error('useInvoiceData must be used within InvoiceProvider');
    }
    return context;
};

export const InvoiceProvider = ({ children, config }) => {
    const [invoiceData, setInvoiceData] = useState(() => {
        // Load user preferences (persistent across resets)
        const userPrefs = localStorage.getItem('sig_user_preferences');
        let savedPrefs = {};
        if (userPrefs) {
            try {
                savedPrefs = JSON.parse(userPrefs);
            } catch (e) {
                console.error('Failed to parse user preferences:', e);
            }
        }

        // Try to load invoice data (reset when new invoice is created)
        const saved = localStorage.getItem('sig_invoice_data');
        if (saved) {
            try {
                const invoiceData = JSON.parse(saved);
                // Merge with user preferences to ensure they're always applied
                return {
                    ...invoiceData,
                    company: {
                        ...invoiceData.company,
                        name: savedPrefs.companyName || invoiceData.company.name,
                        logo: savedPrefs.companyLogo || invoiceData.company.logo,
                    },
                    invoice: {
                        ...invoiceData.invoice,
                        currency: savedPrefs.defaultCurrency || invoiceData.invoice.currency,
                    }
                };
            } catch (e) {
                console.error('Failed to parse saved invoice data:', e);
            }
        }
        
        // Default invoice data with user preferences applied
        return {
            // Company info
            company: {
                name: savedPrefs.companyName || '',
                logo: savedPrefs.companyLogo || null,
                address: '',
                phone: '',
                email: '',
                website: ''
            },
            // Invoice config
            invoice: {
                number: savedPrefs.lastInvoiceNumber ? savedPrefs.lastInvoiceNumber : 'INV-' + new Date().getFullYear() + '-001',
                date: new Date().toISOString().split('T')[0],
                dueDate: '',
                currency: savedPrefs.defaultCurrency || config.currency || 'USD',
                numberPrefix: 'INV-',
                numberSuffix: ''
            },
            // Client info
            client: {
                name: '',
                address: '',
                email: '',
                phone: ''
            },
            // Line items
            lineItems: [
                {
                    id: uuidv4(),
                    description: '',
                    quantity: 1,
                    rate: 0,
                    amount: 0
                }
            ],
            // Financial
            financial: {
                subtotal: 0,
                discount: 0,
                discountType: 'percentage', // 'percentage' or 'fixed'
                shipping: 0,
                shippingDescription: '',
                taxRate: 0,
                tax: 0,
                total: 0
            },
            // Additional
            termsAndConditions: '',
            paymentInstructions: '',
            notes: '',
            footerMessage: 'Thank you for your business!'
        };
    });
    
    // Helper function to save user preferences
    const saveUserPreferences = (updates) => {
        const currentPrefs = localStorage.getItem('sig_user_preferences');
        let prefs = {};
        if (currentPrefs) {
            try {
                prefs = JSON.parse(currentPrefs);
            } catch (e) {
                console.error('Failed to parse user preferences:', e);
            }
        }
        
        const updatedPrefs = { ...prefs, ...updates };
        localStorage.setItem('sig_user_preferences', JSON.stringify(updatedPrefs));
    };

    // Save to localStorage whenever data changes
    useEffect(() => {
        localStorage.setItem('sig_invoice_data', JSON.stringify(invoiceData));
    }, [invoiceData]);
    
    // Update company info
    const updateCompany = (field, value) => {
        setInvoiceData(prev => ({
            ...prev,
            company: {
                ...prev.company,
                [field]: value
            }
        }));
        
        // Save specific fields to user preferences for persistence
        if (field === 'name') {
            saveUserPreferences({ companyName: value });
        } else if (field === 'logo') {
            saveUserPreferences({ companyLogo: value });
        }
    };
    
    // Update invoice config
    const updateInvoice = (field, value) => {
        setInvoiceData(prev => ({
            ...prev,
            invoice: {
                ...prev.invoice,
                [field]: value
            }
        }));
        
        // Save specific fields to user preferences for persistence
        if (field === 'currency') {
            saveUserPreferences({ defaultCurrency: value });
        } else if (field === 'number') {
            saveUserPreferences({ lastInvoiceNumber: value });
        }
    };
    
    // Update client info
    const updateClient = (field, value) => {
        setInvoiceData(prev => ({
            ...prev,
            client: {
                ...prev.client,
                [field]: value
            }
        }));
    };
    
    // Add line item
    const addLineItem = () => {
        const newItem = {
            id: uuidv4(),
            description: '',
            quantity: 1,
            rate: 0,
            amount: 0
        };
        
        setInvoiceData(prev => ({
            ...prev,
            lineItems: [...prev.lineItems, newItem]
        }));
    };
    
    // Update line item
    const updateLineItem = (id, field, value) => {
        setInvoiceData(prev => {
            const updatedItems = prev.lineItems.map(item => {
                if (item.id === id) {
                    const updated = { ...item, [field]: value };
                    // Recalculate amount
                    if (field === 'quantity' || field === 'rate') {
                        updated.amount = parseFloat(updated.quantity) * parseFloat(updated.rate) || 0;
                    }
                    return updated;
                }
                return item;
            });
            
            return {
                ...prev,
                lineItems: updatedItems
            };
        });
    };
    
    // Remove line item
    const removeLineItem = (id) => {
        setInvoiceData(prev => ({
            ...prev,
            lineItems: prev.lineItems.filter(item => item.id !== id)
        }));
    };
    
    // Update line items order (for drag and drop)
    const updateLineItemsOrder = (newItems) => {
        setInvoiceData(prev => ({
            ...prev,
            lineItems: newItems
        }));
    };
    
    // Update financial data
    const updateFinancial = (field, value) => {
        setInvoiceData(prev => ({
            ...prev,
            financial: {
                ...prev.financial,
                [field]: value
            }
        }));
    };
    
    // Update additional fields
    const updateAdditional = (field, value) => {
        setInvoiceData(prev => ({
            ...prev,
            [field]: value
        }));
    };
    
    // Reset invoice
    const resetInvoice = () => {
        const confirmed = window.confirm('Are you sure you want to reset the invoice? Your company information will be preserved.');
        if (confirmed) {
            // Load user preferences to preserve them
            const userPrefs = localStorage.getItem('sig_user_preferences');
            let savedPrefs = {};
            if (userPrefs) {
                try {
                    savedPrefs = JSON.parse(userPrefs);
                } catch (e) {
                    console.error('Failed to parse user preferences:', e);
                }
            }
            
            // Remove current invoice data
            localStorage.removeItem('sig_invoice_data');
            
            // Generate new invoice number if we have a saved number
            let newInvoiceNumber = 'INV-' + new Date().getFullYear() + '-001';
            if (savedPrefs.lastInvoiceNumber) {
                // Try to increment the invoice number
                const match = savedPrefs.lastInvoiceNumber.match(/(\d+)$/);
                if (match) {
                    const currentNum = parseInt(match[1]);
                    const newNum = (currentNum + 1).toString().padStart(match[1].length, '0');
                    newInvoiceNumber = savedPrefs.lastInvoiceNumber.replace(/\d+$/, newNum);
                }
            }
            
            // Update user preferences with new invoice number
            saveUserPreferences({ lastInvoiceNumber: newInvoiceNumber });
            
            // Reload to reinitialize with preserved preferences
            window.location.reload();
        }
    };
    
    const value = {
        invoiceData,
        config,
        updateCompany,
        updateInvoice,
        updateClient,
        addLineItem,
        updateLineItem,
        removeLineItem,
        updateLineItemsOrder,
        updateFinancial,
        updateAdditional,
        resetInvoice
    };
    
    return (
        <InvoiceContext.Provider value={value}>
            {children}
        </InvoiceContext.Provider>
    );
};