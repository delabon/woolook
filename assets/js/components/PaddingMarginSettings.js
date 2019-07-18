const { 
    RangeControl,
    TextControl,
    PanelBody,
    TabPanel,
} = wp.components;

const {
    Fragment,
} = wp.element;

const { __ } = wp.i18n;

const PaddingMarginSettings = ({ attributes, setAttributes }) => {

    return (

        <PanelBody
            title={ __('Padding/Margin Settings', 'woolook') }
            initialOpen={ false }
        >

            {attributes.hasOwnProperty('marginTop') &&(
                <RangeControl
                    label = { __( 'Margin Top', 'woolook' ) }
                    value = { attributes.marginTop }
                    min = { 0 }
                    max = { 500 }
                    step = { 1 }
                    onChange = { marginTop => setAttributes({ marginTop }) } 
                />  
            )}

            {attributes.hasOwnProperty('marginBottom') &&(
                <RangeControl
                    label = { __( 'Margin Bottom', 'woolook' ) }
                    value = { attributes.marginBottom }
                    min = { 0 }
                    max = { 500 }
                    step = { 1 }
                    onChange = { marginBottom => setAttributes({ marginBottom }) } 
                />  
            )}

            {attributes.hasOwnProperty('marginLeft') &&(
                <RangeControl
                    label = { __( 'Margin Left', 'woolook' ) }
                    value = { attributes.marginLeft }
                    min = { 0 }
                    max = { 500 }
                    step = { 1 }
                    onChange = { marginLeft => setAttributes({ marginLeft }) } 
                />  
            )}

            {attributes.hasOwnProperty('marginRight') &&(
                <RangeControl
                    label = { __( 'Margin Right', 'woolook' ) }
                    value = { attributes.marginRight }
                    min = { 0 }
                    max = { 500 }
                    step = { 1 }
                    onChange = { marginRight => setAttributes({ marginRight }) } 
                />  
            )}

            {attributes.hasOwnProperty('paddingTop') &&(
                <RangeControl
                    label = { __( 'Padding Top', 'woolook' ) }
                    value = { attributes.paddingTop }
                    min = { 0 }
                    max = { 500 }
                    step = { 1 }
                    onChange = { paddingTop => setAttributes({ paddingTop }) } 
                />  
            )}

            {attributes.hasOwnProperty('paddingBottom') &&(
                <RangeControl
                    label = { __( 'Padding Bottom', 'woolook' ) }
                    value = { attributes.paddingBottom }
                    min = { 0 }
                    max = { 500 }
                    step = { 1 }
                    onChange = { paddingBottom => setAttributes({ paddingBottom }) } 
                />  
            )}

            {attributes.hasOwnProperty('paddingLeft') &&(
                <RangeControl
                    label = { __( 'Padding Left', 'woolook' ) }
                    value = { attributes.paddingLeft }
                    min = { 0 }
                    max = { 500 }
                    step = { 1 }
                    onChange = { paddingLeft => setAttributes({ paddingLeft }) } 
                />  
            )}

            {attributes.hasOwnProperty('paddingRight') &&(
                <RangeControl
                    label = { __( 'Padding Right', 'woolook' ) }
                    value = { attributes.paddingRight }
                    min = { 0 }
                    max = { 500 }
                    step = { 1 }
                    onChange = { paddingRight => setAttributes({ paddingRight }) } 
                />  
            )}

        </PanelBody>

    );

}

export default PaddingMarginSettings;
