import { useDispatch } from 'react-redux';
import DuxForm from '../../src/components/DuxForm.jsx';
import DuxInput from '../../src/components/DuxInput.jsx';
import { setFormFieldValue } from '../../src/store';

function Checkboxes() {
    const dispatch = useDispatch();

    const noDefaultSetClicked = () => {
        dispatch(setFormFieldValue({
            form: 'checkboxes',
            field: 'nodefault',
            value: true,
        }));
    };

    const defaultFalseSetClicked = () => {
        dispatch(setFormFieldValue({
            form: 'checkboxes',
            field: 'defaultfalse',
            value: true,
        }));
    };

    const defaultTrueSetClicked = () => {
        dispatch(setFormFieldValue({
            form: 'checkboxes',
            field: 'defaulttrue',
            value: false,
        }));
    };

    return (
        <DuxForm name="checkboxes">
            <div className="input-group">
                <div className="form-check">
                    <DuxInput name="nodefault" type="checkbox" className="form-check-input"/>
                    <label className="form-check-label">No Default</label>
                </div>
                <button type="button" className="btn btn-secondary ml-2" onClick={noDefaultSetClicked}>Set</button>
            </div>
            <div className="input-group mt-3">
                <div className="form-check">
                    <DuxInput name="defaultfalse" type="checkbox" className="form-check-input" defaultChecked={false}/>
                    <label className="form-check-label">Default False</label>
                </div>
                <button type="button" className="btn btn-secondary ml-2" onClick={defaultFalseSetClicked}>Set</button>
            </div>
            <div className="input-group mt-3">
                <div className="form-check">
                    <DuxInput name="defaulttrue" type="checkbox" className="form-check-input" defaultChecked={true}/>
                    <label className="form-check-label">Default True</label>
                </div>
                <button type="button" className="btn btn-secondary ml-2" onClick={defaultTrueSetClicked}>Set</button>
            </div>
        </DuxForm>
    );
}

export default Checkboxes;
