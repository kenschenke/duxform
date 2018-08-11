import React from 'react';
import PropTypes from 'prop-types';
import { mapDuxAutoCompleteProps, mapDuxAutoCompleteDispatch } from './maps/DuxAutoComplete.map';
import { connect } from 'react-redux';
import { DuxAutoCompleteDropdown } from './DuxAutoCompleteDropdown';
import {findFormField} from "./helpers";

export class DuxAutoCompleteUi extends React.Component {
    constructor(props) {
        super(props);

        this.items = this.props.items.map(item => {
            return {
                label: item.label,
                labelU: item.label.toUpperCase(),
                value: item.value
            };
        });

        this._input = null;
        this._container = null;
        this._losingFocusBecauseOfEnter = false;
        props.init(props);
    }

    componentDidMount() {
        if (this._container) {
            this.props.setFieldData(this.props.name, this.props.formName, {
                left: this._container.offsetLeft,
                width: this._container.offsetWidth
            });
        }
    }

    onBlur = () => {
        if (this._losingFocusBecauseOfEnter) {
            // The user pressed Enter in the field and the input focus is moving to the next field.  We don't
            // want the handleBlur() function to be called because it will mess things up by looking at the partial
            // value in the input field and attempt to process that.  The input value has already been set by the
            // onKeyDown handler and will reflect in the state on the next refresh cycle.
            this._losingFocusBecauseOfEnter = false;
        } else {
            this.props.handleBlur(this.props, this.items);
        }
    };

    onChange = event => {
        this.props.handleChange(event.target.value, this.props, this.items);
    };

    onClick = () => {
        if (this._input) {
            this._input.focus();
        }
    };

    onFocus = () => {
        this.props.handleFocus(this.props);
    };

    onKeyDown = event => {
        const returnValue = this.props.handleKeyDown(event, this.props);
        this._losingFocusBecauseOfEnter = returnValue.losingFocusBecauseOfEnter;
        if (returnValue.moveToNextField) {
            const field = findFormField(this.props.formName, this.props.nextField);
            if (field !== undefined) {
                field.focus();
            }
        }
    };

    onKeyPress = event => {
        this.props.handleKeyPress(event, this.props);
    };

    render() {
        // determine which props to pass to child elements
        let childProps = {};
        for (let prop in this.props) {
            if (this.props.hasOwnProperty(prop)) {
                childProps[prop] = this.props[prop];
            }
        }
        delete childProps.className;
        delete childProps.onChange;
        delete childProps.onBlur;
        delete childProps.onFocus;
        delete childProps.onKeyDown;
        delete childProps.onKeyPress;
        delete childProps.value;
        delete childProps.formName;
        delete childProps.items;
        delete childProps.allowMulti;
        delete childProps.multiSeparators;
        delete childProps.allowNewItems;
        delete childProps.selectedItems;
        delete childProps.inputValue;
        delete childProps.highlightedValue;
        delete childProps.nextField;
        delete childProps.setFieldData;
        delete childProps.setDropdownMatches;
        delete childProps.removeSelectedItem;
        delete childProps.handleBlur;
        delete childProps.handleChange;
        delete childProps.handleFocus;
        delete childProps.handleKeyDown;
        delete childProps.handleKeyPress;
        delete childProps.formValidate;
        delete childProps.init;
        delete childProps.validateItem;

        const itemDivs = this.props.selectedItems.map(item => {
            return (
                <div key={item.value} className="duxformac-selected-item">{item.label} <span className="duxformac-remove-icon" onClick={() => this.props.removeSelectedItem(this.props.name, this.props.formName, item.value)}>X</span></div>
            );
        });

        return (
            <div onClick={this.onClick}>
                <div className={'duxformac-container ' + this.props.className} ref={(container) => {this._container = container}}>
                    {itemDivs}
                    <div style={{width:'auto',display:'inline',overflow:'none'}}>
                        <input
                            {...childProps}
                            className="duxformac-input"
                            onChange={this.onChange}
                            onBlur={this.onBlur}
                            onFocus={this.onFocus}
                            onKeyDown={this.onKeyDown}
                            onKeyPress={this.onKeyPress}
                            value={this.props.inputValue}
                            style={{width:(this.props.inputValue.length+5)+'ch'}}
                            ref={(input) => {this._input = input}}
                        />
                    </div>
                </div>
                <DuxAutoCompleteDropdown
                    name={this.props.name}
                    formName={this.props.formName}
                    allowMulti={this.props.allowMulti}
                />
            </div>
        );
    }
}

DuxAutoCompleteUi.propTypes = {
    name: PropTypes.string.isRequired,
    formName: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
    allowMulti: PropTypes.bool.isRequired,
    multiSeparators: PropTypes.any.isRequired,
    allowNewItems: PropTypes.bool.isRequired,
    selectedItems: PropTypes.array.isRequired,
    inputValue: PropTypes.string.isRequired,
    highlightedValue: PropTypes.any.isRequired,
    nextField: PropTypes.string,
    setFieldData: PropTypes.func.isRequired,
    setDropdownMatches: PropTypes.func.isRequired,
    removeSelectedItem: PropTypes.func.isRequired,
    className: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    onKeyDown: PropTypes.func,
    onKeyPress: PropTypes.func,

    init: PropTypes.func.isRequired,
    handleBlur: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleFocus: PropTypes.func.isRequired,
    handleKeyDown: PropTypes.func.isRequired,
    handleKeyPress: PropTypes.func.isRequired
};

DuxAutoCompleteUi.defaultProps = {
    className: '',
    allowMulti: false,
    multiSeparators: [',', ';'],
    allowNewItems: false
};

export const DuxAutoComplete = connect(mapDuxAutoCompleteProps, mapDuxAutoCompleteDispatch)(DuxAutoCompleteUi);
