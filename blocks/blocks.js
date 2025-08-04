/**
 * Gutenberg Blocks for Invoice Generator Landing Page
 * Matches existing UI styling from invoice-generator.css
 */

import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InnerBlocks, InspectorControls, RichText } from '@wordpress/block-editor';
import { PanelBody, TextControl, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

// Import FAQ Section block
import './faq-section/src/index.js';

// Callout Block
registerBlockType('sig/callout-box', {
    title: __('Callout Box', 'simple-invoice-generator'),
    description: __('Highlight important information with a styled callout box', 'simple-invoice-generator'),
    category: 'sig-blocks',
    icon: 'megaphone',
    attributes: {
        title: {
            type: 'string',
            default: 'Important Information'
        },
        content: {
            type: 'string',
            default: 'This is an important callout message that draws attention to key information.'
        },
        calloutType: {
            type: 'string',
            default: 'info'
        },
        showIcon: {
            type: 'boolean',
            default: true
        },
        buttonText: {
            type: 'string',
            default: ''
        },
        buttonUrl: {
            type: 'string',
            default: ''
        }
    },
    edit: ({ attributes, setAttributes }) => {
        const blockProps = useBlockProps({
            className: `sig-callout sig-callout-${attributes.calloutType}`
        });

        return (
            <div {...blockProps}>
                <InspectorControls>
                    <PanelBody title={__('Callout Settings', 'simple-invoice-generator')}>
                        <TextControl
                            label={__('Title', 'simple-invoice-generator')}
                            value={attributes.title}
                            onChange={(value) => setAttributes({ title: value })}
                        />
                        <TextControl
                            label={__('Content', 'simple-invoice-generator')}
                            value={attributes.content}
                            onChange={(value) => setAttributes({ content: value })}
                        />
                        <select 
                            value={attributes.calloutType}
                            onChange={(e) => setAttributes({ calloutType: e.target.value })}
                            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                        >
                            <option value="info">Info (Blue)</option>
                            <option value="success">Success (Green)</option>
                            <option value="warning">Warning (Orange)</option>
                            <option value="error">Error (Red)</option>
                        </select>
                        <ToggleControl
                            label={__('Show Icon', 'simple-invoice-generator')}
                            checked={attributes.showIcon}
                            onChange={(value) => setAttributes({ showIcon: value })}
                        />
                        <TextControl
                            label={__('Button Text (Optional)', 'simple-invoice-generator')}
                            value={attributes.buttonText}
                            onChange={(value) => setAttributes({ buttonText: value })}
                        />
                        <TextControl
                            label={__('Button URL (Optional)', 'simple-invoice-generator')}
                            value={attributes.buttonUrl}
                            onChange={(value) => setAttributes({ buttonUrl: value })}
                        />
                    </PanelBody>
                </InspectorControls>
                
                <div className="sig-callout-header">
                    {attributes.showIcon && (
                        <div className="sig-callout-icon">
                            {attributes.calloutType === 'info' && '📌'}
                            {attributes.calloutType === 'success' && '✅'}
                            {attributes.calloutType === 'warning' && '⚠️'}
                            {attributes.calloutType === 'error' && '❌'}
                        </div>
                    )}
                    <h4 className="sig-callout-title">{attributes.title}</h4>
                </div>
                <div className="sig-callout-content">
                    <p>{attributes.content}</p>
                    {attributes.buttonText && (
                        <div className="sig-callout-button">
                            <button className="sig-btn sig-btn-primary">
                                {attributes.buttonText}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        );
    },
    save: ({ attributes }) => {
        const blockProps = useBlockProps.save({
            className: `sig-callout sig-callout-${attributes.calloutType} alignwide`
        });

        return (
            <div {...blockProps}>
                <div className="sig-callout-header">
                    {attributes.showIcon && (
                        <div className="sig-callout-icon">
                            {attributes.calloutType === 'info' && '📌'}
                            {attributes.calloutType === 'success' && '✅'}
                            {attributes.calloutType === 'warning' && '⚠️'}
                            {attributes.calloutType === 'error' && '❌'}
                        </div>
                    )}
                    <h4 className="sig-callout-title">{attributes.title}</h4>
                </div>
                <div className="sig-callout-content">
                    <p>{attributes.content}</p>
                    {attributes.buttonText && attributes.buttonUrl && (
                        <div className="sig-callout-button">
                            <a href={attributes.buttonUrl} className="sig-btn sig-btn-primary">
                                {attributes.buttonText}
                            </a>
                        </div>
                    )}
                </div>
            </div>
        );
    }
});

// Client Review Block
registerBlockType('sig/client-review', {
    title: __('Client Review', 'simple-invoice-generator'),
    description: __('Display individual client testimonial with photo and details', 'simple-invoice-generator'),
    category: 'sig-blocks',
    icon: 'format-quote',
    attributes: {
        reviewText: {
            type: 'string',
            default: 'This invoice generator has saved me hours of work. The templates are professional and easy to customize. Highly recommended for any freelancer or small business!'
        },
        clientName: {
            type: 'string',
            default: 'Sarah Johnson'
        },
        clientTitle: {
            type: 'string',
            default: 'Freelance Designer'
        },
        clientCompany: {
            type: 'string',
            default: 'Creative Studios'
        },
        clientPhoto: {
            type: 'string',
            default: ''
        },
        rating: {
            type: 'number',
            default: 5
        },
        reviewStyle: {
            type: 'string',
            default: 'card'
        }
    },
    edit: ({ attributes, setAttributes }) => {
        const blockProps = useBlockProps({
            className: `sig-review sig-review-${attributes.reviewStyle}`
        });

        return (
            <div {...blockProps}>
                <InspectorControls>
                    <PanelBody title={__('Review Settings', 'simple-invoice-generator')}>
                        <TextControl
                            label={__('Client Name', 'simple-invoice-generator')}
                            value={attributes.clientName}
                            onChange={(value) => setAttributes({ clientName: value })}
                        />
                        <TextControl
                            label={__('Client Title', 'simple-invoice-generator')}
                            value={attributes.clientTitle}
                            onChange={(value) => setAttributes({ clientTitle: value })}
                        />
                        <TextControl
                            label={__('Client Company', 'simple-invoice-generator')}
                            value={attributes.clientCompany}
                            onChange={(value) => setAttributes({ clientCompany: value })}
                        />
                        <TextControl
                            label={__('Photo URL', 'simple-invoice-generator')}
                            value={attributes.clientPhoto}
                            onChange={(value) => setAttributes({ clientPhoto: value })}
                        />
                        <label>{__('Rating (1-5 stars)', 'simple-invoice-generator')}</label>
                        <input
                            type="range"
                            min="1"
                            max="5"
                            value={attributes.rating}
                            onChange={(e) => setAttributes({ rating: parseInt(e.target.value) })}
                            style={{ width: '100%', marginBottom: '10px' }}
                        />
                        <p>Rating: {attributes.rating} stars</p>
                        <select
                            value={attributes.reviewStyle}
                            onChange={(e) => setAttributes({ reviewStyle: e.target.value })}
                            style={{ width: '100%', padding: '8px' }}
                        >
                            <option value="card">Card Style</option>
                            <option value="minimal">Minimal Style</option>
                            <option value="featured">Featured Style</option>
                        </select>
                    </PanelBody>
                </InspectorControls>
                
                <div className="sig-review-container">
                    <div className="sig-review-content">
                        <div className="sig-review-rating">
                            {[...Array(5)].map((_, i) => (
                                <span key={i} className={i < attributes.rating ? 'star filled' : 'star'}>
                                    ⭐
                                </span>
                            ))}
                        </div>
                        <blockquote className="sig-review-text">
                            "{attributes.reviewText}"
                        </blockquote>
                    </div>
                    <div className="sig-review-author">
                        {attributes.clientPhoto && (
                            <div className="sig-review-photo">
                                <img src={attributes.clientPhoto} alt={attributes.clientName} />
                            </div>
                        )}
                        <div className="sig-review-details">
                            <h5 className="sig-client-name">{attributes.clientName}</h5>
                            <p className="sig-client-title">{attributes.clientTitle}</p>
                            {attributes.clientCompany && (
                                <p className="sig-client-company">{attributes.clientCompany}</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    },
    save: ({ attributes }) => {
        const blockProps = useBlockProps.save({
            className: `sig-review sig-review-${attributes.reviewStyle} alignwide`
        });

        return (
            <div {...blockProps}>
                <div className="sig-review-container">
                    <div className="sig-review-content">
                        <div className="sig-review-rating">
                            {[...Array(attributes.rating)].map((_, i) => (
                                <span key={i} className="star filled">⭐</span>
                            ))}
                        </div>
                        <blockquote className="sig-review-text">
                            "{attributes.reviewText}"
                        </blockquote>
                    </div>
                    <div className="sig-review-author">
                        {attributes.clientPhoto && (
                            <div className="sig-review-photo">
                                <img src={attributes.clientPhoto} alt={attributes.clientName} />
                            </div>
                        )}
                        <div className="sig-review-details">
                            <h5 className="sig-client-name">{attributes.clientName}</h5>
                            <p className="sig-client-title">{attributes.clientTitle}</p>
                            {attributes.clientCompany && (
                                <p className="sig-client-company">{attributes.clientCompany}</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});