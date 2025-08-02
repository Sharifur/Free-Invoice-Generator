<?php
/**
 * Handle script and style enqueuing
 */

if (!defined('ABSPATH')) {
    exit;
}

class SIG_Enqueue {
    
    /**
     * Register scripts and styles
     */
    public function register_assets() {
        // Ensure React is available
        if (!wp_script_is('react', 'registered')) {
            wp_register_script(
                'react',
                'https://unpkg.com/react@18/umd/react.production.min.js',
                array(),
                '18.2.0'
            );
        }
        
        if (!wp_script_is('react-dom', 'registered')) {
            wp_register_script(
                'react-dom',
                'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js',
                array('react'),
                '18.2.0'
            );
        }
        
        // Register React app script
        wp_register_script(
            'sig-invoice-app',
            SIG_PLUGIN_URL . 'dist/app.js',
            array('react', 'react-dom', 'wp-element', 'wp-components', 'wp-i18n'),
            SIG_VERSION,
            true
        );
        
        // Register styles
        wp_register_style(
            'sig-invoice-styles',
            SIG_PLUGIN_URL . 'assets/css/invoice-generator.css',
            array(),
            SIG_VERSION
        );
    }
    
    /**
     * Enqueue frontend scripts and styles
     */
    public function enqueue_frontend() {
        global $post;
        
        // Check if we should enqueue based on settings
        $target_page_id = get_option('sig_target_page_id', '');
        
        if (!empty($target_page_id)) {
            // If a specific page is set, only enqueue on that page
            if (!is_page($target_page_id)) {
                return;
            }
        } else {
            // Fall back to shortcode detection if no specific page is set
            if (!is_a($post, 'WP_Post') || !has_shortcode($post->post_content, 'invoice_generator')) {
                return;
            }
        }
        
        // Enqueue registered scripts
        wp_enqueue_script('sig-invoice-app');
        wp_enqueue_style('sig-invoice-styles');
        
        // Add inline styles for print
        $print_styles = '
            @media print {
                body * {
                    visibility: hidden;
                }
                .sig-invoice-preview, .sig-invoice-preview * {
                    visibility: visible;
                }
                .sig-invoice-preview {
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                }
                .sig-no-print {
                    display: none !important;
                }
            }
        ';
        wp_add_inline_style('sig-invoice-styles', $print_styles);
    }
    
    /**
     * Enqueue admin scripts and styles
     */
    public function enqueue_admin($hook) {
        // Only enqueue on our settings page
        if ($hook !== 'settings_page_simple-invoice-generator') {
            return;
        }
        
        wp_enqueue_style(
            'sig-admin-styles',
            SIG_PLUGIN_URL . 'assets/css/admin.css',
            array(),
            SIG_VERSION
        );
        
        wp_enqueue_script(
            'sig-admin-scripts',
            SIG_PLUGIN_URL . 'assets/js/admin.js',
            array('jquery'),
            SIG_VERSION,
            true
        );
    }
}