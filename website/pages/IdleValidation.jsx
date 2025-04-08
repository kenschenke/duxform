import { useSelector } from 'react-redux';
import DuxForm from '../../src/components/DuxForm.jsx';
import DuxInput from '../../src/components/DuxInput.jsx';
import { isFieldValidOrPristine, getFormFieldError } from "../../src/helpers.js";

function IdleValidation() {
    const validateEmail = email => {
        return email.length && email.search(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}\b/) < 0 ?
            'Invalid email address' : undefined;
    };

    const emailValid = useSelector(state => isFieldValidOrPristine(state, 'idlevalidation', 'email'));
    const emailError = useSelector(state => getFormFieldError(state, 'idlevalidation', 'email'));

    return (
        <DuxForm name="idlevalidation">
            <div className="form-group">
                <label>Email Address</label>
                <DuxInput
                    name="email"
                    onIdleValidate={validateEmail}
                    idleValidateTimeout={2000}
                    className={'form-control' + (emailValid ? '' : ' is-invalid')}
                />
                <small className="form-text text-danger" style={{height:'.8em'}}>{emailValid ? '' : emailError}</small>
            </div>
            <button type="button" className="btn btn-secondary">Submit</button>
        </DuxForm>
    );
}

export default IdleValidation;
