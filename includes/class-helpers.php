<?php 

namespace Woolook;

class Helpers {

    /**
     * Renders block title and subtitle
     *
     * @param array $attributes
     * @return string
     */
    static function render_block_titles( $attributes ){

        if( ! $attributes['is_title_visible'] && ( isset( $attributes['is_subtitle_visible'] ) && ! $attributes['is_subtitle_visible'] ) ){
            return '';
        }

        $output = '<div class="woolook-header" style="text-align:'.esc_attr($attributes['alignment']).'; ">';

        if( $attributes['is_title_visible'] && $attributes['title'] !== '' ){
            $output .= '<h2 class="woolook-title">'.esc_html($attributes['title']).'</h2>';
        }

        if( isset($attributes['is_subtitle_visible']) 
            && $attributes['is_subtitle_visible'] 
            && isset($attributes['subtitle']) 
            && $attributes['subtitle'] !== '' 
        ){
            $output .= '<span class="woolook-subtitle">'.esc_html($attributes['subtitle']).'</span>';
        }               

        return $output . '</div>';
    }

}
