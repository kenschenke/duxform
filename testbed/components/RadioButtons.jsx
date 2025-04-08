import { useDispatch } from 'react-redux';
import DuxForm from '../../src/components/DuxForm.jsx';
import DuxInput from '../../src/components/DuxInput.jsx';
import { setFormFieldValue } from '../../src/store';

function RadioButtons() {
    const dispatch = useDispatch();

    const defaultSetClicked = () => {
        dispatch(setFormFieldValue({
            form: 'radiobuttons',
            field: 'defaultvalue',
            value: 'one',
        }));
    };

    const noDefaultSetClicked = () => {
        dispatch(setFormFieldValue({
            form: 'radiobuttons',
            field: 'nodefault',
            value: 'two',
        }));
    };

    return (
        <DuxForm name="radiobuttons">
            <div className="form-group">
                <label>No Default</label>
                <div className="form-check">
                    <DuxInput name="nodefault" className="form-check-input" type="radio" value="one"/>
                    <label className="form-check-label">One</label>
                </div>
                <div className="form-check">
                    <DuxInput name="nodefault" className="form-check-input" type="radio" value="two"/>
                    <label className="form-check-label">Two</label>
                </div>
                <div className="form-check">
                    <DuxInput name="nodefault" className="form-check-input" type="radio" value="three"/>
                    <label className="form-check-label">Three</label>
                </div>
                <button type="button" className="btn btn-secondary" onClick={noDefaultSetClicked}>Set</button>
            </div>
            <div className="form-group">
                <label>Default Value</label>
                <div className="form-check">
                    <DuxInput name="defaultvalue" className="form-check-input" type="radio" value="one"/>
                    <label className="form-check-label">One</label>
                </div>
                <div className="form-check">
                    <DuxInput name="defaultvalue" className="form-check-input" type="radio" value="two" defaultChecked={true}/>
                    <label className="form-check-label">Two</label>
                </div>
                <div className="form-check">
                    <DuxInput name="defaultvalue" className="form-check-input" type="radio" value="three"/>
                    <label className="form-check-label">Three</label>
                </div>
                <button type="button" className="btn btn-secondary" onClick={defaultSetClicked}>Set</button>
            </div>
        </DuxForm>
    );
}

export default RadioButtons;
