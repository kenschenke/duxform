import { useDispatch } from 'react-redux';
import DuxForm from '../../src/components/DuxForm.jsx';
import DuxInput from '../../src/components/DuxInput.jsx';
import { setFormFieldValue } from '../../src/store';

function TextArea() {
    const dispatch = useDispatch();

    const noDefaultSetClicked = () => {
        dispatch(setFormFieldValue({
            form: 'textarea',
            field: 'nodefault',
            value: 'One\nTwo\nThree',
        }));
    };

    const defaultSetClicked = () => {
        dispatch(setFormFieldValue({
            form: 'textarea',
            field: 'defaultvalue',
            value: 'New Line 1\nNew Line 2\nNew Line 3',
        }));
    };

    const defaultValue = 'Line 1\nLine 2\nLine 3';

    return (
        <DuxForm name="textarea">
            <div className="form-group">
                <label>No Default</label>
                <DuxInput name="nodefault" type="textarea" className="form-control" rows={5}/>
            </div>
            <button type="button" className="btn btn-secondary" onClick={noDefaultSetClicked}>Set</button>
            <div className="form-group">
                <label>Default Value</label>
                <DuxInput name="defaultvalue" type="textarea" className="form-control" rows={5} defaultValue={defaultValue}/>
            </div>
            <button type="button" className="btn btn-secondary" onClick={defaultSetClicked}>Set</button>
        </DuxForm>
    );
}

export default TextArea;
