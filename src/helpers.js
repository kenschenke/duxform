/**
 * Search the DOM and return the HTMLElement object.
 *
 * @param formName
 * @param name
 * @returns {*}
 */
export const findFormField = (formName, name) => {
    let f, i;

    for (f = 0; f < document.forms.length; f++) {
        if (document.forms[f].name !== formName) {
            continue;
        }

        for (i = 0; i < document.forms[f].elements.length; i++) {
            if (document.forms[f].elements[i].name === name) {
                return document.forms[f].elements[i];
            }
        }
    }

    return undefined;
};

/**
 * Formats a date.
 *
 * @param value
 * @returns {*}
 */
export const formatDate = value => {
    let date;
    if (value instanceof Date) {
        date = value;
    } else {
        date = Date.parse(value);
        if (isNaN(date)) {
            return value;
        }
    }

    return new Intl.DateTimeFormat().format(date);
};

/**
 * Formats a number according to American standards.
 *
 * @param value
 * @param props
 * @returns {string}
 */
export const formatNumber = (value, props) => {
    value = toNumber(value, props.precision);
    value /= Math.pow(10, props.precision);

    let str = value.toString();
    let x = str.split('.');
    let x1 = x[0];
    let x2 = x.length > 1 ? '.' + x[1] : '';
    if (x2.length === 0 && props.precision > 0) {
        x2 = '.';
    }
    if (x2.length) {
        while (x2.length-1 < props.precision) {
            x2 += '0';
        }
    }
    if (props.showCommas) {
        let rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1'+','+'$2');
        }
    }

    return (props.showDollar?'$':'') + x1 + x2;
};

/**
 * Formats the value, depending on the data type.
 *
 * @param value
 * @param props
 * @returns {*}
 */
export const formatValue = (value, props) => {
    if (props.dataType === 'num') {
        value = formatNumber(value, props);
    } else if (props.dataType === 'date') {
        value = formatDate(value);
    }

    return value;
};

/**
 * Gets the offset position of the element.
 *
 * @param elem
 * @returns {{top: number, left: number}}
 */
const getElementOffset = elem => {
    const rect = elem.getBoundingClientRect();
    const win = elem.ownerDocument.defaultView;
    return {
        top: rect.top + win.pageYOffset,
        left: rect.left - win.pageXOffset
    };
};

/**
 * Gets the relative position of the element.
 *
 * @param elem
 * @returns {{top: number, left: number}}
 */
export const getElementPosition = elem => {
    const elemOffset = getElementOffset(elem);
    const parentOffset = getElementOffset(elem.offsetParent);

    return {
        top: elemOffset.top - parentOffset.top,
        left: elemOffset.left - parentOffset.left
    };
};

/**
 * Returns the error message of the field.
 *
 * @param state
 * @param formName
 * @param fieldName
 * @returns {*}
 */
export const getFormFieldError = (state, formName, fieldName) => {
    return getFormFieldData(state, formName, fieldName, 'error', '');
};

/**
 * Returns the requested property from the form state.  This function is safe to call during initialization.
 *
 * @param state
 * @param formName
 * @param fieldName
 * @param propName
 * @param defaultValue
 * @returns {*}
 */
export const getFormFieldData = (state, formName, fieldName, propName, defaultValue) => {
    if (!state.forms.hasOwnProperty(formName) ||
        !state.forms[formName].hasOwnProperty('fields') ||
        !state.forms[formName].fields.hasOwnProperty(fieldName) ||
        !state.forms[formName].fields[fieldName].hasOwnProperty(propName)) {
        return defaultValue;
    }

    return state.forms[formName].fields[fieldName][propName];
};

/**
 * Returns the value of the form field.
 *
 * @param state
 * @param formName
 * @param fieldName
 * @param defaultValue
 * @returns {*}
 */
export const getFormFieldValue = (state, formName, fieldName, defaultValue) => {
    return getFormFieldData(state, formName, fieldName, 'value', defaultValue);
};

/**
 * Returns initial data for the field.  This is called during initialization from <DuxInput>.
 *
 * @param props
 * @returns {{pristine: boolean, value: *, error: string, valid: boolean, hasFocus: boolean}}
 */
export const getInitData = props => {
    let defaultValue;
    if (props.defaultValue !== undefined) {
        defaultValue = parseValue(props.defaultValue, props);
        if (props.normalize) {
            defaultValue = props.normalize(defaultValue, props.name);
        }
    } else {
        switch (props.dataType) {
            case 'num':
                defaultValue = 0;
                break;

            case 'date':
                defaultValue = new Date();
                break;

            default:
                defaultValue = '';
                break;
        }
    }
    let error = '';
    let valid = true;
    if (props.onValidate) {
        const errorMsg = props.onValidate(defaultValue, props.formName, props.name);
        if (errorMsg !== undefined) {
            error = errorMsg;
            valid = false;
        }
    }

    return {
        pristine: true,
        value: defaultValue,
        error: error,
        valid: valid,
        hasFocus: false
    };
};

/**
 * Determins whether or not the highlighted value is non-null.  In other words, if it's a string it needs to contain
 * non-whitespace.  If it's a number, it needs to be non-zero.
 *
 * @param props
 * @returns {boolean}
 */
export const isAutoCompleteValueHighlighted = props => {
    if (typeof props.highlightedValue === 'string') {
        const value = props.highlightedValue.trim();
        return value.length > 0;
    } else if (typeof props.highlightedValue === 'number') {
        return props.highlightedValue !== 0;
    } else {
        return false;
    }
};

/**
 * Returns whether or not the field is valid.
 *
 * @param state
 * @param formName
 * @param name
 * @returns {*}
 */
export const isFieldValid = (state, formName, name) => {
    return getFormFieldData(state, formName, name, 'valid', false);
};

/**
 * Returns whether or not the field is valid or pristine.
 *
 * @param state
 * @param formName
 * @param name
 * @returns {*}
 */
export const isFieldValidOrPristine = (state, formName, name) => {
    const valid = getFormFieldData(state, formName, name, 'valid', false);
    const pristine = getFormFieldData(state, formName, name, 'pristine', false);

    return valid || pristine;
};

/**
 * Whether the entire form is valid.
 *
 * @param state
 * @param formName
 * @returns {*}
 */
export const isFormValid = (state, formName) => {
    if (state.forms.hasOwnProperty(formName) &&
        state.forms[formName].hasOwnProperty('valid')) {
        return state.forms[formName].valid;
    }

    return false;
};

/**
 * Normalizes the value in the field.  If the field type is a number and it's an empty string, the value is 0.  If
 * the data type is a string, make it upper case if forceUpper is true.  If the field specifies its own
 * normalize callback, utilize that.
 *
 * @param value
 * @param props
 * @returns {*}
 */
export const normalize = (value, props) => {
    let newValue = value;
    if (props.dataType === 'num' && typeof value === 'string' && !value.length) {
        newValue = 0;
    }
    if (props.dataType !== 'num' && props.dataType !== 'date') {
        if (props.normalize || props.forceUpper) {
            if (props.normalize) {
                newValue = props.normalize(value, props.name);
            } else if (props.forceUpper && typeof value === 'string') {
                newValue = value.toUpperCase();
            }
        }
    }

    return newValue;
};

/**
 * Parse the input text and convert it to a number, removing commas, decimals points, and dollar signs.
 *
 * @param value
 * @returns {*}
 */
const parseNumber = value => {
    if (typeof value === 'string') {
        value = value.replace(/[,$]/g, '');
        return parseFloat(value);
    } else {
        return value;
    }
};

/**
 * Parse the input text and convert it to a value based on the field's data type.
 *
 * @param value
 * @param props
 * @returns {*}
 */
export const parseValue = (value, props) => {
    if (props.parse) {
        value = props.parse(value, props.name);
    } else if (props.dataType === 'num') {
        value = parseNumber(value);
    } else if (props.dataType === 'date') {
        const timestamp = Date.parse(value);
        if (isNaN(timestamp)) {
            return value;
        }
        value = new Date();
        value.setTime(timestamp);
    }

    return value;
};

/**
 * Convert the value into a rounded number, based on the field's precision.
 *
 * @param value
 * @param precision
 * @returns {number}
 */
const toNumber = (value,precision) => {
    if (typeof value === 'string') {
        value = value.replace(/[,$]/g, '');
    }
    let num = parseFloat(value);
    if (isNaN(num)) {
        return 0;
    }
    num *= Math.pow(10, precision);
    num += 0.5001;
    return Math.floor(num);
};

