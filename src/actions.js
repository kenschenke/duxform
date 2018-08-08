import C from './constants';
import { getElementPosition, getFormFieldData } from './helpers';

export const formData = (name, data) =>
    ({
        type: C.DUXFORM_SET_FORM_DATA,
        name: name,
        data: data,
    });

export const fieldData = (formName, name, data) =>
    ({
        type: C.DUXFORM_SET_FIELD_DATA,
        form: formName,
        field: name,
        payload: data
    });

export const setFormFieldValue = (formName, name, value, valid = true) => dispatch => {
    let payload = {
        value: value,
        valid: valid,
        pristine: false
    };
    if (valid) {
        payload.error = '';
    }
    dispatch({
        type: C.DUXFORM_SET_FIELD_DATA,
        form: formName,
        field: name,
        payload: payload
    });
    dispatch(formData(formName, {pristine: false}));

    dispatch(updateFormValidate(formName));
};

export const updateFormValidate = (formName, onValidate) => (dispatch, getState) => {
    const state = getState();

    if (!state.forms.hasOwnProperty(formName) || !state.forms[formName].hasOwnProperty('fields')) {
        return;
    }

    let allFieldsValid = true;
    let values = {};
    for (let field in state.forms[formName].fields) {
        if (state.forms[formName].fields.hasOwnProperty(field)) {
            values[field] = state.forms[formName].fields[field].value;
            if (!state.forms[formName].fields[field].valid) {
                allFieldsValid = false;
            }
        }
    }

    let error = '';
    if (onValidate !== undefined && allFieldsValid) {
        const ret = onValidate(values);
        if (ret !== undefined) {
            error = ret;
            allFieldsValid = false;
        }
    }

    dispatch(
        formData(formName, {valid: allFieldsValid, error: error})
    );
};

export const autocompleteAddNewItem = (formName, name, value) => (dispatch, getState) => {
    const state = getState();
    const selectedItems = getFormFieldData(state, formName, name, 'selectedItems', []);
    const valueU = value.toUpperCase();

    const matches = selectedItems.filter(item => {
        return valueU === item.labelU;
    });

    if (!matches.length) {
        dispatch(fieldData(formName, name, {
            selectedItems: [...selectedItems, {
                value: value,
                label: value
            }],
            inputValue: '',
            valid: true
        }));
    }
};

export const autocompleteAddSelectedItem = (formName, name, allowMulti, value) => (dispatch, getState) => {
    const state = getState();
    const selectedItems = getFormFieldData(state, formName, name, 'selectedItems', []);
    const item = autocompleteGetSelectedItem(state, formName, name, value);
    if (item) {
        if (allowMulti) {
            dispatch(fieldData(formName, name, {
                selectedItems: [...selectedItems, item],
                inputValue: '',
                valid: true
            }));
        } else {
            dispatch(fieldData(formName, name, {
                value: value,
                inputValue: item.label,
                valid: true
            }));
        }
    }
};

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

export const autocompleteDropdownMatches = (formName, name, matches) => (dispatch, getState) => {
    const state = getState();
    let highlightedValue = getFormFieldData(state, formName, name, 'highlightedValue', '');
    const highlightedItems = matches.filter(item => {
        return highlightedValue === item.value;
    });
    if (!highlightedItems.length) {
        highlightedValue = matches.length ? matches[0].value : '';
    }
    dispatch(fieldData(formName, name, {
        items: matches,
        highlightedValue: matches.length ? highlightedValue : ''
    }));
};

const autocompleteEnsureItemIsVisible = (formName, name, value) => {
    // if (formName === C.DFIAUTOCOMPLETE_UNITTEST_FORM && name === C.DFIAUTOCOMPLETE_UNITTEST_FIELD) {
    //     return;
    // }

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

const autocompleteGetSelectedItem = (state, formName, name, value) => {
    const items = getFormFieldData(state, formName, name, 'items', []);
    const matches = items.filter(item => item.value === value);
    return matches.length === 1 ? matches[0] : undefined;
};

export const autocompleteRemoveSelectedItem = (formName, name, value) => (dispatch, getState) => {
    const state = getState();
    const selectedItems = getFormFieldData(state, formName, name, 'selectedItems', []);
    dispatch(fieldData(formName, name, {
        selectedItems: selectedItems.filter(item => {
            return item.value !== value
        })
    }));
};

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

