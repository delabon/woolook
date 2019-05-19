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
     * Get Products
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

}
