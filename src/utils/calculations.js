export const calculateTotals = (invoiceData) => {
    // Calculate subtotal
    const subtotal = invoiceData.lineItems.reduce((sum, item) => {
        return sum + (parseFloat(item.amount) || 0);
    }, 0);
    
    // Calculate discount amount
    let discountAmount = 0;
    if (invoiceData.financial.discount > 0) {
        if (invoiceData.financial.discountType === 'percentage') {
            discountAmount = subtotal * (invoiceData.financial.discount / 100);
        } else {
            discountAmount = invoiceData.financial.discount;
        }
    }
    
    // Calculate tax base (subtotal - discount + shipping)
    const taxBase = subtotal - discountAmount + (parseFloat(invoiceData.financial.shipping) || 0);
    
    // Calculate tax
    const tax = taxBase * (invoiceData.financial.taxRate / 100);
    
    // Calculate total
    const total = taxBase + tax;
    
    return {
        subtotal,
        discountAmount,
        tax,
        total
    };
};

export const formatCurrency = (amount, currency = 'USD') => {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    
    return formatter.format(amount);
};

export const getCurrencySymbol = (currency) => {
    const symbols = {
        USD: '$',
        EUR: '€',
        GBP: '£',
        CAD: 'C$',
        AUD: 'A$',
        JPY: '¥',
        CNY: '¥',
        INR: '₹',
        CHF: 'CHF',
        SEK: 'kr',
        NZD: 'NZ$',
        SGD: 'S$',
        HKD: 'HK$',
        NOK: 'kr',
        MXN: '$',
    };
    
    return symbols[currency] || currency;
};