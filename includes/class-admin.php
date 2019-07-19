<?php 

namespace Woolook;

class Admin{

    function __construct(){
        add_action( 'admin_menu', array( $this, 'admin_menu' ) );
        add_action('admin_enqueue_scripts', array( $this, 'load_assets' ) );
    }

    /**
     * Admin Page
     */
    function admin_menu() {

        $this->save_settings();

        add_menu_page( 
            'Woolook', 
            'Woolook', 
            'level_8', 
            'woolook', 
            array( $this, 'render_admin_page' ), 
            'dashicons-grid-view', 
            200 
        );
    }

    /**
     * Save settings
     */
    private function save_settings(){

        if( ! isset( $_POST['woolook-submit'] ) ) return;
        if( ! current_user_can('level_8') ) return;
        if ( ! wp_verify_nonce( $_POST['nonce'], 'woolook-admin-settings' ) ) return;

        foreach ( $_POST as $key => $value ) {
            update_option( 'woolook_' . sanitize_text_field($key), sanitize_text_field($value) );
        }
    }

    /**
     * Render the admin page
     */
    function render_admin_page(){
        require_once __DIR__ . '/views/panel.php';
    }

    /**
     * Assets
     */
    function load_assets( $key ) {

        if( $key !== 'toplevel_page_woolook' ) return;

        wp_enqueue_style( 'woolook-admin-page', WOOLOOK_URL . '/dist/admin.min.css', array(), WOOLOOK_VERSION );

        wp_enqueue_script( 'woolook-admin-page', WOOLOOK_URL . '/dist/admin.min.js', array('jquery'), WOOLOOK_VERSION, true );

    }

}
