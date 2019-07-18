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

                'maxColumns' => array(
                    'type' => 'number',
                    'default' => 2,
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

        $uid = esc_attr($attributes['uid']);

        $output = "
            #{$uid}.woolook-collection-one{
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

            #{$uid}.woolook-collection-one .woolook-title{
                color: ".esc_attr($attributes['title_color']).";
            }

            #{$uid}.woolook-collection-one .woolook-item-title{
                color: ".esc_attr($attributes['product_title_color']).";
            }
        ";

        if( $attributes['background_type'] === 'gradient' ){

            $gradient_orientation = str_replace( '-', ' ', $attributes['gradient_orientation'] );

            $output .= "
                #{$uid}.woolook-collection-one{
                    background-image: linear-gradient( ".esc_attr($gradient_orientation).", ".esc_attr($attributes['gradient_from']).", ".esc_attr($attributes['gradient_to'])." );
                }
            ";
        }

        else if( $attributes['background_type'] === 'image' ){

            $bg_attachment = $attributes['background_image_scroll'] ? 'scroll' : 'fixed';

            $output .= "
                #{$uid}.woolook-collection-one{
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
                #{$uid}.woolook-collection-one{
                    font-size: ".esc_attr($attributes['tabletFontSize'])."px;
                }
            }

            @media all and (min-width: 992px) {
                #{$uid}.woolook-collection-one{
                    font-size:  ".esc_attr($attributes['fontSize'])."px;
                }
            }
        ";

        return "<style>{$output}</style>";
    }

    /**
     * Renders the categories
     *
     * @param array $attributes
     * @return string
     */
    function renderItems( $attributes ){

        $categories = new Categories(array(
            'limit' => 3,
            'categories' => $attributes['categories']
        ));

        $rows_markup = '';

        foreach( $categories->get_categories() as $category ){

            $title = esc_html($category['name']);
            $permalink = esc_url( $category['permalink'] );
            $count = esc_html($category['count']);
            $style = "";

            if( $category['image'] ) {
                $style = "background-image: url('".$category['image']."')";
            }

            $rows_markup .= <<<HTML

            <div class="woolook-item" style="{$style}">
                <div class="woolook-item-details">
                    <div class="woolook-item-title">{$title}</div>
                    <span class="woolook-item-count">{$count}</span>
                </div>

                <a href="{$permalink}"></a>
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

        $classes = array( 'woolook', 'woolook-collection-one' );
        $classes = implode(' ', $classes );
        $style = $this->renderStyle( $attributes );
        $items = $this->renderItems( $attributes );
        $uid = esc_attr($attributes['uid']);
        $alignment = esc_attr($attributes['alignment']);
        $title = esc_html( $attributes['title'] );

        $columns = esc_attr($attributes['columns']);
        $tabletColumns = esc_attr($attributes['tabletColumns']);
        $mobileColumns = esc_attr($attributes['mobileColumns']);

        return <<<HTML
            
            {$style}

            <div id="{$uid}" class="{$classes}" data-desktop="{$columns}" data-tablet="{$tabletColumns}" data-mobile="{$mobileColumns}">

                <div class="woolook-container">

                    <div class="woolook-header" style="text-align: {$alignment};" >

                        <h2 class="woolook-title">{$title}</h2>

                    </div>

                    <div class="woolook-items">{$items}</div>
                    
                </div>
            
            </div>
HTML;

    }

}

// exec
new Block_Collection_Layout_One();
