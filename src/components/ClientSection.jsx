import React from 'react';
import { useInvoiceData } from '../hooks/useInvoiceData';

const ClientSection = () => {
    const { invoiceData, updateClient } = useInvoiceData();
    
    return (
        <div className="sig-section sig-client-section">
            <h3>Bill To</h3>
            
            <div className="sig-form-group">
                <label htmlFor="client-name">Client Name</label>
                <input 
                    id="client-name"
                    type="text"
                    value={invoiceData.client.name}
                    onChange={(e) => updateClient('name', e.target.value)}
                    placeholder="Client or Company Name"
                />
            </div>
            
            <div className="sig-form-group">
                <label htmlFor="client-address">Address</label>
                <textarea 
                    id="client-address"
                    value={invoiceData.client.address}
                    onChange={(e) => updateClient('address', e.target.value)}
                    placeholder="456 Client Street&#10;City, State 54321"
                    rows="3"
                />
            </div>
            
            <div className="sig-form-group">
                <label htmlFor="client-email">Email</label>
                <input 
                    id="client-email"
                    type="email"
                    value={invoiceData.client.email}
                    onChange={(e) => updateClient('email', e.target.value)}
                    placeholder="client@example.com"
                />
            </div>
            
            <div className="sig-form-group">
                <label htmlFor="client-phone">Phone</label>
                <input 
                    id="client-phone"
                    type="tel"
                    value={invoiceData.client.phone}
                    onChange={(e) => updateClient('phone', e.target.value)}
                    placeholder="(555) 123-4567"
                />
            </div>
        </div>
    );
};

export default ClientSection;