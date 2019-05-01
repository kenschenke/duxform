const DuxForm = require('./lib/DuxForm');
const DuxInput = require('./lib/DuxInput');
const DuxAutoComplete = require('./lib/DuxAutoComplete');
const DuxFormReducer  = require('./lib/reducer');

const { findFormField, getFormData, getFormError, getFormFieldData, getFormFieldError, getFormFieldValue,
    isFieldValid, isFieldValidOrPristine, isFormValid, isFormValidOrPristine } = require('./lib/helpers');
const { getAutoCompleteMultiSelectValues, setAutoCompleteSingleSelectValue,
    setAutoCompleteMultiSelectValues } = require('./lib/actions-autocomplete');
const { setFormFieldValue } = require('./lib/actions-input');

module.exports = {
    DuxForm: DuxForm,
    DuxInput: DuxInput,
    DuxAutoComplete: DuxAutoComplete,
    DuxFormReducer: DuxFormReducer,

    findFormField: findFormField,
    getFormData: getFormData,
    getFormError: getFormError,
    getFormFieldData: getFormFieldData,
    getFormFieldError: getFormFieldError,
    getFormFieldValue: getFormFieldValue,
    isFieldValid: isFieldValid,
    isFieldValidOrPristine: isFieldValidOrPristine,
    isFormValid: isFormValid,
    isFormValidOrPristine: isFormValidOrPristine,

    getAutoCompleteMultiSelectValues: getAutoCompleteMultiSelectValues,
    setAutoCompleteSingleSelectValue: setAutoCompleteSingleSelectValue,
    setAutoCompleteMultiSelectValues: setAutoCompleteMultiSelectValues,

    setFormFieldValue: setFormFieldValue
};
