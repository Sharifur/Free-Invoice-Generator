import { registerBlockType } from '@wordpress/blocks';
import edit from './edit';
import save from './save';

registerBlockType('sig/benefits-section', {
    edit,
    save,
});