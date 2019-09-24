<?php

namespace Woolook;

class Product_List{

    private $atts;

    /**
     * Constructor
     *
     * @param array $atts
     */
    function __construct( $atts ){
        $this->atts = $atts;
    }

    /**
     * Get Products
     *
     * @return \WP_REST_Response
     */
    public function get_products(){

        if( ! class_exists('Woocommerce') ) {
            return new \WP_Error( 'Woocommerce_Required', __( "Woocommerce Required", "woolook" ) );
		}

        return $this->prepare_products_response( $this->get_from_db() );
	}
	
	/**
	 * Get products from database
	 *
	 * @return void
	 */
	function get_from_db(){
		global $wpdb;

		$post_table = $wpdb->prefix . "posts";
		$sql = "SELECT ID FROM $post_table";
			
		if( isset( $this->atts['query'] ) ){
			$sql .= " WHERE post_title LIKE '%".esc_sql($this->atts['query'])."%' AND post_type = 'product'";
		}
		else{
			$sql .= " WHERE post_type = 'product'";
		}
		
		$sql .= " AND post_status = 'publish' ";

		return array_map(function( $item ){
			return wc_get_product( $item->ID );
		}, $wpdb->get_results( $sql ));
	}

    /**
     * Prepare products response
     *
     * @param [type] $products
     * @return void
     */
    protected function prepare_products_response( $products ){
        $arr = array();

        foreach ($products as $product ) {
            array_push( $arr, $this->get_product_data( $product ) );
        }

        return $arr;
    }

	/**
	 * Get product data.
	 *
	 * @param WC_Product $product Product instance.
	 * @return array
	 */
	protected function get_product_data( $product ) {
		$data     = array();

		$data['id']               	= $product->get_id();
		$data['name']             	= $product->get_name();
		$data['slug']        		= $product->get_slug();

		return $data;
    }
    
}
