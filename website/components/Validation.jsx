import React from 'react';
import PropTypes from 'prop-types';
import { getFormError, getFormFieldError, isFieldValidOrPristine, isFormValid } from '../../src/helpers';
import { connect } from 'react-redux';
import { DuxForm } from '../../src/DuxForm';
import { DuxInput } from '../../src/DuxInput';

const mapProps = state => {
    return {
        nameValid: isFieldValidOrPristine(state, 'validation', 'fullname'),
        nameError: getFormFieldError(state, 'validation', 'fullname'),
        formValid: isFormValid(state, 'validation'),
        formError: getFormError(state, 'validation')
    };
};

class ValidationUi extends React.Component {
    validateName = value => {
        if (!value.length) {
            return "Name cannot be blank";
        }
    };

    validateForm = values => {
        if (values.country === "USA") {
            const phone = values.phone.replace(/[^0-9]/g, '');
            if (phone.length !== 10) {
                return "Phone numbers in the United States must be 10 digits long";
            }
        }
    };

    render() {
        return (
            <DuxForm name="validation" onValidate={this.validateForm}>
                <div className="form-group">
                    <label>Full Name</label>
                    <DuxInput
                        name="fullname"
                        onValidate={this.validateName}
                        className={'form-control' + (this.props.nameValid ? '' : ' is-invalid')}
                    />
                    <small className="form-text text-danger" style={{height:'.8em'}}>{this.props.nameValid ? '' : this.props.nameError}</small>
                </div>
                <div className="form-group">
                    <label>Phone Number</label>
                    <DuxInput name="phone" className="form-control"/>
                </div>
                <div className="form-group">
                    <label>Country</label>
                    <DuxInput name="country" className="form-control" defaultValue="Canada" type="select">
                        <option value="Canada">Canada</option>
                        <option value="USA">United States</option>
                    </DuxInput>
                </div>
                <button type="button" className="btn btn-secondary" disabled={!this.props.formValid}>Submit</button>
                <small className="form-text text-danger">{this.props.formError}</small>
            </DuxForm>
        );
    };
}

ValidationUi.propTypes = {
    nameValid: PropTypes.bool.isRequired,
    nameError: PropTypes.string.isRequired,
    formValid: PropTypes.bool.isRequired,
    formError: PropTypes.string.isRequired
};

export const Validation = connect(mapProps)(ValidationUi);
