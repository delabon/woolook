(function( $ ){

    /**
     * Panel Nav ( Mobile )
     */
    var nav = $('.sog_panel_menu');
    var currentNavItem = nav.find('.__active a');
    var mobileNavOuput = $('<div class="sog_panel_menu_mobile"><div><span></span><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"><path d="M12 21l-12-18h24z"/></svg></div></div>').append( nav.clone().removeClass('sog_panel_menu') );
    mobileNavOuput.insertBefore('.sog_panel_menu');
    mobileNavOuput.find('> div span').text(currentNavItem.text());

    mobileNavOuput.find('> div').on('click', function(){
        mobileNavOuput.toggleClass('__opened');
    });

    /**
     * Tab Toggle
     */
    $('.sog_tabs > li > a').click(function( event ){
        event.preventDefault();
        $(this).parent().toggleClass('_open_');
    });

})( jQuery )