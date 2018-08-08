import { isFieldValidOrPristine } from '../../src/helpers';

describe('isFieldValidOrPristine tests', () => {
    test('form missing', () => {
        const form = 'myform';
        const field = 'myfield';
        const state = {
            forms: {
                otherform: {}
            }
        };

        const actual = isFieldValidOrPristine(state, form, field);
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

        const actual = isFieldValidOrPristine(state, form, field);
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

        const actual = isFieldValidOrPristine(state, form, field);
        expect(actual).toEqual(false);
    });

    test('valid and pristine missing', () => {
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

        const actual = isFieldValidOrPristine(state, form, field);
        expect(actual).toEqual(false);
    });

    test('pristine is true', () => {
        const form = 'myform';
        const field = 'myfield';
        const state = {
            forms: {
                otherform: {},
                myform: {
                    fields: {
                        myfield: {pristine: true, valid: false}
                    }
                }
            }
        };

        const actual = isFieldValidOrPristine(state, form, field);
        expect(actual).toEqual(true);
    });

    test('pristine and valid are false', () => {
        const form = 'myform';
        const field = 'myfield';
        const state = {
            forms: {
                otherform: {},
                myform: {
                    fields: {
                        myfield: {pristine: false, valid: false}
                    }
                }
            }
        };

        const actual = isFieldValidOrPristine(state, form, field);
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
                        myfield: {pristine: false, valid: true}
                    }
                }
            }
        };

        const actual = isFieldValidOrPristine(state, form, field);
        expect(actual).toEqual(true);
    });
});
