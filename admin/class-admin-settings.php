<?php
/**
 * Admin settings page
 */

if (!defined('ABSPATH')) {
    exit;
}

class SIG_Admin_Settings {
    
    /**
     * Add admin menu
     */
    public function add_menu() {
        add_options_page(
            __('Invoice Generator Settings', 'simple-invoice-generator'),
            __('Invoice Generator', 'simple-invoice-generator'),
            'manage_options',
            'simple-invoice-generator',
            array($this, 'render_settings_page')
        );
    }
    
    /**
     * Render settings page
     */
    public function render_settings_page() {
        // Save settings if form submitted
        if (isset($_POST['sig_save_settings']) && wp_verify_nonce($_POST['sig_settings_nonce'], 'sig_settings')) {
            $this->save_settings();
        }
        
        // Get current settings
        $enabled = get_option('sig_enabled', 'yes');
        $default_currency = get_option('sig_default_currency', 'USD');
        $max_file_size = get_option('sig_max_file_size', 2);
        $allowed_types = get_option('sig_allowed_image_types', array('jpg', 'jpeg', 'png', 'gif'));
        $rate_limit = get_option('sig_rate_limit', 10);
        $invoice_count = get_option('sig_invoice_count', 0);
        $target_page = get_option('sig_target_page_id', '');
        $quotation_target_page = get_option('sig_quotation_target_page_id', '');
        
        ?>
        <div class="wrap">
            <h1><?php _e('Simple Invoice Generator Settings', 'simple-invoice-generator'); ?></h1>
            
            <?php if (isset($_POST['sig_save_settings'])): ?>
                <div class="notice notice-success is-dismissible">
                    <p><?php _e('Settings saved successfully!', 'simple-invoice-generator'); ?></p>
                </div>
            <?php endif; ?>
            
            <form method="post" action="">
                <?php wp_nonce_field('sig_settings', 'sig_settings_nonce'); ?>
                
                <table class="form-table">
                    <tr>
                        <th scope="row">
                            <label for="sig_enabled"><?php _e('Plugin Status', 'simple-invoice-generator'); ?></label>
                        </th>
                        <td>
                            <select id="sig_enabled" name="sig_enabled">
                                <option value="yes" <?php selected($enabled, 'yes'); ?>><?php _e('Enabled', 'simple-invoice-generator'); ?></option>
                                <option value="no" <?php selected($enabled, 'no'); ?>><?php _e('Disabled', 'simple-invoice-generator'); ?></option>
                            </select>
                            <p class="description"><?php _e('Enable or disable the invoice generator functionality.', 'simple-invoice-generator'); ?></p>
                        </td>
                    </tr>
                    
                    <tr>
                        <th scope="row">
                            <label for="sig_default_currency"><?php _e('Default Currency', 'simple-invoice-generator'); ?></label>
                        </th>
                        <td>
                            <select id="sig_default_currency" name="sig_default_currency">
                                <?php
                                $currencies = array(
                                    'USD' => 'US Dollar',
                                    'EUR' => 'Euro',
                                    'GBP' => 'British Pound',
                                    'CAD' => 'Canadian Dollar',
                                    'AUD' => 'Australian Dollar',
                                    'JPY' => 'Japanese Yen',
                                    'CNY' => 'Chinese Yuan',
                                    'INR' => 'Indian Rupee',
                                );
                                foreach ($currencies as $code => $name) {
                                    echo '<option value="' . esc_attr($code) . '" ' . selected($default_currency, $code, false) . '>' . esc_html($code . ' - ' . $name) . '</option>';
                                }
                                ?>
                            </select>
                            <p class="description"><?php _e('Default currency for new invoices.', 'simple-invoice-generator'); ?></p>
                        </td>
                    </tr>
                    
                    <tr>
                        <th scope="row"><?php _e('Security Settings', 'simple-invoice-generator'); ?></th>
                        <td>
                            <fieldset>
                                <label for="sig_max_file_size">
                                    <?php _e('Max File Size (MB):', 'simple-invoice-generator'); ?>
                                    <input type="number" id="sig_max_file_size" name="sig_max_file_size" value="<?php echo esc_attr($max_file_size); ?>" min="0.5" max="10" step="0.5" />
                                </label>
                                <p class="description"><?php _e('Maximum file size for logo uploads.', 'simple-invoice-generator'); ?></p>
                                
                                <br><br>
                                
                                <label><?php _e('Allowed Image Types:', 'simple-invoice-generator'); ?></label><br>
                                <?php
                                $all_types = array('jpg', 'jpeg', 'png', 'gif', 'webp');
                                foreach ($all_types as $type) {
                                    $checked = in_array($type, $allowed_types) ? 'checked' : '';
                                    echo '<label style="margin-right: 15px;"><input type="checkbox" name="sig_allowed_types[]" value="' . esc_attr($type) . '" ' . $checked . '> ' . strtoupper($type) . '</label>';
                                }
                                ?>
                                <p class="description"><?php _e('Allowed image formats for logo uploads.', 'simple-invoice-generator'); ?></p>
                                
                                <br><br>
                                
                                <label for="sig_rate_limit">
                                    <?php _e('Rate Limit (PDFs per hour):', 'simple-invoice-generator'); ?>
                                    <input type="number" id="sig_rate_limit" name="sig_rate_limit" value="<?php echo esc_attr($rate_limit); ?>" min="1" max="100" />
                                </label>
                                <p class="description"><?php _e('Maximum number of PDFs that can be generated per hour per IP address.', 'simple-invoice-generator'); ?></p>
                            </fieldset>
                        </td>
                    </tr>
                    
                    <tr>
                        <th scope="row"><?php _e('Analytics', 'simple-invoice-generator'); ?></th>
                        <td>
                            <p><?php printf(__('Total invoices generated: <strong>%d</strong>', 'simple-invoice-generator'), $invoice_count); ?></p>
                            <?php if ($invoice_count > 0): ?>
                                <button type="submit" name="sig_reset_analytics" class="button" onclick="return confirm('<?php _e('Are you sure you want to reset the invoice counter?', 'simple-invoice-generator'); ?>');">
                                    <?php _e('Reset Counter', 'simple-invoice-generator'); ?>
                                </button>
                            <?php endif; ?>
                        </td>
                    </tr>
                    
                    <tr>
                        <th scope="row">
                            <label for="sig_target_page"><?php _e('Invoice Generator Target Page', 'simple-invoice-generator'); ?></label>
                        </th>
                        <td>
                            <?php
                            $pages = get_pages(array('post_status' => 'publish'));
                            ?>
                            <select id="sig_target_page" name="sig_target_page_id">
                                <option value=""><?php _e('Load on all pages (using shortcode detection)', 'simple-invoice-generator'); ?></option>
                                <?php foreach ($pages as $page): ?>
                                    <option value="<?php echo esc_attr($page->ID); ?>" <?php selected($target_page, $page->ID); ?>>
                                        <?php echo esc_html($page->post_title . ' (ID: ' . $page->ID . ')'); ?>
                                    </option>
                                <?php endforeach; ?>
                            </select>
                            <p class="description"><?php _e('Select a specific page where the invoice generator will be used. This will load CSS/JS files only on that page for better performance. Leave empty to use automatic shortcode detection.', 'simple-invoice-generator'); ?></p>
                        </td>
                    </tr>
                    
                    <tr>
                        <th scope="row">
                            <label for="sig_quotation_target_page"><?php _e('Quotation Generator Target Page', 'simple-invoice-generator'); ?></label>
                        </th>
                        <td>
                            <select id="sig_quotation_target_page" name="sig_quotation_target_page_id">
                                <option value=""><?php _e('Load on all pages (using shortcode detection)', 'simple-invoice-generator'); ?></option>
                                <?php foreach ($pages as $page): ?>
                                    <option value="<?php echo esc_attr($page->ID); ?>" <?php selected($quotation_target_page, $page->ID); ?>>
                                        <?php echo esc_html($page->post_title . ' (ID: ' . $page->ID . ')'); ?>
                                    </option>
                                <?php endforeach; ?>
                            </select>
                            <p class="description"><?php _e('Select a specific page where the quotation generator will be used. This will load CSS/JS files only on that page for better performance. Leave empty to use automatic shortcode detection.', 'simple-invoice-generator'); ?></p>
                        </td>
                    </tr>
                    
                    <tr>
                        <th scope="row"><?php _e('Shortcodes', 'simple-invoice-generator'); ?></th>
                        <td>
                            <p><strong><?php _e('Invoice Generator:', 'simple-invoice-generator'); ?></strong></p>
                            <code>[invoice_generator]</code>
                            <p class="description"><?php _e('Copy this shortcode and paste it into any page or post where you want the invoice generator to appear.', 'simple-invoice-generator'); ?></p>
                            
                            <p><strong><?php _e('Quotation Generator:', 'simple-invoice-generator'); ?></strong></p>
                            <code>[taskip_quotation_generator]</code>
                            <p class="description"><?php _e('Copy this shortcode and paste it into any page or post where you want the quotation generator to appear.', 'simple-invoice-generator'); ?></p>
                            
                            <p class="description"><?php _e('Optional parameters for both:', 'simple-invoice-generator'); ?></p>
                            <ul style="list-style: disc; margin-left: 20px;">
                                <li><code>currency="USD"</code> - <?php _e('Set default currency', 'simple-invoice-generator'); ?></li>
                                <li><code>theme="default"</code> - <?php _e('Set color theme', 'simple-invoice-generator'); ?></li>
                                <li><code>validity_days="30"</code> - <?php _e('Set default validity days (quotation only)', 'simple-invoice-generator'); ?></li>
                            </ul>
                        </td>
                    </tr>
                </table>
                
                <p class="submit">
                    <input type="submit" name="sig_save_settings" class="button-primary" value="<?php _e('Save Settings', 'simple-invoice-generator'); ?>" />
                </p>
            </form>
        </div>
        <?php
    }
    
    /**
     * Save settings
     */
    private function save_settings() {
        // Save enabled status
        if (isset($_POST['sig_enabled'])) {
            update_option('sig_enabled', sanitize_text_field($_POST['sig_enabled']));
        }
        
        // Save default currency
        if (isset($_POST['sig_default_currency'])) {
            update_option('sig_default_currency', sanitize_text_field($_POST['sig_default_currency']));
        }
        
        // Save max file size
        if (isset($_POST['sig_max_file_size'])) {
            update_option('sig_max_file_size', floatval($_POST['sig_max_file_size']));
        }
        
        // Save allowed types
        if (isset($_POST['sig_allowed_types']) && is_array($_POST['sig_allowed_types'])) {
            $allowed_types = array_map('sanitize_text_field', $_POST['sig_allowed_types']);
            update_option('sig_allowed_image_types', $allowed_types);
        }
        
        // Save rate limit
        if (isset($_POST['sig_rate_limit'])) {
            update_option('sig_rate_limit', intval($_POST['sig_rate_limit']));
        }
        
        // Save target page
        if (isset($_POST['sig_target_page_id'])) {
            update_option('sig_target_page_id', intval($_POST['sig_target_page_id']));
        }
        
        // Save quotation target page
        if (isset($_POST['sig_quotation_target_page_id'])) {
            update_option('sig_quotation_target_page_id', intval($_POST['sig_quotation_target_page_id']));
        }
        
        // Reset analytics if requested
        if (isset($_POST['sig_reset_analytics'])) {
            update_option('sig_invoice_count', 0);
        }
    }
}