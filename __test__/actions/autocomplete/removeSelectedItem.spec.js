import C from '../../../src/constants';
import { autocompleteRemoveSelectedItem } from '../../../src/actions-autocomplete';

describe('autocompleteRemoveSelectedItem tests', () => {
    test('no selected items in field', () => {
        const form = 'myform';
        const field = 'myfield';
        const value = 'myvalue';
        const dispatch = jest.fn();
        const getState = jest.fn();

        const state = { forms: {} };
        getState.mockReturnValue(state);
        autocompleteRemoveSelectedItem(form, field, value)(dispatch, getState);
        expect(getState).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith({
            type: C.DUXFORM_SET_FIELD_DATA,
            form: form,
            field: field,
            payload: {
                selectedItems: []
            }
        });
    });

    test('value not selected items', () => {
        const form = 'myform';
        const field = 'myfield';
        const value = 'myvalue';
        const dispatch = jest.fn();
        const getState = jest.fn();

        const selectedItems = [
            {value: 'Other Value'},
            {value: value},
            {value: 'Another Value'}
        ];
        const newSelectedItems = [
            {value: 'Other Value'},
            {value: 'Another Value'}
        ];

        const state = {
            forms: {
                myform: {
                    fields: {
                        myfield: {selectedItems: selectedItems}
                    }
                }
            }
        };
        getState.mockReturnValue(state);
        autocompleteRemoveSelectedItem(form, field, value)(dispatch, getState);
        expect(getState).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith({
            type: C.DUXFORM_SET_FIELD_DATA,
            form: form,
            field: field,
            payload: {
                selectedItems: newSelectedItems
            }
        });
    });
});
