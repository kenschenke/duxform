import { useDispatch, useSelector } from 'react-redux';
import DuxForm from '../../src/components/DuxForm.jsx';
import DuxAutoComplete from '../../src/components/DuxAutoComplete.jsx';
import { getFormFieldError, isFieldValidOrPristine } from '../../src/helpers';
import {
    clearAutocompleteSelection,
    setAutocompleteMultiSelectValues,
    setAutocompleteSingleSelectValue,
} from "../../src/store";

function AutoComplete() {
    const stateItems = [
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

    const singleNoNewValid = useSelector(state => isFieldValidOrPristine(state, 'autocomplete', 'singlenonew'));
    const multiNoNewValid = useSelector(state => isFieldValidOrPristine(state, 'autocomplete', 'multinonew'));
    const validateValid = useSelector(state => isFieldValidOrPristine(state, 'autocomplete', 'validateitem'));
    const singleDefaultValueValid = useSelector(state => isFieldValidOrPristine(state, 'autocomplete', 'singledefaultvalue'));
    const multiDefaultValueValid = useSelector(state => isFieldValidOrPristine(state, 'autocomplete', 'multidefaultvalue'));
    const validateError = useSelector(state => getFormFieldError(state, 'autocomplete', 'validateitem'));

    const dispatch = useDispatch();

    const clearSelection = name => {
        dispatch(clearAutocompleteSelection({
            form: 'autocomplete',
            field: name,
        }));
    };

    const setSingleValue = () => {
        dispatch(setAutocompleteSingleSelectValue({
            form: 'autocomplete',
            field: 'singleset',
            value: 'MO',
            items: stateItems,
            valid: true,
        }));
    };

    const setMultiValue = () => {
        dispatch(setAutocompleteMultiSelectValues({
            form: 'autocomplete',
            field: 'multiset',
            values: ['MO', 'MI'],
            items: stateItems,
            valid: true,
        }));
    };

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
                <label>Single Selection, No New Items</label>
                <DuxAutoComplete
                    className={'form-control' + (singleNoNewValid ? '' : ' is-invalid')}
                    name="singlenonew"
                    allowMulti={false}
                    allowNewItems={false}
                    items={stateItems}
                    nextField="singlenew"
                />
                <small className="form-text text-danger" style={{height:'.8em'}}>{singleNoNewValid ? '' : 'You must select a state'}</small>
            </div>
            <div className="form-group">
                <label>Single Selection, New Items Allowed</label>
                <DuxAutoComplete
                    className="form-control"
                    name="singlenew"
                    allowMulti={false}
                    allowNewItems={true}
                    items={stateItems}
                    nextField="singleset"
                />
            </div>
            <div className="form-group">
                <label>Single Selection, With Set And Clear</label>
                <DuxAutoComplete
                    className="form-control"
                    name="singleset"
                    allowMulti={false}
                    allowNewItems={false}
                    items={stateItems}
                    nextField="multinonew"
                />
                <button type="button" className="btn btn-secondary" onClick={setSingleValue}>Set Value</button>
                <button type="button" className="btn btn-secondary ml-2" onClick={() => clearSelection('singleset')}>Clear Selection</button>
            </div>
            <div className="form-group">
                <label>Multi Selection, No New Items</label>
                <DuxAutoComplete
                    className={'form-control' + (multiNoNewValid ? '' : ' is-invalid')}
                    name="multinonew"
                    allowMulti={true}
                    allowNewItems={false}
                    items={stateItems}
                    nextField="multinew"
                />
                <small className="form-text text-danger" style={{height:'.8em'}}>{multiNoNewValid ? '' : 'You must select at least one state'}</small>
            </div>
            <div className="form-group">
                <label>Multi Selection, New Items Allowed</label>
                <DuxAutoComplete
                    className="form-control"
                    name="multinew"
                    allowMulti={true}
                    allowNewItems={true}
                    items={stateItems}
                    nextField="multiset"
                />
            </div>
            <div className="form-group">
                <label>Multi Selection, With Set And Clear</label>
                <DuxAutoComplete
                    className="form-control"
                    name="multiset"
                    allowMulti={true}
                    allowNewItems={true}
                    items={stateItems}
                    nextField="validateitem"
                />
                <button type="button" className="btn btn-secondary" onClick={setMultiValue}>Set Value</button>
                <button type="button" className="btn btn-secondary ml-2" onClick={() => clearSelection('multiset')}>Clear Selection</button>
            </div>
            <div className="form-group">
                <label>Item Validation</label>
                <DuxAutoComplete
                    className={'form-control' + (validateValid ? '' : ' is-invalid')}
                    name="validateitem"
                    allowMulti={true}
                    allowNewItems={true}
                    items={addrbook}
                    validateItem={validateEmail}
                    nextField="singledefaultvalue"
                />
                <small className="form-text text-danger" style={{height:'.8em'}}>{validateValid ? '' : validateError}</small>
            </div>
            <div className="form-group">
                <label>Single Selection, Default Value</label>
                <DuxAutoComplete
                    className={'form-control' + (singleDefaultValueValid ? '' : ' is-invalid')}
                    name="singledefaultvalue"
                    allowMulti={false}
                    allowNewItems={false}
                    items={stateItems}
                    nextField="multidefaultvalue"
                    defaultValue="MO"
                />
                <small className="form-text text-danger" style={{height:'.8em'}}>{singleDefaultValueValid ? '' : 'You must select a state'}</small>
            </div>
            <div className="form-group">
                <label>Multi Selection, Default Values</label>
                <DuxAutoComplete
                    className={'form-control' + (multiDefaultValueValid ? '' : ' is-invalid')}
                    name="multidefaultvalue"
                    allowMulti={true}
                    allowNewItems={false}
                    defaultValue={['MO','MI']}
                    items={stateItems}
                    nextField="singlenonew"
                />
                <small className="form-text text-danger" style={{height:'.8em'}}>{multiDefaultValueValid ? '' : 'You must select at least one state'}</small>
            </div>
        </DuxForm>
     );
}

export default AutoComplete;
