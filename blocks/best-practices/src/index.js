import { registerBlockType } from '@wordpress/blocks';
import edit from './edit';
import save from './save';

registerBlockType('sig/best-practices', {
    edit,
    save,
});