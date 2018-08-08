import C from '../../../src/constants';
import { autocompleteDownArrowPressed } from '../../../src/actions-autocomplete';

describe('autocompleteDownArrowPressed', () => {
    test('highlighted value not found in list', () => {
        const form = C.DUXAUTOCOMPLETE_UNITTEST_FORM;
        const field = C.DUXAUTOCOMPLETE_UNITTEST_FIELD;
        const value = 'Value';
        const lastValue = 'Last Value';
        const dispatch = jest.fn();
        const getState = jest.fn();

        const state = {
            forms: {
                DUXAUTOCOMPLETE_UNITTEST_FORM: {
                    fields: {
                        DUXAUTOCOMPLETE_UNITTEST_FIELD: {
                            highlightedValue: value,
                            items: [
                                {value: 'Other Value'},
                                {value: lastValue},
                            ]
                        }
                    }
                }
            }
        };
        getState.mockReturnValue(state);
        autocompleteDownArrowPressed(form, field)(dispatch, getState);
        expect(getState).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith({
            type: C.DUXFORM_SET_FIELD_DATA,
            form: form,
            field: field,
            payload: {highlightedValue: lastValue}
        });
    });

    test('highlighted value is last item in list', () => {
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
                                {value: 'Other Value'},
                                {value: value},
                            ]
                        }
                    }
                }
            }
        };
        getState.mockReturnValue(state);
        autocompleteDownArrowPressed(form, field)(dispatch, getState);
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
                                {value: oldValue},
                                {value: newValue}
                            ]
                        }
                    }
                }
            }
        };
        getState.mockReturnValue(state);
        autocompleteDownArrowPressed(form, field)(dispatch, getState);
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
