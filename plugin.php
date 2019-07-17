<?php
/**
 * Plugin Name: Woolook
 * Plugin URI: https://wordpress.org/plugins/woolook/
 * Description: Present your Woocommerce products beautifully on your homepage or any page.
 * Author: Sabri Taieb
 * Author URI: https://delabon.com/
 * Version: 1.1.0
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'WOOLOOK_VERSION', '1.1.0' );
define( 'WOOLOOK_URL', plugins_url( '',__FILE__) );
define( 'WOOLOOK_PATH', __DIR__ );
define( 'WOOLOOK_OPTION_FONT', 'default' );
define( 'WOOLOOK_OPTION_MAX_WIDTH', '100%' );

/**
 * Block Initializer.
 */
require_once WOOLOOK_PATH . '/includes/init.php';
