<?php

namespace Woolook;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Block_Layout_Two {

    function __construct(){
        add_action( 'init', array( $this, 'init' ) );
    }

    /**
     * Registers the block
     */
    function init(){

        register_block_type( 'woolook/layout-2', array(
            'attributes' => array(
                
                'uid' => array(
                    'type' => 'string',
                    'default' => '',
                ),

                'is_first_time' => array(
                    'type' => 'boolean',
                    'default' => true,
                ),
                
                'postsLimit' => array(
                    'type' => 'number',
                    'default' => 6,
                ),
    
                'loaded' => array(
                    'type' => 'boolean',
                    'default' => false,
                ),
    
                'title' => array(
                    'type' => 'string',
                    'default' => 'Feed',
                ),

                'subtitle' => array(
                    'type' => 'string',
                    'default' => 'Our New Products.',
                ),

                'alignment' => array(
                    'type' => 'string',
                    'default' => 'center',
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

                'maxColumns' => array(
                    'type' => 'number',
                    'default' => 5,
                ),
    
                'columns' => array(
                    'type' => 'number',
                    'default' => 2,
                ),

                'mobileColumns' => array(
                    'type' => 'number',
                    'default' => 1,
                ),
    
                'tabletColumns' => array(
                    'type' => 'number',
                    'default' => 2,
                ),
    
                'fontSize' => array(
                    'type' => 'number',
                    'default' => 16,
                ),
                
                'mobileFontSize' => array(
                    'type' => 'number',
                    'default' => 16,
                ),

                'tabletFontSize' => array(
                    'type' => 'number',
                    'default' => 16,
                ),

                'paddingTop' => array(
                    'type' => 'number',
                    'default' => 0,
                ),

                'paddingBottom' => array(
                    'type' => 'number',
                    'default' => 0,
                ),

                'paddingLeft' => array(
                    'type' => 'number',
                    'default' => 0,
                ),

                'paddingRight' => array(
                    'type' => 'number',
                    'default' => 0,
                ),

                'marginTop' => array(
                    'type' => 'number',
                    'default' => 0,
                ),

                'marginBottom' => array(
                    'type' => 'number',
                    'default' => 30,
                ),

                'marginLeft' => array(
                    'type' => 'number',
                    'default' => 0,
                ),

                'marginRight' => array(
                    'type' => 'number',
                    'default' => 0,
                ),

                'currentTab' => array(
                    'type' => 'string',
                    'default' => 'tab1',
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

                'is_title_visible' => array(
                    'type' => 'boolean',
                    'default' => false,
                ),

                'is_subtitle_visible' => array(
                    'type' => 'boolean',
                    'default' => true,
                ),
                
                'title_color' => array(
                    'type' => 'string',
                    'default' => '#212121',
                ),

                'subtitle_color' => array(
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
                    'default' => '#ffffff',
                ),

                'buttonBgColor' => array(
                    'type' => 'string',
                    'default' => '#000000',
                ),

                'button_hover_bg' => array(
                    'type' => 'string',
                    'default' => '#fff',
                ),

                'button_hover_color' => array(
                    'type' => 'string',
                    'default' => '#000',
                ),

            ),

            'render_callback' => array( $this, 'render' ),

        ) );
    }

    /**
     * Renders the products
     *
     * @param array $attributes
     * @return string
     */
    function renderItems( $attributes ){

        $products = new Products(array(
            'limit' => (int)$attributes['postsLimit'],
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

                    <div class="woolook-item-addtocart-container">
                        <a href="#" class="woolook-item-addtocart" data-id={$product['id']}>
                            {$btn_trans}
                        </a>
                    </div>
                </div>

                <div class="woolook-item-reviews">{$product['reviews_html']}</div>

                <div class="woolook-item-title">
                    <a href="{$permalink}">{$title}</a>
                </div>

                <div class="woolook-item-price">{$product['price_html']}</div>

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

        $classes = array( "woolook", "woolook-layout-2" );
        $classes = implode(' ', $classes );
        $style = $this->renderStyle( $attributes );
        $items = $this->renderItems( $attributes );
        $uid = esc_attr($attributes['uid']);

        $columns = esc_attr($attributes['columns']);
        $tabletColumns = esc_attr($attributes['tabletColumns']);
        $mobileColumns = esc_attr($attributes['mobileColumns']);

        $titles_markup = Helpers::render_block_titles($attributes);

        return <<<HTML
            
            {$style}

            <div id="{$uid}" class="{$classes}" data-desktop="{$columns}" data-tablet="{$tabletColumns}" data-mobile="{$mobileColumns}">

                <div class="woolook-container">
    
                    {$titles_markup}

                    <div class="woolook-row">{$items}</div>
                    
                </div>
            
            </div>
HTML;

    }

    /**
     * Renders the block style
     *
     * @param array $attributes
     * @return string
     */
    function renderStyle( $attributes ){

        $uid = esc_attr($attributes['uid']);

        $output = "
            #{$uid}.woolook-layout-2{
                padding-top: ".esc_attr($attributes['paddingTop'])."px;
                padding-bottom: ".esc_attr($attributes['paddingBottom'])."px;
                padding-left: ".esc_attr($attributes['paddingLeft'])."px;
                padding-right: ".esc_attr($attributes['paddingRight'])."px;
                margin-top: ".esc_attr($attributes['marginTop'])."px;
                margin-bottom: ".esc_attr($attributes['marginBottom'])."px;
                margin-left: ".esc_attr($attributes['marginLeft'])."px;
                margin-right: ".esc_attr($attributes['marginRight'])."px;
                font-size: ".esc_attr($attributes['mobileFontSize'])."px;
                background-color: ".esc_attr($attributes['background_color']).";
            }

            #{$uid}.woolook-layout-2 .woolook-title{
                color: ".esc_attr($attributes['title_color']).";
            }

            #{$uid}.woolook-layout-2 .woolook-subtitle{
                color: ".esc_attr($attributes['subtitle_color']).";
            }

            #{$uid}.woolook-layout-2 .woolook-item-title{
                color: ".esc_attr($attributes['product_title_color']).";
            }

            #{$uid}.woolook-layout-2 .woolook-item-price{
                color: ".esc_attr($attributes['price_color']).";
            }

            #{$uid}.woolook-layout-2 .woolook-item-price ins{
                color: ".esc_attr($attributes['sale_price_color']).";
            }

            #{$uid}.woolook-layout-2 .woolook-item-addtocart{
                color: ".esc_attr($attributes['button_color']).";
                background-color: ".esc_attr($attributes['buttonBgColor']).";
            }

            #{$uid}.woolook-layout-2 .woolook-item-addtocart:hover{
                color: ".esc_attr($attributes['button_hover_color']).";
                background: ".esc_attr($attributes['button_hover_bg']).";
                border-color: ".esc_attr($attributes['button_hover_bg']).";
            }

            #{$uid}.woolook-layout-2 .woolook-item-reviews .star-rating:before{
                color: ".esc_attr($attributes['stars_unrated_bg']).";
            }

            #{$uid}.woolook-layout-2 .woolook-item-reviews .star-rating span:before{
                color: ".esc_attr($attributes['stars_rated_bg']).";
            }
        ";

        if( $attributes['background_type'] === 'gradient' ){

            $gradient_orientation = str_replace( '-', ' ', $attributes['gradient_orientation'] );

            $output .= "
                #{$uid}.woolook-layout-2{
                    background-image: linear-gradient( ".esc_attr($gradient_orientation).", ".esc_attr($attributes['gradient_from']).", ".esc_attr($attributes['gradient_to'])." );
                }
            ";
        }

        else if( $attributes['background_type'] === 'image' ){

            $bg_attachment = $attributes['background_image_scroll'] ? 'scroll' : 'fixed';

            $output .= "
                #{$uid}.woolook-layout-2{
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

        // Breakpoints 
        $output .= "
            @media all and (min-width: 768px) {
                #{$uid}.woolook-layout-2{
                    font-size: ".esc_attr($attributes['tabletFontSize'])."px;
                }
            }

            @media all and (min-width: 992px) {
                #{$uid}.woolook-layout-2{
                    font-size:  ".esc_attr($attributes['fontSize'])."px;
                }
            }
        ";
    
        return "<style>{$output}</style>";
    }


}

// exec
$Block_Layout_Two = new Block_Layout_Two();
