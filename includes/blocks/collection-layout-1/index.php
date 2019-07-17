<?php

namespace Woolook;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Block_Collection_Layout_One {

    function __construct(){
        add_action( 'init', array( $this, 'init' ) );
    }

    /**
     * Registers the block
     */
    function init(){

        register_block_type( 'woolook/collection-layout-1', array(
            'attributes' => array(
                
                'uid' => array(
                    'type' => 'string',
                    'default' => '',
                ),

                'loaded' => array(
                    'type' => 'boolean',
                    'default' => false,
                ),
    
                'title' => array(
                    'type' => 'string',
                    'default' => 'Feed',
                ),

                'alignment' => array(
                    'type' => 'string',
                    'default' => 'left',
                ),
                
                'categories' => array(
                    'type' => 'array',
                    'default' => array(),
                    'items'   => [
                        'type' => 'object',
                    ]
                ),
    
                'layout' => array(
                    'type' => 'number',
                    'default' => 1,
                ),

                'font_size' => array(
                    'type' => 'number',
                    'default' => 5,
                ),

                'padding' => array(
                    'type' => 'number',
                    'default' => 3,
                ),
    
                'currentTab' => array(
                    'type' => 'string',
                    'default' => 'tab1',
                ),
    
                'mobile_columns' => array(
                    'type' => 'number',
                    'default' => 1,
                ),
    
                'tablet_columns' => array(
                    'type' => 'number',
                    'default' => 2,
                ),
    
                'desktop_columns' => array(
                    'type' => 'number',
                    'default' => 3,
                ),
    
                'background_type' => array(
                    'type' => 'string',
                    'default' => 'color',
                ),

                'background_color' => array(
                    'type' => 'string',
                    'default' => 'transparent',
                ),

                'gradient_orientation' => array(
                    'type' => 'string',
                    'default' => 'to right top',
                ),

                'gradient_from' => array(
                    'type' => 'string',
                    'default' => '#051937',
                ),

                'gradient_to' => array(
                    'type' => 'string',
                    'default' => '#A8EB12',
                ),

                'background_image_url' => array(
                    'type' => 'string',
                    'default' => '',
                ),

                'background_image_id' => array(
                    'type' => 'number',
                    'default' => 0,
                ),

                'background_image_repeat' => array(
                    'type' => 'string',
                    'default' => 'no-repeat',
                ),

                'background_image_scroll' => array(
                    'type' => 'boolean',
                    'default' => false,
                ),

                'stars_unrated_bg' => array(
                    'type' => 'string',
                    'default' => 'rgba( 0, 0, 0, 0.16 )',
                ),

                'stars_rated_bg' => array(
                    'type' => 'string',
                    'default' => 'rgba( 0, 0, 0, 0.5 )',
                ),

                'title_color' => array(
                    'type' => 'string',
                    'default' => '#212121',
                ),

                'product_title_color' => array(
                    'type' => 'string',
                    'default' => '#212121',
                ),

                'price_color' => array(
                    'type' => 'string',
                    'default' => '#212121',
                ),

                'sale_price_color' => array(
                    'type' => 'string',
                    'default' => 'red',
                ),

                'button_color' => array(
                    'type' => 'string',
                    'default' => '#6f6e6c',
                ),

                'button_border_color' => array(
                    'type' => 'string',
                    'default' => '#dce3e6',
                ),

                'button_hover_bg' => array(
                    'type' => 'string',
                    'default' => '#363636',
                ),

                'button_hover_color' => array(
                    'type' => 'string',
                    'default' => '#fff',
                ),

            ),

            'render_callback' => array( $this, 'render' ),

        ) );
    }

    /**
     * Renders the block style
     *
     * @param array $attributes
     * @return string
     */
    function renderStyle( $attributes ){
        global $woolook_font_list;

    	$max_width = get_option('woolook_max_width', WOOLOOK_OPTION_MAX_WIDTH );
        $font_selected = get_option('woolook_font', WOOLOOK_OPTION_FONT );
        $font_data = $woolook_font_list[ $font_selected ];
        $font_size = (int)$attributes['font_size'] / 5;
        $uid = esc_attr($attributes['uid']);

        $output = "
            #{$uid}.woolook-layout-1{
                padding-top: ".esc_attr($attributes['padding'])."em;
                padding-bottom: ".esc_attr($attributes['padding'])."em;
                font-size: {$font_size}em;
                background-color: ".esc_attr($attributes['background_color']).";
            }

            #{$uid}.woolook-layout-1 .woolook-container{
                max-width: ".esc_attr($max_width)." !important;
            }

            #{$uid}.woolook-layout-1 .woolook-title{
                color: ".esc_attr($attributes['title_color']).";
            }

            #{$uid}.woolook-layout-1 .woolook-item-title{
                color: ".esc_attr($attributes['product_title_color']).";
            }

            #{$uid}.woolook-layout-1 .woolook-item-price{
                color: ".esc_attr($attributes['price_color']).";
            }

            #{$uid}.woolook-layout-1 .woolook-item-price ins{
                color: ".esc_attr($attributes['sale_price_color']).";
            }

            #{$uid}.woolook-layout-1 .woolook-item-addtocart{
                color: ".esc_attr($attributes['button_color']).";
                border-color: ".esc_attr($attributes['button_border_color']).";
            }

            #{$uid}.woolook-layout-1 .woolook-item-addtocart:hover{
                color: ".esc_attr($attributes['button_hover_color']).";
                background: ".esc_attr($attributes['button_hover_bg']).";
                border-color: ".esc_attr($attributes['button_hover_bg']).";
            }

            #{$uid}.woolook-layout-1 .woolook-item-reviews .star-rating:before{
                color: ".esc_attr($attributes['stars_unrated_bg']).";
            }

            #{$uid}.woolook-layout-1 .woolook-item-reviews .star-rating span:before{
                color: ".esc_attr($attributes['stars_rated_bg']).";
            }
        ";

        if( $attributes['background_type'] === 'gradient' ){

            $gradient_orientation = str_replace( '-', ' ', $attributes['gradient_orientation'] );

            $output .= "
                #{$uid}.woolook-layout-1{
                    background-image: linear-gradient( ".esc_attr($gradient_orientation).", ".esc_attr($attributes['gradient_from']).", ".esc_attr($attributes['gradient_to'])." );
                }
            ";
        }

        else if( $attributes['background_type'] === 'image' ){

            $bg_attachment = $attributes['background_image_scroll'] ? 'scroll' : 'fixed';

            $output .= "
                #{$uid}.woolook-layout-1{
                    background-image: url('".esc_url($attributes['background_image_url'])."');
                    background-repeat: ".esc_attr($attributes['background_image_repeat']).";
                    background-attachment: ".esc_attr($bg_attachment).";
                    -webkit-background-size: cover;
                    -moz-background-size: cover;
                    -o-background-size: cover;
                    background-size: cover;
                }
            ";
        }

        return "<style>{$output}</style>";
    }

    /**
     * Renders the products
     *
     * @param array $attributes
     * @return string
     */
    function renderItems( $attributes ){

        $products = new Products(array(
            'limit' => (int)$attributes['desktop_columns'],
            'categories' => $attributes['categories'] // this will be sanitized inside the Products class
        ));

        $imagePlaceHolder = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==";
        $btn_trans = __('Add To Cart', 'woolook');
        $rows_markup = '';

        foreach( $products->get_products() as $product ){

            $title = esc_html($product['name']);
            $permalink = esc_url( $product['permalink'] );
            $image = "<img src='{$imagePlaceHolder}' alt='' />";

            if( count( $product['images'] ) ) {
                $image = "<img src='".esc_url( $product['images'][0]['src'] )."' alt='".esc_attr( $product['name'] )."' />";
            }

            $rows_markup .= <<<HTML
            <div class="woolook-item">
                
                <div class="woolook-item-thumbnail">
                    <a href="{$permalink}">{$image}</a>
                </div>

                <div class="woolook-item-reviews">{$product['reviews_html']}</div>

                <h3 class="woolook-item-title">
                    <a href="{$permalink}">{$title}</a>
                </h3>

                <div class="woolook-item-price">{$product['price_html']}</div>
                
                <a href="#" class="woolook-item-addtocart" data-id={$product['id']}>
                    {$btn_trans}
                </a>

            </div>
HTML;

        }

        return $rows_markup;
    }

    /**
     * Server-side Rendering
     *
     * @param array $atts
     * @return string
     */
    function render( $attributes ) {

        $classes = array( "woolook", "woolook-layout-1", "woolook-d-col-".esc_attr($attributes['desktop_columns']), "woolook-t-col-".esc_attr($attributes['tablet_columns']), "woolook-m-col-".esc_attr($attributes['mobile_columns']) );
        $classes = implode(' ', $classes );
        $style = $this->renderStyle( $attributes );
        $items = $this->renderItems( $attributes );
        $uid = esc_attr($attributes['uid']);
        $alignment = esc_attr($attributes['alignment']);
        $title = esc_html( $attributes['title'] );

        return <<<HTML
            
            {$style}

            <div id="{$uid}" class="{$classes}">

                <div class="woolook-container">

                    <div class="woolook-header" style="text-align: {$alignment};" >

                        <h2 class="woolook-title">{$title}</h2>

                    </div>

                    <div class="woolook-row">{$items}</div>
                    
                </div>
            
            </div>
HTML;

    }

}

// exec
new Block_Collection_Layout_One();
