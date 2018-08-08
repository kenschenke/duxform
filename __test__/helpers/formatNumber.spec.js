import { formatNumber } from '../../src/helpers';

describe('formatNumber tests', () => {
    test('value is a number', () => {
        const value = 1.2;
        const props = {
            precision: 2,
            showDollar: false,
            showCommas: false
        };

        const actual = formatNumber(value, props);
        expect(actual).toEqual('1.20');
    });

    test('value is a string', () => {
        const value = "1.2";
        const props = {
            precision: 2,
            showDollar: false,
            showCommas: false
        };

        const actual = formatNumber(value, props);
        expect(actual).toEqual('1.20');
    });

    test('value has non-digits', () => {
        const value = "$1,234.5";
        const props = {
            precision: 2,
            showDollar: false,
            showCommas: false
        };

        const actual = formatNumber(value, props);
        expect(actual).toEqual('1234.50');
    });

    test('rounding to 2 decimal places', () => {
        const value = "123.578";
        const props = {
            precision: 2,
            showDollar: false,
            showCommas: false
        };

        const actual = formatNumber(value, props);
        expect(actual).toEqual('123.58');
    });

    test('rounding to 0 decimal places', () => {
        const value = "123.578";
        const props = {
            precision: 0,
            showDollar: false,
            showCommas: false
        };

        const actual = formatNumber(value, props);
        expect(actual).toEqual('124');
    });

    test('show commas', () => {
        const value = "1234567.8";
        const props = {
            precision: 2,
            showDollar: false,
            showCommas: true
        };

        const actual = formatNumber(value, props);
        expect(actual).toEqual('1,234,567.80');
    });

    test('show dollar sign', () => {
        const value = "1234567.8";
        const props = {
            precision: 2,
            showDollar: true,
            showCommas: true
        };

        const actual = formatNumber(value, props);
        expect(actual).toEqual('$1,234,567.80');
    });

    test('negative value', () => {
        const value = "-1234567.8";
        const props = {
            precision: 2,
            showDollar: true,
            showCommas: true
        };

        const actual = formatNumber(value, props);
        expect(actual).toEqual('$-1,234,567.80');
    });
});
