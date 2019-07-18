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
            loading: false,
            cat_list: [],
            items: [],
        };
        
        this.generateID = this.generateID.bind( this );
        this.getItems = this.getItems.bind( this );
        this.renderCategory = this.renderCategory.bind( this );
        this.renderStyle = this.renderStyle.bind( this );
    }

	componentDidMount() {
        
        const self = this;

        self.generateID();

        // Loads category list for the "Inspector"
        apiFetch({
            path: addQueryArgs( '/woolook/v1/category_list', {} ),
        })
        .then( ( list ) => {
            self.setState( { cat_list: list, loading: false } );
        })
        .catch( () => {
            self.setState( { cat_list: [], loading: false } );
        });

        // Loads categories for the render
		self.getItems();
	}

	componentDidUpdate( prevProps ) {        
        if( prevProps.attributes[ 'categories' ] !== this.props.attributes[ 'categories' ] ){
            this.getItems();
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

    getItems(){
        const self = this;

		apiFetch({
			path: addQueryArgs( '/woolook/v1/categories', {
                categories: self.props.attributes.categories,
                limit: 3,
            }),
        })
        .then( ( categories ) => {
            self.setState( { 
                items: categories, 
                loading: false 
            });
        })
        .catch( () => {
            self.setState({ 
                items: [], 
                loading: true 
            });
        });
    }

    renderCategory( category ){        
        return (
            <div 
                className="woolook-item" 
                style={{ 
                    backgroundImage: category.image ? 'url('+category.image+')' : null,
                }}
            >
                <div className="woolook-item-details">
                    <div className="woolook-item-title">{category.name}</div>
                    <span className="woolook-item-count">{category.count}</span>
                </div>

                <a href="#"></a>
            </div>
        )
    }

    renderStyle(){

        const { attributes } = this.props;

        const {
            background_type,
            gradient_orientation,
            gradient_from,
            gradient_to,
            background_image_url,
            background_image_repeat,
            background_image_scroll,
        } = attributes;

        let output = `

            #${attributes.uid}.woolook-collection-one{
                padding-top: ${attributes.paddingTop}px;
                padding-bottom: ${attributes.paddingBottom}px;
                padding-left: ${attributes.paddingLeft}px;
                padding-right: ${attributes.paddingRight}px;
                margin-top: ${attributes.marginTop}px;
                margin-bottom: ${attributes.marginBottom}px;
                margin-left: ${attributes.marginLeft}px;
                margin-right: ${attributes.marginRight}px;
                font-size: ${ attributes.mobileFontSize }px;
                background-color: ${attributes.background_color};
            }

            #${attributes.uid}.woolook-collection-one .woolook-title{
                color: ${attributes.title_color};
            }

            #${attributes.uid}.woolook-collection-one .woolook-item-title{
                color: ${attributes.product_title_color};
            }

        `;

        if( background_type === 'gradient' ){
            output += `
                #${attributes.uid}.woolook-collection-one{
                    background-image: linear-gradient( ${gradient_orientation.replace('-', ' ')}, ${gradient_from}, ${gradient_to} );
                }
            `;
        }

        else if( background_type === 'image' ){
            output += `
                #${attributes.uid}.woolook-collection-one{
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
                #${attributes.uid}.woolook-collection-one{
                    font-size: ${attributes.tabletFontSize}px;
                }
            }

            @media all and (min-width: 992px) {
                #${attributes.uid}.woolook-collection-one{
                    font-size: ${attributes.fontSize}px;
                }
            }
        `;

        return (
            <style>{ output }</style>
        );
    }

    render(){

        const self = this;

        const { cat_list, items, loading } = this.state;

        if( loading ){
            return __("Loading...", 'woolook');
        }

        const {
            setAttributes,
            attributes,
            isSelected,
        } = self.props;

        const {
            uid,
            title,
            categories,
            alignment,
            background_type,
            background_color,
            gradient_orientation,
            gradient_from,
            gradient_to,
            background_image_url,
            background_image_id,
            background_image_repeat,
            background_image_scroll,
            title_color,
            product_title_color,
        } = attributes;

		const classes = [ 'woolook', 'woolook-collection-one' ];

        if ( ! categories.length ) {
            classes.push( 'is-loading' );
        }

        let itemsOutput;

        if( items.length ){
            itemsOutput = <div className = {'woolook-items'}>{items.map( item => this.renderCategory( item ) )}</div>;
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

                    <PanelBody
                        title={ __('Select Categories') }
                        initialOpen={ true }
                    >
                            
                        <SearchListControl 
                            label={ __('Select Categories') }
                            className={ "woolook-categories" }
                            list = { cat_list } 
                            selected = { categories }
                            onChange= { ( value = [] ) => {

                                if( value.length > 3 ){
                                    alert(__('You cannot add more than 3', 'woolook'));
                                    return false;
                                }

                                return setAttributes( { categories: value } );
                            } }
                        ></SearchListControl>

                    </PanelBody>

                    <ResponsiveSettings attributes={attributes} setAttributes={setAttributes} />

                    <PaddingMarginSettings attributes={attributes} setAttributes={setAttributes} />

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
                        title={ __('Titles Settings') }
                        initialOpen={ false }
                    >

                        <ColorControl
                            label = { __('Title Color') }
                            value = { title_color }
                            onChange = { ( title_color = "#212121" ) => {
                                setAttributes( { title_color } );
                            } }
                        />

                        <ColorControl
                            label = { __('Category Title Color') }
                            value = { product_title_color }
                            onChange = { ( product_title_color = "#212121" ) => {
                                setAttributes( { product_title_color } );
                            } }
                        />
                        
                    </PanelBody>

                </InspectorControls>
    
            ),

            <Fragment>

                {this.renderStyle()}

                <div 
                    id = { uid }
                    className={ classes.join( ' ' ) }
                    data-desktop={attributes.columns}
                    data-tablet={attributes.tabletColumns}
                    data-mobile={attributes.mobileColumns}
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

                        </div>

                        {itemsOutput}
                        
                    </div>

                </div>
            </Fragment>

        ]
    }
    
}
