import C from '../../src/constants';
import { mapDuxInputDispatch } from '../../src/maps/DuxInput.map';

describe('mapDuxInputDispatch handleBlur tests', () => {
    test('str dataType with no trimming', () => {
        const value = ' Value ';
        const form = 'myform';
        const field = 'myfield';
        const props = {
            dataType: 'str',
            value: value,
            trim: false,
            formName: form,
            name: field
        };
        const dispatch = jest.fn();
        const map = mapDuxInputDispatch(dispatch);
        map.handleBlur(null, props);
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith({
            type: C.DUXFORM_SET_FIELD_DATA,
            form: form,
            field: field,
            payload: {
                hasFocus: false,
                value: value
            }
        });
    });

    test('str dataType with trimming', () => {
        const inputValue = ' Value ';
        const outputValue = 'Value';
        const form = 'myform';
        const field = 'myfield';
        const props = {
            dataType: 'str',
            value: inputValue,
            trim: true,
            formName: form,
            name: field
        };
        const dispatch = jest.fn();
        const map = mapDuxInputDispatch(dispatch);
        map.handleBlur(null, props);
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith({
            type: C.DUXFORM_SET_FIELD_DATA,
            form: form,
            field: field,
            payload: {
                hasFocus: false,
                value: outputValue
            }
        });
    });

    test('num dataType with no rounding', () => {
        const value = 1.57;
        const form = 'myform';
        const field = 'myfield';
        const props = {
            dataType: 'num',
            value: value,
            precision: 1,
            round: false,
            formName: form,
            name: field
        };
        const dispatch = jest.fn();
        const map = mapDuxInputDispatch(dispatch);
        map.handleBlur(null, props);
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith({
            type: C.DUXFORM_SET_FIELD_DATA,
            form: form,
            field: field,
            payload: {
                hasFocus: false,
                value: value
            }
        });
    });

    test('num dataType with rounding', () => {
        const inputValue = 1.57;
        const outputValue = 1.6;
        const form = 'myform';
        const field = 'myfield';
        const props = {
            dataType: 'num',
            value: inputValue,
            precision: 1,
            round: true,
            formName: form,
            name: field
        };
        const dispatch = jest.fn();
        const map = mapDuxInputDispatch(dispatch);
        map.handleBlur(null, props);
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith({
            type: C.DUXFORM_SET_FIELD_DATA,
            form: form,
            field: field,
            payload: {
                hasFocus: false,
                value: outputValue
            }
        });
    });

    test('onBlur custom callback', () => {
        const value = 'Value';
        const form = 'myform';
        const field = 'myfield';
        const onBlur = jest.fn();
        const props = {
            dataType: 'str',
            value: value,
            trim: true,
            formName: form,
            name: field,
            onBlur: onBlur
        };
        const dispatch = jest.fn();
        const map = mapDuxInputDispatch(dispatch);
        map.handleBlur(null, props);
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith({
            type: C.DUXFORM_SET_FIELD_DATA,
            form: form,
            field: field,
            payload: {
                hasFocus: false,
                value: value
            }
        });
        expect(onBlur).toHaveBeenCalledTimes(1);
        expect(onBlur).toHaveBeenCalledWith(field);
    });
});
