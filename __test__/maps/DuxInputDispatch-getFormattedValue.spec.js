import { mapDuxInputDispatch } from '../../src/maps/DuxInput.map';

describe('mapDuxInputDispatch getFormattedValue tests', () => {
    test('standard format', () => {
        const props = {
            dataType: 'num',
            precision: 2,
            showCommas: true,
            value: 1234.5
        };

        const map = mapDuxInputDispatch();
        const expected = "1,234.50";
        const actual = map.getFormattedValue(props);
        expect(actual).toEqual(expected);
    });

    test('custom format callback', () => {
        const inputValue = 'Input Value';
        const outputValue = 'Output Value';
        const format = jest.fn();
        const name = 'myfield';
        const props = {
            dataType: 'str',
            value: inputValue,
            format: format,
            name: name
        };

        format.mockReturnValue(outputValue);

        const map = mapDuxInputDispatch();
        const actual = map.getFormattedValue(props);
        expect(actual).toEqual(outputValue);
        expect(format).toHaveBeenCalledTimes(1);
        expect(format).toHaveBeenCalledWith(inputValue, name);
    });
});