import C from '../../../src/constants';
import { autocompleteUpArrowPressed } from '../../../src/actions-autocomplete';

describe('autocompleteUpArrowPressed', () => {
    test('highlighted value not found in list', () => {
        const form = C.DUXAUTOCOMPLETE_UNITTEST_FORM;
        const field = C.DUXAUTOCOMPLETE_UNITTEST_FIELD;
        const value = 'Value';
        const firstValue = 'First Value';
        const dispatch = jest.fn();
        const getState = jest.fn();

        const state = {
            forms: {
                DUXAUTOCOMPLETE_UNITTEST_FORM: {
                    fields: {
                        DUXAUTOCOMPLETE_UNITTEST_FIELD: {
                            highlightedValue: value,
                            items: [
                                {value: firstValue},
                                {value: 'Other Value'},
                            ]
                        }
                    }
                }
            }
        };
        getState.mockReturnValue(state);
        autocompleteUpArrowPressed(form, field)(dispatch, getState);
        expect(getState).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith({
            type: C.DUXFORM_SET_FIELD_DATA,
            form: form,
            field: field,
            payload: {highlightedValue: firstValue}
        });
    });

    test('highlighted value is first item in list', () => {
        const form = C.DUXAUTOCOMPLETE_UNITTEST_FORM;
        const field = C.DUXAUTOCOMPLETE_UNITTEST_FIELD;
        const value = 'Value';
        const dispatch = jest.fn();
        const getState = jest.fn();

        const state = {
            forms: {
                DUXAUTOCOMPLETE_UNITTEST_FORM: {
                    fields: {
                        DUXAUTOCOMPLETE_UNITTEST_FIELD: {
                            highlightedValue: value,
                            items: [
                                {value: value},
                                {value: 'Other Value'},
                            ]
                        }
                    }
                }
            }
        };
        getState.mockReturnValue(state);
        autocompleteUpArrowPressed(form, field)(dispatch, getState);
        expect(getState).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith({
            type: C.DUXFORM_SET_FIELD_DATA,
            form: form,
            field: field,
            payload: {highlightedValue: value}
        });
    });

    test('highlighted value found in items', () => {
        const form = C.DUXAUTOCOMPLETE_UNITTEST_FORM;
        const field = C.DUXAUTOCOMPLETE_UNITTEST_FIELD;
        const oldValue = 'OldValue';
        const newValue = 'NewValue';
        const dispatch = jest.fn();
        const getState = jest.fn();

        const state = {
            forms: {
                DUXAUTOCOMPLETE_UNITTEST_FORM: {
                    fields: {
                        DUXAUTOCOMPLETE_UNITTEST_FIELD: {
                            highlightedValue: oldValue,
                            items: [
                                {value: 'Other Value'},
                                {value: newValue},
                                {value: oldValue},
                            ]
                        }
                    }
                }
            }
        };
        getState.mockReturnValue(state);
        autocompleteUpArrowPressed(form, field)(dispatch, getState);
        expect(getState).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith({
            type: C.DUXFORM_SET_FIELD_DATA,
            form: form,
            field: field,
            payload: {highlightedValue: newValue}
        });
    });
});
