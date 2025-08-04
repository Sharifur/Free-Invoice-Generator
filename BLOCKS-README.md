# Invoice Generator Gutenberg Blocks

This plugin now includes custom Gutenberg blocks that match the existing invoice generator UI styling. These blocks are specifically designed for creating landing pages for the invoice generator tool.

## Available Blocks

### 1. Why Use Section (`sig/why-use-section`)
**Purpose**: Showcases key benefits and features of the invoice generator
**Includes**: 
- Customizable title and subtitle
- List of key features with icons
- Matches the existing `sig-section` styling

### 2. How to Use Section (`sig/how-to-use-section`) 
**Purpose**: Step-by-step guide with call-to-action
**Includes**:
- Numbered step list
- Customizable CTA button
- Link to invoice builder (#invoice-builder by default)

### 3. Template Options Block (`sig/template-options-block`)
**Purpose**: Displays available invoice template types
**Includes**:
- Grid layout of template cards
- Template descriptions
- Hover effects matching existing UI

### 4. Feature Showcase (`sig/feature-showcase`)
**Purpose**: Highlights advanced features
**Includes**:
- Clean feature list
- Consistent styling with other sections

### 5. Target Audience (`sig/target-audience`)
**Purpose**: Shows who should use the tool
**Includes**:
- Description paragraph
- Audience list with descriptions

### 6. CTA Promotion (`sig/cta-promotion`)
**Purpose**: Promotes Taskip's paid services
**Includes**:
- Gradient background styling
- Prominent call-to-action button
- External link support

### 7. Resources Section (`sig/resources-section`)
**Purpose**: External helpful resources
**Includes**:
- External links with proper attributes
- Resource descriptions
- External link indicators

## Block Category

All blocks are organized under:
**Category**: "Invoice Generator Blocks" (`sig-blocks`)
**Icon**: Calculator

## Block Patterns

The plugin includes pre-built patterns:

### Complete Landing Page Pattern
- Includes all sections in optimal order
- Ready-to-use landing page layout
- Found under "Invoice Generator Patterns" category

### Features Showcase Pattern
- Combines "Why Use" and "Advanced Features" sections
- Perfect for feature-focused pages

### CTA and Resources Pattern
- Combines promotion and resources sections
- Good for bottom-of-page content

## Styling

### CSS Classes Used
- `.sig-section` - Main section container
- `.sig-section-header` - Section headings
- `.sig-feature-list` - Feature lists with checkmarks
- `.sig-btn`, `.sig-btn-primary` - Buttons matching existing UI
- `.sig-layout-grid` - Template grid layout
- `.sig-cta-section` - Special styling for CTA sections

### Responsive Design
- Mobile-optimized layouts
- Matches existing responsive breakpoints
- Grid layouts adapt to screen size

### Color Scheme
- Primary: `#3498db` (Blue)
- Secondary: `#2c3e50` (Dark blue)
- Success: `#27ae60` (Green)
- Background: `#f9f9f9` (Light gray)
- Borders: `#e0e0e0` (Light gray)

## Integration with Existing Plugin

### File Structure
```
blocks/
├── blocks.js                    # Block definitions
assets/css/
├── blocks-frontend.css          # Frontend styles
├── blocks-editor.css           # Editor styles
includes/
├── class-gutenberg-blocks.php  # Block registration
├── class-block-patterns.php    # Pattern registration
```

### WordPress Integration
- Blocks automatically enqueue existing invoice generator styles
- Uses same CSS classes for consistency
- Inherits responsive breakpoints
- Matches existing color scheme

## Usage Instructions

### Adding Individual Blocks
1. Open WordPress Block Editor (Gutenberg)
2. Click "+" to add a new block
3. Search for "Invoice Generator" or browse the "Invoice Generator Blocks" category
4. Select desired block
5. Customize content in the block settings panel

### Using Block Patterns
1. Open WordPress Block Editor
2. Click "+" to add blocks
3. Go to "Patterns" tab
4. Look for "Invoice Generator Patterns" category
5. Select desired pattern
6. Customize content as needed

### Customization Options
Each block includes:
- **Inspector Controls**: Title, description, and content customization
- **Inline Editing**: Direct text editing where appropriate
- **Responsive Preview**: See how blocks look on different devices

## Development Notes

### Building Blocks
```bash
npm install
npm run build
```

### File Dependencies
- React 18.2.0
- WordPress Block Editor APIs
- Existing invoice generator CSS
- Webpack for compilation

### Browser Support
- Matches existing plugin browser support
- Modern browsers with ES6 support
- Graceful degradation for older browsers

## SEO Optimization

### Semantic HTML
- Uses proper heading hierarchy (H2, H3)
- Semantic `<section>` tags
- Proper list structures (`<ul>`, `<ol>`)

### Accessibility
- ARIA labels where appropriate
- Keyboard navigation support
- Screen reader friendly
- High contrast colors

### Performance
- Minimal JavaScript footprint
- CSS loaded only when blocks are present
- Optimized images and icons
- Fast loading times

## Customization Guide

### Modifying Block Content
1. Edit `blocks/blocks.js`
2. Update default attributes
3. Rebuild with `npm run build`

### Styling Changes
1. Edit `assets/css/blocks-frontend.css` for frontend
2. Edit `assets/css/blocks-editor.css` for editor
3. Changes apply immediately (no rebuild needed)

### Adding New Blocks
1. Add block definition to `blocks/blocks.js`
2. Register in `class-gutenberg-blocks.php`
3. Add styles to CSS files
4. Rebuild JavaScript

This implementation ensures your Gutenberg blocks perfectly match the existing invoice generator UI while providing a seamless content creation experience for WordPress users.