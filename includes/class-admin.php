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

        add_menu_page( 'Woolook', 'Woolook', 'level_8', 'woolook_admin_page', array( $this, 'render_admin_page' ), 'dashicons-grid-view', 200  );
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
        global $woolook_font_list;

        $max_width = get_option('woolook_max_width', WOOLOOK_OPTION_MAX_WIDTH );
        $font_selected = get_option('woolook_font', WOOLOOK_OPTION_FONT );

        require_once __DIR__ . '/views/admin.php';
    }

    /**
     * Assets
     */
    function load_assets( $key ) {

        if( $key !== 'toplevel_page_woolook_admin_page' ) return;

        wp_enqueue_style( 'bokez-admin-page', WOOLOOK_URL . '/dist/panel.css', array(), WOOLOOK_VERSION );

        wp_enqueue_script( 'bokez-admin-page', WOOLOOK_URL . '/dist/panel.js', array('jquery'), WOOLOOK_VERSION, true );

    }

}
