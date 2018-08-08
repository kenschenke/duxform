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

export const formatValue = (value, props) => {
    if (props.dataType === 'num') {
        value = formatNumber(value, props);
    } else if (props.dataType === 'date') {
        value = formatDate(value);
    }

    return value;
};

const getElementOffset = elem => {
    const rect = elem.getBoundingClientRect();
    const win = elem.ownerDocument.defaultView;
    return {
        top: rect.top + win.pageYOffset,
        left: rect.left - win.pageXOffset
    };
};

export const getElementPosition = elem => {
    const elemOffset = getElementOffset(elem);
    const parentOffset = getElementOffset(elem.offsetParent);

    return {
        top: elemOffset.top - parentOffset.top,
        left: elemOffset.left - parentOffset.left
    };
};

export const getFormFieldError = (state, formName, fieldName) => {
    return getFormFieldData(state, formName, fieldName, 'error', '');
};

export const getFormFieldData = (state, formName, fieldName, propName, defaultValue) => {
    if (!state.forms.hasOwnProperty(formName) ||
        !state.forms[formName].hasOwnProperty('fields') ||
        !state.forms[formName].fields.hasOwnProperty(fieldName) ||
        !state.forms[formName].fields[fieldName].hasOwnProperty(propName)) {
        return defaultValue;
    }

    return state.forms[formName].fields[fieldName][propName];
};

export const getFormFieldValue = (state, formName, fieldName, defaultValue) => {
    return getFormFieldData(state, formName, fieldName, 'value', defaultValue);
};

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

export const isFieldValid = (state, formName, name) => {
    return getFormFieldData(state, formName, name, 'valid', false);
};

export const isFieldValidOrPristine = (state, formName, name) => {
    const valid = getFormFieldData(state, formName, name, 'valid', false);
    const pristine = getFormFieldData(state, formName, name, 'pristine', false);

    return valid || pristine;
};

export const isFormValid = (state, formName) => {
    if (state.forms.hasOwnProperty(formName) &&
        state.forms[formName].hasOwnProperty('valid')) {
        return state.forms[formName].valid;
    }

    return false;
};

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

const parseNumber = value => {
    if (typeof value === 'string') {
        value = value.replace(/[,$]/g, '');
        return parseFloat(value);
    } else {
        return value;
    }
};

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

