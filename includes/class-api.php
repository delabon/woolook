<?php

namespace Woolook;

class Api{

	private $version;
	private $namespace;

	/**
	 * Constructor.
	 */
	public function __construct() {

		$this->version   = '1';
        $this->namespace = 'woolook/v' . $this->version;
        $this->run();
        
    }
    
	/**
	 * Run all of the plugin functions.
	 */
	public function run() {
		add_action( 'rest_api_init', array( $this, 'create_endpoints' ) );
	}

    /**
     * Creates REST Endpoints
     */
    public function create_endpoints(){

		register_rest_route(
			$this->namespace,
			'/product_list',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'get_product_list' ),
                'permission_callback' => function () { return true; /* its public */ },
			)
        );

		register_rest_route(
			$this->namespace,
			'/products',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'get_products' ),
                'permission_callback' => function () { return true; /* its public */ },
			)
        );

		register_rest_route(
			$this->namespace,
			'/category_list',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'get_category_list' ),
                'permission_callback' => function () { return true; /* its public */ },
			)
        );
        
        register_rest_route(
			$this->namespace,
			'/categories',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'get_categories' ),
                'permission_callback' => function () { return true; /* its public */ },
			)
        );
    }

    /**
     * Get Product List (used for settings)
     *
     * @return \WP_REST_Response
     */
    public function get_product_list( $request ){

        if( ! class_exists('Woocommerce') ) {
            return new \WP_Error( 'Woocommerce_Required', __( "Woocommerce Required", "woolook" ) );
        }

		$products = new Product_List( $request->get_params() );
        $response = new \WP_REST_Response( $products->get_products() );
        $response->set_status(200);
    
        return $response;
    }

    /**
     * Get Products
     *
     * @return \WP_REST_Response
     */
    public function get_products( $request ){

        if( ! class_exists('Woocommerce') ) {
            return new \WP_Error( 'Woocommerce_Required', __( "Woocommerce Required", "woolook" ) );
        }

		$products = new Products( $request->get_params() );
        $response = new \WP_REST_Response( $products->get_products() );
        $response->set_status(200);
    
        return $response;
    }
    
    /**
     * Get Category List (used for settings)
     *
     * @return \WP_REST_Response
     */
    public function get_category_list( $request ){

        if( ! class_exists('Woocommerce') ) {
            return new \WP_Error( 'Woocommerce_Required', __( "Woocommerce Required", "woolook" ) );
        }

		$list = new CategoryList( $request->get_params() );
        $response = new \WP_REST_Response( $list->get_items() );
        $response->set_status(200);
    
        return $response;
    }

    /**
     * Get Categories for Collection Blocks
     *
     * @return \WP_REST_Response
     */
    public function get_categories( $request ){

        if( ! class_exists('Woocommerce') ) {
            return new \WP_Error( 'Woocommerce_Required', __( "Woocommerce Required", "woolook" ) );
        }

		$list = new Categories( $request->get_params() );
        $response = new \WP_REST_Response( $list->get_categories() );
        $response->set_status(200);
    
        return $response;
    }

}
