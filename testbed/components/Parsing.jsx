import DuxForm from '../../src/components/DuxForm.jsx';
import DuxInput from '../../src/components/DuxInput.jsx';

function Parsing() {
    const formatExpiry = value => {
        if (isNaN(value)) {
            return value;
        }

        return Math.floor(value/100).toString() + '/' + Math.floor(value%100).toString();
    };

    const parseExpiry = value => {
        if (value.indexOf('/') === -1) {
            return value;
        }

        const parts = value.split('/');
        if (parts.length !== 2) {
            return value;
        }
        const month = parseInt(parts[0]);
        const year = parseInt(parts[1]);
        if (isNaN(month) || isNaN(year)) {
            return value;
        }

        return month * 100 + year;
    };

    return (
        <DuxForm name="parsing">
            <div className="form-group">
                <label>No Default</label>
                <div className="input-group">
                    <DuxInput name="nodefault" className="form-control" dataType="num" parse={parseExpiry} format={formatExpiry}/>
                </div>
            </div>
        </DuxForm>
    );
}

export default Parsing;
