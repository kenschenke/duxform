import C from '../../src/constants';
import { mapDuxInputDispatch } from '../../src/maps/DuxInput.map';

describe('mapDuxInputDispatch handleChange tests', () => {
    test('checkbox', () => {
        const checked = true;
        const form = 'myform';
        const field = 'myfield';
        const event = {
            target: {checked: checked}
        };
        const formValidate = jest.fn();
        const props = {
            type: 'checkbox',
            formName: form,
            name: field,
            formValidate: formValidate
        };
        const dispatch = jest.fn();
        const map = mapDuxInputDispatch(dispatch);
        map.handleChange(event, props);
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenCalledWith({
            type: C.DUXFORM_SET_FIELD_DATA,
            form: form,
            field: field,
            payload: {
                value: checked,
                pristine: false,
                error: '',
                valid: true
            }
        });
        expect(dispatch).toHaveBeenCalledWith({
            type: C.DUXFORM_SET_FORM_DATA,
            name: form,
            data: {
                pristine: false
            }
        });
        expect(formValidate).toHaveBeenCalledTimes(1);
        expect(formValidate).toHaveBeenCalledWith(form);
    });

    test('invalid date', () => {
        const value = 'Invalid Date';
        const form = 'myform';
        const field = 'myfield';
        const event = {
            target: {value: value}
        };
        const formValidate = jest.fn();
        const props = {
            dataType: 'date',
            formName: form,
            name: field,
            formValidate: formValidate
        };
        const dispatch = jest.fn();
        const map = mapDuxInputDispatch(dispatch);
        map.handleChange(event, props);
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenCalledWith({
            type: C.DUXFORM_SET_FIELD_DATA,
            form: form,
            field: field,
            payload: {
                value: value,
                pristine: false,
                error: 'Invalid date',
                valid: false
            }
        });
        expect(dispatch).toHaveBeenCalledWith({
            type: C.DUXFORM_SET_FORM_DATA,
            name: form,
            data: {
                pristine: false
            }
        });
        expect(formValidate).toHaveBeenCalledTimes(1);
        expect(formValidate).toHaveBeenCalledWith(form);
    });

    test('date, no validation', () => {
        const value = new Date();
        const form = 'myform';
        const field = 'myfield';
        const event = {
            target: {value: value}
        };
        const formValidate = jest.fn();
        const props = {
            dataType: 'date',
            formName: form,
            name: field,
            formValidate: formValidate
        };
        const dispatch = jest.fn();
        const map = mapDuxInputDispatch(dispatch);
        map.handleChange(event, props);
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenCalledWith({
            type: C.DUXFORM_SET_FIELD_DATA,
            form: form,
            field: field,
            payload: {
                value: value,
                pristine: false,
                error: '',
                valid: true
            }
        });
        expect(dispatch).toHaveBeenCalledWith({
            type: C.DUXFORM_SET_FORM_DATA,
            name: form,
            data: {
                pristine: false
            }
        });
        expect(formValidate).toHaveBeenCalledTimes(1);
        expect(formValidate).toHaveBeenCalledWith(form);
    });

    test('date, with validation succeed', () => {
        const value = new Date();
        const form = 'myform';
        const field = 'myfield';
        const event = {
            target: {value: value}
        };
        const formValidate = jest.fn();
        const validate = jest.fn();
        const props = {
            dataType: 'date',
            formName: form,
            name: field,
            formValidate: formValidate,
            onValidate: validate
        };
        const dispatch = jest.fn();
        const map = mapDuxInputDispatch(dispatch);
        map.handleChange(event, props);
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenCalledWith({
            type: C.DUXFORM_SET_FIELD_DATA,
            form: form,
            field: field,
            payload: {
                value: value,
                pristine: false,
                error: '',
                valid: true
            }
        });
        expect(dispatch).toHaveBeenCalledWith({
            type: C.DUXFORM_SET_FORM_DATA,
            name: form,
            data: {
                pristine: false
            }
        });
        expect(formValidate).toHaveBeenCalledTimes(1);
        expect(formValidate).toHaveBeenCalledWith(form);
        expect(validate).toHaveBeenCalledTimes(1);
        expect(validate).toHaveBeenCalledWith(value, form, field);
    });

    test('date, with validation fail', () => {
        const value = new Date();
        const form = 'myform';
        const field = 'myfield';
        const error = 'Error Message';
        const event = {
            target: {value: value}
        };
        const formValidate = jest.fn();
        const validate = jest.fn();
        validate.mockReturnValue(error);
        const props = {
            dataType: 'date',
            formName: form,
            name: field,
            formValidate: formValidate,
            onValidate: validate
        };
        const dispatch = jest.fn();
        const map = mapDuxInputDispatch(dispatch);
        map.handleChange(event, props);
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenCalledWith({
            type: C.DUXFORM_SET_FIELD_DATA,
            form: form,
            field: field,
            payload: {
                value: value,
                pristine: false,
                error: error,
                valid: false
            }
        });
        expect(dispatch).toHaveBeenCalledWith({
            type: C.DUXFORM_SET_FORM_DATA,
            name: form,
            data: {
                pristine: false
            }
        });
        expect(formValidate).toHaveBeenCalledTimes(1);
        expect(formValidate).toHaveBeenCalledWith(form);
        expect(validate).toHaveBeenCalledTimes(1);
        expect(validate).toHaveBeenCalledWith(value, form, field);
    });

    test('str, no validation', () => {
        const value = 'Value';
        const form = 'myform';
        const field = 'myfield';
        const event = {
            target: {value: value}
        };
        const formValidate = jest.fn();
        const props = {
            dataType: 'str',
            formName: form,
            name: field,
            formValidate: formValidate
        };
        const dispatch = jest.fn();
        const map = mapDuxInputDispatch(dispatch);
        map.handleChange(event, props);
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenCalledWith({
            type: C.DUXFORM_SET_FIELD_DATA,
            form: form,
            field: field,
            payload: {
                value: value,
                pristine: false,
                error: '',
                valid: true
            }
        });
        expect(dispatch).toHaveBeenCalledWith({
            type: C.DUXFORM_SET_FORM_DATA,
            name: form,
            data: {
                pristine: false
            }
        });
        expect(formValidate).toHaveBeenCalledTimes(1);
        expect(formValidate).toHaveBeenCalledWith(form);
    });

    test('str, with validation succeed', () => {
        const value = 'Value';
        const form = 'myform';
        const field = 'myfield';
        const event = {
            target: {value: value}
        };
        const formValidate = jest.fn();
        const validate = jest.fn();
        const props = {
            dataType: 'str',
            formName: form,
            name: field,
            formValidate: formValidate,
            onValidate: validate
        };
        const dispatch = jest.fn();
        const map = mapDuxInputDispatch(dispatch);
        map.handleChange(event, props);
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenCalledWith({
            type: C.DUXFORM_SET_FIELD_DATA,
            form: form,
            field: field,
            payload: {
                value: value,
                pristine: false,
                error: '',
                valid: true
            }
        });
        expect(dispatch).toHaveBeenCalledWith({
            type: C.DUXFORM_SET_FORM_DATA,
            name: form,
            data: {
                pristine: false
            }
        });
        expect(formValidate).toHaveBeenCalledTimes(1);
        expect(formValidate).toHaveBeenCalledWith(form);
        expect(validate).toHaveBeenCalledTimes(1);
        expect(validate).toHaveBeenCalledWith(value, form, field);
    });

    test('str, with validation fail', () => {
        const value = 'Value';
        const form = 'myform';
        const field = 'myfield';
        const error = 'Error Message';
        const event = {
            target: {value: value}
        };
        const formValidate = jest.fn();
        const validate = jest.fn();
        validate.mockReturnValue(error);
        const props = {
            dataType: 'str',
            formName: form,
            name: field,
            formValidate: formValidate,
            onValidate: validate
        };
        const dispatch = jest.fn();
        const map = mapDuxInputDispatch(dispatch);
        map.handleChange(event, props);
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenCalledWith({
            type: C.DUXFORM_SET_FIELD_DATA,
            form: form,
            field: field,
            payload: {
                value: value,
                pristine: false,
                error: error,
                valid: false
            }
        });
        expect(dispatch).toHaveBeenCalledWith({
            type: C.DUXFORM_SET_FORM_DATA,
            name: form,
            data: {
                pristine: false
            }
        });
        expect(formValidate).toHaveBeenCalledTimes(1);
        expect(formValidate).toHaveBeenCalledWith(form);
        expect(validate).toHaveBeenCalledTimes(1);
        expect(validate).toHaveBeenCalledWith(value, form, field);
    });
});
