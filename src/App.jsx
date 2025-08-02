import React, { useState, useEffect } from 'react';
import InvoiceGenerator from './components/InvoiceGenerator';
import { InvoiceProvider } from './hooks/useInvoiceData';
import { TemplateProvider } from './hooks/useTemplateSettings';

const App = ({ config }) => {
    return (
        <InvoiceProvider config={config}>
            <TemplateProvider>
                <InvoiceGenerator />
            </TemplateProvider>
        </InvoiceProvider>
    );
};

export default App;