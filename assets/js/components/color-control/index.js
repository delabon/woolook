const {
    ColorPalette,
} = wp.components;

const {
    Component, Fragment
} = wp.element;

const colors = [
    { color: '#F9583B', name: 'GPB Color' },
    { color: '#e84393', name : 'Prunus Avium' },
    { color: '#d63031', name : 'Chi-gong' },
    { color: '#fd79a8', name: 'Pico-8' },
    { color: '#00cec9', name : 'Robin\'s Egg Blue' },
    { color: '#e17055', name : 'Orange Ville' },
    { color: '#fdcb6e', name : 'Bright Yarrow' },
    { color: '#55efc4', name : 'Light Greenish Blue' },
    { color: '#00b894', name : 'Mint Leaf' },
    { color: '#6c5ce7', name : 'Exodus Fruit' },
    { color: '#ffeaa7', name : 'Sour Lemon' },
    { color: '#fab1a0', name : 'First Date' },
    { color: '#74b9ff', name : 'Green Darnet Tail' },
    { color: '#a29bfe', name : 'Sky Moment' },
    { color: '#2d3436', name : 'Dracula Orchid' },
    { color: '#636e72', name : 'American River' },	
    { color: '#dfe6e9', name : 'City Lights' },
    { color: '#efefef', name : 'Gray 1' },
    { color: '#f1f1f1', name : 'Gray 2' },
    { color: '#f6f6f6', name : 'Gray 3' },
];

export default class ColorControl extends Component {

    render() {
        self = this;

        const {
            className = '',
            onChange,
            label,
            value,
        } = self.props;

        return (
            <div className={ `${className} dlb-component-color` }>           

                <div className = {'__indicator__'}>
                    <span className = {'__text__'}>{ label }</span>
                    <span className = {'__color__'} style = {{ 'background-color': value }}></span>
                </div>

                <ColorPalette 
                    colors = { colors } 
                    value = { value }
                    onChange={ ( newValue ) => {
                        onChange( newValue );
                    } } 
                />

            </div>
        );
    }

}
