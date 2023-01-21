<?php
/**
 * Plugin Name: Woolook
 * Plugin URI: https://wordpress.org/plugins/woolook/
 * Description: Present your Woocommerce products and categories beautifully on your homepage or any page.
 * Author: Sabri Taieb
 * Author URI: https://delabon.com/
 * Version: 1.7.0
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'WOOLOOK_VERSION', '1.7.0' );
define( 'WOOLOOK_URL', plugins_url( '',__FILE__) );
define( 'WOOLOOK_PATH', __DIR__ );

/**
 * Block Initializer.
 */
require_once WOOLOOK_PATH . '/includes/init.php';
