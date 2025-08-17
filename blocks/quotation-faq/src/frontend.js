/**
 * FAQ Frontend JavaScript
 * Handles the click functionality for FAQ items
 */

document.addEventListener('DOMContentLoaded', function() {
    // Find all FAQ sections on the page
    const faqSections = document.querySelectorAll('.quotation-faq-section');
    
    faqSections.forEach(function(section) {
        // Find all FAQ questions within this section
        const faqQuestions = section.querySelectorAll('.faq-question');
        
        faqQuestions.forEach(function(question) {
            question.addEventListener('click', function() {
                // Get the parent FAQ item
                const faqItem = this.closest('.faq-item');
                const faqAnswer = faqItem.querySelector('.faq-answer');
                const faqIcon = faqItem.querySelector('.faq-icon');
                
                // Toggle the active class
                faqItem.classList.toggle('active');
                
                // Toggle the answer visibility
                if (faqItem.classList.contains('active')) {
                    faqAnswer.style.display = 'block';
                    faqIcon.textContent = '−'; // Change to minus
                } else {
                    faqAnswer.style.display = 'none';
                    faqIcon.textContent = '+'; // Change to plus
                }
                
                // Close other FAQ items (optional - uncomment for accordion behavior)
                /*
                const otherFaqItems = section.querySelectorAll('.faq-item');
                otherFaqItems.forEach(function(otherItem) {
                    if (otherItem !== faqItem && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                        const otherAnswer = otherItem.querySelector('.faq-answer');
                        const otherIcon = otherItem.querySelector('.faq-icon');
                        otherAnswer.style.display = 'none';
                        otherIcon.textContent = '+';
                    }
                });
                */
            });
        });
    });
});