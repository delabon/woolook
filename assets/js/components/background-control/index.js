import ColorControl from '../../components/color-control';

const {
    __, 
    _n, 
    sprintf
} = wp.i18n;

const {
    MediaUpload,
} = wp.editor;

const {
    SelectControl, 
    Button,
    CheckboxControl,
} = wp.components;

const {
    Component, 
    Fragment
} = wp.element;

export default class BackgroundControl extends Component {

    constructor() {
		super( ...arguments );
    
        this.getOptionsByType = this.getOptionsByType.bind( this );
    }
    
    getOptionsByType(){
        var _self = this;

        const { 
            gradient_orientation,
            onGradientOrientationChange,
            gradient_from,
            onGradientFromChange,
            gradient_to,
            onGradientToChange,
        } = _self.props;

        if( _self.props.type == 'gradient' ){
            return(
                <Fragment>
             
                    <SelectControl
                        label = { __('Choose orientation') }
                        value= { gradient_orientation }
                        options={ [
                            { label: __('Bottom Left to Top Right'), value: 'to right top' },
                            { label: __('Left to Right'), value: 'to right' },
                            { label: __('Top Left to Bottom Right'), value: 'to right bottom' },
                            { label: __('Top to Bottom'), value: 'to bottom' },
                            { label: __('Top Right to Bottom Left'), value: 'to left bottom' },
                            { label: __('Right to Left'), value: 'to left' },
                            { label: __('Bottom Right to Top Left'), value: 'to left top' },
                            { label: __('Bottom to Top'), value: 'to top' },
                        ] }
                        onChange={ onGradientOrientationChange }
                    />

                    <ColorControl
                        label = { __('From') }
                        value = { gradient_from }
                        onChange = { onGradientFromChange }
                    />

                    <ColorControl
                        label = { __('To') }
                        value = { gradient_to }
                        onChange = { onGradientToChange }
                    />
                       
                </Fragment>
            );
        }

        // background image
        else if( _self.props.type == 'image' ){
            return(
                <Fragment>
                    
                    <div className = {'dlb-component-upload'}>
                        <MediaUpload
                            className = {'dlb-component-upload'}
                            onSelect = { _self.props.onImageChange }
                            type = { 'image' }
                            value = { _self.props.image_url }
                            render = { function( obj ) {
                                return [
                                    <Fragment>
                                        {_self.props.image_url && (
                                            <img src={ _self.props.image_url } />
                                        )}

                                        <Button
                                            className = { 'button button-primary button-large' }
                                            onClick = { obj.open } 
                                        >
                                            {__('Upload Image')}
                                        </Button>
                                    </Fragment>
                                ]
                            } }
                        />
                    </div>

                    <SelectControl
                        label = { __('Repeat') }
                        value= { _self.props.image_repeat }
                        options={ [
                            { label: __('No Repeat'), value: 'no-repeat' },
                            { label: __('Repeat'), value: 'repeat' },
                        ] }
                        onChange={ _self.props.onImageRepeatChange }
                    />
                       
                    <CheckboxControl
                        heading = { __('Scroll') }
                        label = { "Enable" }
                        checked = { _self.props.image_scroll }
                        onChange = { _self.props.onImageScrollChange }
                    />

                </Fragment>
            );
        }

    }

    render() {
        
        const { 
            className = '',
            type, 
            onTypeChange,
            color,
            onColorChange,
        } = this.props;
        
        return (
            <div className={ `${className} dlb-background-controls` }>           

                <SelectControl
                    label = { __('Type') }
                    value= { type }
                    options={ [
                        { label: __('Color'), value: 'color' },
                        { label: __('Gradient'), value: 'gradient' },
                        { label: __('Image'), value: 'image' },
                    ] }
                    onChange={ onTypeChange }
                />

                { this.getOptionsByType() }

                <ColorControl
                    label = { this.props.type == 'color' ? __('Color') : __('Fallback Color') }
                    value = { color }
                    onChange = { onColorChange }
                />

            </div>
        );
    }
}

