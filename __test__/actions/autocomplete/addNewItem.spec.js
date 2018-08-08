import C from '../../../src/constants';
import { autocompleteAddNewItem } from '../../../src/actions-autocomplete';

describe('autocompleteAddNewItem tests', () => {
    test('Item already selected', () => {
        const form = 'myform';
        const field = 'myfield';
        const value = 'New Value';
        const dispatch = jest.fn();
        const getState = jest.fn();

        const state = {
            forms: {
                myform: {
                    fields: {
                        myfield: {
                            selectedItems: [
                                {
                                    value: value,
                                    label: value,
                                    labelU: value.toUpperCase()
                                }
                            ]
                        }
                    }
                }
            }
        };
        getState.mockReturnValue(state);

        autocompleteAddNewItem(form, field, value)(dispatch, getState);
        expect(getState).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledTimes(0);
    });

    test('Item not already selected', () => {
        const form = 'myform';
        const field = 'myfield';
        const value = 'New Value';
        const dispatch = jest.fn();
        const getState = jest.fn();

        const state = {
            forms: {
                myform: {
                    fields: {
                        myfield: {
                            selectedItems: [
                                {
                                    value: 'Other Value',
                                    label: 'Other Label',
                                    labelU: 'OTHER VALUE'
                                }
                            ]
                        }
                    }
                }
            }
        };
        getState.mockReturnValue(state);

        const newSelectedItems = [
            {
                value: 'Other Value',
                label: 'Other Label',
                labelU: 'OTHER VALUE'
            },
            {
                value: value,
                label: value,
                labelU: value.toUpperCase()
            }
        ];

        autocompleteAddNewItem(form, field, value)(dispatch, getState);
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
});
