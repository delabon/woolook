import { findIndex } from 'lodash';
import { IconCheckChecked, IconCheckUnchecked } from '../../icons';

const {
    __, 
    _n, 
    sprintf
} = wp.i18n;

const {
    Component, Fragment
} = wp.element;

const {
    MenuGroup, MenuItem
} = wp.components;

const getInteractionIcon = ( isSelected = false ) => {
	return isSelected ? <IconCheckChecked /> : <IconCheckUnchecked />;
};

export class SearchListControl extends Component {

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

        onChange( [ ...selected, { id: item.id, slug: item.slug } ] );
    }

    /**
     * Fires when removing an item
     * @param {object} item 
     */
	onRemove( item ) {
        const { onChange, selected } = this.props;
        const i = findIndex( selected, { id: item.id } );
        onChange( [ ...selected.slice( 0, i ), ...selected.slice( i + 1 ) ] );
	}

    /**
     * Is Item Selected
     * @param {object} item 
     */
    isSelected( item ){
        return -1 !== findIndex( this.props.selected, { id: item.id });
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
                <MenuItem
                    role={ 'menuitemcheckbox' }
                    label={ item.name }
                    className={ `${className}-item` }
                    onClick={ ( event ) => self.onSelect( item ) }
                    isSelected={ self.isSelected( item ) }
                    data-depth={item.depth}
                >
                    <span className={ `${className}-item-state` }>
                        { getInteractionIcon( self.isSelected( item ) ) }
                    </span>

                    <span className={ `${className}-item-label` } >
                        {item.name}
                    </span>
        
                </MenuItem>
            );

        });
    }

    render() {
        const { className = '', label } = this.props;
        
        return (
            <MenuGroup
                className={ `${className}-list` }
            >
                { this.renderList() }
            </MenuGroup>
        );
    }
}
