import React from 'react';
import PropTypes from 'prop-types';
import { DuxForm } from '../../src/DuxForm';
import { DuxInput } from '../../src/DuxInput';
import { connect } from 'react-redux';
import { getFormData, getFormFieldValue } from '../../src/helpers';

const mapProps = state => {
    return {
        username: getFormFieldValue(state, 'asyncvalidation', 'username', ''),
        usernamePristine: getFormData(state, 'asyncvalidation', 'pristine', true)
    };
};

class AsyncValidationUi extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            validUsername: false,
            validatingUsername: false
        };
    }

    usernameBlur = () => {
        // Simulate an ajax request
        this.setState({validatingUsername:true});
        setTimeout(() => {
            this.setState({
                validUsername: this.props.username.toUpperCase().indexOf('X') !== -1,
                validatingUsername: false
            });
        }, 2000);  // two seconds
    };

    render() {
        let usernameTextClass = 'form-text';
        let usernameText = '';
        if (this.state.validatingUsername) {
            usernameTextClass += ' text-muted';
            usernameText = 'Validating username';
        } else if (!this.props.usernamePristine && !this.state.validUsername) {
            usernameTextClass += ' text-danger';
            usernameText = 'Username must contain the letter "x"';
        }
        return (
            <DuxForm name="asyncvalidation">
                <div className="form-group">
                    <label>Username</label>
                    <DuxInput name="username" className="form-control" onBlur={this.usernameBlur}/>
                    <small className={usernameTextClass} style={{height:'.8em'}}>{usernameText}</small>
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <DuxInput name="email" className="form-control"/>
                </div>
                <button
                    type="button"
                    className="btn btn-secondary"
                    disabled={!this.state.validUsername || this.state.validatingUsername}>
                    Submit
                </button>
            </DuxForm>
        );
    }
}

AsyncValidationUi.propTypes = {
    username: PropTypes.string.isRequired,
    usernamePristine: PropTypes.bool.isRequired
};

export const AsyncValidation = connect(mapProps)(AsyncValidationUi);
