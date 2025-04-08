import { useDispatch } from 'react-redux';
import DuxForm from '../../src/components/DuxForm.jsx';
import DuxInput from '../../src/components/DuxInput.jsx';
import { setFormFieldValue } from '../../src/store';

function TextFields() {
    const dispatch = useDispatch();

    const setMixedClicked = () => {
        dispatch(setFormFieldValue({
            form: 'textfields',
            field: 'mixedcase',
            value: 'Mixed Case',
        }));
    };

    const setUpperCaseClicked = () => {
        dispatch(setFormFieldValue({
            form: 'textfields',
            field: 'uppercase',
            value: 'upper case'.toUpperCase(),
        }));
    };

    const setDefaultValueClicked = () => {
        dispatch(setFormFieldValue({
            form: 'textfields',
            field: 'defaultvalue',
            value: 'New Value',
        }));
    };

    return (
        <DuxForm name="textfields">
            <div className="form-group">
                <label>Mixed Case</label>
                <div className="input-group">
                    <DuxInput name="mixedcase" nextField="uppercase" className="form-control"/>
                    <div className="input-group-append">
                        <button className="btn btn-secondary" type="button" onClick={setMixedClicked}>Set</button>
                    </div>
                </div>
            </div>
            <div className="form-group">
                <label>Upper Case</label>
                <div className="input-group">
                    <DuxInput name="uppercase" nextField="defaultvalue" forceUpper={true} className="form-control"/>
                    <div className="input-group-append">
                        <button className="btn btn-secondary" type="button" onClick={setUpperCaseClicked}>Set</button>
                    </div>
                </div>
            </div>
            <div className="form-group">
                <label>Default Value</label>
                <div className="input-group">
                    <DuxInput name="defaultvalue" nextField="mixedcase" className="form-control" defaultValue="Default Value"/>
                    <div className="input-group-append">
                        <button className="btn btn-secondary" type="button" onClick={setDefaultValueClicked}>Set</button>
                    </div>
                </div>
            </div>
        </DuxForm>
    );
}

export default TextFields;
