const DuxForm = require('./lib/DuxForm');
const DuxInput = require('./lib/DuxInput');
const DuxAutoComplete = require('./lib/DuxAutoComplete');
const DuxFormReducer  = require('./lib/reducer');

const findFormField = require('./lib/helpers').findFormField;
const getFormData = require('./lib/helpers').getFormData;
const getFormError = require('./lib/helpers').getFormError;
const getFormFieldData = require('./lib/helpers').getFormFieldData;
const getFormFieldError = require('./lib/helpers').getFormFieldError;
const getFormFieldValue = require('./lib/helpers').getFormFieldValue;
const isFieldValid = require('./lib/helpers').isFieldValid;
const isFieldValidOrPristine = require('./lib/helpers').isFieldValidOrPristine;
const isFormValid = require('./lib/helpers').isFormValid;
const isFormValidOrPristine = require('./lib/helpers').isFormValidOrPristine;

const getAutoCompleteMultiSelectValues = require('./lib/actions-autocomplete').getAutoCompleteMultiSelectValues;
const setAutoCompleteSingleSelectValue = require('./lib/actions-autocomplete').setAutoCompleteSingleSelectValue;
const setAutoCompleteMultiSelectValues = require('./lib/actions-autocomplete').setAutoCompleteMultiSelectValues;

const setFormFieldValue = require('./lib/actions-input').setFormFieldValue;

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
