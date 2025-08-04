document.addEventListener('DOMContentLoaded', function() {
    // Initialize all legal compliance blocks on the page
    const legalBlocks = document.querySelectorAll('.wp-block-sig-legal-compliance');
    
    legalBlocks.forEach(function(block) {
        initializeLegalCompliance(block);
    });
});

function initializeLegalCompliance(block) {
    const tabs = block.querySelectorAll('.ib-tax-tab');
    const contents = block.querySelectorAll('.ib-tax-content');
    
    // Add click event listeners to tabs
    tabs.forEach(function(tab) {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = tab.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents within this block
            tabs.forEach(function(t) {
                t.classList.remove('active');
                t.style.backgroundColor = '';
                t.style.color = '';
            });
            
            contents.forEach(function(content) {
                content.classList.remove('active');
            });
            
            // Add active class to clicked tab and corresponding content
            tab.classList.add('active');
            
            // Apply accent color styling to active tab
            const accentColor = getComputedStyle(block.querySelector('.ib-essential-number')).backgroundColor;
            if (accentColor && accentColor !== 'rgba(0, 0, 0, 0)') {
                tab.style.backgroundColor = accentColor;
                tab.style.color = '#fff';
            }
            
            // Show corresponding content
            const targetContent = block.querySelector('#' + targetId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
    
    // Set initial active state
    if (tabs.length > 0 && contents.length > 0) {
        tabs[0].classList.add('active');
        contents[0].classList.add('active');
        
        // Apply accent color to first tab
        const accentColor = getComputedStyle(block.querySelector('.ib-essential-number')).backgroundColor;
        if (accentColor && accentColor !== 'rgba(0, 0, 0, 0)') {
            tabs[0].style.backgroundColor = accentColor;
            tabs[0].style.color = '#fff';
        }
    }
}

// Handle dynamic content loading (for AJAX-loaded content)
document.addEventListener('DOMContentLoaded', function() {
    // MutationObserver to handle dynamically added content
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            mutation.addedNodes.forEach(function(node) {
                if (node.nodeType === 1) { // Element node
                    // Check if the added node is a legal compliance block
                    if (node.classList && node.classList.contains('wp-block-sig-legal-compliance')) {
                        initializeLegalCompliance(node);
                    }
                    
                    // Check if the added node contains legal compliance blocks
                    const nestedBlocks = node.querySelectorAll('.wp-block-sig-legal-compliance');
                    nestedBlocks.forEach(function(block) {
                        initializeLegalCompliance(block);
                    });
                }
            });
        });
    });
    
    // Start observing
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});