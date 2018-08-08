import C from '../../src/constants';
import { mapDuxInputDispatch } from '../../src/maps/DuxInput.map';

describe('mapDuxInputDispatch init tests', () => {
    test('init', () => {
        const form = 'myform';
        const field = 'myfield';
        const formValidate = jest.fn();
        const props = {
            formName: form,
            name: field,
            formValidate: formValidate
        };

        const dispatch = jest.fn();
        const map = mapDuxInputDispatch(dispatch);
        map.init(props);
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenCalledWith({
            type: C.DUXFORM_SET_FIELD_DATA,
            form: form,
            field: field,
            payload: {
                pristine: true,
                value: '',
                error: '',
                valid: true,
                hasFocus: false
            }
        });
        expect(dispatch).toHaveBeenCalledWith({
            type: C.DUXFORM_SET_FORM_DATA,
            name: form,
            data: {
                pristine: true,
                valid: false,
                error: ''
            }
        });
        expect(formValidate).toHaveBeenCalledTimes(1);
        expect(formValidate).toHaveBeenCalledWith(form);
    });
});