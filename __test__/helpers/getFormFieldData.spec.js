import { getFormFieldData } from '../../src/helpers';

describe('getFormFieldValue tests', () => {
    test('form not found', () => {
        const form = 'myform';
        const field = 'myfield';
        const prop = 'myprop';
        const defaultValue = 'Default Value';
        const state = {
            forms: {
                otherform: {}
            }
        };

        const actualError = getFormFieldData(state, form, field, prop, defaultValue);
        expect(actualError).toEqual(defaultValue);
    });

    test('form missing fields object', () => {
        const form = 'myform';
        const field = 'myfield';
        const prop = 'myprop';
        const defaultValue = 'Default Value';
        const state = {
            forms: {
                otherform: {},
                myform: {}
            }
        };

        const actualError = getFormFieldData(state, form, field, prop, defaultValue);
        expect(actualError).toEqual(defaultValue);
    });

    test('field missing', () => {
        const form = 'myform';
        const field = 'myfield';
        const prop = 'myprop';
        const defaultValue = 'Default Value';
        const state = {
            forms: {
                otherform: {},
                myform: {
                    fields: {}
                }
            }
        };

        const actualError = getFormFieldData(state, form, field, prop, defaultValue);
        expect(actualError).toEqual(defaultValue);
    });

    test('prop missing', () => {
        const form = 'myform';
        const field = 'myfield';
        const prop = 'myprop';
        const defaultValue = 'Default Value';
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

        const actualError = getFormFieldData(state, form, field, prop, defaultValue);
        expect(actualError).toEqual(defaultValue);
    });

    test('prop found', () => {
        const form = 'myform';
        const field = 'myfield';
        const prop = 'myprop';
        const value = 'My Value';
        const defaultValue = 'Default Value';
        const state = {
            forms: {
                otherform: {},
                myform: {
                    fields: {
                        myfield: {myprop: value}
                    }
                }
            }
        };

        const actualError = getFormFieldData(state, form, field, prop, defaultValue);
        expect(actualError).toEqual(value);
    });
});
