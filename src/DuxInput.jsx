import React from 'react';
import PropTypes from 'prop-types';
import { mapDuxInputProps, mapDuxInputDispatch } from './maps/DuxInput.map';
import { connect } from 'react-redux';
import _ from 'lodash';

class DuxInputUi extends React.Component {
    constructor(props) {
        super(props);

        this._input = null;
        this._select = null;
        this._idleHandler = null;

        props.init(props);
    }

    componentDidMount() {
        if (this.props.type === 'select') {
            if (this.props.defaultValue === undefined) {
                this.props.initValue(this._select.value, this.props);
            } else {
                this._select.value = this.props.defaultValue;
            }
        }

        if (this.props.type === 'checkbox') {
            this.props.initValue(!!this.props.defaultChecked, this.props);
        }

        if (this.props.type === 'radio' && this.props.defaultChecked) {
            this.props.initValue(this.props.value, this.props);
        }

        if (this.props.onIdleValidate && this.props.idleValidateTimeout) {
            this._idleHandler = _.debounce(this.props.handleIdleValidate, this.props.idleValidateTimeout);
        }
    }

    handleChange = event => {
        this.props.handleChange(event, this.props);
        if (this._idleHandler) {
            this._idleHandler(event.target.value, this.props);
        }
    };

    render() {
        // determine which props to pass to child elements
        let childProps = {};
        for (let prop in this.props) {
            if (this.props.hasOwnProperty(prop)) {
                childProps[prop] = this.props[prop];
            }
        }
        delete childProps.init;
        delete childProps.initValue;
        delete childProps.hasFocus;
        delete childProps.getFormattedValue;
        delete childProps.formName;
        delete childProps.formValidate;
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
        delete childProps.normalize;
        delete childProps.forceUpper;
        delete childProps.trim;
        delete childProps.onFocus;
        delete childProps.onBlur;
        delete childProps.handleChange;
        delete childProps.handleKeyDown;
        delete childProps.handleKeyPress;
        delete childProps.handleFocus;
        delete childProps.handleBlur;
        delete childProps.value;
        delete childProps.formValue;
        delete childProps.defaultValue;
        delete childProps.idleValidateTimeout;
        delete childProps.onIdleValidate;
        delete childProps.handleIdleValidate;

        if (this.props.type === 'select' || this.props.type === 'textarea') {
            delete childProps.type;
            delete childProps.children;
        } else if (this.props.type === 'radio') {
            delete childProps.value;
        } else if (this.props.type === 'checkbox') {
            delete childProps.defaultChecked;
        }

        if (this.props.type === 'select') {
            return (
                <select
                    onChange={e => this.handleChange(e)}
                    ref={select => this._select=select}
                    value={this.props.value}
                    {...childProps}
                >
                    {this.props.children}
                </select>
            );
        }

        if (this.props.type === 'checkbox') {
            return (
                <input
                    ref={input => this._input=input}
                    onChange={e => this.handleChange(e)}
                    {...childProps}
                    checked={this.props.value}
                />
            );
        }

        if (this.props.type === 'radio') {
            return (
                <input
                    ref={input => this._input=input}
                    onChange={e => this.handleChange(e)}
                    {...childProps}
                    value={this.props.value}
                    checked={this.props.value === this.props.formValue}
                />
            );
        }

        if (this.props.type === 'textarea') {
            return (
                <textarea
                    onChange={e => this.handleChange(e)}
                    {...childProps}
                    value={this.props.value}
                    onBlur={e => this.props.handleBlur(e, this.props)}
                    onFocus={() => this.props.handleFocus(this.props)}
                />
            );
        }

        const hasFocus = this._input!==null && document.activeElement===this._input;
        return (
            <input
                ref={input => this._input=input}
                onKeyDown={e => this.props.handleKeyDown(e, this.props)}
                onKeyPress={e => this.props.handleKeyPress(e, this.props)}
                onChange={e => this.handleChange(e)}
                onBlur={e => this.props.handleBlur(e, this.props)}
                onFocus={() => this.props.handleFocus(this.props)}
                {...childProps}
                value={hasFocus ? this.props.value : this.props.getFormattedValue(this.props)}
            />
        );
    }
}

DuxInputUi.propTypes = {
    // These are props from the component owner
    name: PropTypes.string.isRequired,
    nextField: PropTypes.string,
    onChange: PropTypes.func,
    onValidate: PropTypes.func,
    onEnterPressed: PropTypes.func,
    format: PropTypes.func,
    parse: PropTypes.func,
    dataType: PropTypes.string,
    precision: PropTypes.number.isRequired,
    showCommas: PropTypes.bool.isRequired,
    showDollar: PropTypes.bool.isRequired,
    round: PropTypes.bool.isRequired,
    normalize: PropTypes.func,
    forceUpper: PropTypes.bool,
    trim: PropTypes.bool,
    idleValidateTimeout: PropTypes.number.isRequired,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onIdleValidate: PropTypes.func,

    // These props are injected by the <form> element
    formName: PropTypes.string.isRequired,
    formValidate: PropTypes.func.isRequired,

    // These are props from the map
    value: PropTypes.any,
    formValue: PropTypes.any,  // this is the value from the state for this field
    getFormattedValue: PropTypes.func.isRequired,
    hasFocus: PropTypes.bool.isRequired,
    init: PropTypes.func.isRequired,
    initValue: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleKeyDown: PropTypes.func.isRequired,
    handleKeyPress: PropTypes.func.isRequired,
    handleFocus: PropTypes.func.isRequired,
    handleBlur: PropTypes.func.isRequired,
    handleIdleValidate: PropTypes.func.isRequired
};

const DuxInput = connect(mapDuxInputProps, mapDuxInputDispatch)(DuxInputUi);

DuxInput.defaultProps = {
    dataType: 'str',
    precision: 0,
    showCommas: false,
    showDollar: false,
    round: true,
    forceUpper: false,
    trim: true,
    idleValidateTimeout: 0
};

export default DuxInput;
