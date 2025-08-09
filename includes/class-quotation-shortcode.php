<?php
/**
 * Taskip Quotation Generator Shortcode handler class
 */

if (!defined('ABSPATH')) {
    exit;
}

class Taskip_Quotation_Shortcode {
    
    /**
     * Initialize the quotation shortcode
     */
    public function init() {
        add_shortcode('taskip_quotation_generator', array($this, 'render'));
    }
    
    /**
     * Render the taskip quotation generator shortcode
     */
    public function render($atts) {
        // Check if plugin is enabled
        if (get_option('sig_enabled') !== 'yes') {
            return '';
        }
        
        // Parse shortcode attributes
        $attributes = shortcode_atts(array(
            'currency' => get_option('sig_default_currency', 'USD'),
            'theme' => 'default',
            'lang' => get_locale(),
            'validity_days' => 30,
        ), $atts);
        
        // Generate unique container ID
        $container_id = 'taskip-quotation-generator-' . uniqid();
        
        // Force enqueue the quotation assets when shortcode is rendered
        wp_enqueue_script('sig-quotation-app');
        wp_enqueue_style('sig-quotation-styles');
        
        // Also ensure React dependencies are loaded
        wp_enqueue_script('react');
        wp_enqueue_script('react-dom');
        
        // Prepare data for JavaScript
        $config = array(
            'container' => $container_id,
            'ajaxUrl' => admin_url('admin-ajax.php'),
            'restUrl' => rest_url('simple-invoice/v1/'),
            'nonce' => wp_create_nonce('wp_rest'),
            'currency' => $attributes['currency'],
            'theme' => $attributes['theme'],
            'lang' => $attributes['lang'],
            'validityDays' => intval($attributes['validity_days']),
            'maxFileSize' => get_option('sig_max_file_size', 2) * 1024 * 1024, // Convert to bytes
            'allowedImageTypes' => get_option('sig_allowed_image_types', array('jpg', 'jpeg', 'png', 'gif')),
            'currencies' => $this->get_currency_list(),
            'mode' => 'quotation',
        );
        
        // Localize script data
        wp_localize_script('sig-quotation-app', 'sigQuotationConfig', $config);
        
        // Add debug information in development
        $debug_info = '';
        if (defined('WP_DEBUG') && WP_DEBUG) {
            $debug_info = '<!-- Taskip Quotation Generator Debug: Container ID = ' . $container_id . ', Scripts Enqueued = ' . (wp_script_is('sig-quotation-app', 'enqueued') ? 'Yes' : 'No') . ' -->';
        }
        
        // Return container div with both unique ID and fixed ID for anchor linking
        return $debug_info . '<div id="taskip_quotation_generator" class="taskip-quotation-generator-anchor">' .
               '<div id="' . esc_attr($container_id) . '" class="taskip-quotation-generator-container"></div>' .
               '</div>';
    }
    
    /**
     * Get list of supported currencies
     */
    private function get_currency_list() {
        return array(
            'USD' => array('symbol' => '$', 'name' => 'US Dollar'),
            'EUR' => array('symbol' => '€', 'name' => 'Euro'),
            'GBP' => array('symbol' => '£', 'name' => 'British Pound'),
            'CAD' => array('symbol' => 'C$', 'name' => 'Canadian Dollar'),
            'AUD' => array('symbol' => 'A$', 'name' => 'Australian Dollar'),
            'JPY' => array('symbol' => '¥', 'name' => 'Japanese Yen'),
            'CNY' => array('symbol' => '¥', 'name' => 'Chinese Yuan'),
            'INR' => array('symbol' => '₹', 'name' => 'Indian Rupee'),
            'CHF' => array('symbol' => 'CHF', 'name' => 'Swiss Franc'),
            'SEK' => array('symbol' => 'kr', 'name' => 'Swedish Krona'),
            'NZD' => array('symbol' => 'NZ$', 'name' => 'New Zealand Dollar'),
            'SGD' => array('symbol' => 'S$', 'name' => 'Singapore Dollar'),
            'HKD' => array('symbol' => 'HK$', 'name' => 'Hong Kong Dollar'),
            'NOK' => array('symbol' => 'kr', 'name' => 'Norwegian Krone'),
            'MXN' => array('symbol' => '$', 'name' => 'Mexican Peso'),
        );
    }
}