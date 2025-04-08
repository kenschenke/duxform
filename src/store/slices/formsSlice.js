import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import { getElementPosition, getFormFieldDataReducer } from '../../helpers.js';

const autocompleteGetSelectedItem = (state, formName, name, value) => {
    const items = getFormFieldDataReducer(state, formName, name, 'items', []);
    const matches = items.filter(item => item.value === value);
    return matches.length === 1 ? matches[0] : undefined;
};

const autocompleteEnsureItemIsVisible = (formName, name, value) => {
    const div = document.getElementById(`duxac-${formName}-${name}`);
    const item = document.getElementById(`duxacitem-${formName}-${name}-${value}`);
    if (div === null || item === null) {
        return;
    }
    const divInnerHeight = div.clientHeight;
    const itemHeight = item.offsetHeight;
    const itemAbsoluteTop = getElementPosition(item).top;
    const itemRelativeTop = item.offsetTop;
    const viewableItems = Math.floor(divInnerHeight / itemHeight);
    if (itemAbsoluteTop + itemHeight > divInnerHeight) {
        // Item is below the visible area.  Scroll so it's the last visible item in the list.
        div.scrollTop = itemRelativeTop - (viewableItems-1) * itemHeight;
    }
    if (itemAbsoluteTop < 0) {
        // Item is above the visible area.  Scroll so it's the first visible item in the list.
        div.scrollTop = itemRelativeTop;
    }
};

const setDataHelper = (state, formName, field, data) => {
    if (state[formName] === undefined) {
        state[formName] = {};
    }
    if (state[formName].fields === undefined) {
        state[formName].fields = {};
    }
    if (state[formName].fields[field] === undefined) {
        state[formName].fields[field] = {};
    }
    state[formName].fields[field] =
        _.assign(state[formName].fields[field], data);
};

const formsSlice = createSlice({
    name: 'forms',
    initialState: {},
    reducers: {
        autocompleteAddNewItem: (state, action) => {
            // Assumptions:
            //   action.payload.form === form name
            //   action.payload.field === field name
            //   action.payload.value === value to add
            const selectedItems = getFormFieldDataReducer(state, action.payload.form, action.payload.field, 'selectedItems', []);
            const valueU = action.payload.value.toUpperCase();

            // Check the currently selected items to see if this new item is already in there.
            const matches = selectedItems.filter(item => valueU === item.label.toUpperCase());

            if (!matches.length) {
                // It wasn't, so add it.
                state[action.payload.form].fields[action.payload.field].selectedItems = [
                    ...selectedItems, {
                        value: action.payload.value,
                        label: action.payload.value,
                    }
                ];
                state[action.payload.form].fields[action.payload.field].inputValue = '';
                state[action.payload.form].fields[action.payload.field].valid = true;
            }
        },

        autocompleteAddSelectedItem: (state, action) => {
            // Assumptions:
            //   action.payload.form === form name
            //   action.payload.field === field name
            //   action.payload.value === value to add
            //   action.payload.allowMulti === true if multiple selections allowed
            const selectedItems = getFormFieldDataReducer(state, action.payload.form, action.payload.field, 'selectedItems', []);
            const value = getFormFieldDataReducer(state, action.payload.form, action.payload.field, 'highlightedValue', '');
            const item = autocompleteGetSelectedItem(state, action.payload.form, action.payload.field, action.payload.value);
            if (item) {
                if (action.payload.allowMulti) {
                    // Multi selections are allowed so add the item to the list of currently selected items
                    setDataHelper(state, action.payload.form, action.payload.field, {
                        selectedItems: [...selectedItems, item],
                        inputValue: '',
                        valid: true,
                    })
                } else {
                    console.log(`value: ${value}`);
                    setDataHelper(state, action.payload.form, action.payload.field, {
                        value,
                        inputValue: item.label,
                        valid: true,
                    })
                }
            }
        },

        autocompleteDownArrowPressed: (state, action) => {
            // Assumptions:
            //   action.payload.form === form name
            //   action.payload.field === field name
            const highlighted = getFormFieldDataReducer(state, action.payload.form, action.payload.field, 'highlightedValue', '');
            // console.log(highlighted);
            const items = getFormFieldDataReducer(state, action.payload.form, action.payload.field, 'items', []);
            // console.log(JSON.stringify(items, null, 2));
            let newHighlighted = items.length ? items[items.length - 1].value : null;
            for (let i = 0; i < items.length; i++) {
                if (items[i].value === highlighted && i + 1 < items.length) {
                    newHighlighted = items[i + 1].value;
                    break;
                }
            }
            // console.log(newHighlighted);
            state[action.payload.form].fields[action.payload.field].highlightedValue = newHighlighted;
            autocompleteEnsureItemIsVisible(action.payload.form, action.payload.field, newHighlighted);
        },

        autocompleteDropdownMatches: (state, action) => {
            // Assumptions:
            //   action.payload.form === form name
            //   action.payload.field === field name
            //   action.payload.matches === list of matches
            let highlightedValue = getFormFieldDataReducer(state, action.payload.form, action.payload.field, 'highlightedValue', '');
            const highlightedItems = action.payload.matches.filter(item => highlightedValue === item.value);
            if (!highlightedItems.length) {
                highlightedValue = action.payload.matches.length ? action.payload.matches[0].value : '';
            }
            state[action.payload.form].fields[action.payload.field].items = action.payload.matches;
            state[action.payload.form].fields[action.payload.field].highlightedValue = action.payload.matches.length ? highlightedValue : '';
        },

        autocompleteRemoveSelectedItem: (state, action) => {
            // Assumptions:
            //   action.payload.form === form name
            //   action.payload.field === field name
            //   action.payload.value === value to remove
            const selectedItems = getFormFieldDataReducer(state, action.payload.form, action.payload.field, 'selectedItems', []);
            state[action.payload.form].fields[action.payload.field].selectedItems =
                selectedItems.filter(item => item.value !== action.payload.value);
            state[action.payload.form].fields[action.payload.field].pristine = false;
            state[action.payload.form].pristine = false;
        },

        autocompleteUpArrowPressed: (state, action) => {
            // Assumptions:
            //   action.payload.form === form name
            //   action.payload.field === field name
            const highlighted = getFormFieldDataReducer(state, action.payload.form, action.payload.field, 'highlightedValue', '');
            const items = getFormFieldDataReducer(state, action.payload.form, action.payload.field, 'items', []);
            let newHighlighted = items.length ? items[0].value : null;
            for (let i = 1; i < items.length; i++) {
                if (items[i].value === highlighted) {
                    newHighlighted = items[i - 1].value;
                    break;
                }
            }
            state[action.payload.form].fields[action.payload.field].highlightedValue = newHighlighted;
            autocompleteEnsureItemIsVisible(action.payload.form, action.payload.field, newHighlighted);
        },

        clearAutocompleteSelection: (state, action) => {
            // Assumptions:
            //   action.payload.form === form name
            //   action.payload.field === field name
            setDataHelper(state, action.payload.form, action.payload.field, {
                value: undefined,
                selectedItems: [],
                inputValue: '',
                valid: false,
                pristine: false,
                error: '',
            });
            state[action.payload.form].pristine = false;
        },

        setAutocompleteMultiSelectValues: (state, action) => {
            // Assumptions:
            //   action.payload.form === form name
            //   action.payload.field === field name
            //   action.payload.values === new field values
            //   action.payload.items === autocomplete items
            //   action.payload.valid === true or false
            let selectedItems = [];
            if (Array.isArray(action.payload.values)) {
                action.payload.values.forEach(value => {
                    const matches = action.payload.items.filter(item => value === item.value);
                    if (matches.length === 1) {
                        selectedItems.push({
                            label: matches[0].label,
                            value,
                        });
                    }
                });
            }

            setDataHelper(state, action.payload.form, action.payload.field, {
                valid: action.payload.valid,
                selectedItems,
                inputValue: '',
                pristine: false,
                error: '',
            });
            state[action.payload.form].pristine = false;
        },

        setAutocompleteSingleSelectValue: (state, action) => {
            // Assumptions:
            //   action.payload.form === form name
            //   action.payload.field === field name
            //   action.payload.value === new field value
            //   action.payload.items === autocomplete items
            //   action.payload.valid === true or false
            let inputValue = action.payload.value;
            if (Array.isArray(action.payload.items)) {
                const matches = action.payload.items.filter(item => item.value === action.payload.value);
                if (matches.length === 1) {
                    inputValue = matches[0].label;
                }
            }

            setDataHelper(state, action.payload.form, action.payload.field, {
                value: action.payload.value,
                inputValue,
                valid: action.payload.valid,
                pristine: false,
                error: '',
            });
            state[action.payload.form].pristine = false;
        },

        setFieldData: (state, action) => {
            // Assumptions:
            //   action.payload.form === form name
            //   action.payload.field === field name
            //   action.payload.data === data to set in field state
            setDataHelper(state, action.payload.form, action.payload.field, action.payload.data);
        },

        setFormData: (state, action) => {
            // Assumptions:
            //    action.payload.name === form name
            //    action.payload.data === data to set in form state
            if (state[action.payload.name] === undefined) {
                state[action.payload.name] = action.payload.data;
            } else {
                state[action.payload.name] = _.assign(state[action.payload.name], action.payload.data);
            }
        },

        setFormFieldValue: (state, action) => {
            // Assumptions:
            //   action.payload.form === form name
            //   action.payload.field === field name
            //   action.payload.value === value to set in form field
            setDataHelper(state, action.payload.form, action.payload.field, {
                value: action.payload.value,
                pristine: false,
            });
            state[action.payload.form].pristine = false;
        },
    },
});

export const formsReducer = formsSlice.reducer;
export const {
    autocompleteAddNewItem,
    autocompleteAddSelectedItem,
    autocompleteDownArrowPressed,
    autocompleteDropdownMatches,
    autocompleteRemoveSelectedItem,
    autocompleteUpArrowPressed,
    clearAutocompleteSelection,
    setAutocompleteMultiSelectValues,
    setAutocompleteSingleSelectValue,
    setFieldData,
    setFormData,
    setFormFieldValue,
} = formsSlice.actions;
