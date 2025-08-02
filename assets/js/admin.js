jQuery(document).ready(function($) {
    // Admin page functionality
    
    // Confirm reset analytics
    $('button[name="sig_reset_analytics"]').on('click', function(e) {
        if (!confirm('Are you sure you want to reset the invoice counter?')) {
            e.preventDefault();
        }
    });
    
    // Copy shortcode to clipboard
    $('.form-table code').on('click', function() {
        const $temp = $('<input>');
        $('body').append($temp);
        $temp.val($(this).text()).select();
        document.execCommand('copy');
        $temp.remove();
        
        // Show feedback
        const $code = $(this);
        const originalText = $code.text();
        $code.text('Copied!').css('background', '#4CAF50').css('color', 'white');
        
        setTimeout(function() {
            $code.text(originalText).css('background', '').css('color', '');
        }, 1000);
    });
});