import { useState, useEffect, useCallback } from 'react';

const DEFAULT_QUOTATION_DATA = {
    company: {
        name: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        country: '',
        email: '',
        phone: '',
        website: '',
        logo: ''
    },
    client: {
        name: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        country: ''
    },
    number: '',
    date: new Date().toISOString().split('T')[0],
    validUntil: '',
    title: 'QUOTATION',
    lineItems: [{
        description: '',
        details: '',
        quantity: 1,
        rate: 0
    }],
    subtotal: 0,
    taxRate: 0,
    taxAmount: 0,
    discountType: 'percentage',
    discountValue: 0,
    discountAmount: 0,
    total: 0,
    notes: 'Thank you for considering our services. We look forward to working with you and delivering exceptional results that meet your requirements.',
    terms: 'This quotation is valid for 30 days from the date issued. Prices are subject to change after the validity period. A 50% deposit is required to commence work, with the balance due upon completion. All work will be completed within the specified timeframe unless otherwise agreed. Any additional requirements not specified in this quotation will be subject to separate charges.'
};

export const useQuotationData = () => {
    const [quotationData, setQuotationData] = useState(DEFAULT_QUOTATION_DATA);

    // Load data from localStorage on mount
    useEffect(() => {
        const savedData = localStorage.getItem('taskip_quotation_data');
        if (savedData) {
            try {
                const parsedData = JSON.parse(savedData);
                setQuotationData(prevData => ({
                    ...DEFAULT_QUOTATION_DATA,
                    ...parsedData
                }));
            } catch (error) {
                console.error('Error parsing saved quotation data:', error);
            }
        }
    }, []);


    // Calculate totals whenever line items or tax/discount change
    useEffect(() => {
        calculateTotals();
    }, [quotationData.lineItems, quotationData.taxRate, quotationData.discountType, quotationData.discountValue]);

    // Generate quote number if empty
    useEffect(() => {
        if (!quotationData.number) {
            const savedCounter = localStorage.getItem('taskip_quotation_counter') || '0';
            const nextNumber = parseInt(savedCounter) + 1;
            const formattedNumber = `QUO-${nextNumber.toString().padStart(3, '0')}`;
            
            setQuotationData(prevData => ({
                ...prevData,
                number: formattedNumber
            }));
            
            localStorage.setItem('taskip_quotation_counter', nextNumber.toString());
        }
    }, [quotationData.number]);

    const calculateTotals = useCallback(() => {
        const subtotal = quotationData.lineItems.reduce((sum, item) => {
            return sum + ((item.quantity || 0) * (item.rate || 0));
        }, 0);

        let discountAmount = 0;
        if (quotationData.discountType === 'percentage') {
            discountAmount = subtotal * (quotationData.discountValue / 100);
        } else {
            discountAmount = quotationData.discountValue;
        }

        const afterDiscount = subtotal - discountAmount;
        const taxAmount = afterDiscount * (quotationData.taxRate / 100);
        const total = afterDiscount + taxAmount;

        setQuotationData(prevData => ({
            ...prevData,
            subtotal,
            discountAmount,
            taxAmount,
            total
        }));
    }, [quotationData.lineItems, quotationData.taxRate, quotationData.discountType, quotationData.discountValue]);

    const updateQuotationData = useCallback((updates) => {
        setQuotationData(prevData => {
            const newData = { ...prevData, ...updates };
            
            // Save to localStorage
            try {
                localStorage.setItem('taskip_quotation_data', JSON.stringify(newData));
            } catch (error) {
                console.error('Error saving quotation data:', error);
            }
            
            return newData;
        });
    }, []);

    const addLineItem = useCallback(() => {
        setQuotationData(prevData => ({
            ...prevData,
            lineItems: [
                ...prevData.lineItems,
                {
                    description: '',
                    details: '',
                    quantity: 1,
                    rate: 0
                }
            ]
        }));
    }, []);

    const removeLineItem = useCallback((index) => {
        setQuotationData(prevData => ({
            ...prevData,
            lineItems: prevData.lineItems.filter((_, i) => i !== index)
        }));
    }, []);

    const updateLineItem = useCallback((index, updates) => {
        setQuotationData(prevData => ({
            ...prevData,
            lineItems: prevData.lineItems.map((item, i) => 
                i === index ? { ...item, ...updates } : item
            )
        }));
    }, []);

    const resetQuotationData = useCallback(() => {
        setQuotationData(DEFAULT_QUOTATION_DATA);
        localStorage.removeItem('taskip_quotation_data');
    }, []);

    const duplicateQuotation = useCallback(() => {
        const duplicatedData = {
            ...quotationData,
            number: '', // Will be auto-generated
            date: new Date().toISOString().split('T')[0]
        };
        
        setQuotationData(duplicatedData);
        localStorage.setItem('taskip_quotation_data', JSON.stringify(duplicatedData));
    }, [quotationData]);

    const reorderLineItems = useCallback((startIndex, endIndex) => {
        setQuotationData(prevData => {
            const newLineItems = [...prevData.lineItems];
            const [removed] = newLineItems.splice(startIndex, 1);
            newLineItems.splice(endIndex, 0, removed);
            
            const newData = { ...prevData, lineItems: newLineItems };
            localStorage.setItem('taskip_quotation_data', JSON.stringify(newData));
            return newData;
        });
    }, []);

    return {
        quotationData,
        updateQuotationData,
        addLineItem,
        removeLineItem,
        updateLineItem,
        resetQuotationData,
        duplicateQuotation,
        reorderLineItems
    };
};