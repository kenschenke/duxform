import C from './constants';

/**
 * Convenience action to set data at the form level.
 *
 * @param name
 * @param data
 * @returns {{type: string, name: *, data: *}}
 */
export const formData = (name, data) =>
    ({
        type: C.DUXFORM_SET_FORM_DATA,
        name: name,
        data: data,
    });

/**
 * Convenience action to set data at the field level.
 *
 * @param formName
 * @param name
 * @param data
 * @returns {{type: string, form: *, field: *, payload: *}}
 */
export const fieldData = (formName, name, data) =>
    ({
        type: C.DUXFORM_SET_FIELD_DATA,
        form: formName,
        field: name,
        payload: data
    });

/**
 * Sets the field's value.
 *
 * @param formName
 * @param name
 * @param value
 * @param valid
 * @returns {Function}
 */
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

/**
 * Update the form's validity.  If one or more fields are not valid, the entire form is not valid.  If all fields are
 * valid and a validation callback is supplied, call it.  Otherwise, the entire form is considered valid.
 *
 * @param formName
 * @param onValidate
 * @returns {Function}
 */
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

