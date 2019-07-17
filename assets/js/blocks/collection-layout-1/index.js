//  Import CSS.
import './sass/style.scss';
import './sass/editor.scss';
import { BlockIcon } from '../../icons';
import { Edit } from './edit';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks; 

registerBlockType( 'woolook/collection-layout-1', {

	title: __( 'Woolook - Collection Layout One' ), 
	
	icon: BlockIcon, 
	
	category: 'woolook',

	keywords: [
		__( 'category' ),
		__( 'woocommerce' ),
		__( 'collection' ),
	],

	supports: {
		html: false,
	},

	edit: Edit,

	save: () => null,
} );
