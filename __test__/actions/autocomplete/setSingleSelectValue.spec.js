import C from '../../../src/constants';
import { setAutoCompleteSingleSelectValue } from '../../../src/actions-autocomplete';

describe('setAutoCompleteSingleSelectValue tests', () => {
    test('items is not an array', () => {
        const form = 'myform';
        const field = 'myfield';
        const dispatch = jest.fn();
        const value ='ABC';
        const items = 'The Items';
        const valid = true;

        setAutoCompleteSingleSelectValue(form, field, value, items, valid)(dispatch);
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith({
            type: C.DUXFORM_SET_FIELD_DATA,
            form,
            field,
            payload: {
                value,
                inputValue: value,
                valid,
                pristine: false,
                error: ''
            }
        });
    });

    test('value is not in items array', () => {
        const form = 'myform';
        const field = 'myfield';
        const dispatch = jest.fn();
        const value ='ABC';
        const valid = true;

        const items = [
            {
                label: 'Def',
                value: 'DEF'
            }
        ];

        setAutoCompleteSingleSelectValue(form, field, value, items, valid)(dispatch);
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith({
            type: C.DUXFORM_SET_FIELD_DATA,
            form,
            field,
            payload: {
                value,
                inputValue: value,
                valid,
                pristine: false,
                error: ''
            }
        });
    });

    test('value is in items array', () => {
        const form = 'myform';
        const field = 'myfield';
        const dispatch = jest.fn();
        const value ='ABC';
        const valid = true;
        const inputValue = 'Abc';

        const items = [
            {
                label: 'Def',
                value: 'DEF'
            },
            {
                label: inputValue,
                value
            }
        ];

        setAutoCompleteSingleSelectValue(form, field, value, items, valid)(dispatch);
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith({
            type: C.DUXFORM_SET_FIELD_DATA,
            form,
            field,
            payload: {
                value,
                inputValue,
                valid,
                pristine: false,
                error: ''
            }
        });
    });
});
