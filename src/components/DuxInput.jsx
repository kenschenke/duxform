import { useEffect, useContext, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFieldData, setFormData } from '../store';
import FormContext from '../contexts/form-context.jsx';
import {
    findFormField,
    formatValue,
    getInitData,
    isValidDate,
    normalize,
    parseValue,
    getFormFieldValue,
    getFormFieldData,
} from '../helpers';

import _ from 'lodash';

function DuxInput(props) {
    let childProps = {...props};
    let _select = null;
    let _input = null;
    let _idleHandler = useRef(null);
    const dispatch = useDispatch();
    const { formName, formValidate } = useContext(FormContext);

    // Delete some props that shouldn't be carried forward
    delete childProps.init;
    delete childProps.hasFocus;
    delete childProps.nextField;
    delete childProps.onEnterPressed;
    delete childProps.onChange;
    delete childProps.onValidate;
    delete childProps.format;
    delete childProps.parse;
    delete childProps.dataType;
    delete childProps.precision;
    delete childProps.showCommas;
    delete childProps.showDollar;
    delete childProps.round;
    delete childProps.forceUpper;
    delete childProps.trim;
    delete childProps.onFocus;
    delete childProps.onBlur;
    delete childProps.value;
    delete childProps.defaultValue;
    delete childProps.idleValidateTimeout;
    delete childProps.onIdleValidate;

    if (props.type === 'select' || props.type === 'textarea') {
        delete childProps.type;
        delete childProps.children;
    } else if (props.type === 'checkbox' || props.type === 'radio') {
        delete childProps.defaultChecked;
    }

    const formValue = useSelector(state => getFormFieldValue(state, formName, props.name, ''));
    const hasFocus = useSelector(state => getFormFieldData(state, formName, props.name, 'hasFocus', false));

    const initValue = (value, props) => {
        dispatch(setFieldData({
            form: formName,
            field: props.name,
            data: { value }
        }));
    };

    const getFormattedValue = () => {
        let newValue = normalize(formValue, props);
        if (props.format) {
            newValue = props.format(newValue, props.name);
        } else {
            newValue = formatValue(newValue, props);
        }

        return newValue;
    };

    const handleIdleValidate = value => {
        const errorMsg = props.onIdleValidate(value);
        if (errorMsg !== undefined) {
            dispatch(setFieldData({
                form: formName,
                field: props.name,
                data: {
                    error: errorMsg,
                    valid: false,
                },
            }));
        }
    };

    useEffect(() => {
        if (props.type === 'select') {
            if (props.defaultValue === undefined) {
                initValue(_select.value, props);
            } else {
                _select.value = props.defaultValue;
            }
        }

        if (props.type === 'checkbox') {
            initValue(props.defaultChecked === undefined ? false : props.defaultChecked, props);
        }

        if (props.type === 'radio' && props.defaultChecked) {
            initValue(props.value, props);
        }

        if (props.onIdleValidate && props.idleValidateTimeout) {
            _idleHandler.current = _.debounce(handleIdleValidate, props.idleValidateTimeout);
        }

        dispatch(setFieldData({
            form: formName,
            field: props.name,
            data: getInitData(props),
        }));
    }, []);

    const handleBlur = () => {
        let value = normalize(parseValue(formValue, props), props);
        const { dataType = 'str', round = true, trim = true } = props;
        if (dataType === 'str' && typeof value === 'string' && trim) {
            value = value.trim();
        } else if (dataType === 'num' && round) {
            // If rounding is true, store the rounded value by
            // formatting without dollars and commas then parsing
            // that to a float.
            value = parseFloat(formatValue(value, {
                ...props,
                showDollar: false,
                showCommas: false,
            }));
        }
        dispatch(setFieldData({
            form: formName,
            field: props.name,
            data: {
                hasFocus: false,
                value,
            },
        }));
        if (props.onBlur) {
            props.onBlur(props.name);
        }
    };

    const handleChange = event => {
        let error = '';
        let valid = true;
        let value;

        if (props.type === 'checkbox') {
            value = event.target.checked;
        } else {
            if (props.dataType === 'date' && !isValidDate(event.target.value)) {
                error = 'Invalid date';
                valid = false;
            } else if (props.onValidate) {
                const errorMsg = props.onValidate(event.target.value, props.name, formName);
                if (errorMsg !== undefined) {
                    error = errorMsg;
                    valid = false;
                }
            }
            value = event.target.value;
        }
        dispatch(setFieldData({
            form: formName,
            field: props.name,
            data: {
                value,
                pristine: false,
                error,
                valid,
            }
        }));
        dispatch(setFormData({
            name: formName,
            data: {
                pristine: false,
            }
        }));
        formValidate();

        if (_idleHandler.current) {
            _idleHandler.current(event.target.value, props);
        }
    };

    const handleFocus = () => {
        dispatch(setFieldData({
            form: formName,
            field: props.name,
            data: {
                hasFocus: true,
                value: formatValue(formValue, props),
            },
        }));
        if (props.onFocus) {
            props.onFocus(props.name);
        }
    };

    const handleKeyDown = event => {
        if (event.key === 'Enter') {
            event.preventDefault();

            if (props.onEnterPressed) {
                const value = parseValue(event.target.value, props);
                props.onEnterPressed(value, props.name, formName);
            }

            if (props.nextField) {
                const field = findFormField(formName, props.nextField);
                if (field !== undefined) {
                    field.focus();
                    field.select();
                }
            }
        }
    };

    const handleKeyPress = event => {
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
        } else if (charCode === 0) {
            switch (keyCode) {
                case 8:     // Backspace
                case 35:    // Home
                case 36:    // End
                case 37:    // Left
                case 39:    // Right
                case 46:    // Del
                    FirefoxAllowed = true;
                    break;
            }
        } else if (ctrlKey) {
            switch (charCode) {
                case 99:    // Ctrl+C
                case 118:   // Ctrl+V
                case 120:   // Ctrl+X
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
    };

    if (props.type === 'select') {
        return (
            <select
                onChange={handleChange}
                ref={select => _select=select}
                value={formValue}
                {...childProps}
            >
                {props.children}
            </select>
        );
    }

    if (props.type === 'checkbox') {
        return (
            <input
                ref={input => _input=input}
                onChange={handleChange}
                {...childProps}
                checked={formValue}
            />
        );
    }

    if (props.type === 'radio') {
        return (
            <input
                ref={input => _input=input}
                onChange={handleChange}
                {...childProps}
                value={props.value}
                checked={props.value === formValue}
            />
        );
    }

    if (props.type === 'textarea') {
        return (
            <textarea
                onChange={handleChange}
                {...childProps}
                value={formValue}
                onBlur={handleBlur}
                onFocus={handleFocus}
            />
        );
    }

    return (
        <input
            onKeyDown={handleKeyDown}
            onKeyPress={handleKeyPress}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            {...childProps}
            value={hasFocus ? formValue : getFormattedValue()}
        />
    );
}

export default DuxInput;
