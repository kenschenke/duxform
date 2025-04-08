import { useDispatch } from 'react-redux';
import DuxForm from '../../src/components/DuxForm.jsx';
import DuxInput from '../../src/components/DuxInput.jsx';
import { setFormFieldValue } from '../../src/store';

function Normalization() {
    const dispatch = useDispatch();

    const formatPhone = value => {
        if (value.length !== 10) {
            return value;
        }

        return '(' + value.substr(0,3) + ') ' + value.substr(3,3) + '-' + value.substr(6);
    };

    const normalizePhone = value => {
        return value.replace(/[^0-9]/g, '');
    };

    const noDefaultSetClicked = () => {
        dispatch(setFormFieldValue({
            form: 'normalization',
            field: 'nodefault',
            value: '1112223333',
        }));
    };

    const defaultSetClicked = () => {
        dispatch(setFormFieldValue({
            form: 'normalization',
            field: 'defaultvalue',
            value: '1234567890',
        }));
    };

    return (
        <DuxForm name="normalization">
            <div className="form-group">
                <label>Phone (No Default)</label>
                <div className="input-group">
                    <DuxInput name="nodefault" className="form-control" format={formatPhone} normalize={normalizePhone}/>
                    <div className="input-group-append">
                        <button type="button" className="btn btn-secondary" onClick={noDefaultSetClicked}>Set</button>
                    </div>
                </div>
            </div>
            <div className="form-group">
                <label>Phone (With Default)</label>
                <div className="input-group">
                    <DuxInput name="defaultvalue" className="form-control" format={formatPhone} normalize={normalizePhone} defaultValue="8165551212"/>
                    <div className="input-group-append">
                        <button type="button" className="btn btn-secondary" onClick={defaultSetClicked}>Set</button>
                    </div>
                </div>
            </div>
        </DuxForm>
    );
}

export default Normalization;
