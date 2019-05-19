//  Import CSS.
import './sass/style.scss';
import './sass/editor.scss';
import { BlockIcon } from '../../icons';
import { Edit } from './edit';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks; 

registerBlockType( 'woolook/layout-1', {

	title: __( 'Woolook - Layout One' ), 
	
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
