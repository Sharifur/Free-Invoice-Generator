import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
    // Find all invoice generator containers
    const containers = document.querySelectorAll('[id^="sig-invoice-generator-"]');
    
    containers.forEach(container => {
        if (container && window.sigConfig) {
            // Get config for this specific container
            const config = { ...window.sigConfig };
            config.container = container.id;
            
            ReactDOM.render(
                <App config={config} />,
                container
            );
        }
    });
});