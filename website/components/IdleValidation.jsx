import React from 'react';
import PropTypes from 'prop-types';
import { getFormFieldError, isFieldValid } from '../../src/helpers';
import { connect } from 'react-redux';
import DuxForm from '../../src/DuxForm';
import DuxInput from '../../src/DuxInput';

const mapProps = state => {
    return {
        emailValid: isFieldValid(state, 'idlevalidation', 'email'),
        emailError: getFormFieldError(state, 'idlevalidation', 'email')
    };
};

class IdleValidationUi extends React.Component {
    validateEmail = email => {
        return email.length && email.search(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}\b/) < 0 ?
            'Invalid email address' : undefined;
    };

    render() {
        return (
            <DuxForm name="idlevalidation">
                <div className="form-group">
                    <label>Email Address</label>
                    <DuxInput
                        name="email"
                        onIdleValidate={this.validateEmail}
                        idleValidateTimeout={2000}
                        className={'form-control' + (this.props.emailValid ? '' : ' is-invalid')}
                    />
                    <small className="form-text text-danger" style={{height:'.8em'}}>{this.props.emailValid ? '' : this.props.emailError}</small>
                </div>
                <button type="button" className="btn btn-secondary">Submit</button>
            </DuxForm>
        );
    };
}

IdleValidationUi.propTypes = {
    emailValid: PropTypes.bool.isRequired,
    emailError: PropTypes.string.isRequired
};

export const IdleValidation = connect(mapProps)(IdleValidationUi);
