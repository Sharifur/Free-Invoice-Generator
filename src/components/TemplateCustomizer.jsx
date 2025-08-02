import React from 'react';
import { useTemplateSettings } from '../hooks/useTemplateSettings';

const TemplateCustomizer = ({ onClose }) => {
    const { 
        templateSettings, 
        updateColorScheme, 
        updateSetting, 
        colorSchemes, 
        applyColorScheme,
        resetTemplateSettings 
    } = useTemplateSettings();
    
    const fonts = [
        { value: 'Arial, sans-serif', label: 'Arial' },
        { value: 'Helvetica, sans-serif', label: 'Helvetica' },
        { value: 'Georgia, serif', label: 'Georgia' },
        { value: 'Times New Roman, serif', label: 'Times New Roman' },
        { value: 'Courier New, monospace', label: 'Courier New' },
        { value: 'Verdana, sans-serif', label: 'Verdana' },
        { value: 'Trebuchet MS, sans-serif', label: 'Trebuchet MS' },
        { value: 'Palatino, serif', label: 'Palatino' },
    ];

    const layouts = [
        {
            value: 'compact',
            label: 'Compact',
            description: 'Clean and space-efficient',
            svg: (
                <svg viewBox="0 0 100 120" className="sig-layout-preview">
                    <rect x="10" y="10" width="80" height="8" fill="#e0e0e0" rx="1"/>
                    <rect x="10" y="22" width="40" height="4" fill="#ccc" rx="1"/>
                    <rect x="55" y="22" width="35" height="4" fill="#ccc" rx="1"/>
                    <rect x="10" y="35" width="80" height="3" fill="#3498db" rx="1"/>
                    <rect x="10" y="42" width="80" height="2" fill="#f0f0f0" rx="1"/>
                    <rect x="10" y="47" width="80" height="2" fill="#f0f0f0" rx="1"/>
                    <rect x="10" y="52" width="80" height="2" fill="#f0f0f0" rx="1"/>
                    <rect x="65" y="65" width="25" height="15" fill="#f8f8f8" stroke="#ddd" rx="2"/>
                    <rect x="67" y="67" width="8" height="1.5" fill="#666" rx="0.5"/>
                    <rect x="67" y="70" width="12" height="1.5" fill="#666" rx="0.5"/>
                    <rect x="67" y="73" width="10" height="1.5" fill="#666" rx="0.5"/>
                    <rect x="67" y="76" width="15" height="2" fill="#2c3e50" rx="1"/>
                </svg>
            )
        },
        {
            value: 'standard',
            label: 'Standard',
            description: 'Balanced layout with good spacing',
            svg: (
                <svg viewBox="0 0 100 120" className="sig-layout-preview">
                    <rect x="8" y="8" width="84" height="10" fill="#e0e0e0" rx="2"/>
                    <rect x="8" y="22" width="42" height="5" fill="#ccc" rx="1"/>
                    <rect x="54" y="22" width="38" height="5" fill="#ccc" rx="1"/>
                    <rect x="8" y="35" width="84" height="4" fill="#3498db" rx="1"/>
                    <rect x="8" y="44" width="84" height="3" fill="#f0f0f0" rx="1"/>
                    <rect x="8" y="50" width="84" height="3" fill="#f0f0f0" rx="1"/>
                    <rect x="8" y="56" width="84" height="3" fill="#f0f0f0" rx="1"/>
                    <rect x="8" y="62" width="84" height="3" fill="#f0f0f0" rx="1"/>
                    <rect x="62" y="75" width="30" height="20" fill="#f8f8f8" stroke="#ddd" rx="2"/>
                    <rect x="65" y="78" width="10" height="2" fill="#666" rx="0.5"/>
                    <rect x="65" y="82" width="15" height="2" fill="#666" rx="0.5"/>
                    <rect x="65" y="86" width="12" height="2" fill="#666" rx="0.5"/>
                    <rect x="65" y="91" width="18" height="2.5" fill="#2c3e50" rx="1"/>
                </svg>
            )
        },
        {
            value: 'detailed',
            label: 'Detailed',
            description: 'Spacious with extra information',
            svg: (
                <svg viewBox="0 0 100 120" className="sig-layout-preview">
                    <rect x="6" y="6" width="88" height="12" fill="#e0e0e0" rx="2"/>
                    <rect x="6" y="22" width="44" height="6" fill="#ccc" rx="1"/>
                    <rect x="54" y="22" width="40" height="6" fill="#ccc" rx="1"/>
                    <rect x="6" y="35" width="88" height="5" fill="#3498db" rx="1"/>
                    <rect x="6" y="45" width="88" height="4" fill="#f0f0f0" rx="1"/>
                    <rect x="6" y="52" width="88" height="4" fill="#f0f0f0" rx="1"/>
                    <rect x="6" y="59" width="88" height="4" fill="#f0f0f0" rx="1"/>
                    <rect x="6" y="66" width="88" height="4" fill="#f0f0f0" rx="1"/>
                    <rect x="58" y="80" width="36" height="25" fill="#f8f8f8" stroke="#ddd" rx="2"/>
                    <rect x="61" y="84" width="12" height="2" fill="#666" rx="0.5"/>
                    <rect x="61" y="88" width="18" height="2" fill="#666" rx="0.5"/>
                    <rect x="61" y="92" width="15" height="2" fill="#666" rx="0.5"/>
                    <rect x="61" y="96" width="20" height="2" fill="#666" rx="0.5"/>
                    <rect x="61" y="100" width="22" height="3" fill="#2c3e50" rx="1"/>
                </svg>
            )
        },
        {
            value: 'modern',
            label: 'Modern',
            description: 'Contemporary design with gradients',
            svg: (
                <svg viewBox="0 0 100 120" className="sig-layout-preview">
                    <defs>
                        <linearGradient id="modernGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#f8f9fa"/>
                            <stop offset="100%" stopColor="#e3f2fd"/>
                        </linearGradient>
                    </defs>
                    <rect x="5" y="5" width="90" height="110" fill="url(#modernGradient)" rx="6"/>
                    <rect x="12" y="12" width="76" height="12" fill="#ffffff" rx="3" opacity="0.9"/>
                    <rect x="12" y="28" width="38" height="5" fill="#90a4ae" rx="1"/>
                    <rect x="54" y="28" width="34" height="5" fill="#90a4ae" rx="1"/>
                    <rect x="12" y="40" width="76" height="4" fill="#2196f3" rx="2"/>
                    <rect x="12" y="48" width="76" height="2.5" fill="#e3f2fd" rx="1"/>
                    <rect x="12" y="53" width="76" height="2.5" fill="#e3f2fd" rx="1"/>
                    <rect x="12" y="58" width="76" height="2.5" fill="#e3f2fd" rx="1"/>
                    <rect x="58" y="70" width="30" height="20" fill="#ffffff" rx="4" opacity="0.9"/>
                    <rect x="61" y="73" width="10" height="1.5" fill="#546e7a" rx="0.5"/>
                    <rect x="61" y="76" width="15" height="1.5" fill="#546e7a" rx="0.5"/>
                    <rect x="61" y="79" width="12" height="1.5" fill="#546e7a" rx="0.5"/>
                    <rect x="61" y="84" width="18" height="3" fill="#1976d2" rx="1.5"/>
                </svg>
            )
        },
        {
            value: 'classic',
            label: 'Classic',
            description: 'Traditional formal business style',
            svg: (
                <svg viewBox="0 0 100 120" className="sig-layout-preview">
                    <rect x="8" y="8" width="84" height="104" fill="#ffffff" stroke="#2c3e50" strokeWidth="2" rx="1"/>
                    <rect x="12" y="12" width="76" height="10" fill="#f8f9fa" stroke="#2c3e50" strokeWidth="1" rx="1"/>
                    <rect x="12" y="26" width="38" height="5" fill="#6c757d" rx="1"/>
                    <rect x="54" y="26" width="34" height="5" fill="#6c757d" rx="1"/>
                    <rect x="12" y="38" width="76" height="1" fill="#2c3e50"/>
                    <rect x="12" y="42" width="76" height="4" fill="none" stroke="#2c3e50" strokeWidth="1" rx="1"/>
                    <rect x="12" y="49" width="76" height="1" fill="#2c3e50"/>
                    <rect x="12" y="54" width="76" height="3" fill="#f8f9fa" rx="1"/>
                    <rect x="12" y="60" width="76" height="3" fill="#f8f9fa" rx="1"/>
                    <rect x="12" y="66" width="76" height="3" fill="#f8f9fa" rx="1"/>
                    <rect x="58" y="78" width="30" height="22" fill="#ffffff" stroke="#495057" strokeWidth="1" rx="2"/>
                    <rect x="61" y="82" width="10" height="2" fill="#495057" rx="0.5"/>
                    <rect x="61" y="86" width="15" height="2" fill="#495057" rx="0.5"/>
                    <rect x="61" y="90" width="12" height="2" fill="#495057" rx="0.5"/>
                    <rect x="61" y="95" width="18" height="3" fill="#2c3e50" rx="1"/>
                </svg>
            )
        },
        {
            value: 'minimal',
            label: 'Minimal',
            description: 'Clean and simple design',
            svg: (
                <svg viewBox="0 0 100 120" className="sig-layout-preview">
                    <rect x="5" y="5" width="90" height="110" fill="#ffffff" stroke="#e9ecef" strokeWidth="1" rx="2"/>
                    <rect x="15" y="15" width="70" height="8" fill="#f8f9fa" rx="1"/>
                    <rect x="15" y="28" width="35" height="4" fill="#adb5bd" rx="1"/>
                    <rect x="54" y="28" width="31" height="4" fill="#adb5bd" rx="1"/>
                    <rect x="15" y="38" width="70" height="1" fill="#dee2e6"/>
                    <rect x="15" y="45" width="70" height="2" fill="#f8f9fa" rx="1"/>
                    <rect x="15" y="50" width="70" height="2" fill="#f8f9fa" rx="1"/>
                    <rect x="15" y="55" width="70" height="2" fill="#f8f9fa" rx="1"/>
                    <rect x="15" y="60" width="70" height="2" fill="#f8f9fa" rx="1"/>
                    <rect x="55" y="75" width="30" height="20" fill="#ffffff" stroke="#e9ecef" strokeWidth="1" rx="2"/>
                    <rect x="58" y="78" width="8" height="1.5" fill="#6c757d" rx="0.5"/>
                    <rect x="58" y="81" width="12" height="1.5" fill="#6c757d" rx="0.5"/>
                    <rect x="58" y="84" width="10" height="1.5" fill="#6c757d" rx="0.5"/>
                    <rect x="58" y="89" width="15" height="2.5" fill="#495057" rx="1"/>
                </svg>
            )
        }
    ];
    
    return (
        <div className="sig-template-customizer">
            <div className="sig-customizer-header">
                <h3>Customize Template</h3>
                <button onClick={onClose} className="sig-close-btn">×</button>
            </div>
            
            <div className="sig-customizer-content">
                <div className="sig-customizer-section">
                    <h4>Invoice Layout</h4>
                    <div className="sig-layout-grid">
                        {layouts.map((layout) => (
                            <div
                                key={layout.value}
                                className={`sig-layout-option ${templateSettings.layout === layout.value ? 'active' : ''}`}
                                onClick={() => updateSetting('layout', layout.value)}
                                title={layout.description}
                            >
                                <div className="sig-layout-preview-container">
                                    {layout.svg}
                                </div>
                                <div className="sig-layout-info">
                                    <span className="sig-layout-label">{layout.label}</span>
                                    <span className="sig-layout-description">{layout.description}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="sig-customizer-section">
                    <h4>Color Schemes</h4>
                    <div className="sig-color-schemes">
                        {Object.entries(colorSchemes).map(([name, scheme]) => {
                            const isActive = JSON.stringify(templateSettings.colorScheme) === JSON.stringify(scheme);
                            return (
                                <button
                                    key={name}
                                    onClick={() => applyColorScheme(name)}
                                    className={`sig-color-scheme-btn ${isActive ? 'active' : ''}`}
                                    style={{
                                        background: `linear-gradient(135deg, ${scheme.primary} 0%, ${scheme.secondary} 50%, ${scheme.accent} 100%)`,
                                        color: scheme.background,
                                    }}
                                    title={`${name.charAt(0).toUpperCase() + name.slice(1)} Theme`}
                                >
                                    <span style={{ 
                                        background: 'rgba(0,0,0,0.6)', 
                                        padding: '2px 6px', 
                                        borderRadius: '3px',
                                        fontSize: '9px'
                                    }}>
                                        {name.charAt(0).toUpperCase() + name.slice(1)}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>
                
                <div className="sig-customizer-section">
                    <h4>Custom Colors</h4>
                    <div className="sig-color-inputs">
                        {Object.entries(templateSettings.colorScheme).map(([color, value]) => (
                            <div key={color} className="sig-color-input-group">
                                <label>{color.charAt(0).toUpperCase() + color.slice(1)}</label>
                                <div className="sig-color-input-wrapper">
                                    <input
                                        type="color"
                                        value={value}
                                        onChange={(e) => updateColorScheme(color, e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        value={value}
                                        onChange={(e) => updateColorScheme(color, e.target.value)}
                                        pattern="^#[0-9A-Fa-f]{6}$"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="sig-customizer-section">
                    <h4>Typography</h4>
                    <div className="sig-form-group">
                        <label>Font Family</label>
                        <select
                            value={templateSettings.font}
                            onChange={(e) => updateSetting('font', e.target.value)}
                        >
                            {fonts.map(font => (
                                <option key={font.value} value={font.value}>
                                    {font.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                
                <div className="sig-customizer-section">
                    <h4>Page Settings</h4>
                    <div className="sig-form-group">
                        <label>Paper Size</label>
                        <select
                            value={templateSettings.paperSize}
                            onChange={(e) => updateSetting('paperSize', e.target.value)}
                        >
                            <option value="letter">Letter (8.5" × 11")</option>
                            <option value="a4">A4 (210mm × 297mm)</option>
                        </select>
                    </div>
                    
                    {templateSettings.showLogo && (
                        <div className="sig-form-group">
                            <label>Logo Position</label>
                            <select
                                value={templateSettings.logoPosition}
                                onChange={(e) => updateSetting('logoPosition', e.target.value)}
                            >
                                <option value="left">Left</option>
                                <option value="center">Center</option>
                                <option value="right">Right</option>
                            </select>
                        </div>
                    )}
                    
                    <div className="sig-checkbox-group">
                        <label>
                            <input
                                type="checkbox"
                                checked={templateSettings.showLogo}
                                onChange={(e) => updateSetting('showLogo', e.target.checked)}
                            />
                            Show Company Logo
                        </label>
                        
                        
                        <label>
                            <input
                                type="checkbox"
                                checked={templateSettings.showHeader}
                                onChange={(e) => updateSetting('showHeader', e.target.checked)}
                            />
                            Show Header
                        </label>
                        
                        <label>
                            <input
                                type="checkbox"
                                checked={templateSettings.showFooter}
                                onChange={(e) => updateSetting('showFooter', e.target.checked)}
                            />
                            Show Footer
                        </label>
                    </div>
                </div>
                
                <div className="sig-customizer-actions">
                    <button 
                        onClick={resetTemplateSettings}
                        className="sig-btn sig-btn-secondary"
                    >
                        Reset to Defaults
                    </button>
                    <button 
                        onClick={onClose}
                        className="sig-btn sig-btn-primary"
                    >
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TemplateCustomizer;