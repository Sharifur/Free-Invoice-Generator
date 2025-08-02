import React, { createContext, useContext, useState, useEffect } from 'react';

const TemplateContext = createContext();

export const useTemplateSettings = () => {
    const context = useContext(TemplateContext);
    if (!context) {
        throw new Error('useTemplateSettings must be used within TemplateProvider');
    }
    return context;
};

export const TemplateProvider = ({ children }) => {
    const [templateSettings, setTemplateSettings] = useState(() => {
        // Try to load from localStorage
        const saved = localStorage.getItem('sig_template_settings');
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                console.error('Failed to parse saved template settings:', e);
            }
        }
        
        // Default template settings
        return {
            colorScheme: {
                primary: '#2c3e50',
                secondary: '#3498db',
                accent: '#e74c3c',
                text: '#333333',
                background: '#ffffff',
                border: '#dddddd'
            },
            font: 'Arial, sans-serif',
            layout: 'standard', // 'compact', 'standard', 'detailed'
            showLogo: true,
            logoPosition: 'left', // 'left', 'center', 'right'
            showHeader: true,
            showFooter: true,
            paperSize: 'letter' // 'letter', 'a4'
        };
    });
    
    // Save to localStorage whenever settings change
    useEffect(() => {
        localStorage.setItem('sig_template_settings', JSON.stringify(templateSettings));
    }, [templateSettings]);
    
    // Update color scheme
    const updateColorScheme = (color, value) => {
        setTemplateSettings(prev => ({
            ...prev,
            colorScheme: {
                ...prev.colorScheme,
                [color]: value
            }
        }));
    };
    
    // Update template setting
    const updateSetting = (setting, value) => {
        setTemplateSettings(prev => ({
            ...prev,
            [setting]: value
        }));
    };
    
    // Reset to defaults
    const resetTemplateSettings = () => {
        localStorage.removeItem('sig_template_settings');
        window.location.reload();
    };
    
    // Predefined color schemes
    const colorSchemes = {
        default: {
            primary: '#2c3e50',
            secondary: '#3498db',
            accent: '#e74c3c',
            text: '#333333',
            background: '#ffffff',
            border: '#dddddd'
        },
        professional: {
            primary: '#1a1a1a',
            secondary: '#4a4a4a',
            accent: '#0066cc',
            text: '#333333',
            background: '#ffffff',
            border: '#cccccc'
        },
        modern: {
            primary: '#6c5ce7',
            secondary: '#74b9ff',
            accent: '#fd79a8',
            text: '#2d3436',
            background: '#ffffff',
            border: '#dfe6e9'
        },
        corporate: {
            primary: '#34495e',
            secondary: '#95a5a6',
            accent: '#27ae60',
            text: '#2c3e50',
            background: '#ffffff',
            border: '#bdc3c7'
        },
        minimal: {
            primary: '#000000',
            secondary: '#666666',
            accent: '#000000',
            text: '#000000',
            background: '#ffffff',
            border: '#000000'
        }
    };
    
    // Apply predefined color scheme
    const applyColorScheme = (schemeName) => {
        if (colorSchemes[schemeName]) {
            setTemplateSettings(prev => ({
                ...prev,
                colorScheme: colorSchemes[schemeName]
            }));
        }
    };
    
    const value = {
        templateSettings,
        updateColorScheme,
        updateSetting,
        resetTemplateSettings,
        colorSchemes,
        applyColorScheme
    };
    
    return (
        <TemplateContext.Provider value={value}>
            {children}
        </TemplateContext.Provider>
    );
};