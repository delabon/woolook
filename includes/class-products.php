<?php

namespace Woolook;

class Products{

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
     * @return array
     */
    public function get_products(){

        if( ! class_exists('Woocommerce') ) {
            return new \WP_Error( 'Woocommerce_Required', __( "Woocommerce Required", "woolook" ) );
        }

		if( isset( $this->atts['products_ids'] ) ){

			$products = $this->get_products_custom_query();
		}
		else{

			$products = wc_get_products( array(
				'status' => 'publish',
				'limit' => $this->prepare_limit_for_query(),
				'category' => $this->prepare_categories_for_query(),
			) );
		}

        return $this->prepare_products_response( $products );
	}
	
	/**
	 * Get products using wpdb (used by Hand-picked products blocks)
	 *
	 * @return array
	 */
	protected function get_products_custom_query(){
		global $wpdb;

		$post_table = $wpdb->prefix . "posts";

		$ids = $this->prepare_ids_for_query();

		$sql = "SELECT ID FROM $post_table";
		$sql .= " WHERE ID IN (". $ids .")";
		$sql .= " AND post_type = 'product' AND post_status = 'publish'";
		$sql .= " ORDER BY FIND_IN_SET(id,'". $ids ."')"; // disables auto order
		
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
		$data['permalink']        	= $product->get_permalink();
		$data['sku']              	= $product->get_sku();
		$data['description']      	= $product->get_description();
		$data['short_description']	= $product->get_short_description();
		$data['price']            	= $product->get_price();
		$data['price_html']       	= $this->get_product_price( $product );
		$data['reviews']       		= $product->get_average_rating();		
		$data['reviews_html']		= $this->get_product_reviews( $product );
        $data['images']				= $this->get_product_images( $product );

		return $data;
    }
    
	/**
	 * Get product images.
	 *
	 * @param WC_Product $product Product instance.
	 * @return array
	 */
    protected function get_product_images( $product ){
		$images         = array();
		$attachment_ids = array();

		// Add featured image.
		if ( has_post_thumbnail( $product->get_id() ) ) {
			$attachment_ids[] = $product->get_image_id();
		}

		// Add gallery images.
		$attachment_ids = array_merge( $attachment_ids, $product->get_gallery_image_ids() );

		// Build image data.
		foreach ( $attachment_ids as $attachment_id ) {
			$attachment_post = get_post( $attachment_id );
			if ( is_null( $attachment_post ) ) {
				continue;
			}

			$attachment = wp_get_attachment_image_src( $attachment_id, 'full' );
			if ( ! is_array( $attachment ) ) {
				continue;
			}

			$images[] = array(
				'id'   => (int) $attachment_id,
				'src'  => current( $attachment ),
				'name' => get_the_title( $attachment_id ),
				'alt'  => get_post_meta( $attachment_id, '_wp_attachment_image_alt', true ),
			);
		}

		return $images;
	}
	
	/**
	 * Get product images.
	 *
	 * @param WC_Product $product Product instance.
	 * @return array
	 */
    protected function get_product_reviews( $product ){

		$average = $product->get_average_rating();

		if( $average == 0 ){
			return '';
		}

		$text = sprintf(__( 'Rated %s out of 5', 'woolook' ), $average);
		$width = ( ( $average / 5 ) * 100 );
		$trans = __( 'out of 5', 'woolook' );

		return <<<HTML
		<div class="star-rating" title="{$text}">
			<span style="width: {$width}%">
				<strong itemprop="ratingValue" class="rating">{$average}</strong> 
				{$trans}
			</span>
		</div>
HTML;
	}
	
   /**
     * Returns the price in html format.
     *
     * @param WC_Product $product Product instance.
     * @return string
     */
	protected function get_product_price( $product ){

        if ( '' === $product->get_price() ) {
            $price = '';
		} 
		elseif ( $product->is_on_sale() ) {
            $price = wc_format_sale_price( wc_get_price_to_display( $product, array( 'price' => $product->get_regular_price() ) ), wc_get_price_to_display( $product ) ) . $product->get_price_suffix();
		} 
		else {
            $price = wc_price( wc_get_price_to_display( $product ) ) . $product->get_price_suffix();
		}
		
		$price = str_replace( 'woocommerce-Price-amount', 'woolook-item-price-amount', $price );
		$price = str_replace( 'woocommerce-Price-currencySymbol', 'woolook-item-price-currencySymbol', $price );

        return $price;
    }

	/**
	 * Prepare categories for query.
	 *
	 * @return array
	 */
	protected function prepare_categories_for_query( ){
		$categories = array();

		if( isset( $this->atts['categories'] ) && count( $this->atts['categories'] ) ){
			foreach ( $this->atts['categories'] as $category ) {
				$categories[] = sanitize_text_field( $category['slug'] );
			}
		}

		return $categories;
	}
	
	/**
	 * Prepare limit for query.
	 *
	 * @return int
	 */
	protected function prepare_limit_for_query(){
		
		if( ! isset( $this->atts['limit'] ) ){
			return -1;
		}

		return (int)$this->atts['limit'];
	}

	/**
	 * Prepare ids for query
	 *
	 * @return array
	 */
	protected function prepare_ids_for_query(){

		$ids = array();

		if( is_array( $this->atts['products_ids'] ) ){

			foreach ( $this->atts['products_ids'] as $item ) {
				$ids[] = $item['id'];
			}
		}
				
		return implode( ',', $ids );
	}

}
