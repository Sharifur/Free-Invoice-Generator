/**
 * Frontend interactive JavaScript for Invoice Components Guide block
 */

document.addEventListener('DOMContentLoaded', function() {
    // Find all invoice components blocks on the page
    const componentBlocks = document.querySelectorAll('.wp-block-sig-invoice-components');
    
    componentBlocks.forEach(block => {
        const componentItems = block.querySelectorAll('.ib-component-item');
        
        // Add click handler to each component
        componentItems.forEach(item => {
            item.addEventListener('click', function() {
                // Get the parent components list
                const componentsList = this.closest('.ib-components-list');
                
                // Remove active class from all items in this block
                componentsList.querySelectorAll('.ib-component-item').forEach(component => {
                    component.classList.remove('active');
                });
                
                // Add active class to clicked item
                this.classList.add('active');
                
                // Optional: Add smooth scroll animation
                const detailsElement = this.querySelector('.ib-component-details');
                if (detailsElement) {
                    setTimeout(() => {
                        detailsElement.scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'nearest' 
                        });
                    }, 100);
                }
            });
        });
        
        // Optional: Add keyboard navigation
        componentItems.forEach((item, index) => {
            item.setAttribute('tabindex', '0');
            
            item.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
                
                // Arrow key navigation
                if (e.key === 'ArrowDown' && componentItems[index + 1]) {
                    e.preventDefault();
                    componentItems[index + 1].focus();
                }
                
                if (e.key === 'ArrowUp' && componentItems[index - 1]) {
                    e.preventDefault();
                    componentItems[index - 1].focus();
                }
            });
        });
    });
});