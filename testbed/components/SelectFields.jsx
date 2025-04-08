import { useDispatch } from 'react-redux';
import DuxForm from '../../src/components/DuxForm.jsx';
import DuxInput from '../../src/components/DuxInput.jsx';
import { setFormFieldValue } from '../../src/store';

function TextFields() {
    const dispatch = useDispatch();

    const defaultSetClicked = () => {
        dispatch(setFormFieldValue({
            form: 'selectfields',
            field: 'defaultvalue',
            value: 'four',
        }));
    };

    const noDefaultSetClicked = () => {
        dispatch(setFormFieldValue({
            form: 'selectfields',
            field: 'nodefault',
            value: 'three',
        }));
    };

    return (
        <DuxForm name="selectfields">
            <div className="form-group">
                <label>No Default</label>
                <div className="input-group">
                    <DuxInput name="nodefault" className="form-control" type="select">
                        <option value="one">One</option>
                        <option value="two">Two</option>
                        <option value="three">Three</option>
                        <option value="four">Four</option>
                        <option value="five">Five</option>
                    </DuxInput>
                    <div className="input-group-append">
                        <button type="button" className="btn btn-secondary" onClick={noDefaultSetClicked}>Set</button>
                    </div>
                </div>
            </div>
            <div className="form-group">
                <label>Default Value</label>
                <div className="input-group">
                    <DuxInput name="defaultvalue" className="form-control" type="select" defaultValue="two">
                        <option value="one">One</option>
                        <option value="two">Two</option>
                        <option value="three">Three</option>
                        <option value="four">Four</option>
                        <option value="five">Five</option>
                    </DuxInput>
                    <div className="input-group-append">
                        <button type="button" className="btn btn-secondary" onClick={defaultSetClicked}>Set</button>
                    </div>
                </div>
            </div>
        </DuxForm>
    );
}

export default TextFields;
