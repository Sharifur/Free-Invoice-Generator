<?php
/**
 * Main plugin class
 */

if (!defined('ABSPATH')) {
    exit;
}

class Simple_Invoice_Generator {
    
    /**
     * Initialize the plugin
     */
    public function init() {
        // Load dependencies
        $this->load_dependencies();
        
        // Register hooks
        $this->register_hooks();
    }
    
    /**
     * Load required dependencies
     */
    private function load_dependencies() {
        require_once SIG_PLUGIN_DIR . 'includes/class-shortcode.php';
        require_once SIG_PLUGIN_DIR . 'includes/class-rest-api.php';
        require_once SIG_PLUGIN_DIR . 'includes/class-enqueue.php';
        require_once SIG_PLUGIN_DIR . 'admin/class-admin-settings.php';
    }
    
    /**
     * Register all hooks
     */
    private function register_hooks() {
        // Initialize components
        $shortcode = new SIG_Shortcode();
        $rest_api = new SIG_REST_API();
        $enqueue = new SIG_Enqueue();
        $admin = new SIG_Admin_Settings();
        
        // Register shortcode
        add_shortcode('invoice_generator', array($shortcode, 'render'));
        
        // Register REST API endpoints
        add_action('rest_api_init', array($rest_api, 'register_endpoints'));
        
        // Enqueue scripts and styles
        add_action('init', array($enqueue, 'register_assets'));
        add_action('wp_enqueue_scripts', array($enqueue, 'enqueue_frontend'));
        add_action('admin_enqueue_scripts', array($enqueue, 'enqueue_admin'));
        
        // Admin menu
        add_action('admin_menu', array($admin, 'add_menu'));
        
        // Add plugin action links
        add_filter('plugin_action_links_' . SIG_PLUGIN_BASENAME, array($this, 'add_action_links'));
    }
    
    /**
     * Add action links to plugins page
     */
    public function add_action_links($links) {
        $settings_link = '<a href="' . admin_url('options-general.php?page=simple-invoice-generator') . '">' . __('Settings', 'simple-invoice-generator') . '</a>';
        array_unshift($links, $settings_link);
        return $links;
    }
}