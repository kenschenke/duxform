import { parseValue } from '../../src/helpers';

describe('parseValue tests', () => {
    test('num data type', () => {
        const value = 1.234;
        const props = {
            dataType: 'num'
        };

        const actual = parseValue(value, props);
        expect(actual).toEqual(value);
    });

    test('date data type with valid  date', () => {
        const value = new Date();
        value.setTime(value.getTime() - 24 * 60 * 60 * 7 * 1000);
        value.setMilliseconds(0);
        const props = {
            dataType: 'date'
        };

        const actual = parseValue(value, props);
        expect(actual).toEqual(value);
    });

    test('date data type with invalid date', () => {
        const value = 'Invalid Date';
        const props = {
            dataType: 'date'
        };

        const actual = parseValue(value, props);
        expect(actual).toEqual(value);
    });

    test('str data type', () => {
        const value = 'Value';
        const props = {
            dataType: 'str'
        };

        const actual = parseValue(value, props);
        expect(actual).toEqual(value);
    });

    test('parse callback', () => {
        const inputValue = 'Input Value';
        const outputValue = 'Output Value';
        const name = 'myfield';
        const parseCallback = jest.fn();
        const props = {
            dataType: 'str',
            parse: parseCallback,
            name: name
        };

        parseCallback.mockReturnValue(outputValue);

        const actual = parseValue(inputValue, props);
        expect(actual).toEqual(outputValue);
        expect(parseCallback).toHaveBeenCalledTimes(1);
        expect(parseCallback).toHaveBeenCalledWith(inputValue, name);
    });
});
