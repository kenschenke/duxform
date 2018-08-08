import C from '../../../src/constants';
import { autocompleteAddSelectedItem } from '../../../src/actions-autocomplete';

describe('autocompleteAddSelectedItem', () => {
    test('multi selection', () => {
        const form = 'myform';
        const field = 'myfield';
        const allowMulti = true;
        const value = 'myvalue';
        const dispatch = jest.fn();
        const getState = jest.fn();

        const state = {
            forms: {
                myform: {
                    fields: {
                        myfield: {
                            selectedItems: [
                                {value: 'Other Value 1'},
                                {value: 'Other Value 2'}
                            ],
                            items: [
                                {value: value}
                            ]
                        }
                    }
                }
            }
        };
        const newSelectedItems = [
            {value: 'Other Value 1'},
            {value: 'Other Value 2'},
            {value: value}
        ];
        getState.mockReturnValue(state);

        autocompleteAddSelectedItem(form, field, allowMulti, value)(dispatch, getState);
        expect(getState).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith({
            type: C.DUXFORM_SET_FIELD_DATA,
            form: form,
            field: field,
            payload: {
                selectedItems: newSelectedItems,
                inputValue: '',
                valid: true
            }
        });
    });

    test('single selection', () => {
        const form = 'myform';
        const field = 'myfield';
        const allowMulti = false;
        const value = 'myvalue';
        const label = 'mylabel';
        const dispatch = jest.fn();
        const getState = jest.fn();

        const state = {
            forms: {
                myform: {
                    fields: {
                        myfield: {
                            items: [
                                {value: value, label: label}
                            ]
                        }
                    }
                }
            }
        };
        getState.mockReturnValue(state);

        autocompleteAddSelectedItem(form, field, allowMulti, value)(dispatch, getState);
        expect(getState).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith({
            type: C.DUXFORM_SET_FIELD_DATA,
            form: form,
            field: field,
            payload: {
                value: value,
                inputValue: label,
                valid: true
            }
        });
    });
});
