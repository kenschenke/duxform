import { useSelector } from 'react-redux';
import DuxForm from '../../src/components/DuxForm.jsx';
import DuxInput from '../../src/components/DuxInput.jsx';
import { getFormError, getFormFieldError, isFieldValidOrPristine, isFormValid } from "../../src/helpers.js";

function Validation() {
    const nameValid = useSelector(state => isFieldValidOrPristine(state, 'validation', 'fullname'));
    const nameError = useSelector(state => getFormFieldError(state, 'validation', 'fullname'));
    const formValid = useSelector(state => isFormValid(state, 'validation'));
    const formError = useSelector(state => getFormError(state, 'validation'));

    const validateName = value => {
        if (!value.length) {
            return "Name cannot be blank";
        }
    };

    const validateForm = values => {
        if (values.country === "USA") {
            const phone = values.phone.replace(/[^0-9]/g, '');
            if (phone.length !== 10) {
                return "Phone numbers in the United States must be 10 digits long";
            }
        }
    };

    return (
        <DuxForm name="validation" onValidate={validateForm}>
            <div className="form-group">
                <label>Full Name</label>
                <DuxInput
                    name="fullname"
                    onValidate={validateName}
                    className={'form-control' + (nameValid ? '' : ' is-invalid')}
                />
                <small className="form-text text-danger" style={{height:'.8em'}}>{nameValid ? '' : nameError}</small>
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
            <button type="button" className="btn btn-secondary" disabled={!formValid}>Submit</button>
            <small className="form-text text-danger">{formError}</small>
        </DuxForm>
    );
}

export default Validation;
