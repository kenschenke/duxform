import C from '../../../src/constants';
import { setAutoCompleteMultiSelectValues } from '../../../src/actions-autocomplete';

describe('setAutoCompleteMultiSelectValue tests', () => {
    test('values is not an array', () => {
        const form = 'myform';
        const field = 'myfield';
        const dispatch = jest.fn();
        const values = 'The Values';
        const items = [];
        const valid = true;

        setAutoCompleteMultiSelectValues(form, field, values, items, valid)(dispatch);
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith({
            type: C.DUXFORM_SET_FIELD_DATA,
            form,
            field,
            payload: {
                valid,
                selectedItems: [],
                inputValue: '',
                pristine: false,
                error: ''
            }
        });
    });

    test('successful', () => {
        const form = 'myform';
        const field = 'myfield';
        const dispatch = jest.fn();
        const values = [1, 2, 99];
        const valid = true;

        const items = [
            { value: 1, label: 'Abc' },
            { value: 2, label: 'Def' },
            { value: 3, label: 'Ghi' }
        ];

        const selectedItems = [
            { label: 'Abc', labelU: 'ABC', value: 1 },
            { label: 'Def', labelU: 'DEF', value: 2 }
        ];

        setAutoCompleteMultiSelectValues(form, field, values, items, valid)(dispatch);
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith({
            type: C.DUXFORM_SET_FIELD_DATA,
            form,
            field,
            payload: {
                valid,
                selectedItems,
                inputValue: '',
                pristine: false,
                error: ''
            }
        });
    });
});
