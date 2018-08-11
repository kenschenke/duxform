import C from '../../../src/constants';
import { updateFormValidate } from '../../../src/actions-input';

describe('updateFormValidate tests', () => {
    test('form missing from state', () => {
        const form = 'myform';
        const state = {
            forms: {
                otherform: {}
            }
        };

        const dispatch = jest.fn();
        const getState = jest.fn();
        const validateCallback = jest.fn();

        getState.mockReturnValue(state);

        updateFormValidate(form, validateCallback)(dispatch, getState);
        expect(getState).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledTimes(0);
        expect(validateCallback).toHaveBeenCalledTimes(0);
    });

    test('fields object missing from form state', () => {
        const form = 'myform';
        const state = {
            forms: {
                otherform: {},
                myform: {}
            }
        };

        const dispatch = jest.fn();
        const getState = jest.fn();
        const validateCallback = jest.fn();

        getState.mockReturnValue(state);

        updateFormValidate(form, validateCallback)(dispatch, getState);
        expect(getState).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledTimes(0);
        expect(validateCallback).toHaveBeenCalledTimes(0);
    });

    test('some fields are invalid', () => {
        const form = 'myform';
        const state = {
            forms: {
                otherform: {},
                myform: {
                    fields: {
                        field1: {valid: false},
                        field2: {valid: true}
                    }
                }
            }
        };

        const dispatch = jest.fn();
        const getState = jest.fn();
        const validateCallback = jest.fn();

        getState.mockReturnValue(state);

        updateFormValidate(form, validateCallback)(dispatch, getState);
        expect(getState).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith({
            type: C.DUXFORM_SET_FORM_DATA,
            name: form,
            data: {
                valid: false,
                error: ''
            }
        });
        expect(validateCallback).toHaveBeenCalledTimes(0);
    });

    test('validate callback with error message', () => {
        const form = 'myform';
        const error = 'Error Message';
        const state = {
            forms: {
                otherform: {},
                myform: {
                    fields: {
                        field1: {value: 'field1', valid: true},
                        field2: {value: 'field2', valid: true}
                    }
                }
            }
        };

        const dispatch = jest.fn();
        const getState = jest.fn();
        const validateCallback = jest.fn();

        getState.mockReturnValue(state);
        validateCallback.mockReturnValue(error);

        updateFormValidate(form, validateCallback)(dispatch, getState);
        expect(getState).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith({
            type: C.DUXFORM_SET_FORM_DATA,
            name: form,
            data: {
                valid: false,
                error: error
            }
        });
        expect(validateCallback).toHaveBeenCalledTimes(1);
        expect(validateCallback).toHaveBeenCalledWith({field1:'field1', field2:'field2'}, form);
    });

    test('validate callback with no error', () => {
        const form = 'myform';
        const state = {
            forms: {
                otherform: {},
                myform: {
                    fields: {
                        field1: {value: 'field1', valid: true},
                        field2: {value: 'field2', valid: true}
                    }
                }
            }
        };

        const dispatch = jest.fn();
        const getState = jest.fn();
        const validateCallback = jest.fn();

        getState.mockReturnValue(state);

        updateFormValidate(form, validateCallback)(dispatch, getState);
        expect(getState).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith({
            type: C.DUXFORM_SET_FORM_DATA,
            name: form,
            data: {
                valid: true,
                error: ''
            }
        });
        expect(validateCallback).toHaveBeenCalledTimes(1);
        expect(validateCallback).toHaveBeenCalledWith({field1:'field1', field2:'field2'}, form);
    });
});
