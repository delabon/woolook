import { SearchListControl } from '../../components/search-list-control';
import BackgroundControl from '../../components/background-control';
import ColorControl from '../../components/color-control';
import uniqueID from '../../global';
import PaddingMarginSettings from '../../components/PaddingMarginSettings';
import ResponsiveSettings from '../../components/ResponsiveSettings';

const {
    __
} = wp.i18n;

const {
    InspectorControls, 
    BlockControls,
    AlignmentToolbar,
    RichText,
} = wp.editor;

const {
    PanelBody,
    ToggleControl,
} = wp.components;

const {
    addQueryArgs
} = wp.url;

const { Component, Fragment } = wp.element;

const { apiFetch } = wp;

export class Edit extends Component{

    constructor() {
        super( ...arguments );

        this.state = {
            'loading': false,
            'search_list': [],
            'products_to_display': [],
        };
        
        this.generateID = this.generateID.bind( this );
        this.getDisplayProducts = this.getDisplayProducts.bind( this );
        this.getRows = this.getRows.bind( this );
        this.renderStyle = this.renderStyle.bind( this );
        this.getSearchList = this.getSearchList.bind( this );
    }

	componentDidMount() {
        
        const self = this;

        self.generateID();

        // fetch products and add them to the search list
        apiFetch({
            path: addQueryArgs( '/woolook/v1/product_list', {
                limit: 20,
            }),
        })
        .then( ( list ) => {            
            self.setState( { search_list: list, loading: false } );
        })
        .catch( () => {
            self.setState( { search_list: [], loading: false } );
        });

        // Load products to display
		self.getDisplayProducts();
	}

	componentDidUpdate( prevProps ) {
        if( 
            prevProps.attributes[ 'products' ] !== this.props.attributes[ 'products' ]
            ||
            prevProps.attributes[ 'columns' ] !== this.props.attributes[ 'columns' ]
        ){
            this.getDisplayProducts();
        }
    }
    
    generateID(){
        const self = this;

        // fix for duplicating a block ( same uid )
        if( self.props.attributes.uid !== '' ){
            const found_uid = document.querySelectorAll( '#' + self.props.attributes.uid );

            if( found_uid.length > 1 ){
                self.props.setAttributes({ uid : uniqueID() });
            }
        }
        // create id
        else {
            self.props.setAttributes({ uid : uniqueID() });
        }
    }

    getDisplayProducts(){
        const self = this;
        
		apiFetch({
			path: addQueryArgs( '/woolook/v1/products', {
                products_ids: self.props.attributes.products,
                layout: self.props.attributes.layout,
            }),
        })
        .then( ( products ) => {
            self.setState( { products_to_display: products, loading: false } );
        })
        .catch( () => {
            self.setState({ products_to_display: [], loading: true });
        });
    }

    getRows(){

        let self = this;
        const { products_to_display } = self.state;
        const imagePlaceHolder = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==";

        return products_to_display.map(function( product ){

            let image = null;

            if ( product.images.length ) {
                image = <img src={ product.images[ 0 ].src } alt="" />;
            } 
            else {
                image = <img src={ imagePlaceHolder } alt="" />;
            }

            return (
                <div className={'woolook-item'}>
                    
                    <div className={'woolook-item-thumbnail'}>
                        <a href = {'javascript:void(0)'} >{image}</a>
                    </div>

                    <div 
                        className={'woolook-item-reviews'}
                        dangerouslySetInnerHTML={{ __html: product.reviews_html, }}
                    />

                    <div className={'woolook-item-title'}>
                        <a href = {'javascript:void(0)'} >{product.name}</a>
                    </div>

                    <div 
                        className={'woolook-item-price'}
                        dangerouslySetInnerHTML={{ __html: product.price_html, }}
                    />

                    <a 
                        href={'javascript:void(0)'} 
                        className={'woolook-item-addtocart'}
                        data-id={ product.id }
                    >
                        {__('Add To Cart', 'woolook')}
                    </a>

                </div>
            );
        });
    }

    renderStyle(){

        const { attributes } = this.props;

        const {
            uid,
            background_type,
            background_color,
            gradient_orientation,
            gradient_from,
            gradient_to,
            background_image_url,
            background_image_repeat,
            background_image_scroll,
            stars_unrated_bg,
            stars_rated_bg,
            title_color,
            subtitle_color,
            product_title_color,
            price_color,
            sale_price_color,
            button_color,
            button_border_color,
            button_hover_bg,
            button_hover_color,
        } = attributes;

        let output = `
            
            #${uid}.woolook-layout-1{
                padding-top: ${attributes.paddingTop}px;
                padding-bottom: ${attributes.paddingBottom}px;
                padding-left: ${attributes.paddingLeft}px;
                padding-right: ${attributes.paddingRight}px;
                margin-top: ${attributes.marginTop}px;
                margin-bottom: ${attributes.marginBottom}px;
                margin-left: ${attributes.marginLeft}px;
                margin-right: ${attributes.marginRight}px;
                font-size: ${ attributes.mobileFontSize }px;
                background-color: ${background_color};
            }

            #${uid}.woolook-layout-1 .woolook-title{
                color: ${title_color};
            }

            #${uid}.woolook-layout-1 .woolook-subtitle{
                color: ${subtitle_color};
            }

            #${uid}.woolook-layout-1 .woolook-item-title{
                color: ${product_title_color};
            }

            #${uid}.woolook-layout-1 .woolook-item-price{
                color: ${price_color};
            }

            #${uid}.woolook-layout-1 .woolook-item-price ins{
                color: ${sale_price_color};
            }

            #${uid}.woolook-layout-1 .woolook-item-addtocart{
                color: ${button_color};
                border-color: ${button_border_color};
            }

            #${uid}.woolook-layout-1 .woolook-item-addtocart:hover{
                color: ${button_hover_color};
                background: ${button_hover_bg};
                border-color: ${button_hover_bg};
            }

            #${uid}.woolook-layout-1 .woolook-item-reviews .star-rating:before{
                color: ${stars_unrated_bg};
            }

            #${uid}.woolook-layout-1 .woolook-item-reviews .star-rating span:before{
                color: ${stars_rated_bg};
            }
        `;

        if( background_type === 'gradient' ){
            output += `
                #${uid}.woolook-layout-1{
                    background-image: linear-gradient( ${gradient_orientation.replace('-', ' ')}, ${gradient_from}, ${gradient_to} );
                }
            `;
        }

        else if( background_type === 'image' ){
            output += `
                #${uid}.woolook-layout-1{
                    background-image: url('${ background_image_url }');
                    background-repeat: ${ background_image_repeat };
                    background-attachment: ${ background_image_scroll ? 'scroll' : 'fixed' };
                    -webkit-background-size: cover;
                    -moz-background-size: cover;
                    -o-background-size: cover;
                    background-size: cover;
                }
            `;
        }

        // Breakpoints 
        output += `
            @media all and (min-width: 768px) {
                #${attributes.uid}.woolook-layout-1{
                    font-size: ${attributes.tabletFontSize}px;
                }
            }

            @media all and (min-width: 992px) {
                #${attributes.uid}.woolook-layout-1{
                    font-size: ${attributes.fontSize}px;
                }
            }
        `;
    

        return (
            <style>{ output }</style>
        );
    }

    getSearchList(){

        let self = this;

        return(            
            <SearchListControl 
                label_selected_items = { __('Selected Products', 'woolook') }
                label_clear_all = { __('Clear All', 'woolook') }
                label_search_input = { __('Search for products to select', 'woolook') }
                list = { self.state.search_list } 
                selected = { self.props.attributes.products }
                onChange = { ( value = [] ) => {
                    self.props.setAttributes({ products: value });
                }}
                onSearch = { ( query ) => {
    
                    apiFetch({
                        path: addQueryArgs( '/woolook/v1/product_list', {
                            'query' : query
                        }),
                    })
                    .then( ( list ) => {
                        self.setState( { search_list: list, loading: false } );
                    })
                    .catch( () => {
                        self.setState( { search_list: [], loading: false } );
                    });
    
                }}
            ></SearchListControl>
        );
    }

    render(){

        const self = this;

        if( self.state.loading ){
            return __('Loading...', 'woolook');
        }

        const {
            setAttributes,
            attributes,
            isSelected,
        } = self.props;

		const classes = [ 'woolook', 'woolook-layout-1' ];

        if( self.state.products && ! self.state.products.length ) {
            classes.push( 'is-loading' );
        }

        if( attributes.is_first_time ){
            return (
                <div className="woolook-first-time">
                    {self.getSearchList()}
                    <button 
                        className={"button button-primary"}
                        onClick={ (e) => setAttributes({ is_first_time: false }) }
                    >{__('Done', 'woolook')}</button>
                </div>
            )
        }
        
        return [

            isSelected && (
    
                <BlockControls>
                    <AlignmentToolbar
                        value={ attributes.alignment }
                        onChange={ ( alignment ) => setAttributes({ alignment }) }
                    />
                </BlockControls>
    
            ),

            isSelected && (

                <InspectorControls> 

                    <PanelBody
                        title={ __('Products', 'woolook') }
                        initialOpen={ true }
                    >
                        {self.getSearchList()}
                    </PanelBody>
                    
                    <ResponsiveSettings attributes={attributes} setAttributes={setAttributes} />

                    <PaddingMarginSettings attributes={attributes} setAttributes={setAttributes} />

                    <PanelBody
                        title={ __('Background Settings') }
                        initialOpen={ false }
                    >
                            
                        <BackgroundControl
                            className={ "woolook" }

                            type = { attributes.background_type }
                            onTypeChange = { ( value = 'color' ) => {
                                setAttributes( { background_type: value } );
                            }}
                            
                            color = { attributes.background_color }
                            onColorChange = { ( value = '#fff' ) => {
                                setAttributes( { background_color: value } );
                            }}

                            gradient_orientation = { attributes.gradient_orientation }
                            onGradientOrientationChange = { ( value = 'to right top' ) => {
                                setAttributes( { gradient_orientation: value } );
                            }}

                            gradient_from = { attributes.gradient_from }
                            onGradientFromChange = { ( value = '#fff' ) => {
                                setAttributes( { gradient_from: value } );
                            }}

                            gradient_to = { attributes.gradient_to }
                            onGradientToChange = { ( value = '#fff' ) => {
                                setAttributes( { gradient_to: value } );
                            }}

                            image_url = { attributes.background_image_url }
                            image_id = { attributes.background_image_id }
                            onImageChange = { ( media ) => setAttributes( { background_image_url: media.url, background_image_id: media.id } ) }

                            image_repeat = { attributes.background_image_repeat }
                            onImageRepeatChange = { ( value = 'no-repeat' ) => setAttributes( { background_image_repeat: value } ) }

                            image_scroll = { attributes.background_image_scroll }
                            onImageScrollChange = { ( value = false ) => setAttributes( { background_image_scroll: value } ) }

                        ></BackgroundControl>

                    </PanelBody>

                    <PanelBody
                        title={ __('Titles Settings') }
                        initialOpen={ false }
                    >

                        <ToggleControl
                            label = { __('Show/Hide Block Title', 'woolook') }
                            help = { attributes.is_title_visible ? 'Visible' : 'Hidden' }
                            checked={ attributes.is_title_visible }
                            onChange = { ( value = true ) => {
                                setAttributes( { is_title_visible: value } );
                            } }
                        />

                        <ToggleControl
                            label = { __('Show/Hide Block Subtitle', 'woolook') }
                            help = { attributes.is_subtitle_visible ? 'Visible' : 'Hidden' }
                            checked={ attributes.is_subtitle_visible }
                            onChange = { ( value = true ) => {
                                setAttributes( { is_subtitle_visible: value } );
                            } }
                        />

                        { attributes.is_title_visible && (
                            <ColorControl
                                label = { __('Block Title Color', 'woolook') }
                                value = { attributes.title_color }
                                onChange = { ( value = "#212121" ) => {
                                    setAttributes( { title_color: value } );
                                } }
                            />
                        )}

                        { attributes.is_subtitle_visible && (
                            <ColorControl
                                label = { __('Block Subtitle Color', 'woolook') }
                                value = { attributes.subtitle_color }
                                onChange = { ( value = "#212121" ) => {
                                    setAttributes( { subtitle_color: value } );
                                } }
                            />
                        ) }

                        <ColorControl
                            label = { __('Product Title Color') }
                            value = { attributes.product_title_color }
                            onChange = { ( value = "#212121" ) => {
                                setAttributes( { product_title_color: value } );
                            } }
                        />
                        
                    </PanelBody>

                    <PanelBody
                        title={ __('Stars Settings') }
                        initialOpen={ false }
                    >
                        
                        <ColorControl
                            label = { __('Unrated') }
                            value = { attributes.stars_unrated_bg }
                            onChange = { ( value = "rgba( 0, 0, 0, 0.16 )" ) => {
                                setAttributes( { stars_unrated_bg: value } );
                            } }
                        />

                        <ColorControl
                            label = { __('Rated') }
                            value = { attributes.stars_rated_bg }
                            onChange = { ( value = "rgba( 0, 0, 0, 0.5 )" ) => {
                                setAttributes( { stars_rated_bg: value } );
                            } }
                        />
                        
                    </PanelBody>

                    <PanelBody
                        title={ __('Price Settings') }
                        initialOpen={ false }
                    >

                        <ColorControl
                            label = { __('Color') }
                            value = { attributes.price_color }
                            onChange = { ( value = "#212121" ) => {
                                setAttributes( { price_color: value } );
                            } }
                        />

                        <ColorControl
                            label = { __('Sale Price Color') }
                            value = { attributes.sale_price_color }
                            onChange = { ( value = "#212121" ) => {
                                setAttributes( { sale_price_color: value } );
                            } }
                        />
                        
                    </PanelBody>

                    <PanelBody
                        title={ __('Button Settings') }
                        initialOpen={ false }
                    >

                        <ColorControl
                            label = { __('Color') }
                            value = { attributes.button_color }
                            onChange = { ( value ) => {
                                setAttributes( { button_color: value } );
                            } }
                        />

                        <ColorControl
                            label = { __('Border Color') }
                            value = { attributes.button_border_color }
                            onChange = { ( value ) => {
                                setAttributes( { button_border_color: value } );
                            } }
                        />


                        <ColorControl
                            label = { __('Background Color on Hover') }
                            value = { attributes.button_hover_bg }
                            onChange = { ( value ) => {
                                setAttributes( { button_hover_bg: value } );
                            } }
                        />

                        <ColorControl
                            label = { __('Color on Hover') }
                            value = { attributes.button_hover_color }
                            onChange = { ( value ) => {
                                setAttributes( { button_hover_color: value } );
                            } }
                        />
                        
                    </PanelBody>

                </InspectorControls>
    
            ),

            <Fragment>
                { self.renderStyle() }

                <div 
                    id = { attributes.uid }
                    className={ classes.join( ' ' ) }
                    data-desktop={attributes.columns}
                    data-tablet={attributes.tabletColumns}
                    data-mobile={attributes.mobileColumns}
                >
                    <div className = {'woolook-container'}>

                        <div className = {'woolook-header'} style = {{ 'text-align' : attributes.alignment }}>

                            {attributes.is_title_visible && (
                                <RichText
                                    tagName = { 'h2' }
                                    className = { 'woolook-title' }
                                    value = { attributes.title }
                                    placeholder = { attributes.title }
                                    onChange = { ( newtext ) => setAttributes( { title: newtext } ) }
                                    keepPlaceholderOnFocus = { true }
                                    isSelected = { false }
                                />
                            )}

                            {attributes.is_subtitle_visible && (
                                <RichText
                                    tagName = { 'span' }
                                    className = { 'woolook-subtitle' }
                                    value = { attributes.subtitle }
                                    placeholder = { attributes.subtitle }
                                    onChange = { ( newtext ) => setAttributes( { subtitle: newtext } ) }
                                    keepPlaceholderOnFocus = { true }
                                    isSelected = { false }
                                />
                            )}


                        </div>

                        <div className = {'woolook-row'}>
                            { self.getRows() }
                        </div>

                    </div>

                </div>
            </Fragment>

        ]
    }
    
}
