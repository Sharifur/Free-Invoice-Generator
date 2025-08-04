import { registerBlockType } from '@wordpress/blocks';
import edit from './edit';
import save from './save';

registerBlockType('sig/legal-compliance', {
    edit,
    save,
});