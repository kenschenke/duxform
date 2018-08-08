import C from '../../../src/constants';
import { autocompleteDropdownMatches } from '../../../src/actions-autocomplete';

describe('autocompleteDropdownMatches tests', () => {
    test('empty matches list', () => {
        const form = 'myform';
        const field = 'myfield';
        const highlightedValue = 'MyValue';
        const dispatch = jest.fn();
        const getState = jest.fn();

        const state = {
            forms: {
                myform: {
                    fields: {
                        myfield: {highlightedValue: highlightedValue}
                    }
                }
            }
        };
        const matches = [];

        getState.mockReturnValue(state);
        autocompleteDropdownMatches(form, field, matches)(dispatch, getState);
        expect(getState).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith({
            type: C.DUXFORM_SET_FIELD_DATA,
            form: form,
            field: field,
            payload: {
                items: matches,
                highlightedValue: ''
            }
        });
    });

    test('no highlighted item', () => {
        const form = 'myform';
        const field = 'myfield';
        const firstValue = 'First Value';
        const dispatch = jest.fn();
        const getState = jest.fn();

        const state = { forms: {} };
        const matches = [
            {value: firstValue},
            {value: 'Other Value'}
        ];

        getState.mockReturnValue(state);
        autocompleteDropdownMatches(form, field, matches)(dispatch, getState);
        expect(getState).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith({
            type: C.DUXFORM_SET_FIELD_DATA,
            form: form,
            field: field,
            payload: {
                items: matches,
                highlightedValue: firstValue
            }
        });
    });

    test('highlighted item found in list', () => {
        const form = 'myform';
        const field = 'myfield';
        const highlightedValue = 'First Value';
        const dispatch = jest.fn();
        const getState = jest.fn();

        const state = {
            forms: {
                myform: {
                    fields: {
                        myfield: {highlightedValue: highlightedValue}
                    }
                }
            }
        };
        const matches = [
            {value: 'First Value'},
            {value: highlightedValue},
            {value: 'Other Value'}
        ];

        getState.mockReturnValue(state);
        autocompleteDropdownMatches(form, field, matches)(dispatch, getState);
        expect(getState).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith({
            type: C.DUXFORM_SET_FIELD_DATA,
            form: form,
            field: field,
            payload: {
                items: matches,
                highlightedValue: highlightedValue
            }
        });
    });
});
