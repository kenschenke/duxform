/**
 * Splits a date string (U.S. format of MM/DD/YYYY) into an object breaking out those values.
 *
 * @param value
 * @returns {*}
 */
const extractDateParts = value => {
    let str = value;
    if (typeof str !== 'string') {
        str = str.toString();
    }
    const parts = str.split('/');

    if (parts.length !== 3) {
        return null;
    }

    let mon = parseInt(parts[0], 10);
    let day = parseInt(parts[1], 10);
    let year = parseInt(parts[2], 10);

    if (year >= 0 && year <= 99) {
        year += (year < 50) ? 2000 : 1900;
    }

    return {
        Month: mon,
        Day: day,
        Year: year
    };
};

/**
 * Search the DOM and return the HTMLElement object.
 *
 * @param formName
 * @param name
 * @returns field object or undefined if not found.
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
    const date = new Date(value);
    if (isNaN(date.valueOf())) {
        return value;
    }

    return `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`;
};

/**
 * Formats a number according to American standards.
 *
 * @param value
 * @param props
 * @returns {string}
 */
export const formatNumber = (value, props) => {
    const { precision = 0, showDollar = false, showCommas = false } = props;
    value = toNumber(value, precision);
    value /= Math.pow(10, precision);

    let str = value.toString();
    let x = str.split('.');
    let x1 = x[0];
    let x2 = x.length > 1 ? '.' + x[1] : '';
    if (x2.length === 0 && precision > 0) {
        x2 = '.';
    }
    if (x2.length) {
        while (x2.length-1 < precision) {
            x2 += '0';
        }
    }
    if (showCommas) {
        let rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1'+','+'$2');
        }
    }

    return (showDollar?'$':'') + x1 + x2;
};

/**
 * Formats the value, depending on the data type.
 *
 * @param value
 * @param props
 * @returns {*}
 */
export const formatValue = (value, props) => {
    const { dataType = 'str' } = props;
    if (dataType === 'num') {
        value = formatNumber(value, props);
    } else if (dataType === 'date') {
        value = formatDate(value);
    }

    return value;
};

export const getAutoCompleteMultiSelectValues = (state, formName, name) => {
    return getFormFieldData(state, formName, name, 'selectedItems', []);
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
 * Returns the requested property from the form state.  This function is safe to call during initialization.
 *
 * @param state
 * @param formName
 * @param propName
 * @param defaultValue
 * @returns {*}
 */
export const getFormData = (state, formName, propName, defaultValue) => {
    if (state.forms === undefined ||
        state.forms[formName] === undefined ||
        state.forms[formName][propName] === undefined) {
        return defaultValue;
    }
    return state.forms[formName][propName];
};

/**
 * Returns the error message of the form.
 *
 * @param state
 * @param formName
 * @returns {*}
 */
export const getFormError = (state, formName) => {
    return getFormData(state, formName, 'error', '');
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
    if (state.forms === undefined)
        return defaultValue;

    return getFormFieldDataReducer(state.forms, formName, fieldName, propName, defaultValue);
};

export const getFormFieldDataReducer = (state, formName, fieldName, propName, defaultValue) => {
    if (state[formName] === undefined ||
        state[formName].fields === undefined ||
        state[formName].fields[fieldName] === undefined ||
        state[formName].fields[fieldName][propName] === undefined)
        return defaultValue;

    return state[formName].fields[fieldName][propName];
};

/**
 * Returns the error message of the form.
 *
 * @param state
 * @param formName
 * @returns {*}
 */
export const getFormFieldError = (state, formName, fieldName) => {
    return getFormFieldData(state, formName, fieldName, 'error', '');
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
        const { dataType = 'str' } = props;
        switch (dataType) {
            case 'num':
                defaultValue = 0;
                break;
            case 'date':
                defaultValue = Date.now();
                break;
            default:
                defaultValue = '';
                break;
        }
    }
    let error = '';
    let valid = true;
    if (props.onValidate) {
        const errorMsg = props.onValidate(defaultValue, props.name, props.formName);
        if (errorMsg !== undefined) {
            error = errorMsg;
            valid = false;
        }
    }

    const initData = {
        pristine: true,
        error,
        valid,
        hasFocus: false,
    };

    if (props.type !== 'radio' && props.type !== 'checkbox') {
        initData.value = defaultValue;
    }

    return initData;
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
}

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
    return getFormData(state, formName, 'valid', false);
};

/**
 * Returns whether or not the form is valid or pristine.
 *
 * @param state
 * @param formName
 * @returns {*}
 */
export const isFormValidOrPristine = (state, formName) => {
    const valid = getFormData(state, formName, 'valid', false);
    const pristine = getFormData(state, formName, 'pristine', false);

    return valid || pristine;
};

/**
 * Returns true if the year is a leap year.
 *
 * @param year
 * @returns {boolean}
 */
const isLeapYear = year => {
    let isLeap = false;

    if ((year % 4) === 0) {
        isLeap = true;
    }
    if ((year % 100) === 0) {
        isLeap = ((year % 400) === 0);
    }

    return isLeap;
};

/**
 * Returns true if the date string (in U.S. format MM/DD/YYYY) is a valid date.  It
 * considers leap years and number of days in each month.
 *
 * @param value
 * @returns {boolean}
 */
export const isValidDate = value => {
    let parts = extractDateParts(value);
    if (parts === null) {
        return false;
    }

    const mlen = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (isNaN(parts.Month) || isNaN(parts.Day) || isNaN(parts.Year)) {
        return false;
    }

    if (parts.Month < 1 || parts.Month > 12) {
        return false;
    }

    let days = mlen[parts.Month-1];
    if (parts.Month === 2 && isLeapYear(parts.Year)) {
        days++;
    }
    if (parts.Day < 1 || parts.Day > days) {
        return false;
    }

    return (parts.Year >= 1900 && parts.Year <= 2100);
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
    const { dataType = 'str' } = props;
    if (dataType === 'num' && typeof value === 'string' && !value.length) {
        newValue = 0;
    }
    if (dataType !== 'num' && dataType !== 'date') {
        const { forceUpper = false } = props;
        if (props.normalize || forceUpper) {
            if (props.normalize) {
                newValue = props.normalize(value, props.name);
            } else if (forceUpper && typeof value === 'string') {
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
        return parseFloat(value.replace(/[,$]/g, ''));
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
    const { dataType = 'str' } = props;
    if (props.parse) {
        value = props.parse(value, props.name);
    } else if (dataType === 'num') {
        value = parseNumber(value);
    } else if (dataType === 'date') {
        const timestamp = Date.parse(value);
        if (isNaN(timestamp)) {
            return value;
        }
        value = timestamp;
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
const toNumber = (value, precision) => {
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

