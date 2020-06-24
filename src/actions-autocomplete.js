import C from 'constants';
import { getElementPosition, getFormFieldData } from './helpers';
import { fieldData } from './actions-input';

/**
 * Add a new item (not in the list of available items) to the selection.
 *
 * @param formName
 * @param name
 * @param value
 * @returns {Function}
 */
export const autocompleteAddNewItem = (formName, name, value) => (dispatch, getState) => {
    const state = getState();
    const selectedItems = getFormFieldData(state, formName, name, 'selectedItems', []);
    const valueU = value.toUpperCase();

    // Check the currently selected items to see if this new item is already in there.
    const matches = selectedItems.filter(item => valueU === item.labelU);

    if (!matches.length) {
        // It wasn't, so add it.
        dispatch(fieldData(formName, name, {
            selectedItems: [...selectedItems, {
                value: value,
                label: value,
                labelU: valueU
            }],
            inputValue: '',
            valid: true
        }));
    }
};

/**
 * Adds the item selected by the user to the list of selected items.  The item is selected by the user by
 * hitting Enter or Tab while the item is highlighted or by clicking on the item in the dropdown list.
 *
 * @param formName
 * @param name
 * @param allowMulti
 * @param value
 * @returns {Function}
 */
export const autocompleteAddSelectedItem = (formName, name, allowMulti, value) => (dispatch, getState) => {
    const state = getState();
    const selectedItems = getFormFieldData(state, formName, name, 'selectedItems', []);
    const item = autocompleteGetSelectedItem(state, formName, name, value);
    if (item) {
        if (allowMulti) {
            // Multi selections are allowed so add the item to the list of currently selected items.
            dispatch(fieldData(formName, name, {
                selectedItems: [...selectedItems, item],
                inputValue: '',
                valid: true
            }));
        } else {
            // Single selection only.  Set the selected item.
            dispatch(fieldData(formName, name, {
                value: value,
                inputValue: item.label,
                valid: true
            }));
        }
    }
};

/**
 * The down arrow is pressed by the user.  It locates the currently highlighted item in the dropdown list and
 * sets the next item to be the highlighted item.
 *
 * @param formName
 * @param name
 * @returns {Function}
 */
export const autocompleteDownArrowPressed = (formName, name) => (dispatch, getState) => {
    const state = getState();
    const highlighted = getFormFieldData(state, formName, name, 'highlightedValue', '');
    const items = getFormFieldData(state, formName, name, 'items', []);
    let newHighlighted = items.length ? items[items.length - 1].value : null;
    let inputValue = '';
    for (let i = 0; i < items.length; i++) {
        if (items[i].value === highlighted && i + 1 < items.length) {
            newHighlighted = items[i + 1].value;
            inputValue = items[i + 1].label;
            break;
        }
    }
    dispatch(fieldData(formName, name, {highlightedValue: newHighlighted}));
    autocompleteEnsureItemIsVisible(formName, name, newHighlighted);
};

/**
 * Stores the list of dropdown items in the state.  If there is a currently highlighted item,
 * and that item is in the list of dropdown items, make sure that item is highlighted.  Otherwise,
 * highlight the first item in the list.
 *
 * @param formName
 * @param name
 * @param matches
 * @returns {Function}
 */
export const autocompleteDropdownMatches = (formName, name, matches) => (dispatch, getState) => {
    const state = getState();
    let highlightedValue = getFormFieldData(state, formName, name, 'highlightedValue', '');
    const highlightedItems = matches.filter(item => highlightedValue === item.value);
    if (!highlightedItems.length) {
        highlightedValue = matches.length ? matches[0].value : '';
    }
    dispatch(fieldData(formName, name, {
        items: matches,
        highlightedValue: matches.length ? highlightedValue : ''
    }));
};

/**
 * Ensure the highlighted item is visible in the dropdown list by scrolling the list if necessary.
 *
 * @param formName
 * @param name
 * @param value
 */
const autocompleteEnsureItemIsVisible = (formName, name, value) => {
    if (formName === C.DUXAUTOCOMPLETE_UNITTEST_FORM && name === C.DUXAUTOCOMPLETE_UNITTEST_FIELD) {
        return;
    }

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

/**
 * Helper function that returns the item currently highlighted.
 *
 * @param state
 * @param formName
 * @param name
 * @param value
 * @returns {undefined}
 */
const autocompleteGetSelectedItem = (state, formName, name, value) => {
    const items = getFormFieldData(state, formName, name, 'items', []);
    const matches = items.filter(item => item.value === value);
    return matches.length === 1 ? matches[0] : undefined;
};

/**
 * Remove the item from the list of selected items.
 *
 * @param formName
 * @param name
 * @param value
 * @returns {Function}
 */
export const autocompleteRemoveSelectedItem = (formName, name, value) => (dispatch, getState) => {
    const state = getState();
    const selectedItems = getFormFieldData(state, formName, name, 'selectedItems', []);
    dispatch(fieldData(formName, name, {
        selectedItems: selectedItems.filter(item => item.value !== value)
    }));
};

/**
 * The up arrow is pressed by the user.  It locates the currently highlighted item in the dropdown list and
 * sets the previous item to be the highlighted item.
 *
 * @param formName
 * @param name
 * @returns {Function}
 */
export const autocompleteUpArrowPressed = (formName, name) => (dispatch, getState) => {
    const state = getState();
    const highlighted = getFormFieldData(state, formName, name, 'highlightedValue', '');
    const items = getFormFieldData(state, formName, name, 'items', []);
    let newHighlighted = items.length ? items[0].value : null;
    let inputValue = '';
    for (let i = 1; i < items.length; i++) {
        if (items[i].value === highlighted) {
            newHighlighted = items[i - 1].value;
            inputValue = items[i - 1].label;
            break;
        }
    }
    dispatch(fieldData(formName, name, {highlightedValue: newHighlighted}));
    autocompleteEnsureItemIsVisible(formName, name, newHighlighted);
};

export const clearAutoCompleteSelection = (formName, name) => dispatch => {
    dispatch(fieldData(formName, name, {
        value: undefined,
        selectedItems: [],
        inputValue: '',
        valid: false,
        pristine: false,
        error: ''
    }));
};

/**
 * Returns the array of selected items in an auto-complete field.
 *
 * @param state
 * @param formName
 * @param name
 * @returns {*}
 */
export const getAutoCompleteMultiSelectValues = (state, formName, name) => {
    return getFormFieldData(state, formName, name, 'selectedItems', []);
};

/**
 * Sets the selected value in a single-selection auto-complete field.
 *
 * @param formName
 * @param name
 * @param value
 * @param items
 * @param valid
 * @returns {Function}
 */
export const setAutoCompleteSingleSelectValue = (formName, name, value, items, valid = true) => dispatch => {
    let inputValue = value;
    if (Array.isArray(items)) {
        const matches = items.filter(item => item.value === value);
        if (matches.length === 1) {
            inputValue = matches[0].label;
        }
    }

    dispatch(fieldData(formName, name, {
        value,
        inputValue,
        valid,
        pristine: false,
        error: ''
    }));
};

/**
 * Sets the selected values in a multi-select auto-complete field.
 *
 * @param formName
 * @param name
 * @param values
 * @param items
 * @param valid
 * @returns {Function}
 */
export const setAutoCompleteMultiSelectValues = (formName, name, values, items, valid = true) => dispatch => {
    let selectedItems = [];
    if (Array.isArray(values)) {
        values.forEach(value => {
            const matches = items.filter(item => value === item.value);
            if (matches.length === 1) {
                selectedItems.push({
                    label: matches[0].label,
                    labelU: matches[0].label.toUpperCase(),
                    value
                });
            }
        });
    }
    dispatch(fieldData(formName, name, {
        valid,
        selectedItems,
        inputValue: '',
        pristine: false,
        error: ''
    }));
};

