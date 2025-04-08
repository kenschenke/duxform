import { useDispatch } from 'react-redux';
import DuxForm from '../../src/components/DuxForm.jsx';
import DuxInput from '../../src/components/DuxInput.jsx';
import { setFormFieldValue } from '../../src/store';

function Formatting() {
    const dispatch = useDispatch();

    const noDefaultSetClicked = () => {
        dispatch(setFormFieldValue({
            form: 'formatting',
            field: 'nodefault',
            value: 32,
        }));
    };

    const formatDegrees = value => {
        if (isNaN(value)) {
            return '';
        }

        return value.toString() + ' Degrees';
    };

    const defaultSetClicked = () => {
        dispatch(setFormFieldValue({
            form: 'formatting',
            field: 'defaultvalue',
            value: 55,
        }));
    };

    return (
        <DuxForm name="formatting">
            <div className="form-group">
                <label>No Default Temperature</label>
                <div className="input-group">
                    <DuxInput name="nodefault" className="form-control" dataType="num" format={formatDegrees}/>
                    <div className="input-group-append">
                        <button type="button" className="btn btn-secondary" onClick={noDefaultSetClicked}>Set</button>
                    </div>
                </div>
            </div>
            <div className="form-group">
                <label>Default Temperature</label>
                <div className="input-group">
                    <DuxInput name="defaultvalue" className="form-control" dataType="num" defaultValue={50} format={formatDegrees}/>
                    <div className="input-group-append">
                        <button type="button" className="btn btn-secondary" onClick={defaultSetClicked}>Set</button>
                    </div>
                </div>
            </div>
        </DuxForm>
    );
}

export default Formatting;
