import { SearchListControl } from '../../components/search-list-control';
import BackgroundControl from '../../components/background-control';
import ColorControl from '../../components/color-control';
import { IconDesktop, IconTablet, IconMobile } from '../../icons';
import uniqueID from '../../global';

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
    TabPanel,
    RangeControl,
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
            'cat_list': [],
            'products': [],
        };
        
        this.generateID = this.generateID.bind( this );
        this.getProducts = this.getProducts.bind( this );
        this.getRows = this.getRows.bind( this );
        this.renderStyle = this.renderStyle.bind( this );
    }

	componentDidMount() {
        
        const self = this;

        self.generateID();

        // Loads categories
        apiFetch({
            path: addQueryArgs( '/woolook/v1/category_list', {} ),
        })
        .then( ( list ) => {
            self.setState( { cat_list: list, loading: false } );
        })
        .catch( () => {
            self.setState( { cat_list: [], loading: false } );
        });

        // Loads products
		self.getProducts();
	}

	componentDidUpdate( prevProps ) {
        if( prevProps.attributes[ 'categories' ] !== this.props.attributes[ 'categories' ] ){
            this.getProducts();
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

    getProducts(){
        const self = this;

		apiFetch({
			path: addQueryArgs( '/woolook/v1/products', {
                categories: self.props.attributes.categories,
                layout: self.props.attributes.layout,
                limit: 4,
            }),
        })
        .then( ( products ) => {
            self.setState( { products: products, loading: false } );
        })
        .catch( () => {
            self.setState({ products: [], loading: true });
        });
    }

    getRows(){

        let self = this;
        const { products } = self.state;
        const { desktop_columns } = self.props.attributes;
        const imagePlaceHolder = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==";

        return products.slice(0, desktop_columns).map(function( product ){

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

                    <h3 className={'woolook-item-title'}>
                        <a href = {'javascript:void(0)'} >{product.name}</a>
                    </h3>

                    <div 
                        className={'woolook-item-price'}
                        dangerouslySetInnerHTML={{ __html: product.price_html, }}
                    />

                    <a 
                        href={'javascript:void(0)'} 
                        className={'woolook-item-addtocart'}
                        data-id={ product.id }
                    >
                        {__('Add To Cart')}
                    </a>

                </div>
            );
        });
    }

    mobileTabControls(){
        const {
            attributes,
            setAttributes,
        } = this.props;

        return (
            <RangeControl
                label={ __('Columns') }
                value={ attributes.mobile_columns }
                onChange={ ( size ) => setAttributes({ mobile_columns: size }) }
                min={ 1 }
                max={ attributes.tablet_columns }
            />
        );
    }

    tabletTabControls(){
        const {
            attributes,
            setAttributes,
        } = this.props;

        return (
            <RangeControl
                label={ __('Columns') }
                value={ attributes.tablet_columns }
                onChange={ ( size ) => {
                    setAttributes({ tablet_columns: size });
                
                    if( attributes.mobile_columns > size ){
                        setAttributes({ mobile_columns: size });
                    }
                }}
                min={ 1 }
                max={ attributes.desktop_columns }
            />
        );
    }

    desktopTabControls(){
        const {
            attributes,
            setAttributes,
        } = this.props;

        return (
            <Fragment>

                <RangeControl
                    label={ __('Columns') }
                    value={ attributes.desktop_columns }
                    onChange={ ( size ) => {
                        setAttributes({ desktop_columns: size });

                        if( attributes.tablet_columns > size ){
                            setAttributes({ tablet_columns: size });

                            if( attributes.mobile_columns > size ){
                                setAttributes({ mobile_columns: size });
                            }
                        }
                    }}
                    min={ 1 }
                    max={ 4 }
                />

                <RangeControl
                    label = { __('Font Size') }
                    help = { __('This setting can change the block look.') }
                    min = { 1 }
                    max = { 10 }
                    value={ attributes.font_size }
                    onChange={ ( newValue = 4 ) => {
                        setAttributes( { font_size: newValue } );
                    } }
                />
            </Fragment>            
        );
    }

    renderStyle(){
        const _self = this;

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
            font_size,
            title_color,
            subtitle_color,
            product_title_color,
            price_color,
            sale_price_color,
            button_color,
            button_border_color,
            button_hover_bg,
            button_hover_color,
            padding,
        } = _self.props.attributes;

        let output = `

            .entry-content > #${uid}{
                max-width: ${woolook_admin.max_width} !important;
            }
            
            #${uid}.woolook-layout-1{
                padding-top: ${padding}em;
                padding-bottom: ${padding}em;
                font-size: ${ font_size / 5 }em;
                background-color: ${background_color};
            }

            #${uid}.woolook-layout-1 .woolook-title{
                color: ${title_color};
                font-family: ${woolook_admin.font_css}
            }

            #${uid}.woolook-layout-1 .woolook-subtitle{
                color: ${subtitle_color};
                font-family: ${woolook_admin.font_css}
            }

            #${uid}.woolook-layout-1 .woolook-item-title{
                color: ${product_title_color};
                font-family: ${woolook_admin.font_css}
            }

            #${uid}.woolook-layout-1 .woolook-item-price{
                color: ${price_color};
                font-family: ${woolook_admin.font_css}
            }

            #${uid}.woolook-layout-1 .woolook-item-price ins{
                color: ${sale_price_color};
            }

            #${uid}.woolook-layout-1 .woolook-item-addtocart{
                color: ${button_color};
                border-color: ${button_border_color};
                font-family: ${woolook_admin.font_css}
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

        return (
            <style>{ output }</style>
        );
    }

    render(){

        const self = this;

        const { cat_list, products, loading } = self.state;

        const {
            setAttributes,
            attributes,
            isSelected,
        } = self.props;

        const {
            uid,
            title,
            subtitle,
            categories,
            alignment,
            desktop_columns,
            mobile_columns,
            tablet_columns,
            background_type,
            background_color,
            gradient_orientation,
            gradient_from,
            gradient_to,
            background_image_url,
            background_image_id,
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
            padding,
        } = attributes;

		const classes = [ 'woolook', 'woolook-layout-1', 'woolook-col-d-' + desktop_columns, 'woolook-col-t-' + tablet_columns, 'woolook-col-m-' + mobile_columns,  ];

        if ( products && ! products.length ) {
            classes.push( 'is-loading' );
        }
        
        return [

            isSelected && (
    
                <BlockControls key = { 'controls' }>
                    <AlignmentToolbar
                        value={alignment}
                        onChange={ ( nextAlign ) => setAttributes( { alignment: nextAlign } ) }
                    />
                </BlockControls>
    
            ),
    
            isSelected && (
    
                <InspectorControls key = {'inspector'} > 
              
                    <TabPanel 
                        className="woolook-tabs"
                        activeClass="woolook-tab-active"
                        onSelect={ ( tabName ) => setAttributes({ currentTab: tabName }) }
                        tabs={ [
                            {
                                name: 'desktop',
                                title: <IconDesktop/>,
                                className: 'woolook-tab tab-1',
                            },
                            {
                                name: 'tablet',
                                title: <IconTablet/>,
                                className: 'woolook-tab tab-2',
                            },
                            {
                                name: 'mobile',
                                title: <IconMobile/>,
                                className: 'woolook-tab tab-3',
                            },
                        ] }>
                        {
                            ( tab ) => {
                                if( tab.name === 'mobile' ){
                                    return self.mobileTabControls();
                                }
                                else if( tab.name === 'tablet' ){
                                    return self.tabletTabControls();
                                }

                                return self.desktopTabControls();
                            }
                        }
                    </TabPanel>

                    <PanelBody
                        title={ __('Select Categories') }
                        initialOpen={ false }
                    >
                            
                        <SearchListControl 
                            label={ __('Select Categories') }
                            className={ "woolook-categories" }
                            list = { cat_list } 
                            selected = { categories }
                            onChange= { ( value = [] ) => {
                                setAttributes( { categories: value } );
                            } }
                        ></SearchListControl>

                    </PanelBody>

                    <PanelBody
                        title={ __('Padding') }
                        initialOpen={ false }
                    >

                        <RangeControl
                            label = { __('Top / Bottom') }
                            min = { 1 }
                            max = { 30 }
                            value={ padding }
                            onChange={ ( newValue = 3 ) => {
                                setAttributes( { padding: newValue } );
                            } }
                        />

                    </PanelBody>

                    <PanelBody
                        title={ __('Background Settings') }
                        initialOpen={ false }
                    >
                            
                        <BackgroundControl
                            className={ "woolook" }

                            type = { background_type }
                            onTypeChange = { ( value = 'color' ) => {
                                setAttributes( { background_type: value } );
                            }}
                            
                            color = { background_color }
                            onColorChange = { ( value = '#fff' ) => {
                                setAttributes( { background_color: value } );
                            }}

                            gradient_orientation = { gradient_orientation }
                            onGradientOrientationChange = { ( value = 'to right top' ) => {
                                setAttributes( { gradient_orientation: value } );
                            }}

                            gradient_from = { gradient_from }
                            onGradientFromChange = { ( value = '#fff' ) => {
                                setAttributes( { gradient_from: value } );
                            }}

                            gradient_to = { gradient_to }
                            onGradientToChange = { ( value = '#fff' ) => {
                                setAttributes( { gradient_to: value } );
                            }}

                            image_url = { background_image_url }
                            image_id = { background_image_id }
                            onImageChange = { ( media ) => setAttributes( { background_image_url: media.url, background_image_id: media.id } ) }

                            image_repeat = { background_image_repeat }
                            onImageRepeatChange = { ( value = 'no-repeat' ) => setAttributes( { background_image_repeat: value } ) }

                            image_scroll = { background_image_scroll }
                            onImageScrollChange = { ( value = false ) => setAttributes( { background_image_scroll: value } ) }

                        ></BackgroundControl>

                    </PanelBody>

                    <PanelBody
                        title={ __('Stars Settings') }
                        initialOpen={ false }
                    >
                        
                        <ColorControl
                            label = { __('Unrated') }
                            value = { stars_unrated_bg }
                            onChange = { ( value = "rgba( 0, 0, 0, 0.16 )" ) => {
                                setAttributes( { stars_unrated_bg: value } );
                            } }
                        />

                        <ColorControl
                            label = { __('Rated') }
                            value = { stars_rated_bg }
                            onChange = { ( value = "rgba( 0, 0, 0, 0.5 )" ) => {
                                setAttributes( { stars_rated_bg: value } );
                            } }
                        />
                        
                    </PanelBody>

                    <PanelBody
                        title={ __('Titles Settings') }
                        initialOpen={ false }
                    >

                        <ColorControl
                            label = { __('Title Color') }
                            value = { title_color }
                            onChange = { ( value = "#212121" ) => {
                                setAttributes( { title_color: value } );
                            } }
                        />

                        <ColorControl
                            label = { __('Subtitle Color') }
                            value = { subtitle_color }
                            onChange = { ( value = "#212121" ) => {
                                setAttributes( { subtitle_color: value } );
                            } }
                        />

                        <ColorControl
                            label = { __('Product Title Color') }
                            value = { product_title_color }
                            onChange = { ( value = "#212121" ) => {
                                setAttributes( { product_title_color: value } );
                            } }
                        />
                        
                    </PanelBody>

                    <PanelBody
                        title={ __('Price Settings') }
                        initialOpen={ false }
                    >

                        <ColorControl
                            label = { __('Color') }
                            value = { price_color }
                            onChange = { ( value = "#212121" ) => {
                                setAttributes( { price_color: value } );
                            } }
                        />

                        <ColorControl
                            label = { __('Sale Price Color') }
                            value = { sale_price_color }
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
                            value = { button_color }
                            onChange = { ( value ) => {
                                setAttributes( { button_color: value } );
                            } }
                        />

                        <ColorControl
                            label = { __('Border Color') }
                            value = { button_border_color }
                            onChange = { ( value ) => {
                                setAttributes( { button_border_color: value } );
                            } }
                        />


                        <ColorControl
                            label = { __('Background Color on Hover') }
                            value = { button_hover_bg }
                            onChange = { ( value ) => {
                                setAttributes( { button_hover_bg: value } );
                            } }
                        />


                        <ColorControl
                            label = { __('Color on Hover') }
                            value = { button_hover_color }
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
                    id = { uid }
                    className={ classes.join( ' ' ) }
                >
                    <div className = {'woolook-container'}>

                        <div className = {'woolook-header'} style = {{ 'text-align' : alignment }}>

                            <RichText
                                tagName = { 'h2' }
                                className = { 'woolook-title' }
                                value = { title }
                                placeholder = { title }
                                onChange = { ( newtext ) => setAttributes( { title: newtext } ) }
                                keepPlaceholderOnFocus = { true }
                                isSelected = { false }
                            />

                            <RichText
                                tagName = { 'span' }
                                className = { 'woolook-subtitle' }
                                value = { subtitle }
                                placeholder = { subtitle }
                                onChange = { ( newtext ) => setAttributes( { subtitle: newtext } ) }
                                keepPlaceholderOnFocus = { true }
                                isSelected = { false }
                            />

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
