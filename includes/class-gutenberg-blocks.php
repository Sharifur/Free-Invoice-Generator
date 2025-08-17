<?php
/**
 * Gutenberg Blocks Registration and Management
 */

if (!defined('ABSPATH')) {
    exit;
}

class SIG_Gutenberg_Blocks {
    
    private static $instance = null;
    
    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    
    public function __construct() {
        add_action('init', array($this, 'register_blocks'));
        add_action('init', array($this, 'register_block_category'));
        add_action('enqueue_block_editor_assets', array($this, 'enqueue_block_editor_assets'));
        add_action('wp_enqueue_scripts', array($this, 'enqueue_block_frontend_assets'));
        add_action('wp_head', array($this, 'output_faq_schema_markup'));
    }
    
    /**
     * Register custom block category
     */
    public function register_block_category() {
        if (function_exists('register_block_type')) {
            add_filter('block_categories_all', function($categories) {
                // Insert our category at position 1 (2nd position, after Common)
                $new_category = array(
                    'slug' => 'sig-blocks',
                    'title' => __('Invoice Generator Blocks', 'simple-invoice-generator'),
                    'icon' => 'calculator'
                );
                
                // Insert after the first category
                array_splice($categories, 1, 0, array($new_category));
                
                return $categories;
            }, 5);
        }
    }
    
    /**
     * Register all custom blocks
     */
    public function register_blocks() {
        if (!function_exists('register_block_type')) {
            return;
        }
        
        // Register each block
        $blocks = array(
            'sig/callout-box',
            'sig/client-review'
        );
        
        foreach ($blocks as $block) {
            // Check if block is already registered
            if (!WP_Block_Type_Registry::get_instance()->is_registered($block)) {
                register_block_type($block, array(
                    'editor_script' => 'sig-blocks-editor',
                    'editor_style' => 'sig-blocks-editor-style',
                    'style' => 'sig-blocks-style',
                ));
            }
        }
        
        // Register hero section block
        $hero_block_path = SIG_PLUGIN_DIR . 'blocks/hero-section/';
        if (file_exists($hero_block_path . 'block.json')) {
            register_block_type($hero_block_path);
        }
        
        // Register steps guide block
        $steps_block_path = SIG_PLUGIN_DIR . 'blocks/steps-guide/';
        if (file_exists($steps_block_path . 'block.json')) {
            register_block_type($steps_block_path);
        }
        
        // Register invoice components block
        $components_block_path = SIG_PLUGIN_DIR . 'blocks/invoice-components/';
        if (file_exists($components_block_path . 'block.json')) {
            register_block_type($components_block_path);
        }
        
        // Register benefits section block
        $benefits_block_path = SIG_PLUGIN_DIR . 'blocks/benefits-section/';
        if (file_exists($benefits_block_path . 'block.json')) {
            register_block_type($benefits_block_path);
        }
        
        // Register best practices block
        $practices_block_path = SIG_PLUGIN_DIR . 'blocks/best-practices/';
        if (file_exists($practices_block_path . 'block.json')) {
            register_block_type($practices_block_path);
        }
        
        // Register legal compliance block
        $legal_block_path = SIG_PLUGIN_DIR . 'blocks/legal-compliance/';
        if (file_exists($legal_block_path . 'block.json')) {
            register_block_type($legal_block_path);
        }
        
        // Register FAQ section block
        $faq_block_path = SIG_PLUGIN_DIR . 'blocks/faq-section/';
        if (file_exists($faq_block_path . 'block.json')) {
            register_block_type($faq_block_path);
        }
        
        // Register related tools block
        $related_tools_block_path = SIG_PLUGIN_DIR . 'blocks/related-tools/';
        if (file_exists($related_tools_block_path . 'block.json')) {
            register_block_type($related_tools_block_path);
        }
        
        // Register taskip cta block
        $taskip_cta_block_path = SIG_PLUGIN_DIR . 'blocks/taskip-cta/';
        if (file_exists($taskip_cta_block_path . 'block.json')) {
            register_block_type($taskip_cta_block_path);
        }
        
        // Register features section block
        $features_block_path = SIG_PLUGIN_DIR . 'blocks/features-section/';
        if (file_exists($features_block_path . 'block.json')) {
            register_block_type($features_block_path);
        }
        
        // Register quotation definition block
        $quotation_def_block_path = SIG_PLUGIN_DIR . 'blocks/quotation-definition/';
        if (file_exists($quotation_def_block_path . 'block.json')) {
            register_block_type($quotation_def_block_path);
        }
        
        // Register essential components block
        $essential_components_block_path = SIG_PLUGIN_DIR . 'blocks/essential-components/';
        if (file_exists($essential_components_block_path . 'block.json')) {
            register_block_type($essential_components_block_path);
        }
        
        // Register quotation comparison block
        $quotation_comparison_block_path = SIG_PLUGIN_DIR . 'blocks/quotation-comparison/';
        if (file_exists($quotation_comparison_block_path . 'block.json')) {
            register_block_type($quotation_comparison_block_path);
        }
        
        // Register number feature grid block
        $number_feature_grid_block_path = SIG_PLUGIN_DIR . 'blocks/number-feature-grid/';
        if (file_exists($number_feature_grid_block_path . 'block.json')) {
            register_block_type($number_feature_grid_block_path);
        }
        
        // Register legal considerations block
        $legal_considerations_block_path = SIG_PLUGIN_DIR . 'blocks/legal-considerations/';
        if (file_exists($legal_considerations_block_path . 'block.json')) {
            register_block_type($legal_considerations_block_path);
        }
        
        // Register industry requirements block
        $industry_requirements_block_path = SIG_PLUGIN_DIR . 'blocks/industry-requirements/';
        if (file_exists($industry_requirements_block_path . 'block.json')) {
            register_block_type($industry_requirements_block_path);
        }
        
        // Register common mistakes block
        $common_mistakes_block_path = SIG_PLUGIN_DIR . 'blocks/common-mistakes/';
        if (file_exists($common_mistakes_block_path . 'block.json')) {
            register_block_type($common_mistakes_block_path);
        }
        
        // Register digital transformation block
        $digital_transformation_block_path = SIG_PLUGIN_DIR . 'blocks/digital-transformation/';
        if (file_exists($digital_transformation_block_path . 'block.json')) {
            register_block_type($digital_transformation_block_path);
        }
        
        // Register international quotations block
        $international_quotations_block_path = SIG_PLUGIN_DIR . 'blocks/international-quotations/';
        if (file_exists($international_quotations_block_path . 'block.json')) {
            register_block_type($international_quotations_block_path);
        }
        
        // Register quotation FAQ block
        $quotation_faq_block_path = SIG_PLUGIN_DIR . 'blocks/quotation-faq/';
        if (file_exists($quotation_faq_block_path . 'block.json')) {
            register_block_type($quotation_faq_block_path);
        }
    }
    
    /**
     * Enqueue block editor assets
     */
    public function enqueue_block_editor_assets() {
        wp_enqueue_script(
            'sig-blocks-editor',
            SIG_PLUGIN_URL . 'dist/blocks.js',
            array('wp-blocks', 'wp-i18n', 'wp-element', 'wp-block-editor', 'wp-components'),
            SIG_VERSION,
            true
        );
        
        wp_enqueue_style(
            'sig-blocks-editor-style',
            SIG_PLUGIN_URL . 'assets/css/blocks-editor.css',
            array('wp-edit-blocks'),
            SIG_VERSION
        );
        
        // Localize script with data
        wp_localize_script('sig-blocks-editor', 'sigBlocksData', array(
            'pluginUrl' => SIG_PLUGIN_URL,
            'currency' => get_option('sig_default_currency', 'USD'),
            'locale' => get_locale(),
        ));
    }
    
    /**
     * Enqueue frontend block assets
     */
    public function enqueue_block_frontend_assets() {
        // Only load on pages with our blocks
        if (has_block('sig/callout-box') ||
            has_block('sig/client-review') ||
            has_block('sig/hero-section') ||
            has_block('sig/steps-guide') ||
            has_block('sig/invoice-components') ||
            has_block('sig/benefits-section') ||
            has_block('sig/best-practices') ||
            has_block('sig/legal-compliance') ||
            has_block('sig/faq-section') ||
            has_block('sig/related-tools') ||
            has_block('sig/taskip-cta') ||
            has_block('sig/features-section') ||
            has_block('sig/quotation-definition') ||
            has_block('sig/essential-components') ||
            has_block('sig/quotation-comparison') ||
            has_block('sig/number-feature-grid') ||
            has_block('sig/legal-considerations') ||
            has_block('sig/industry-requirements') ||
            has_block('sig/common-mistakes') ||
            has_block('sig/digital-transformation') ||
            has_block('sig/international-quotations') ||
            has_block('sig/quotation-faq')) {
            
            wp_enqueue_style(
                'sig-blocks-style',
                SIG_PLUGIN_URL . 'assets/css/blocks-frontend.css',
                array(),
                SIG_VERSION
            );
        }
    }
    
    /**
     * Get block preview data for each block type
     */
    public function get_block_preview_data() {
        return array(
            'callout-box' => array(
                'title' => __('Important Information', 'simple-invoice-generator'),
                'content' => __('This is an important callout message that draws attention to key information.', 'simple-invoice-generator'),
                'calloutType' => 'info',
                'showIcon' => true,
                'buttonText' => __('Learn More', 'simple-invoice-generator'),
                'buttonUrl' => '#'
            ),
            'client-review' => array(
                'reviewText' => __('This invoice generator has saved me hours of work. The templates are professional and easy to customize. Highly recommended for any freelancer or small business!', 'simple-invoice-generator'),
                'clientName' => __('Sarah Johnson', 'simple-invoice-generator'),
                'clientTitle' => __('Freelance Designer', 'simple-invoice-generator'),
                'clientCompany' => __('Creative Studios', 'simple-invoice-generator'),
                'clientPhoto' => '',
                'rating' => 5,
                'reviewStyle' => 'card'
            )
        );
    }
    
    /**
     * REST API endpoint for block data
     */
    public function register_rest_routes() {
        register_rest_route('simple-invoice/v1', '/block-data', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_block_data'),
            'permission_callback' => '__return_true'
        ));
    }
    
    /**
     * Get block data via REST API
     */
    public function get_block_data() {
        return rest_ensure_response(array(
            'success' => true,
            'data' => $this->get_block_preview_data()
        ));
    }
    
    /**
     * Output FAQ schema markup in head
     */
    public function output_faq_schema_markup() {
        if (!has_block('sig/faq-section') && !has_block('sig/quotation-faq')) {
            return;
        }
        
        // Get post content and extract FAQ schema data
        $post = get_post();
        if (!$post) {
            return;
        }
        
        // Look for all FAQ schema data in post content
        if (preg_match_all('/data-schema="([^"]*)"/', $post->post_content, $matches)) {
            foreach ($matches[1] as $match) {
                $schema_data = html_entity_decode($match);
                if (!empty($schema_data) && $schema_data !== '""' && $schema_data !== '') {
                    echo '<script type="application/ld+json">' . $schema_data . '</script>' . "\n";
                }
            }
        }
    }
}

// Initialize the blocks using singleton
SIG_Gutenberg_Blocks::get_instance();