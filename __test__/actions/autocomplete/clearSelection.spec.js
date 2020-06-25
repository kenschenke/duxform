import C from '../../../src/constants';
import { clearAutoCompleteSelection } from '../../../src/actions-autocomplete';

describe('clearAutoCompleteSelection tests', () => {
    test('Clear selection', () => {
        const form = 'myform';
        const field = 'myfield';
        const dispatch = jest.fn();

        clearAutoCompleteSelection(form, field)(dispatch);
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith({
            type: C.DUXFORM_SET_FIELD_DATA,
            form,
            field,
            payload: {
                value: undefined,
                inputValue: '',
                valid: false,
                pristine: false,
                error: '',
                selectedItems: []
            }
        });
    });
});
