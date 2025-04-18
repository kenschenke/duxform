import { useSelector } from 'react-redux';
import DuxForm from '../../src/components/DuxForm.jsx';
import DuxAutoComplete from '../../src/components/DuxAutoComplete.jsx';
import { getFormFieldError, isFieldValidOrPristine } from "../../src/helpers.js";

function AutoComplete() {
    const states = [
        {label:'Alabama', value:'AL'},
        {label:'Alaska', value:'AK'},
        {label:'Arizona', value:'AZ'},
        {label:'Arkansas', value:'AR'},
        {label:'California', value:'CA'},
        {label:'Colorado', value:'CO'},
        {label:'Connecticut', value:'CT'},
        {label:'Delaware', value:'DE'},
        {label:'Florida', value:'FL'},
        {label:'Georgia', value:'GA'},
        {label:'Hawaii', value:'HI'},
        {label:'Idaho', value:'ID'},
        {label:'Illinois', value:'IL'},
        {label:'Indiana', value:'IN'},
        {label:'Iowa', value:'IA'},
        {label:'Kansas', value:'KS'},
        {label:'Kentucky', value:'KY'},
        {label:'Louisiana', value:'LA'},
        {label:'Maine', value:'ME'},
        {label:'Maryland', value:'MD'},
        {label:'Massachusetts', value:'MA'},
        {label:'Michigan', value:'MI'},
        {label:'Minnesota', value:'MN'},
        {label:'Mississippi', value:'MS'},
        {label:'Missouri', value:'MO'},
        {label:'Montana', value:'MT'},
        {label:'Nebraska', value:'NE'},
        {label:'Nevada', value:'NV'},
        {label:'New Hampshire', value:'NH'},
        {label:'New Jersey', value:'NJ'},
        {label:'New Mexico', value:'NM'},
        {label:'New York', value:'NY'},
        {label:'North Carolina', value:'NC'},
        {label:'North Dakota', value:'ND'},
        {label:'Ohio', value:'OH'},
        {label:'Oklahoma', value:'OK'},
        {label:'Oregon', value:'OR'},
        {label:'Pennsylvania', value:'PA'},
        {label:'Rhode Island', value:'RI'},
        {label:'South Carolina', value:'SC'},
        {label:'South Dakota', value:'SD'},
        {label:'Tennessee', value:'TN'},
        {label:'Texas', value:'TX'},
        {label:'Utah', value:'UT'},
        {label:'Vermont', value:'VT'},
        {label:'Virginia', value:'VA'},
        {label:'Washington', value:'WA'},
        {label:'West Virginia', value:'WV'},
        {label:'Wisconsin', value:'WI'},
        {label:'Wyoming', value:'WY'}
    ];

    const addrbook = [
        {label:'john.doe@example.com', value:'john.doe@example.com'},
        {label:'jane.doe@example.com', value:'jane.doe@example.com'},
        {label:'ed.smith@example.com', value:'ed.smith@example.com'},
        {label:'al.jones@example.com', value:'al.jones@example.com'}
    ];

    const usstateValid = useSelector(state => isFieldValidOrPristine(state, 'autocomplete', 'usstate'));
    const visitedstatesValid = useSelector(state => isFieldValidOrPristine(state, 'autocomplete', 'visitedstates'));
    const recipientsValid = useSelector(state => isFieldValidOrPristine(state, 'autocomplete', 'recipients'));
    const recipientsError = useSelector(state => getFormFieldError(state, 'autocomplete', 'recipients'));

    const validateEmail = value => {
        const email = value.trim();
        const found = email.search(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}\b/);
        if (found >= 0) {
            return undefined;
        } else {
            return 'Invalid email address';
        }
    };

    return (
        <DuxForm name="autocomplete">
            <div className="form-group">
                <label>Type an American State</label>
                <DuxAutoComplete
                    name="usstate"
                    className={'form-control' + (usstateValid ? '' : ' is-invalid')}
                    items={states}
                    nextField="usstateallownew"
                />
                <small className="form-text text-danger" style={{height:'.8em'}}>
                    {usstateValid ? '' : 'Please type a valid American State'}
                </small>
            </div>
            <div className="form-group">
                <label>Type an American State or Make up a State Name</label>
                <DuxAutoComplete
                    name="usstateallownew"
                    className="form-control"
                    items={states}
                    allowNewItems={true}
                    nextField="visitedstates"
                />
                <small className="form-text">
                    Type an existing state or type a new one such as Puerto Rico
                </small>
            </div>
            <div className="form-group">
                <label>States I Have Visited</label>
                <DuxAutoComplete
                    name="visitedstates"
                    className={'form-control' + (visitedstatesValid ? '' : ' is-invalid')}
                    items={states}
                    allowMulti={true}
                    nextField="recipients"
                />
                <small className="form-text text-danger" style={{height:'.8em'}}>
                    {visitedstatesValid ? '' : 'Please select from the list of valid American States'}
                </small>
            </div>
            <div className="form-group">
                <label>Email Recipients</label>
                <DuxAutoComplete
                    name="recipients"
                    className={'form-control' + (recipientsValid ? '' : ' is-invalid')}
                    items={addrbook}
                    allowMulti={true}
                    allowNewItems={true}
                    validateItem={validateEmail}
                    nextField="usstate"
                />
                <small className="form-text">
                    Select from the list of "example.com" addresses or type a new email address,
                    followed by a comma, semi-colon, or Enter.  Email addresses are validated to
                    match a valid email address.  Try typing an invalid address such as "john@foo".
                </small>
                <small className="form-text text-danger" style={{height:'.8em'}}>
                    {recipientsValid ? '' : recipientsError}
                </small>
            </div>
        </DuxForm>
    );
}

export default AutoComplete;
