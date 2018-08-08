import C from '../../src/constants';
import { mapDuxInputDispatch } from '../../src/maps/DuxInput.map';

describe('mapDuxInputDispatch initValue tests', () => {
    test('initValue', () => {
        const form = 'myform';
        const field = 'myfield';
        const value = 'Value';
        const props = {
            formName: form,
            name: field
        };

        const dispatch = jest.fn();
        const map = mapDuxInputDispatch(dispatch);
        map.initValue(value, props);
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith({
            type: C.DUXFORM_SET_FIELD_DATA,
            form: form,
            field: field,
            payload: {
                value: value
            }
        });
    });
});