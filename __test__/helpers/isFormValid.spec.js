import { isFormValid } from '../../src/helpers';

describe('isFormValid tests', () => {
    test('form missing', () => {
        const form = 'myform';
        const state = {
            forms: {
                otherform: {}
            }
        };

        const actual = isFormValid(state, form);
        expect(actual).toEqual(false);
    });

    test('valid missing', () => {
        const form = 'myform';
        const state = {
            forms: {
                otherform: {},
                myform: {}
            }
        };

        const actual = isFormValid(state, form);
        expect(actual).toEqual(false);
    });

    test('valid is false', () => {
        const form = 'myform';
        const state = {
            forms: {
                otherform: {},
                myform: {valid: false}
            }
        };

        const actual = isFormValid(state, form);
        expect(actual).toEqual(false);
    });

    test('valid is true', () => {
        const form = 'myform';
        const state = {
            forms: {
                otherform: {},
                myform: {valid: true}
            }
        };

        const actual = isFormValid(state, form);
        expect(actual).toEqual(true);
    });
});
