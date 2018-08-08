import C from '../../src/constants';
import { mapDuxInputDispatch } from '../../src/maps/DuxInput.map';

describe('mapDuxInputDispatch handleFocus tests', () => {
    test('without custom onFocus callback', () => {
        const form = 'myform';
        const field = 'myfield';
        const value = 1.2;
        const props = {
            formName: form,
            name: field,
            value: value,
            dataType: 'num',
            precision: 2
        };

        const dispatch = jest.fn();
        const map = mapDuxInputDispatch(dispatch);
        map.handleFocus(props);
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith({
            type: C.DUXFORM_SET_FIELD_DATA,
            form: form,
            field: field,
            payload: {
                hasFocus: true,
                value: "1.20"
            }
        });
    });

    test('with custom onFocus callback', () => {
        const form = 'myform';
        const field = 'myfield';
        const value = 1.2;
        const onFocus = jest.fn();
        const props = {
            formName: form,
            name: field,
            value: value,
            dataType: 'num',
            precision: 2,
            onFocus: onFocus
        };

        const dispatch = jest.fn();
        const map = mapDuxInputDispatch(dispatch);
        map.handleFocus(props);
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith({
            type: C.DUXFORM_SET_FIELD_DATA,
            form: form,
            field: field,
            payload: {
                hasFocus: true,
                value: "1.20"
            }
        });
        expect(onFocus).toHaveBeenCalledTimes(1);
        expect(onFocus).toHaveBeenCalledWith(field);
    });
});
