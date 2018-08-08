import { normalize } from '../../src/helpers';

describe('normalize tests', () => {
    test('num field with empty string', () => {
        const value = '';
        const props = {
            dataType: 'num'
        };

        const actual = normalize(value, props);
        expect(actual).toEqual(0);
    });

    test('num field with numeric value', () => {
        const value = 1.234;
        const props = {
            dataType: 'num'
        };

        const actual = normalize(value, props);
        expect(actual).toEqual(value);
    });

    test('date field with date value', () => {
        const value = new Date();
        const props = {
            dataType: 'date'
        };

        const actual = normalize(value, props);
        expect(actual).toEqual(value);
    });

    test('str field with no forceUpper', () => {
        const value = 'Input Value';
        const props = {
            dataType: 'str'
        };

        const actual = normalize(value, props);
        expect(actual).toEqual(value);
    });

    test('str field with forceUpper', () => {
        const value = 'Input Value';
        const props = {
            dataType: 'str',
            forceUpper: true
        };

        const actual = normalize(value, props);
        expect(actual).toEqual(value.toUpperCase());
    });

    test('str field with normalize callback', () => {
        const inputValue = 'Input Value';
        const normalizedValue = 'Normalized Value';
        const name = 'myname';
        const normalizeFn = jest.fn();
        const props = {
            dataType: 'str',
            normalize: normalizeFn,
            name: name
        };

        normalizeFn.mockReturnValue(normalizedValue);

        const actual = normalize(inputValue, props);
        expect(actual).toEqual(normalizedValue);
        expect(normalizeFn).toHaveBeenCalledTimes(1);
        expect(normalizeFn).toHaveBeenCalledWith(inputValue, name);
    });
});
