import { IconDesktop, IconMobile, IconTablet } from '../icons';

const { 
    RangeControl,
    PanelBody,
    TabPanel,
} = wp.components;

const {
    Fragment,
} = wp.element;

const { __ } = wp.i18n;

function setDesktopColumns( attributes, setAttributes, newValue ){

    let data = { 
        columns: newValue,
    };

    if( attributes.tabletColumns > newValue ){
        data.tabletColumns = newValue;
    }

    if( attributes.mobileColumns > data.tabletColumns ){
        data.mobileColumns = data.tabletColumns;
    }

    return setAttributes(data)
}

function setTabletColumns( attributes, setAttributes, newValue ){

    let data = { 
        tabletColumns: newValue,
    };

    if( attributes.mobileColumns > newValue ){
        data.mobileColumns = newValue;
    }

    return setAttributes(data)
}

const ResponsiveSettings = ({ attributes, setAttributes }) => {

    return (

        <PanelBody
            title={ __('Responsive Settings', 'woolook') }
            initialOpen={ false }
        >

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
                            return(
                                <Fragment>

                                    {attributes.hasOwnProperty('mobileColumns') &&(
                                        <RangeControl
                                            label = { __( 'Mobile Columns', 'woolook' ) }
                                            value = { attributes.mobileColumns }
                                            min = { 1 }
                                            max = { attributes.tabletColumns }
                                            step = { 1 }
                                            onChange = { mobileColumns => setAttributes({ mobileColumns }) } 
                                        />  
                                    )}
                                
                                    <RangeControl
                                        label = { __( 'Mobile Font Size', 'woolook' ) }
                                        value = { attributes.mobileFontSize }
                                        min = { 1 }
                                        max = { 100 }
                                        step = { 1 }
                                        onChange = { mobileFontSize => setAttributes({ mobileFontSize }) } 
                                    />

                                </Fragment>
                            )
                        }
                        else if( tab.name === 'tablet' ){
                            return (

                                <Fragment>
                                    
                                    {attributes.hasOwnProperty('tabletColumns') &&(
                                        <RangeControl
                                            label = { __( 'Tablet Columns', 'woolook' ) }
                                            value = { attributes.tabletColumns }
                                            min = { 1 }
                                            max = { attributes.columns }
                                            step = { 1 }
                                            onChange = { tabletColumns => setTabletColumns( attributes, setAttributes, tabletColumns ) } 
                                        />
                                    )}

                                    <RangeControl
                                        label = { __( 'Tablet Font Size', 'woolook' ) }
                                        value = { attributes.tabletFontSize }
                                        min = { 1 }
                                        max = { 100 }
                                        step = { 1 }
                                        onChange = { tabletFontSize => setAttributes({ tabletFontSize }) } 
                                    />

                                </Fragment>

                            )
                        }

                        return(

                            <Fragment>

                                {attributes.hasOwnProperty('columns') &&(
                                    <RangeControl
                                        label = { __( 'Desktop Columns', 'woolook' ) }
                                        value = { attributes.columns }
                                        min = { 1 }
                                        max = { attributes.maxColumns ? attributes.maxColumns : 5 }
                                        step = { 1 }
                                        onChange = { columns => setDesktopColumns( attributes, setAttributes, columns ) } 
                                    />
                                )}

                                <RangeControl
                                    label = { __( 'Desktop Font Size', 'woolook' ) }
                                    value = { attributes.fontSize }
                                    min = { 1 }
                                    max = { 100 }
                                    step = { 1 }
                                    onChange = { fontSize => setAttributes({ fontSize }) } 
                                />

                            </Fragment>

                        )
                    }
                }
            </TabPanel>

        </PanelBody>

    );

}

export default ResponsiveSettings;
