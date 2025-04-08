import { useDispatch } from 'react-redux';
import DuxForm from "../../src/components/DuxForm.jsx";
import DuxInput from "../../src/components/DuxInput.jsx";
import { setFormFieldValue } from '../../src/store';

function DateFields() {
    const dispatch = useDispatch();

    const defaultDate = new Date();
    defaultDate.setTime(defaultDate.getTime() - 7 * 60 * 60 * 24 * 1000);  // one week

    const defaultSetClicked = () => {
        const twodaysago = new Date();
        twodaysago.setTime(twodaysago.getTime() - 2 * 60 * 60 * 24 * 1000);
        dispatch(setFormFieldValue({
            form: 'datefields',
            field: 'defaultvalue',
            value: twodaysago,
        }));
    };

    const noDefaultSetClicked = () => {
        const twodaysago = new Date();
        twodaysago.setTime(twodaysago.getTime() - 2 * 60 * 60 * 24 * 1000);
        dispatch(setFormFieldValue({
            form: 'datefields',
            field: 'nodefault',
            value: twodaysago,
        }));
    };

    return (
        <DuxForm name="datefields">
            <div className="form-group">
                <label>No Default</label>
                <div className="input-group">
                    <DuxInput name="nodefault" className="form-control" dataType="date"/>
                    <div className="input-group-append">
                        <button type="button" className="btn btn-secondary" onClick={noDefaultSetClicked}>Set</button>
                    </div>
                </div>
            </div>
            <div className="form-group">
                <label>Default Value</label>
                <div className="input-group">
                    <DuxInput name="defaultvalue" className="form-control" dataType="date" defaultValue={defaultDate}/>
                    <div className="input-group-append">
                        <button type="button" className="btn btn-secondary" onClick={defaultSetClicked}>Set</button>
                    </div>
                </div>
            </div>
        </DuxForm>
    );
}

export default DateFields;
