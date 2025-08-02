# Free WordPress Invoice Generator Plugin

> **Powered by [Taskip.net](https://taskip.net) - Professional CRM & Business Management Solutions**

A powerful WordPress plugin that allows users to generate professional invoices without requiring login. Built with React for a modern, responsive interface and optimized for business productivity.

[![License](https://img.shields.io/badge/license-GPL%20v2%2B-blue.svg)](https://github.com/Taskip-CRM/Free-Invoice-Generator/blob/main/LICENSE)
[![WordPress](https://img.shields.io/badge/wordpress-5.0%2B-blue.svg)](https://wordpress.org/)
[![React](https://img.shields.io/badge/react-18.2-blue.svg)](https://reactjs.org/)

## 🚀 Features

### Core Functionality
- **🔓 No Login Required**: Users can create invoices instantly without authentication
- **⚡ React-Based Interface**: Modern, responsive UI built with React 18
- **🎯 Drag & Drop Line Items**: Reorder invoice items with sortable functionality using @dnd-kit
- **🧮 Real-time Calculations**: Automatic calculation of totals, taxes, discounts, and shipping
- **🎨 Template Customization**: 6 layout options with multiple color schemes
- **📄 PDF Generation**: Download invoices as high-quality PDF files
- **💰 Multi-Currency Support**: 8+ currencies supported (USD, EUR, GBP, CAD, AUD, JPY, CNY, INR)
- **🖼️ Logo Upload**: Drag & drop company logo upload with position control
- **📱 Mobile Responsive**: Works perfectly on all devices and screen sizes

### Advanced Features
- **💾 Persistent User Preferences**: Company data and settings saved locally
- **⚡ Performance Optimized**: Page-specific asset loading for better site speed
- **🎨 Visual Layout Previews**: SVG-based layout previews for better UX
- **🔒 Security Features**: File upload validation, rate limiting, and sanitization
- **📊 Analytics**: Track invoice generation statistics
- **🌐 Internationalization**: Ready for translation with WordPress i18n

## 📦 Installation

### Method 1: WordPress Admin (Recommended)
1. Download the latest release from [GitHub](https://github.com/Taskip-CRM/Free-Invoice-Generator)
2. Go to WordPress Admin → Plugins → Add New → Upload Plugin
3. Upload the ZIP file and activate the plugin
4. The plugin will automatically build required assets

### Method 2: Manual Installation
1. Upload the plugin folder to `/wp-content/plugins/`
2. Navigate to the plugin directory and run:
   ```bash
   npm install
   npm run build
   ```
3. Activate the plugin through the 'Plugins' menu in WordPress
4. Go to Settings → Invoice Generator to configure the plugin

### Method 3: Developer Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Taskip-CRM/Free-Invoice-Generator.git
   cd Free-Invoice-Generator
   ```
2. Install dependencies and build:
   ```bash
   npm install
   npm run build
   ```
3. Copy to WordPress plugins directory or create a symlink

## 🎯 User Manual

### Getting Started

1. **Installation**: Follow one of the installation methods above
2. **Configuration**: Go to Settings → Invoice Generator in WordPress admin
3. **Add Shortcode**: Insert `[invoice_generator]` on any page or post
4. **Start Creating**: Users can immediately begin creating invoices

### Creating Your First Invoice

1. **Company Information**:
   - Add your company name, logo, and contact details
   - This information is saved automatically for future invoices

2. **Client Details**:
   - Enter client name, address, email, and phone
   - All fields are optional but recommended for professional invoices

3. **Invoice Details**:
   - Set invoice number (auto-incremented)
   - Choose invoice and due dates
   - Select currency from supported options

4. **Line Items**:
   - Add products/services with descriptions
   - Set quantities and rates
   - Drag and drop to reorder items
   - Items automatically calculate totals

5. **Financial Calculations**:
   - Add discounts (percentage or fixed amount)
   - Include tax rates
   - Add shipping costs with descriptions
   - All calculations update in real-time

6. **Additional Information**:
   - Add terms and conditions
   - Include payment instructions
   - Add custom notes
   - Customize footer message

7. **Export Options**:
   - Preview invoice in real-time
   - Print directly from browser
   - Download as PDF file
   - Reset for new invoice

### Customization Options

#### Template Customizer
Access the template customizer to personalize your invoices:

- **Layout Selection**: Choose from 6 professional layouts:
  - **Compact**: Clean and space-efficient
  - **Standard**: Balanced layout with good spacing
  - **Detailed**: Spacious with extra information
  - **Modern**: Contemporary design with gradients
  - **Classic**: Traditional formal business style
  - **Minimal**: Clean and simple design

- **Color Schemes**: 5 pre-built themes plus custom colors:
  - Professional (Blue/Navy)
  - Creative (Purple/Pink)
  - Nature (Green/Teal)
  - Warm (Orange/Red)
  - Monochrome (Black/Gray)
  - Custom colors for all elements

- **Typography**: Choose from 8 professional fonts
- **Logo Settings**: Position logo left, center, or right
- **Visibility Options**: Show/hide header, footer, logo

#### Admin Settings
Configure the plugin through Settings → Invoice Generator:

- **Plugin Status**: Enable/disable functionality
- **Default Currency**: Set default for new invoices
- **Target Page**: Optimize loading for specific pages
- **Security Settings**: 
  - Maximum file size for logos (0.5-10MB)
  - Allowed image types (JPG, PNG, GIF, WebP)
  - Rate limiting for PDF generation
- **Analytics**: View total invoices generated

### Shortcode Parameters

#### Basic Usage
```
[invoice_generator]
```

#### Advanced Usage
```
[invoice_generator currency="EUR" theme="professional"]
```

**Available Parameters**:
- `currency`: Set default currency (USD, EUR, GBP, etc.)
- `theme`: Set initial color theme (professional, creative, nature, warm, monochrome)

### Performance Optimization

The plugin includes several performance features:

1. **Conditional Loading**: Assets only load on pages with the shortcode
2. **Target Page Setting**: Limit loading to specific pages
3. **Optimized React Build**: Minified production build with tree shaking
4. **Local Storage**: Reduces server requests by storing data client-side
5. **Lazy Loading**: Components load only when needed

## 🛠️ Development Guide

### Prerequisites
- Node.js 14+ and npm
- WordPress 5.0+
- PHP 7.2+
- Modern browser for testing

### Development Setup

1. **Clone and Install**:
   ```bash
   git clone https://github.com/Taskip-CRM/Free-Invoice-Generator.git
   cd Free-Invoice-Generator
   npm install
   ```

2. **Development Mode**:
   ```bash
   npm run dev
   ```
   This starts webpack in watch mode with hot reloading.

3. **Build for Production**:
   ```bash
   npm run build
   ```

4. **Linting and Testing**:
   ```bash
   npm run lint
   npm run test
   ```

### Project Structure

```
simple-invoice-generator/
├── admin/                    # WordPress admin interface
│   ├── class-admin-settings.php
│   └── partials/
├── assets/                   # Static assets
│   ├── css/
│   │   ├── invoice-generator.css  # Main styles
│   │   └── admin.css             # Admin styles
│   └── js/
│       └── admin.js
├── dist/                     # Compiled React application
│   ├── app.js               # Main bundle
│   └── app.css              # Compiled styles
├── includes/                 # Core PHP classes
│   ├── class-simple-invoice-generator.php  # Main plugin class
│   ├── class-shortcode.php                 # Shortcode handler
│   ├── class-enqueue.php                   # Asset management
│   └── class-rest-api.php                  # REST API endpoints
├── src/                      # React source code
│   ├── components/          # React components
│   │   ├── InvoiceGenerator.jsx    # Main component
│   │   ├── CompanySection.jsx      # Company info
│   │   ├── ClientSection.jsx       # Client details
│   │   ├── LineItemsTable.jsx      # Line items with drag & drop
│   │   ├── CalculationsPanel.jsx   # Financial calculations
│   │   ├── InvoicePreview.jsx      # Preview component
│   │   ├── TemplateCustomizer.jsx  # Theme customization
│   │   └── ExportControls.jsx      # Print/PDF controls
│   ├── hooks/               # Custom React hooks
│   │   ├── useInvoiceData.js       # Invoice state management
│   │   ├── useTemplateSettings.js  # Template customization
│   │   └── useLocalStorage.js      # Local storage utilities
│   ├── utils/               # Utility functions
│   │   ├── calculations.js         # Financial calculations
│   │   ├── currency.js            # Currency formatting
│   │   ├── pdf-generator.js       # PDF generation
│   │   └── validation.js          # Input validation
│   ├── styles/              # Component-specific styles
│   └── index.js             # Entry point
├── templates/               # PHP template files
├── languages/               # Translation files
├── webpack.config.js        # Webpack configuration
├── package.json            # Node.js dependencies
└── simple-invoice-generator.php  # Main plugin file
```

### Key Technologies

- **Frontend**: React 18, Webpack 5, Babel
- **Drag & Drop**: @dnd-kit/core and @dnd-kit/sortable
- **PDF Generation**: jsPDF with html2canvas
- **State Management**: React Context API with custom hooks
- **Styling**: CSS Custom Properties (CSS Variables)
- **Build Tools**: Webpack with babel-loader
- **Backend**: WordPress PHP architecture

### API Reference

#### Hooks and Filters

**Actions**:
- `sig_invoice_generated`: Fired when an invoice is created
- `sig_pdf_downloaded`: Fired when a PDF is downloaded
- `sig_settings_saved`: Fired when admin settings are saved

**Filters**:
- `sig_default_currency`: Modify default currency
- `sig_allowed_file_types`: Modify allowed upload types
- `sig_invoice_data`: Modify invoice data before processing
- `sig_template_settings`: Modify template customization options

#### REST API Endpoints

The plugin provides REST API endpoints for advanced integrations:

- `POST /wp-json/sig/v1/generate-pdf`: Generate PDF from invoice data
- `GET /wp-json/sig/v1/currencies`: Get supported currencies
- `GET /wp-json/sig/v1/settings`: Get plugin settings (admin only)

### Customization Guide

#### Adding New Color Schemes

1. Edit `src/hooks/useTemplateSettings.js`
2. Add new scheme to `colorSchemes` object:
   ```javascript
   newScheme: {
       primary: '#color1',
       secondary: '#color2',
       accent: '#color3',
       background: '#color4',
       textColor: '#color5',
       borderColor: '#color6'
   }
   ```

#### Creating Custom Layouts

1. Add new layout to `src/components/TemplateCustomizer.jsx`
2. Create CSS classes in `assets/css/invoice-generator.css`
3. Add SVG preview for the layout selector

#### Extending Currency Support

1. Edit `src/utils/currency.js`
2. Add currency to the `currencies` object with symbol and formatting

### Security Considerations

- File uploads are validated for type and size
- User input is sanitized using WordPress functions
- Rate limiting prevents abuse
- No sensitive data is stored in localStorage
- PDF generation is rate-limited per IP address

## 🔧 Configuration

### WordPress Admin Settings

Access settings through **Settings → Invoice Generator**:

#### General Settings
- **Plugin Status**: Enable/disable the invoice generator
- **Default Currency**: Choose from 8 supported currencies
- **Target Page**: Select specific page for optimized loading

#### Security Settings
- **Max File Size**: Limit logo upload size (0.5-10MB)
- **Allowed Image Types**: Select permitted file formats
- **Rate Limiting**: Set PDF generation limits per hour per IP

#### Analytics
- **Invoice Counter**: Track total invoices generated
- **Reset Counter**: Clear analytics data

### Template Customization

Users can access template customization through the "Customize" button in the invoice generator interface:

#### Layout Options
- **Compact**: Minimal spacing, efficient use of space
- **Standard**: Balanced layout suitable for most businesses
- **Detailed**: Extra spacing and information sections
- **Modern**: Contemporary design with gradients and shadows
- **Classic**: Traditional formal business appearance
- **Minimal**: Clean, simple design with minimal styling

#### Color Schemes
- **Professional**: Blue and navy corporate colors
- **Creative**: Purple and pink for creative businesses
- **Nature**: Green and teal earth tones
- **Warm**: Orange and red energetic colors
- **Monochrome**: Black and gray classic styling
- **Custom**: Manually select all colors

#### Typography and Layout
- **Font Selection**: 8 professional fonts available
- **Logo Position**: Left, center, or right alignment
- **Page Size**: Letter or A4 format
- **Visibility Controls**: Show/hide logo, header, footer

## 🎯 Troubleshooting

### Common Issues

#### Plugin Not Loading
1. Check if shortcode `[invoice_generator]` is correctly placed
2. Verify plugin is activated in WordPress admin
3. Ensure target page setting allows loading on current page
4. Check browser console for JavaScript errors

#### Build Issues
1. Ensure Node.js 14+ is installed:
   ```bash
   node --version
   npm --version
   ```
2. Clear npm cache and reinstall:
   ```bash
   npm cache clean --force
   rm -rf node_modules
   npm install
   ```
3. Run build command:
   ```bash
   npm run build
   ```

#### PDF Generation Issues
1. Check rate limits in admin settings
2. Verify browser supports PDF generation
3. Ensure adequate server resources
4. Check for JavaScript errors in browser console

#### Logo Upload Problems
1. Verify file size is within limits (default 2MB)
2. Check allowed file types in admin settings
3. Ensure proper file permissions on uploads directory
4. Try different image formats (JPG, PNG recommended)

### Performance Issues

#### Slow Loading
1. Enable target page setting for specific page loading
2. Optimize images and reduce file sizes
3. Check for plugin conflicts
4. Verify adequate server resources

#### Memory Issues
1. Increase PHP memory limit in wp-config.php:
   ```php
   ini_set('memory_limit', '256M');
   ```
2. Reduce image sizes for logos
3. Lower PDF generation rate limits

### Debug Mode

Enable WordPress debug mode for detailed error information:

```php
// wp-config.php
define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);
define('WP_DEBUG_DISPLAY', false);
```

Check debug.log file in `/wp-content/` for error details.

## 🤝 Contributing

We welcome contributions to improve the Free Invoice Generator! This project is maintained by [Taskip.net](https://taskip.net) team.

### How to Contribute

1. **Fork the Repository**:
   ```bash
   git fork https://github.com/Taskip-CRM/Free-Invoice-Generator
   ```

2. **Create Feature Branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make Changes**:
   - Follow existing code style and conventions
   - Add comments for complex functionality
   - Test thoroughly across different browsers
   - Update documentation as needed

4. **Commit Changes**:
   ```bash
   git commit -m "Add: Your feature description"
   ```

5. **Push and Create Pull Request**:
   ```bash
   git push origin feature/your-feature-name
   ```
   Then create a pull request on GitHub.

### Development Guidelines

- **Code Style**: Follow WordPress PHP standards and React best practices
- **Testing**: Test on multiple browsers and WordPress versions
- **Documentation**: Update README and inline comments
- **Performance**: Consider impact on loading times and memory usage
- **Security**: Validate all inputs and follow WordPress security guidelines

### Reporting Issues

Please report bugs and feature requests through [GitHub Issues](https://github.com/Taskip-CRM/Free-Invoice-Generator/issues).

Include:
- WordPress version
- PHP version
- Browser and version
- Step-by-step reproduction
- Expected vs actual behavior
- Error messages or console logs

## 📄 License

This project is licensed under the GPL v2 or later - see the [LICENSE](LICENSE) file for details.

## 🔗 Links & Support

- **Website**: [Taskip.net](https://taskip.net) - Professional CRM & Business Management
- **GitHub**: [Free Invoice Generator Repository](https://github.com/Taskip-CRM/Free-Invoice-Generator)
- **Support**: [Contact Taskip.net](https://taskip.net/contact) for premium support
- **Documentation**: [WordPress Plugin Documentation](https://taskip.net/wordpress-invoice-generator)

### About Taskip.net

[Taskip.net](https://taskip.net) is a comprehensive CRM and business management platform designed to streamline your business operations. We provide:

- **Customer Relationship Management (CRM)**
- **Project Management Tools**
- **Invoice and Billing Solutions**
- **Team Collaboration Features**
- **Business Analytics and Reporting**
- **Custom WordPress Plugins and Extensions**

This free invoice generator plugin is part of our commitment to supporting small businesses and freelancers with professional tools.

---

**🌟 Made with ❤️ by [Taskip.net](https://taskip.net) - Empowering businesses with smart solutions**

*If this plugin helps your business, consider checking out our full [CRM platform](https://taskip.net) for complete business management solutions.*