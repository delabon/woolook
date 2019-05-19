import { IconCheckChecked, IconCheckUnchecked } from '../../icons';

const {
    __, 
    _n, 
    sprintf
} = wp.i18n;

const {
    Component, Fragment
} = wp.element;

const getInteractionIcon = ( isSelected = false ) => {
	return isSelected ? <IconCheckChecked /> : <IconCheckUnchecked />;
};

export class ImageListControl extends Component {

    constructor() {
		super( ...arguments );

        this.onSelect = this.onSelect.bind( this );
		this.onRemove = this.onRemove.bind( this );
		this.isSelected = this.isSelected.bind( this );
        this.renderList = this.renderList.bind( this );
    }

    /**
     * Fires when selecting an item
     * @param {object} item 
     */
	onSelect( item ) {
        const { onChange, selected } = this.props;

        if ( this.isSelected( item ) ) {
            this.onRemove( item );
            return;
        }

        onChange( item.id );
    }

    /**
     * Fires when removing an item
     * @param {object} item 
     */
	onRemove( item ) {
        const { onChange, selected } = this.props;
        
        if( selected == item.id ){
            onChange( 0 );
        }
	}

    /**
     * Is Item Selected
     * @param {object} item 
     */
    isSelected( item ){
        if( this.props.selected == item.id ){
            return true;
        }

        return false;
    }

    /**
     * Renders list items
     */
    renderList(){

        const self = this;

        const {
            list,
            selected,
            className,
        } = self.props;

        return list.map(function( item ){
            
            if( ! item.hasOwnProperty('name') ) return false;

            return (
                <div
                    role={ 'menuitemradio' }
                    label={ item.name }
                    className={ `${className}-item` }
                    onClick={ ( event ) => self.onSelect( item ) }
                    isSelected={ self.isSelected( item ) }
                    data-slug={ item.slug }
                >
                    <span className={ `${className}-item-label` } >
                        { getInteractionIcon( self.isSelected( item ) ) }
                        {item.name}
                    </span>

                    <span className={ `${className}-item-img` } ></span>

                </div>
            );

        });
    }

    render() {
        const { className = '', label } = this.props;
        
        return (
            <div className={ `${className}-list` }>
                { this.renderList() }
            </div>
        );
    }
}
