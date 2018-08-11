import React from 'react';
import PropTypes from 'prop-types';
import { mapDuxFormProps, mapDuxFormDispatch } from './maps/DuxForm.map';
import { connect } from 'react-redux';
import { findFormField } from './helpers';
import { DuxInputUi } from './DuxInput';
import { DuxAutoCompleteUi } from './DuxAutoComplete';

class DuxFormUi extends React.Component {
    constructor(props) {
        super(props);

        // Assemble a list of props to pass on to the <form>
        this.childProps = {};
        for (let key in this.props) {
            if (this.props.hasOwnProperty(key)) {
                this.childProps[key] = this.props[key];
            }
        }
        // But not these
        delete this.childProps.onSubmit;
        delete this.childProps.onValidate;
        delete this.childProps.initialFocus;
        delete this.childProps.formState;
        delete this.childProps.formValidate;
    }

    componentDidMount() {
        if (this.props.initialFocus) {
            setTimeout(() => {
                const field = findFormField(this.props.name, this.props.initialFocus);
                if (field !== undefined) {
                    field.focus();
                }
            }, 500);
        }
    }

    onSubmit = event => {
        event.preventDefault();

        if (this.props.formState.valid && this.props.onSubmit) {
            let values = {};
            for (let field in this.props.formState.fields) {
                if (this.props.formState.fields.hasOwnProperty(field)) {
                    values[field] = this.props.formState.fields[field].value;
                }
            }
            this.props.onSubmit(values);
        }
    };

    render() {
        return (
            <form onSubmit={this.onSubmit} {...this.childProps}>
                {this.renderChildren(this.props.children)}
            </form>
        );
    }

    renderChildren = children => {
        return React.Children.map(children, child => {
            if (child === null) {
                return child;
            }

            if (child.hasOwnProperty('type') && child.type.hasOwnProperty('WrappedComponent') && (child.type.WrappedComponent === DuxInputUi || child.type.WrappedComponent === DuxAutoCompleteUi)) {
                return React.cloneElement(child, {
                    formName: this.props.name,
                    formValidate: name => this.props.formValidate(name,this.props.onValidate)
                });
            } else if (child.hasOwnProperty('props') && typeof child.props.children === 'object') {
                if (child.hasOwnProperty('type') && typeof child.type === 'function' && (child.type.WrappedComponent.name === 'DuxInputUi' || child.type.WrappedComponent.name === 'DuxAutoCompleteUi')) {
                    return React.cloneElement(child, {
                        formName: this.props.name,
                        formValidate: name => this.props.formValidate(name,this.props.onValidate),
                        children: this.renderChildren(child.props.children)
                    });
                } else {
                    return React.cloneElement(child, {
                        children: this.renderChildren(child.props.children)
                    });
                }
            } else if (typeof child.type !== 'string') {
                if (child.hasOwnProperty('type') && child.type.hasOwnProperty('WrappedComponent') && (child.type.WrappedComponent.name === 'DuxInputUi' || child.type.WrappedComponent.name === 'DuxAutoCompleteUi')) {
                    return React.cloneElement(child, {
                        formName: this.props.name,
                        formValidate: name => this.props.formValidate(name,this.props.onValidate)
                    });
                } else {
                    return child;
                }
            } else {
                return child;
            }
        });
    };
}

DuxFormUi.propTypes = {
    name: PropTypes.string.isRequired,
    onSubmit: PropTypes.func,
    onValidate: PropTypes.func,
    initialFocus: PropTypes.string
};

export const DuxForm = connect(mapDuxFormProps, mapDuxFormDispatch)(DuxFormUi);
