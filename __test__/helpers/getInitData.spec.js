import { getInitData } from '../../src/helpers';

describe('getInitData tests', () => {
    test('string field, no default value', () => {
        const props = {
            dataType: 'str'
        };

        const expected = {
            pristine: true,
            value: '',
            error: '',
            valid: true,
            hasFocus: false
        };
        const actual = getInitData(props);
        expect(actual).toEqual(expected);
    });

    test('num field, no default value', () => {
        const props = {
            dataType: 'num'
        };

        const expected = {
            pristine: true,
            value: 0,
            error: '',
            valid: true,
            hasFocus: false
        };
        const actual = getInitData(props);
        expect(actual).toEqual(expected);
    });

    test('date field, no default value', () => {
        const props = {
            dataType: 'date'
        };

        const now = new Date();
        const expected = {
            pristine: true,
            value: now,
            error: '',
            valid: true,
            hasFocus: false
        };
        const actual = getInitData(props);
        expect(actual).toEqual(expected);
    });

    test('string field with default value', () => {
        const value = 'Value';
        const props = {
            dataType: 'str',
            defaultValue: value
        };

        const expected = {
            pristine: true,
            value: value,
            error: '',
            valid: true,
            hasFocus: false
        };
        const actual = getInitData(props);
        expect(actual).toEqual(expected);
    });

    test('num field with default value', () => {
        const value = 1.234;
        const props = {
            dataType: 'num',
            defaultValue: value
        };

        const expected = {
            pristine: true,
            value: value,
            error: '',
            valid: true,
            hasFocus: false
        };
        const actual = getInitData(props);
        expect(actual).toEqual(expected);
    });

    test('date field with default value', () => {
        const value = new Date();
        value.setTime(value.getTime() - 24 * 60 * 60 * 7 * 1000);  // one week ago
        value.setMilliseconds(0);
        const props = {
            dataType: 'date',
            defaultValue: value
        };

        const expected = {
            pristine: true,
            value: value,
            error: '',
            valid: true,
            hasFocus: false
        };
        const actual = getInitData(props);
        expect(actual).toEqual(expected);
    });

    test('default value with normalize callback', () => {
        const defaultValue = 'Default Value';
        const normalizedValue = 'Normalized Value';
        const name = 'myfield';
        const normalize = jest.fn();
        const props = {
            dataType: 'str',
            defaultValue: defaultValue,
            normalize: normalize,
            name: name
        };

        normalize.mockReturnValue(normalizedValue);

        const expected = {
            pristine: true,
            value: normalizedValue,
            error: '',
            valid: true,
            hasFocus: false
        };
        const actual = getInitData(props);
        expect(actual).toEqual(expected);
        expect(normalize).toHaveBeenCalledTimes(1);
        expect(normalize).toHaveBeenCalledWith(defaultValue, name);
    });

    test('default value with validation pass', () => {
        const form = 'myform';
        const name = 'myfield';
        const defaultValue = 'Default Value';
        const validate = jest.fn();
        const props = {
            dataType: 'str',
            defaultValue: defaultValue,
            name: name,
            formName: form,
            onValidate: validate
        };

        const expected = {
            pristine: true,
            value: defaultValue,
            error: '',
            valid: true,
            hasFocus: false
        };
        const actual = getInitData(props);
        expect(actual).toEqual(expected);
        expect(validate).toHaveBeenCalledTimes(1);
        expect(validate).toHaveBeenCalledWith(defaultValue, name, form);
    });

    test('default value with validation failure', () => {
        const form = 'myform';
        const name = 'myfield';
        const defaultValue = 'Default Value';
        const error = 'Error Message';
        const validate = jest.fn();
        const props = {
            dataType: 'str',
            defaultValue: defaultValue,
            name: name,
            formName: form,
            onValidate: validate
        };

        validate.mockReturnValue(error);

        const expected = {
            pristine: true,
            value: defaultValue,
            error: error,
            valid: false,
            hasFocus: false
        };
        const actual = getInitData(props);
        expect(actual).toEqual(expected);
        expect(validate).toHaveBeenCalledTimes(1);
        expect(validate).toHaveBeenCalledWith(defaultValue, name, form);
    });
});
