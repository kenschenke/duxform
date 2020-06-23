import { fieldData } from '../actions-input';
import { autocompleteAddNewItem, autocompleteDropdownMatches,
    autocompleteUpArrowPressed, autocompleteDownArrowPressed, autocompleteAddSelectedItem,
    autocompleteRemoveSelectedItem } from '../actions-autocomplete';
import { getFormFieldData, isAutoCompleteValueHighlighted } from '../helpers';

export const mapDuxAutoCompleteProps = (state, props) => {
    return {
        selectedItems: getFormFieldData(state, props.formName, props.name, 'selectedItems', []),
        inputValue: getFormFieldData(state, props.formName, props.name, 'inputValue', ''),
        highlightedValue: getFormFieldData(state, props.formName, props.name, 'highlightedValue', '')
    };
};

export const mapDuxAutoCompleteDispatch = dispatch => {
    return {
        init(props) {
            dispatch(fieldData(props.formName, props.name, {
                valid: false,
                pristine: true
            }));
            dispatch(autocompleteDropdownMatches(props.formName, props.name, []));

            if (props.defaultValue !== undefined) {
                if (props.allowMulti) {
                    if (Array.isArray(props.defaultValue)) {
                        let selected = [];
                        props.defaultValue.forEach(value => {
                            const matches = props.items.filter(item => value === item.value);
                            if (matches.length === 1) {
                                selected.push({
                                    label: matches[0].label,
                                    labelU: matches[0].label.toUpperCase(),
                                    value
                                });
                            }
                        });
                        if (selected.length) {
                            dispatch(fieldData(props.formName, props.name, {
                                valid: true,
                                selectedItems: selected
                            }));
                        }
                    }
                } else {
                    const matches = props.items.filter(item => props.defaultValue === item.value);
                    if (matches.length === 1) {
                        dispatch(fieldData(props.formName, props.name, {
                            valid: true,
                            value: matches[0].value,
                            inputValue: matches[0].label
                        }));
                    }
                }
            }
        },

        setDropdownMatches(name, formName, matches) {
            dispatch(autocompleteDropdownMatches(formName, name, matches));
        },

        setFieldData(name, formName, data) {
            dispatch(fieldData(formName, name, data));
        },

        handleBlur(props, items) {
            if (props.allowMulti) {
                if (isAutoCompleteValueHighlighted(props) && props.allowNewItems) {
                    const inputValue = props.inputValue.trim();
                    if (inputValue.length) {
                        if (props.validateItem) {
                            let error = props.validateItem(props.inputValue, props.formName, props.name);
                            dispatch(fieldData(props.formName, props.name, {
                                valid: error === undefined,
                                error: error !== undefined ? error : ''
                            }));
                            if (error === undefined) {
                                dispatch(autocompleteAddNewItem(props.formName, props.name, props.inputValue))
                            }
                        } else {
                            dispatch(fieldData(props.formName, props.name, {
                                valid: true,
                                error: ''
                            }));
                            dispatch(autocompleteAddNewItem(props.formName, props.name, inputValue));
                        }
                        dispatch(autocompleteDropdownMatches(props.formName, props.name, []));
                    }
                }
            } else {
                const inputValue = props.inputValue.trim();
                const inputValueU = inputValue.toUpperCase();
                const matches = items.filter(item => {
                    return inputValueU === item.labelU;
                });
                if (matches.length === 1) {
                    dispatch(fieldData(props.formName, props.name, {
                        value: matches[0].value,
                        inputValue: matches[0].label,
                        valid: true
                    }));
                } else if (props.allowNewItems) {
                    const inputValue = props.inputValue.trim();
                    if (inputValue.length && props.validateItem) {
                        let error = props.validateItem(props.inputValue, props.formName, props.name);
                        dispatch(fieldData(props.formName, props.name, {
                            valid: error === undefined,
                            error: error !== undefined ? error : '',
                            value: error === undefined ? inputValue : ''
                        }));
                    } else {
                        dispatch(fieldData(props.formName, props.name, {
                            valid: true,
                            error: '',
                            value: inputValue
                        }));
                    }
                } else {
                    dispatch(fieldData(props.formName, props.name, {
                        valid: false,
                        value: ''
                    }));
                }
            }

            if (props.onBlur) {
                props.onBlur(props.name);
            }

            setTimeout(() => {
                dispatch(autocompleteDropdownMatches(props.formName, props.name, []));
            }, 150);
        },

        handleFocus(props) {
            if (props.onFocus) {
                props.onFocus(props.name);
            }
        },

        handleChange(value, props, items) {
            let matches = [];
            const val = value.trim();
            if (val.length) {
                const valU = val.toUpperCase();
                matches = items.filter(item => {
                    return (valU.length && item.labelU.indexOf(valU) !== -1) &&
                        props.selectedItems.filter(selectedItem => {
                            return item.value === selectedItem.value;
                        }).length === 0;
                });
            } else if (props.allowMulti) {
                dispatch(fieldData(props.formName, props.name, {valid: true}));
            }
            dispatch(autocompleteDropdownMatches(props.formName, props.name, matches));
            dispatch(fieldData(props.formName, props.name, {
                pristine: false,
                inputValue: value
            }));
        },

        handleKeyDown(event, props) {
            let returnValue = {
                moveToNextField: false,
                losingFocusBecauseOfEnter: false
            };

            switch (event.key) {
                case 'ArrowUp':
                    dispatch(autocompleteUpArrowPressed(props.formName, props.name));
                    break;

                case 'ArrowDown':
                    dispatch(autocompleteDownArrowPressed(props.formName, props.name));
                    break;

                case 'Escape':
                    dispatch(autocompleteDropdownMatches(props.formName, props.name, []));
                    break;

                case 'Enter':
                case 'Tab':
                    if (isAutoCompleteValueHighlighted(props)) {
                        dispatch(autocompleteAddSelectedItem(props.formName, props.name, props.allowMulti, props.highlightedValue));
                        event.preventDefault();
                    } else if (props.allowMulti && props.allowNewItems) {
                        const inputValue = props.inputValue.trim();
                        if (inputValue.length) {
                            if (props.validateItem) {
                                let error = props.validateItem(inputValue, props.formName, props.name);
                                dispatch(fieldData(props.formName, props.name, {
                                    valid: error === undefined,
                                    error: error !== undefined ? error : ''
                                }));
                                if (error === undefined) {
                                    dispatch(autocompleteAddNewItem(props.formName, props.name, inputValue));
                                }
                            } else {
                                dispatch(fieldData(props.formName, props.name, {
                                    valid: true,
                                    error: ''
                                }));
                                dispatch(autocompleteAddNewItem(props.formName, props.name, inputValue));
                            }
                        }
                    }

                    if (event.key === 'Enter') {
                        event.preventDefault();
                        if (props.nextField) {
                            if (props.allowMulti && isAutoCompleteValueHighlighted(props)) {
                                // Do nothing here.  The highlighted value was added
                                // to the selected items in the above code.  Pressing Enter
                                // adds the item but doesn't move the focus to the next field.
                            } else {
                                if (props.allowMulti || isAutoCompleteValueHighlighted(props)) {
                                    returnValue.losingFocusBecauseOfEnter = true;
                                }
                                returnValue.moveToNextField = true;
                            }
                        }
                    }

                    dispatch(autocompleteDropdownMatches(props.formName, props.name, []));
                    break;
            }

            return returnValue;
        },

        handleKeyPress(event, props) {
            dispatch(fieldData(props.formName, props.name, {valid:false}));

            if (props.allowMulti && props.multiSeparators.indexOf(event.key) !== -1) {
                event.preventDefault();
                if (props.highlightedValue.length) {
                    dispatch(fieldData(props.formName, props.name, {
                        valid: true,
                        error: ''
                    }));
                    dispatch(autocompleteAddSelectedItem(props.formName, props.name, props.allowMulti, props.highlightedValue));
                } else if (props.allowNewItems) {
                    if (props.validateItem) {
                        let error = props.validateItem(props.inputValue, props.formName, props.name);
                        dispatch(fieldData(props.formName, props.name, {
                            valid: error === undefined,
                            error: error !== undefined ? error : ''
                        }));
                        if (error === undefined) {
                            dispatch(autocompleteAddNewItem(props.formName, props.name, props.inputValue));
                        }
                    } else {
                        dispatch(fieldData(props.formName, props.name, {
                            valid: true,
                            error: ''
                        }));
                        dispatch(autocompleteAddNewItem(props.formName, props.name, props.inputValue));
                    }
                }
                dispatch(autocompleteDropdownMatches(props.formName, props.name, []));
            }
        },

        removeSelectedItem(name, formName, value) {
            dispatch(autocompleteRemoveSelectedItem(formName, name, value));
        }
    };
};
