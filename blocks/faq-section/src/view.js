document.addEventListener('DOMContentLoaded', function() {
    // Initialize all FAQ blocks on the page
    const faqBlocks = document.querySelectorAll('.wp-block-sig-faq-section');
    
    faqBlocks.forEach(function(block) {
        initializeFAQSection(block);
    });
});

function initializeFAQSection(block) {
    const categoryButtons = block.querySelectorAll('.ib-category-btn');
    const faqGroups = block.querySelectorAll('.ib-faq-group');
    const faqItems = block.querySelectorAll('.ib-faq-item');
    
    // Category switching functionality
    categoryButtons.forEach(function(button) {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetCategory = button.getAttribute('data-category');
            
            // Remove active class from all buttons and groups
            categoryButtons.forEach(function(btn) {
                btn.classList.remove('active');
                btn.style.backgroundColor = '#f8f9fa';
                btn.style.color = '#666';
            });
            
            faqGroups.forEach(function(group) {
                group.classList.remove('active');
            });
            
            // Add active class to clicked button and corresponding group
            button.classList.add('active');
            
            // Get accent color from CSS custom property or default
            const accentColor = getComputedStyle(block).getPropertyValue('--accent-color') || '#667eea';
            button.style.backgroundColor = accentColor;
            button.style.color = '#fff';
            
            // Show corresponding FAQ group
            const targetGroup = block.querySelector('#' + targetCategory);
            if (targetGroup) {
                targetGroup.classList.add('active');
            }
        });
    });
    
    // FAQ accordion functionality
    faqItems.forEach(function(item) {
        const question = item.querySelector('.ib-faq-question');
        const answer = item.querySelector('.ib-faq-answer');
        const icon = item.querySelector('.ib-faq-icon');
        
        if (question) {
            question.addEventListener('click', function() {
                const isActive = item.classList.contains('active');
                
                // Close other items in the same group
                const group = item.closest('.ib-faq-group');
                if (group) {
                    group.querySelectorAll('.ib-faq-item').forEach(function(otherItem) {
                        if (otherItem !== item) {
                            otherItem.classList.remove('active');
                            const otherIcon = otherItem.querySelector('.ib-faq-icon');
                            if (otherIcon) {
                                otherIcon.style.transform = 'rotate(0deg)';
                            }
                        }
                    });
                }
                
                // Toggle current item
                if (isActive) {
                    item.classList.remove('active');
                    if (icon) {
                        icon.style.transform = 'rotate(0deg)';
                    }
                } else {
                    item.classList.add('active');
                    if (icon) {
                        icon.style.transform = 'rotate(45deg)';
                    }
                }
            });
        }
    });
    
    // Set initial active state
    if (categoryButtons.length > 0 && faqGroups.length > 0) {
        categoryButtons[0].classList.add('active');
        faqGroups[0].classList.add('active');
        
        // Apply accent color to first button
        const accentColor = getComputedStyle(block).getPropertyValue('--accent-color') || '#667eea';
        categoryButtons[0].style.backgroundColor = accentColor;
        categoryButtons[0].style.color = '#fff';
    }
}

// Handle dynamic content loading (for AJAX-loaded content)
document.addEventListener('DOMContentLoaded', function() {
    // MutationObserver to handle dynamically added content
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            mutation.addedNodes.forEach(function(node) {
                if (node.nodeType === 1) { // Element node
                    // Check if the added node is an FAQ block
                    if (node.classList && node.classList.contains('wp-block-sig-faq-section')) {
                        initializeFAQSection(node);
                    }
                    
                    // Check if the added node contains FAQ blocks
                    const nestedBlocks = node.querySelectorAll('.wp-block-sig-faq-section');
                    nestedBlocks.forEach(function(block) {
                        initializeFAQSection(block);
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

// Smooth scroll to FAQ section when hash is present
window.addEventListener('load', function() {
    if (window.location.hash) {
        const target = document.querySelector(window.location.hash);
        if (target && target.closest('.wp-block-sig-faq-section')) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    const focusedElement = document.activeElement;
    
    // Handle Enter and Space for FAQ questions
    if ((e.key === 'Enter' || e.key === ' ') && focusedElement.classList.contains('ib-faq-question')) {
        e.preventDefault();
        focusedElement.click();
    }
    
    // Handle Enter and Space for category buttons
    if ((e.key === 'Enter' || e.key === ' ') && focusedElement.classList.contains('ib-category-btn')) {
        e.preventDefault();
        focusedElement.click();
    }
});

// Add accessibility attributes
document.addEventListener('DOMContentLoaded', function() {
    const faqBlocks = document.querySelectorAll('.wp-block-sig-faq-section');
    
    faqBlocks.forEach(function(block) {
        // Add ARIA attributes to FAQ items
        const faqItems = block.querySelectorAll('.ib-faq-item');
        faqItems.forEach(function(item, index) {
            const question = item.querySelector('.ib-faq-question');
            const answer = item.querySelector('.ib-faq-answer');
            
            if (question && answer) {
                const questionId = `faq-question-${index}`;
                const answerId = `faq-answer-${index}`;
                
                question.setAttribute('id', questionId);
                question.setAttribute('aria-expanded', 'false');
                question.setAttribute('aria-controls', answerId);
                question.setAttribute('role', 'button');
                question.setAttribute('tabindex', '0');
                
                answer.setAttribute('id', answerId);
                answer.setAttribute('aria-labelledby', questionId);
                answer.setAttribute('role', 'region');
                
                // Update aria-expanded when item is toggled
                const originalClick = question.onclick;
                question.addEventListener('click', function() {
                    const isExpanded = item.classList.contains('active');
                    question.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
                });
            }
        });
        
        // Add ARIA attributes to category buttons
        const categoryButtons = block.querySelectorAll('.ib-category-btn');
        categoryButtons.forEach(function(button) {
            button.setAttribute('role', 'tab');
            button.setAttribute('tabindex', '0');
        });
    });
});