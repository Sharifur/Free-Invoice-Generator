<?php
/**
 * REST API endpoints
 */

if (!defined('ABSPATH')) {
    exit;
}

class SIG_REST_API {
    
    /**
     * Register REST API endpoints
     */
    public function register_endpoints() {
        register_rest_route('simple-invoice/v1', '/upload-logo', array(
            'methods' => 'POST',
            'callback' => array($this, 'upload_logo'),
            'permission_callback' => array($this, 'check_permissions'),
        ));
        
        register_rest_route('simple-invoice/v1', '/generate-pdf', array(
            'methods' => 'POST',
            'callback' => array($this, 'generate_pdf'),
            'permission_callback' => array($this, 'check_permissions'),
        ));
        
        register_rest_route('simple-invoice/v1', '/analytics', array(
            'methods' => 'POST',
            'callback' => array($this, 'track_analytics'),
            'permission_callback' => array($this, 'check_permissions'),
        ));
    }
    
    /**
     * Check permissions for API requests
     */
    public function check_permissions() {
        // Check if plugin is enabled
        if (get_option('sig_enabled') !== 'yes') {
            return false;
        }
        
        // Check rate limiting
        if (!$this->check_rate_limit()) {
            return new WP_Error('rate_limit_exceeded', 'Rate limit exceeded', array('status' => 429));
        }
        
        return true;
    }
    
    /**
     * Check rate limiting
     */
    private function check_rate_limit() {
        $ip = $_SERVER['REMOTE_ADDR'];
        $transient_key = 'sig_rate_limit_' . md5($ip);
        $requests = get_transient($transient_key);
        
        if ($requests === false) {
            set_transient($transient_key, 1, HOUR_IN_SECONDS);
            return true;
        }
        
        $limit = get_option('sig_rate_limit', 10);
        if ($requests >= $limit) {
            return false;
        }
        
        set_transient($transient_key, $requests + 1, HOUR_IN_SECONDS);
        return true;
    }
    
    /**
     * Handle logo upload
     */
    public function upload_logo($request) {
        $files = $request->get_file_params();
        
        if (empty($files['logo'])) {
            return new WP_Error('no_file', 'No file uploaded', array('status' => 400));
        }
        
        $file = $files['logo'];
        
        // Validate file type
        $allowed_types = get_option('sig_allowed_image_types', array('jpg', 'jpeg', 'png', 'gif'));
        $file_ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
        
        if (!in_array($file_ext, $allowed_types)) {
            return new WP_Error('invalid_type', 'Invalid file type', array('status' => 400));
        }
        
        // Validate file size
        $max_size = get_option('sig_max_file_size', 2) * 1024 * 1024;
        if ($file['size'] > $max_size) {
            return new WP_Error('file_too_large', 'File size exceeds limit', array('status' => 400));
        }
        
        // Use WordPress media handling
        require_once(ABSPATH . 'wp-admin/includes/image.php');
        require_once(ABSPATH . 'wp-admin/includes/file.php');
        require_once(ABSPATH . 'wp-admin/includes/media.php');
        
        $upload_overrides = array('test_form' => false);
        $movefile = wp_handle_upload($file, $upload_overrides);
        
        if ($movefile && !isset($movefile['error'])) {
            return array(
                'success' => true,
                'url' => $movefile['url'],
                'file' => $movefile['file']
            );
        } else {
            return new WP_Error('upload_failed', $movefile['error'], array('status' => 500));
        }
    }
    
    /**
     * Generate PDF server-side
     */
    public function generate_pdf($request) {
        $invoice_data = $request->get_param('invoice');
        
        if (empty($invoice_data)) {
            return new WP_Error('no_data', 'No invoice data provided', array('status' => 400));
        }
        
        // Check if TCPDF or similar library is available
        // For now, we'll return a message indicating client-side generation is preferred
        return array(
            'success' => false,
            'message' => 'Please use client-side PDF generation',
            'fallback' => true
        );
    }
    
    /**
     * Track analytics
     */
    public function track_analytics($request) {
        $action = $request->get_param('action');
        
        if ($action === 'invoice_generated') {
            $count = get_option('sig_invoice_count', 0);
            update_option('sig_invoice_count', $count + 1);
            
            // Clean up old data if needed
            $this->cleanup_old_data();
        }
        
        return array('success' => true);
    }
    
    /**
     * Clean up old temporary data
     */
    private function cleanup_old_data() {
        // Delete old transients
        global $wpdb;
        $wpdb->query(
            "DELETE FROM {$wpdb->options} 
            WHERE option_name LIKE '_transient_sig_rate_limit_%' 
            AND option_value < " . (time() - HOUR_IN_SECONDS)
        );
    }
}