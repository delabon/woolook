<?php

namespace Woolook;

class Ajax{

    function __construct(){
        add_action('wp_ajax_woolook_ajax_add_to_cart', array( $this, 'add_to_cart' ) );
        add_action('wp_ajax_nopriv_woolook_ajax_add_to_cart', array( $this, 'add_to_cart' ) );
    }

    /**
     * Add to cart
     */        
    function add_to_cart() {
        
        if ( ! wp_verify_nonce( $_POST['nonce'], 'woolook-addtocart' ) ) {
            wp_send_json_error(
                array(
                    'message' => 'invalid nonce',
                )
            );
        }

		$product_id        = apply_filters( 'woocommerce_add_to_cart_product_id', absint( $_POST['product_id'] ) );
		$product           = wc_get_product( $product_id );
		$quantity          = empty( $_POST['quantity'] ) ? 1 : wc_stock_amount( $_POST['quantity'] );
		$passed_validation = apply_filters( 'woocommerce_add_to_cart_validation', true, $product_id, $quantity );
		$product_status    = get_post_status( $product_id );
		$variation_id      = 0;
		$variation         = array();

		if ( $product && 'variation' === $product->get_type() ) {
			$variation_id = $product_id;
			$product_id   = $product->get_parent_id();
			$variation    = $product->get_variation_attributes();
		}

		if ( $passed_validation && false !== WC()->cart->add_to_cart( $product_id, $quantity, $variation_id, $variation ) && 'publish' === $product_status ) {

			do_action( 'woocommerce_ajax_added_to_cart', $product_id );

			if ( 'yes' === get_option( 'woocommerce_cart_redirect_after_add' ) ) {
				wc_add_to_cart_message( array( $product_id => $quantity ), true );
			}

			// Return fragments
			\WC_AJAX::get_refreshed_fragments();

		} else {

			// If there was an error adding to the cart, redirect to the product page to show any errors
			$data = array(
				'error'       => true,
				'product_url' => apply_filters( 'woocommerce_cart_redirect_after_error', get_permalink( $product_id ), $product_id ),
			);

			wp_send_json( $data );
        }

        wp_die();
    }

}
