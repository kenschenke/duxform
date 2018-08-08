import C from '../../src/constants';
import { setFormFieldValue } from '../../src/actions';

describe('setFormFieldValue tests', () => {
    test('valid', () => {
        const form = 'myform';
        const name = 'myfield';
        const value = 'Value';

        const dispatch = jest.fn();

        const expectedAction = {
            value: value,
            valid: true,
            pristine: false,
            error: ''
        };
        setFormFieldValue(form, name, value)(dispatch);
        expect(dispatch).toHaveBeenCalledTimes(3);
        expect(dispatch).toHaveBeenCalledWith({
            type: C.DUXFORM_SET_FIELD_DATA,
            form: form,
            field: name,
            payload: expectedAction
        });
    });

    test('invalid', () => {
        const form = 'myform';
        const name = 'myfield';
        const value = 'Value';

        const dispatch = jest.fn();

        const expectedAction = {
            value: value,
            valid: false,
            pristine: false
        };
        setFormFieldValue(form, name, value, false)(dispatch);
        expect(dispatch).toHaveBeenCalledTimes(3);
        expect(dispatch).toHaveBeenCalledWith({
            type: C.DUXFORM_SET_FIELD_DATA,
            form: form,
            field: name,
            payload: expectedAction
        });
    });
});
