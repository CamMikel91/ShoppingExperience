function fadeButtons() {
    $(document).ready(function() {
        $('nav a, footer a, button').on('mouseover', function() {
            $(this).fadeTo(150, 0.3);
        });
        $('nav a, footer a, button').on('mouseout', function() {
            $(this).fadeTo(150, 1);
        });
    
        $('nav a, footer a, button').on('click', function() {
            $(this).fadeTo(0, 1);
        });
    });
}
fadeButtons();