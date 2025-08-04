<?php
/**
 * Plugin Name: Simple Invoice Generator
 * Plugin URI: https://taskip.net/tools/invoice-generator
 * Description: Generate professional invoices without requiring login using React-based interface
 * Version: 1.2.0
 * Author: Sharifur
 * License: GPL v2 or later
 * Text Domain: simple-invoice-generator
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Define plugin constants
define('SIG_VERSION', '1.2.0');
define('SIG_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('SIG_PLUGIN_URL', plugin_dir_url(__FILE__));
define('SIG_PLUGIN_BASENAME', plugin_basename(__FILE__));

// Include required files
require_once SIG_PLUGIN_DIR . 'includes/class-invoice-generator.php';

// Initialize the plugin
function sig_init() {
    $invoice_generator = new Simple_Invoice_Generator();
    $invoice_generator->init();
}
add_action('plugins_loaded', 'sig_init');

// Activation hook
register_activation_hook(__FILE__, 'sig_activate');
function sig_activate() {
    // Set default options
    $default_options = array(
        'sig_enabled' => 'yes',
        'sig_default_currency' => 'USD',
        'sig_max_file_size' => 2, // MB
        'sig_allowed_image_types' => array('jpg', 'jpeg', 'png', 'gif'),
        'sig_rate_limit' => 10, // PDFs per hour
    );
    
    foreach ($default_options as $key => $value) {
        if (!get_option($key)) {
            update_option($key, $value);
        }
    }
    
    // Flush rewrite rules
    flush_rewrite_rules();
}

// Deactivation hook
register_deactivation_hook(__FILE__, 'sig_deactivate');
function sig_deactivate() {
    flush_rewrite_rules();
}