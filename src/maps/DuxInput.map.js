import { fieldData, formData } from '../actions';
import { findFormField, formatValue, getFormFieldData, getFormFieldValue,
    getInitData, normalize, parseValue } from '../helpers';

export const mapDuxInputProps = (state, props) => {
    return {
        hasFocus: getFormFieldData(state, props.formName, props.name, 'hasFocus', false),
        value: (props.type==='radio') ? props.value : getFormFieldValue(state, props.formName, props.name, ''),
        formValue: getFormFieldValue(state, props.formName, props.name, '')
    };
};

export const mapDuxInputDispatch = dispatch => {
    return {
        init(props) {
            dispatch(fieldData(props.formName, props.name, getInitData(props)));
            dispatch(formData(props.formName, {
                pristine: true,
                valid: false,
                error: ''
            }));
            props.formValidate(props.formName);
        },

        initValue(value, props) {
            dispatch(fieldData(props.formName, props.name, {
                value: value
            }));
        },

        getFormattedValue(props) {
            let newValue = normalize(props.value, props);
            if (props.format) {
                newValue = props.format(newValue, props.name);
            } else {
                newValue = formatValue(newValue, props);
            }

            return newValue;
        },

        handleBlur(event, props) {
            let value = normalize(parseValue(props.value, props), props);
            if (props.dataType === 'str' && typeof value === 'string' && props.trim) {
                value = value.trim();
            } else if (props.dataType === 'num' && props.round) {
                // If rounding is true, store the rounded value by
                // formatting without dollars and commas then parsing
                // that to a float.
                value = parseFloat(formatValue(value, {
                    ...props,
                    showDollar: false,
                    showCommas: false
                }));
            }
            dispatch(fieldData(props.formName, props.name, {
                hasFocus: false,
                value: value
            }));
            if (props.onBlur) {
                props.onBlur(props.name);
            }
        },

        handleChange(event, props) {
            let error = '';
            let valid = true;
            let value;
            if (props.type === 'checkbox') {
                value = event.target.checked;
            }
            else {
                if (props.dataType === 'date' && !(event.target.value instanceof Date)) {
                    error = 'Invalid date';
                    valid = false;
                } else if (props.onValidate) {
                    const errorMsg = props.onValidate(event.target.value, props.formName, props.name);
                    if (errorMsg !== undefined) {
                        error = errorMsg;
                        valid = false;
                    }
                }
                value = event.target.value;
            }
            dispatch(fieldData(props.formName, props.name, {
                value: value,
                pristine: false,
                error: error,
                valid: valid
            }));
            dispatch(formData(props.formName, {pristine:false}));
            props.formValidate(props.formName);
        },

        handleFocus(props) {
            dispatch(fieldData(props.formName, props.name, {
                hasFocus: true,
                value: formatValue(props.value, props)
            }));
            if (props.onFocus) {
                props.onFocus(props.name);
            }
        },

        handleKeyDown(event, props) {
            if (event.key === 'Enter') {
                event.preventDefault();

                if (props.onEnterPressed) {
                    const value = parseValue(event.target.value, props);
                    props.onEnterPressed(props.formName, props.name, value);
                }

                if (props.nextField) {
                    const field = findFormField(props.formName, props.nextField);
                    if (field !== undefined) {
                        field.focus();
                        field.select();
                    }
                }
            }
        },

        handleKeyPress(event, props) {
            let keyCode = event.keyCode;
            let charCode = 0;
            let ctrlKey = false;
            if (typeof event.charCode !== 'undefined') {
                charCode = event.charCode;
            }
            if (typeof event.ctrlKey !== 'undefined') {
                ctrlKey = event.ctrlKey;
            }
            let ch = '';
            let FirefoxAllowed = false;
            if (typeof event.charCode === 'undefined') {
                ch = String.fromCharCode(event.keyCode);
            }
            else if (charCode === 0) {
                switch (keyCode) {
                    case 8:   // Backspace
                    case 35:  // Home
                    case 36:  // End
                    case 37:  // Left
                    case 39:  // Right
                    case 46:  // Del
                        FirefoxAllowed = true;
                        break;
                }
            }
            else if (ctrlKey) {
                switch (charCode) {
                    case 99:   // Ctrl+C
                    case 118:  // Ctrl+V
                    case 120:  // Ctrl+X
                        FirefoxAllowed = true;
                        break;
                }
            } else {
                ch = String.fromCharCode(charCode);
            }

            let allowedChars = '';
            if (props.dataType === 'num') {
                allowedChars = '0123456789-,$.';
            } else if (props.dataType === 'date') {
                allowedChars = '0123456789/';
            }
            if (!FirefoxAllowed && allowedChars.length && allowedChars.indexOf(ch) === -1) {
                event.preventDefault();
            }
        },
    };
};
