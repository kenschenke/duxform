import DuxForm from '../../src/components/DuxForm.jsx';
import DuxInput from '../../src/components/DuxInput.jsx';

function Formatting() {
    const formatNumber = value => {
        if (value.length === 10) {
            return `(${value.substr(0,3)}) ${value.substr(3,3)}-${value.substr(6)}`;
        }

        return value;
    };

    const formatArray = value => {
        if (Array.isArray(value)) {
            return value.join(',');
        }

        return value;
    };

    return (
        <DuxForm name="formatting">
            <div className="form-group">
                <label>Formatting Demo (type 10 digits)</label>
                <DuxInput name="formatdemo" format={formatNumber} className="form-control"/>
            </div>
            <div className="form-group">
                <label>Type a string with of upper and lower case</label>
                <DuxInput name="normalization" normalize={value => value.toLowerCase()} className="form-control"/>
            </div>
            <div className="form-group">
                <label>Type a few words separated by commas</label>
                <DuxInput
                    name="parsing"
                    className="form-control"
                    parse={value => value.split(',').map(v => v.trim())}
                    format={formatArray}
                />
            </div>
        </DuxForm>
    );
}

export default Formatting;
