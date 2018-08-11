import { mapDuxInputDispatch } from '../../src/maps/DuxInput.map';

describe('mapDuxInputDispatch handleKeyDown tests', () => {
    test('not Enter', () => {
        const preventDefault = jest.fn();
        const event = {
            key: 'a',
            preventDefault: preventDefault
        };
        const map = mapDuxInputDispatch();
        map.handleKeyDown(event, {});
        expect(preventDefault).toHaveBeenCalledTimes(0);
    });

    test('Enter, no onEnterPressed callback', () => {
        const form = 'myform';
        const field = 'myfield';
        const value = 'Value';
        const preventDefault = jest.fn();
        const onEnterPressed = jest.fn();
        const event = {
            key: 'Enter',
            preventDefault: preventDefault,
            target: {value: value}
        };
        const props = {
            formName: form,
            name: field,
            onEnterPressed: onEnterPressed
        };
        const map = mapDuxInputDispatch();
        map.handleKeyDown(event, props);
        expect(preventDefault).toHaveBeenCalledTimes(1);
        expect(onEnterPressed).toHaveBeenCalledTimes(1);
        expect(onEnterPressed).toHaveBeenCalledWith(value, field, form);
    });
});
