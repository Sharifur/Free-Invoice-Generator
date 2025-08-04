<?php
/**
 * Block Patterns for Invoice Generator Landing Page
 */

if (!defined('ABSPATH')) {
    exit;
}

class SIG_Block_Patterns {
    
    public function __construct() {
        add_action('init', array($this, 'register_patterns'));
        add_action('init', array($this, 'register_pattern_category'));
    }
    
    /**
     * Register pattern category
     */
    public function register_pattern_category() {
        if (function_exists('register_block_pattern_category')) {
            register_block_pattern_category('sig-patterns', array(
                'label' => __('Invoice Generator Patterns', 'simple-invoice-generator'),
                'description' => __('Complete landing page sections for invoice generator', 'simple-invoice-generator'),
            ));
        }
    }
    
    /**
     * Register all block patterns
     */
    public function register_patterns() {
        if (!function_exists('register_block_pattern')) {
            return;
        }
        
        // Check if patterns are already registered to prevent duplicates
        $registry = WP_Block_Patterns_Registry::get_instance();
        
        // Complete landing page pattern
        if (!$registry->is_registered('sig/complete-landing-page')) {
            register_block_pattern('sig/complete-landing-page', array(
                'title' => __('Complete Invoice Generator Landing Page', 'simple-invoice-generator'),
                'description' => __('Complete landing page layout with all sections', 'simple-invoice-generator'),
                'categories' => array('sig-patterns'),
                'content' => $this->get_complete_landing_page_pattern(),
            ));
        }
        
        // Features showcase pattern
        if (!$registry->is_registered('sig/features-showcase-pattern')) {
            register_block_pattern('sig/features-showcase-pattern', array(
                'title' => __('Features Showcase Section', 'simple-invoice-generator'),
                'description' => __('Why use and features sections combined', 'simple-invoice-generator'),
                'categories' => array('sig-patterns'),
                'content' => $this->get_features_showcase_pattern(),
            ));
        }
        
        // CTA and resources pattern
        if (!$registry->is_registered('sig/cta-resources')) {
            register_block_pattern('sig/cta-resources', array(
                'title' => __('CTA and Resources Section', 'simple-invoice-generator'),
                'description' => __('Call-to-action and helpful resources combined', 'simple-invoice-generator'),
                'categories' => array('sig-patterns'),
                'content' => $this->get_cta_resources_pattern(),
            ));
        }
        
        // Testimonials and callouts pattern
        if (!$registry->is_registered('sig/testimonials-callouts')) {
            register_block_pattern('sig/testimonials-callouts', array(
                'title' => __('Testimonials with Callouts', 'simple-invoice-generator'),
                'description' => __('Client reviews with important information callouts', 'simple-invoice-generator'),
                'categories' => array('sig-patterns'),
                'content' => $this->get_testimonials_callouts_pattern(),
            ));
        }
    }
    
    /**
     * Get complete landing page pattern
     */
    private function get_complete_landing_page_pattern() {
        return '<!-- wp:sig/why-use-section -->
<section class="wp-block-group sig-section alignwide has-background">
    <h2 class="wp-block-heading">Why Use Taskip\'s Free Invoice Generator</h2>
    <p>Create professional invoices in minutes with our user-friendly invoice generator. No registration required, completely free, and designed to help you get paid faster.</p>
    <ul class="wp-block-list">
        <li><strong>Multiple Layout Presets</strong> - Choose from professionally designed templates</li>
        <li><strong>Custom Colors &amp; Typography</strong> - Match your brand identity perfectly</li>
        <li><strong>Instant PDF Download</strong> - Get your invoice ready in seconds</li>
        <li><strong>One-Click Print</strong> - Print directly from your browser</li>
        <li><strong>Live Preview</strong> - See changes in real-time as you build</li>
        <li><strong>Privacy-Friendly</strong> - No data stored, completely secure</li>
    </ul>
</section>
<!-- /wp:sig/why-use-section -->

<!-- wp:sig/how-to-use-section -->
<section class="wp-block-group sig-section alignwide">
    <h2 class="wp-block-heading">How to Use the Free Invoice Generator</h2>
    <ol class="wp-block-list">
        <li><strong>Enter business/client details</strong> - Add your company info and customer information</li>
        <li><strong>Add line items with pricing/tax</strong> - Include products, services, quantities, and rates</li>
        <li><strong>Customize layout and colors</strong> - Apply your branding and choose your preferred design</li>
        <li><strong>Download or print</strong> - Get your professional invoice instantly</li>
    </ol>
    <div class="wp-block-buttons">
        <div class="wp-block-button">
            <a class="wp-block-button__link" href="#invoice-builder">Launch Invoice Generator</a>
        </div>
    </div>
</section>
<!-- /wp:sig/how-to-use-section -->

<!-- wp:sig/template-options-block -->
<section class="wp-block-group sig-section alignwide">
    <h2 class="wp-block-heading">Invoice Templates You Can Customize</h2>
    <p>Our versatile invoice generator adapts to any business type or industry. Choose from multiple templates and customize them to match your specific needs and branding requirements.</p>
    <ul class="wp-block-list">
        <li><strong>Freelancer Invoice</strong> - Perfect for independent contractors and creative professionals</li>
        <li><strong>Consulting Invoice</strong> - Ideal for professional services and advisory work</li>
        <li><strong>Small Business Invoice</strong> - Comprehensive template for retail and service businesses</li>
        <li><strong>Hourly Invoice</strong> - Time-based billing for contractors and agencies</li>
        <li><strong>Product/Service Invoice</strong> - Flexible template for any combination of goods and services</li>
    </ul>
</section>
<!-- /wp:sig/template-options-block -->

<!-- wp:sig/feature-showcase -->
<section class="wp-block-group sig-section alignwide">
    <h2 class="wp-block-heading">Advanced Features</h2>
    <ul class="wp-block-list">
        <li><strong>Recurring Invoice Support</strong> - Set up templates for regular billing cycles</li>
        <li><strong>Custom Fields</strong> - Add PO numbers, project codes, and other business-specific information</li>
        <li><strong>Multi-language Invoices</strong> - Create invoices in different languages for international clients</li>
        <li><strong>Terms &amp; Notes Section</strong> - Include payment terms, late fees, and special instructions</li>
    </ul>
</section>
<!-- /wp:sig/feature-showcase -->

<!-- wp:sig/target-audience -->
<section class="wp-block-group sig-section alignwide">
    <h2 class="wp-block-heading">Who Should Use This Tool</h2>
    <p>Our free invoice generator is perfect for individuals and businesses of all sizes who need to create professional invoices quickly and efficiently without the complexity of expensive software.</p>
    <ul class="wp-block-list">
        <li><strong>Freelancers &amp; Solopreneurs</strong> - Independent professionals who need simple, professional invoicing</li>
        <li><strong>Small Businesses</strong> - Growing companies that want to maintain a professional image</li>
        <li><strong>Consultants &amp; Agencies</strong> - Service providers who bill clients regularly</li>
        <li><strong>Startups</strong> - New businesses looking for cost-effective invoicing solutions</li>
    </ul>
</section>
<!-- /wp:sig/target-audience -->

<!-- wp:sig/cta-promotion -->
<section class="wp-block-group sig-section alignwide has-background sig-cta-section">
    <h2 class="wp-block-heading">Need to Get Paid Faster?</h2>
    <p>While our free invoice generator is perfect for creating invoices, Taskip takes it further by helping you send invoices, track payments, and get paid online with integrated payment processing and automated follow-ups.</p>
    <div class="wp-block-buttons">
        <div class="wp-block-button">
            <a class="wp-block-button__link" href="https://taskip.net/invoice/" target="_blank" rel="noopener noreferrer">Explore Taskip Invoicing</a>
        </div>
    </div>
</section>
<!-- /wp:sig/cta-promotion -->

<!-- wp:sig/resources-section -->
<section class="wp-block-group sig-section alignwide">
    <h2 class="wp-block-heading">Helpful Resources</h2>
    <ul class="wp-block-list">
        <li><a href="https://www.irs.gov/businesses/small-businesses-self-employed/invoice-requirements" target="_blank" rel="noopener noreferrer">IRS Invoicing Guidelines</a> - Official requirements for business invoicing</li>
        <li><a href="https://blog.hubspot.com/sales/invoice-guide" target="_blank" rel="noopener noreferrer">HubSpot Invoice Guide</a> - Comprehensive guide to professional invoicing</li>
        <li><a href="https://www.freshbooks.com/invoice-templates" target="_blank" rel="noopener noreferrer">FreshBooks Free Templates</a> - Additional invoice template resources</li>
    </ul>
</section>
<!-- /wp:sig/resources-section -->';
    }
    
    /**
     * Get features showcase pattern
     */
    private function get_features_showcase_pattern() {
        return '<!-- wp:sig/why-use-section -->
<section class="wp-block-group sig-section alignwide has-background">
    <h2 class="wp-block-heading">Why Use Taskip\'s Free Invoice Generator</h2>
    <p>Create professional invoices in minutes with our user-friendly invoice generator. No registration required, completely free, and designed to help you get paid faster.</p>
    <ul class="wp-block-list">
        <li><strong>Multiple Layout Presets</strong> - Choose from professionally designed templates</li>
        <li><strong>Custom Colors &amp; Typography</strong> - Match your brand identity perfectly</li>
        <li><strong>Instant PDF Download</strong> - Get your invoice ready in seconds</li>
        <li><strong>One-Click Print</strong> - Print directly from your browser</li>
        <li><strong>Live Preview</strong> - See changes in real-time as you build</li>
        <li><strong>Privacy-Friendly</strong> - No data stored, completely secure</li>
    </ul>
</section>
<!-- /wp:sig/why-use-section -->

<!-- wp:sig/feature-showcase -->
<section class="wp-block-group sig-section alignwide">
    <h2 class="wp-block-heading">Advanced Features</h2>
    <ul class="wp-block-list">
        <li><strong>Recurring Invoice Support</strong> - Set up templates for regular billing cycles</li>
        <li><strong>Custom Fields</strong> - Add PO numbers, project codes, and other business-specific information</li>
        <li><strong>Multi-language Invoices</strong> - Create invoices in different languages for international clients</li>
        <li><strong>Terms &amp; Notes Section</strong> - Include payment terms, late fees, and special instructions</li>
    </ul>
</section>
<!-- /wp:sig/feature-showcase -->';
    }
    
    /**
     * Get CTA and resources pattern
     */
    private function get_cta_resources_pattern() {
        return '<!-- wp:sig/cta-promotion -->
<section class="wp-block-group sig-section alignwide has-background sig-cta-section">
    <h2 class="wp-block-heading">Need to Get Paid Faster?</h2>
    <p>While our free invoice generator is perfect for creating invoices, Taskip takes it further by helping you send invoices, track payments, and get paid online with integrated payment processing and automated follow-ups.</p>
    <div class="wp-block-buttons">
        <div class="wp-block-button">
            <a class="wp-block-button__link" href="https://taskip.net/invoice/" target="_blank" rel="noopener noreferrer">Explore Taskip Invoicing</a>
        </div>
    </div>
</section>
<!-- /wp:sig/cta-promotion -->

<!-- wp:sig/resources-section -->
<section class="wp-block-group sig-section alignwide">
    <h2 class="wp-block-heading">Helpful Resources</h2>
    <ul class="wp-block-list">
        <li><a href="https://www.irs.gov/businesses/small-businesses-self-employed/invoice-requirements" target="_blank" rel="noopener noreferrer">IRS Invoicing Guidelines</a> - Official requirements for business invoicing</li>
        <li><a href="https://blog.hubspot.com/sales/invoice-guide" target="_blank" rel="noopener noreferrer">HubSpot Invoice Guide</a> - Comprehensive guide to professional invoicing</li>
        <li><a href="https://www.freshbooks.com/invoice-templates" target="_blank" rel="noopener noreferrer">FreshBooks Free Templates</a> - Additional invoice template resources</li>
    </ul>
</section>
<!-- /wp:sig/resources-section -->';
    }
    
    /**
     * Get testimonials and callouts pattern
     */
    private function get_testimonials_callouts_pattern() {
        return '<!-- wp:sig/callout-box -->
<div class="sig-callout sig-callout-info alignwide">
    <div class="sig-callout-header">
        <div class="sig-callout-icon">📌</div>
        <h4 class="sig-callout-title">Free Forever - No Hidden Costs</h4>
    </div>
    <div class="sig-callout-content">
        <p>Our invoice generator is completely free to use with no registration required. Create unlimited professional invoices without any hidden fees or premium upgrades.</p>
        <div class="sig-callout-button">
            <a href="#invoice-builder" class="sig-btn sig-btn-primary">Start Creating Invoices</a>
        </div>
    </div>
</div>
<!-- /wp:sig/callout-box -->

<!-- wp:sig/client-review -->
<div class="sig-review sig-review-card alignwide">
    <div class="sig-review-container">
        <div class="sig-review-content">
            <div class="sig-review-rating">
                <span class="star filled">⭐</span>
                <span class="star filled">⭐</span>
                <span class="star filled">⭐</span>
                <span class="star filled">⭐</span>
                <span class="star filled">⭐</span>
            </div>
            <blockquote class="sig-review-text">
                "This invoice generator has saved me hours of work. The templates are professional and easy to customize. Highly recommended for any freelancer or small business!"
            </blockquote>
        </div>
        <div class="sig-review-author">
            <div class="sig-review-details">
                <h5 class="sig-client-name">Sarah Johnson</h5>
                <p class="sig-client-title">Freelance Designer</p>
                <p class="sig-client-company">Creative Studios</p>
            </div>
        </div>
    </div>
</div>
<!-- /wp:sig/client-review -->

<!-- wp:sig/callout-box -->
<div class="sig-callout sig-callout-success alignwide">
    <div class="sig-callout-header">
        <div class="sig-callout-icon">✅</div>
        <h4 class="sig-callout-title">GDPR Compliant & Privacy Focused</h4>
    </div>
    <div class="sig-callout-content">
        <p>We don\'t store any of your invoice data. Everything happens in your browser, ensuring complete privacy and GDPR compliance for your business information.</p>
    </div>
</div>
<!-- /wp:sig/callout-box -->

<!-- wp:sig/client-review -->
<div class="sig-review sig-review-minimal alignwide">
    <div class="sig-review-container">
        <div class="sig-review-content">
            <div class="sig-review-rating">
                <span class="star filled">⭐</span>
                <span class="star filled">⭐</span>
                <span class="star filled">⭐</span>
                <span class="star filled">⭐</span>
                <span class="star filled">⭐</span>
            </div>
            <blockquote class="sig-review-text">
                "Perfect for my consulting business. I can create professional invoices in minutes and the PDF quality is excellent for client presentations."
            </blockquote>
        </div>
        <div class="sig-review-author">
            <div class="sig-review-details">
                <h5 class="sig-client-name">Michael Chen</h5>
                <p class="sig-client-title">Business Consultant</p>
                <p class="sig-client-company">Strategic Solutions</p>
            </div>
        </div>
    </div>
</div>
<!-- /wp:sig/client-review -->';
    }
}

// Initialize block patterns
new SIG_Block_Patterns();