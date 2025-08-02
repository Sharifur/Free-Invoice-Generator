<?php
/**
 * Shortcode handler class
 */

if (!defined('ABSPATH')) {
    exit;
}

class SIG_Shortcode {
    
    /**
     * Render the invoice generator shortcode
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
        ), $atts);
        
        // Generate unique container ID
        $container_id = 'sig-invoice-generator-' . uniqid();
        
        // Enqueue the script first
        wp_enqueue_script('sig-invoice-app');
        wp_enqueue_style('sig-invoice-styles');
        
        // Prepare data for JavaScript
        $config = array(
            'container' => $container_id,
            'ajaxUrl' => admin_url('admin-ajax.php'),
            'restUrl' => rest_url('simple-invoice/v1/'),
            'nonce' => wp_create_nonce('wp_rest'),
            'currency' => $attributes['currency'],
            'theme' => $attributes['theme'],
            'lang' => $attributes['lang'],
            'maxFileSize' => get_option('sig_max_file_size', 2) * 1024 * 1024, // Convert to bytes
            'allowedImageTypes' => get_option('sig_allowed_image_types', array('jpg', 'jpeg', 'png', 'gif')),
            'currencies' => $this->get_currency_list(),
        );
        
        // Localize script data
        wp_localize_script('sig-invoice-app', 'sigConfig', $config);
        
        // Return container div
        return '<div id="' . esc_attr($container_id) . '" class="sig-invoice-generator-container"></div>';
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