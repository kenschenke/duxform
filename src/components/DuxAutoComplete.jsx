import { useContext, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FormContext from "../contexts/form-context.jsx";
import DuxAutoCompleteDropdown from './DuxAutoCompleteDropdown.jsx';
import { findFormField, getFormFieldData } from "../helpers.js";
import {
    setFieldData,
    autocompleteAddNewItem,
    autocompleteDropdownMatches,
    autocompleteRemoveSelectedItem,
    autocompleteDownArrowPressed,
    autocompleteAddSelectedItem,
    autocompleteUpArrowPressed, setFormData,
} from "../store";

function DuxAutoComplete(props) {
    const {
        name,
        className= '',
        items,
        allowMulti= false,
        allowNewItems = false,
        validateItem,
        onBlur,
        onFocus,
        nextField,
        defaultValue,
        multiSeparators = [',', ';'],
    } = props;

    const _input = useRef(null);
    const _container = useRef(null);
    const _losingFocusBecauseOfEnter = useRef(false);

    const { formName, formValidate } = useContext(FormContext);
    const selectedItems = useSelector(state => getFormFieldData(state, formName, name, 'selectedItems', []));
    const inputValue = useSelector(state => getFormFieldData(state, formName, name, 'inputValue', ''));
    const highlightedValue = useSelector(state => getFormFieldData(state, formName, name, 'highlightedValue', ''));
    const dropdownItems = useSelector(state => getFormFieldData(state, formName, name, 'items', []));

    const dispatch = useDispatch();

    let childProps = {...props};
    delete childProps.className;
    delete childProps.onChange;
    delete childProps.onBlur;
    delete childProps.onFocus;
    delete childProps.onKeyDown;
    delete childProps.onKeyPress;
    delete childProps.value;
    delete childProps.defaultValue;
    delete childProps.items;
    delete childProps.allowMulti;
    delete childProps.multiSeparators;
    delete childProps.allowNewItems;
    delete childProps.validateItem;

    useEffect(() => {
        dispatch(setFieldData({
            form: formName,
            field: name,
            data: {
                valid: false,
                pristine: true,
            }
        }));
        dispatch(autocompleteDropdownMatches({
            form: formName,
            field: name,
            matches: [],
        }));

        if (defaultValue !== undefined) {
            if (allowMulti) {
                if (Array.isArray(defaultValue)) {
                    let selected = [];
                    defaultValue.forEach(value => {
                        const matches = items.filter(item => value === item.value);
                        if (matches.length === 1) {
                            selected.push({
                                label: matches[0].label,
                                value,
                            });
                        }
                    });
                    if (selected.length) {
                        dispatch(setFieldData({
                            form: formName,
                            field: name,
                            data: {
                                valid: true,
                                selectedItems: selected,
                            }
                        }));
                    }
                }
            } else {
                const matches = items.filter(item => defaultValue === item.value);
                if (matches.length === 1) {
                    dispatch(setFieldData({
                        form: formName,
                        field: name,
                        data: {
                            valid: true,
                            value: matches[0].value,
                            inputValue: matches[0].label,
                        }
                    }));
                }
            }
        }
    }, []);

    const handleBlur = () => {
        if (_losingFocusBecauseOfEnter.current) {
            // The user pressed Enter in the field and the input focus is moving to the next field.  We don't
            // want the handleBlur() function to run because it will mess things up by looking at the partial
            // value in the input field and attempt to process that.  The input value has already been set by the
            // onKeyDown handler and will reflect in the state on the next refresh cycle.
            return;
        }

        if (allowMulti) {
            if (isAutocompleteValueHighlighted() && allowNewItems) {
                const value = inputValue.trim();
                if (value.length) {
                    if (validateItem) {
                        let error = validateItem(inputValue, formName, name);
                        dispatch(setFieldData({
                            form: formName,
                            field: name,
                            data: {
                                valid: error === undefined,
                                error: error !== undefined ? error: '',
                            }
                        }));
                        if (error === undefined) {
                            dispatch(autocompleteAddNewItem({
                                form: formName,
                                field: name,
                                value: value,
                            }));
                        }
                    } else {
                        dispatch(setFieldData({
                            form: formName,
                            field: name,
                            valid: true,
                            error: '',
                        }));
                        dispatch(autocompleteAddNewItem({
                            form: formName,
                            field: name,
                            value: value,
                        }));
                    }
                    dispatch(autocompleteDropdownMatches({
                        form: formName,
                        field: name,
                        matches: [],
                    }));
                }
            }
        } else {
            const value = inputValue.trim();
            const valueU = value.toUpperCase();
            const matches = items.filter(item => valueU === item.label.toUpperCase());
            if (matches.length === 1) {
                dispatch(setFieldData({
                    form: formName,
                    field: name,
                    data: {
                        value: matches[0].value,
                        inputValue: matches[0].label,
                        valid: true,
                    },
                }));
            } else if (allowNewItems) {
                const value = inputValue.trim();
                if (value.length && validateItem) {
                    let error = validateItem(inputValue, formName, name);
                    dispatch(setFieldData({
                        form: formName,
                        field: name,
                        data: {
                            valid: error === undefined,
                            error: error !== undefined ? error: '',
                            value: error === undefined ? value : '',
                        }
                    }));
                } else {
                    dispatch(setFieldData({
                        form: formName,
                        field: name,
                        data: {
                            valid: true,
                            error: '',
                            value,
                        }
                    }))
                }
            } else {
                dispatch(setFieldData({
                    form: formName,
                    field: name,
                    data: {
                        valid: false,
                        value: '',
                    }
                }));
            }
        }

        if (onBlur) {
            onBlur(name);
        }

        formValidate();

        setTimeout(() => {
            dispatch(autocompleteDropdownMatches({
                form: formName,
                field: name,
                matches: [],
            }));
        }, 150);
    };

    const handleChange = event => {
        let matches = [];
        const val = event.target.value.trim();
        if (val.length) {
            const valU = val.toUpperCase();
            matches = items.filter(item => {
                const labelU = item.label.toUpperCase();
                return (valU.length && labelU.indexOf(valU) !== -1) &&
                    selectedItems.filter(selectedItem => {
                        return item.value === selectedItem.value;
                    }).length === 0;
            });
        } else if (allowMulti) {
            dispatch(setFieldData({
                form: formName,
                field: name,
                data: {
                    valid: true,
                }
            }));
        }
        dispatch(autocompleteDropdownMatches({
            form: formName,
            field: name,
            matches,
        }));
        dispatch(setFieldData({
            form: formName,
            field: name,
            data: {
                pristine: false,
                inputValue: event.target.value,
            }
        }));
        dispatch(setFormData({
            name: formName,
            data: {
                pristine: false,
            }
        }))
        formValidate();
    };

    const handleFocus = () => {
        if (onFocus) {
            onFocus(name);
        }
    };

    const handleKeyDown = event => {
        let moveToNextField = false;
        _losingFocusBecauseOfEnter.current = false;

        switch (event.key) {
            case 'ArrowUp':
                dispatch(autocompleteUpArrowPressed({
                    form: formName,
                    field: name,
                }));
                event.preventDefault();
                break;

            case 'ArrowDown':
                dispatch(autocompleteDownArrowPressed({
                    form: formName,
                    field: name,
                }))
                event.preventDefault();
                break;

            case 'Escape':
                dispatch(autocompleteDropdownMatches({
                    form: formName,
                    field: name,
                    matches: [],
                }));
                break;

            case 'Enter':
            case 'Tab':
                if (isAutocompleteValueHighlighted()) {
                    dispatch(autocompleteAddSelectedItem({
                        form: formName,
                        field: name,
                        value: highlightedValue,
                        allowMulti,
                    }));
                    event.preventDefault();
                } else if (allowMulti && allowNewItems) {
                    const value = inputValue.trim();
                    if (value.length) {
                        if (validateItem) {
                            let error = validateItem(value, formName, name);
                            dispatch(setFieldData({
                                form: formName,
                                field: name,
                                data: {
                                    valid: error === undefined,
                                    error: error !== undefined ? error : '',
                                }
                            }));
                            if (error === undefined) {
                                dispatch(autocompleteAddNewItem({
                                    form: formName,
                                    field: name,
                                    value,
                                }));
                            }
                        } else {
                            dispatch(setFieldData({
                                form: formName,
                                field: name,
                                data: {
                                    valid: true,
                                    error: '',
                                }
                            }));
                            dispatch(autocompleteAddNewItem({
                                form: formName,
                                field: name,
                                value,
                            }));
                        }
                    }
                }

                if (event.key === 'Enter') {
                    event.preventDefault();
                    if (nextField) {
                        if (allowMulti && isAutocompleteValueHighlighted()) {
                            // Do nothing here. The highlighted value was added
                            // top the selected items in the above code. Pressing
                            // Enter adds the item but doesn't move the focus to
                            // the next field.
                        } else {
                            if (allowMulti || isAutocompleteValueHighlighted()) {
                                _losingFocusBecauseOfEnter.current = true;
                            }
                            moveToNextField = true;
                        }
                    }
                }

                dispatch(autocompleteDropdownMatches({
                    form: formName,
                    field: name,
                    matches: [],
                }));

                formValidate();

                break;
        }

        if (moveToNextField) {
            const field = findFormField(formName, nextField);
            if (field !== undefined) {
                field.focus();
            }
        }
    };

    const handleKeyPress = event => {
        dispatch(setFieldData({
            form: formName,
            field: name,
            data: { valid: false },
        }))

        if (allowMulti && multiSeparators.indexOf(event.key) !== -1) {
            event.preventDefault();
            if (highlightedValue.length) {
                dispatch(setFieldData({
                    form: formName,
                    field: name,
                    data: {
                        valid: true,
                        error: '',
                    }
                }));
                dispatch(autocompleteAddSelectedItem({
                    form: formName,
                    field: name,
                    value: highlightedValue,
                    allowMulti,
                }));
            } else if (allowNewItems) {
                if (validateItem) {
                    let error = validateItem(inputValue, formName, name);
                    dispatch(setFieldData({
                        form: formName,
                        field: name,
                        data: {
                            valid: error === undefined,
                            error: error !== undefined ? error : '',
                        }
                    }));
                    if (error === undefined) {
                        dispatch(autocompleteAddNewItem({
                            form: formName,
                            field: name,
                            value: inputValue,
                        }));
                    }
                } else {
                    dispatch(setFieldData({
                        form: formName,
                        field: name,
                        data: {
                            valid: true,
                            error: '',
                        }
                    }));
                    dispatch(autocompleteAddNewItem({
                        form: formName,
                        field: name,
                        value: inputValue,
                    }));
                }
            }
            formValidate();
            dispatch(autocompleteDropdownMatches({
                form: formName,
                field: name,
                matches: [],
            }));
        }
    };

    const isAutocompleteValueHighlighted = () => {
        if (typeof highlightedValue === 'string') {
            const value = highlightedValue.trim();
            return value.length > 0;
        } else if (typeof highlightedValue === 'number') {
            return highlightedValue !== 0;
        } else {
            return false;
        }
    };

    const removeSelectedItem = value => {
        dispatch(autocompleteRemoveSelectedItem({
            form: formName,
            field: name,
            value,
        }));
    };

    const handleClick = () => {
        if (_input.current) {
            _input.current.focus();
        }
    };

    const itemDivs = selectedItems.map(item => {
        return (
            <div key={item.value} className="duxformac-selected-item">
                {item.label} <span className="duxformac-remove-icon" onClick={() => removeSelectedItem(item.value)}>X</span>
            </div>
        );
    });

    return (
        <div onClick={handleClick}>
            <div className={'duxformac-container ' + className} ref={_container}>
                {itemDivs}
                <div style={{ width:'auto', display:'inline', overflow:'none' }}>
                    <input
                        {...childProps}
                        className="duxformac-input"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        onFocus={handleFocus}
                        onKeyDown={handleKeyDown}
                        onKeyPress={handleKeyPress}
                        value={inputValue}
                        style={{ width:(inputValue.length+5)+'ch' }}
                        ref={_input}
                    />
                </div>
            </div>
            <DuxAutoCompleteDropdown
                name={name}
                left={_container.current && _container.current.left}
                width={_container.current && _container.current.width}
                items={dropdownItems}
                highlightedValue={highlightedValue}
                allowMulti={allowMulti}
            />
        </div>
    );
}

export default DuxAutoComplete;
