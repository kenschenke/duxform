import { isFieldValid } from '../../src/helpers';

describe('isFieldValid tests', () => {
    test('form missing', () => {
        const form = 'myform';
        const field = 'myfield';
        const state = {
            forms: {
                otherform: {}
            }
        };

        const actual = isFieldValid(state, form, field);
        expect(actual).toEqual(false);
    });

    test('form missing fields object', () => {
        const form = 'myform';
        const field = 'myfield';
        const state = {
            forms: {
                otherform: {},
                myform: {}
            }
        };

        const actual = isFieldValid(state, form, field);
        expect(actual).toEqual(false);
    });

    test('field missing', () => {
        const form = 'myform';
        const field = 'myfield';
        const state = {
            forms: {
                otherform: {},
                myform: {
                    fields: {}
                }
            }
        };

        const actual = isFieldValid(state, form, field);
        expect(actual).toEqual(false);
    });

    test('valid missing', () => {
        const form = 'myform';
        const field = 'myfield';
        const state = {
            forms: {
                otherform: {},
                myform: {
                    fields: {
                        myfield: {}
                    }
                }
            }
        };

        const actual = isFieldValid(state, form, field);
        expect(actual).toEqual(false);
    });

    test('valid is false', () => {
        const form = 'myform';
        const field = 'myfield';
        const state = {
            forms: {
                otherform: {},
                myform: {
                    fields: {
                        myfield: {valid: false}
                    }
                }
            }
        };

        const actual = isFieldValid(state, form, field);
        expect(actual).toEqual(false);
    });

    test('valid is true', () => {
        const form = 'myform';
        const field = 'myfield';
        const state = {
            forms: {
                otherform: {},
                myform: {
                    fields: {
                        myfield: {valid: true}
                    }
                }
            }
        };

        const actual = isFieldValid(state, form, field);
        expect(actual).toEqual(true);
    });
});
