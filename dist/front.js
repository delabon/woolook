(function($){

    /**
     * Add to Cart Button Click Event
     * @event adding_to_cart woocommerce event 
     * @event added_to_cart woocommerce event 
     */
    $('.woolook-item-addtocart').on('click', function( event ){
        event.preventDefault();

        var _self = $( this );

        if( _self.is('.__loading__') ){
            return;
        }

        var data = {
            nonce: woolook.nonce,
            action: 'woolook_ajax_add_to_cart',
            product_id: _self.data('id'),
            product_sku: '',
            quantity: 1,
            variation_id: 0,
        };

        $(document.body).trigger( 'adding_to_cart', [ _self, data ] );

        $.ajax({
            type: 'post',
            url: woolook.ajaxurl,
            data: data,
            beforeSend: function (response) {
                _self.removeClass('__added__').addClass('__loading__');
            },
            complete: function (response) {
                _self.addClass('__added__').removeClass('__loading__');
            },
            success: function (response) {

                if( response.error ){
                    if( response.product_url ){
                        window.location = response.product_url;
                        return;
                    }
                } 
                else {
                    $(document.body).trigger('added_to_cart', [ response.fragments, response.cart_hash, _self ]);
                }

            },
        });

    });

})( jQuery );
