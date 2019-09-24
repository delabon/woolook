//  Import CSS.
import './sass/style.scss';
import './sass/editor.scss';
import { BlockIcon } from '../../icons';
import { Edit } from './edit';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks; 

registerBlockType( 'woolook/hand-picked-products', {

	title: __( 'Hand-picked Products', 'woolook' ), 
	
	icon: BlockIcon, 
	
	category: 'woolook',

	keywords: [
		__( 'woolook' ),
		__( 'woocommerce' ),
		__( 'product' ),
	],

	supports: {
		html: false,
	},

	edit: Edit,

	save: () => null,
} );
