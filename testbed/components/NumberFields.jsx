import { useDispatch } from 'react-redux';
import DuxForm from "../../src/components/DuxForm.jsx";
import DuxInput from "../../src/components/DuxInput.jsx";
import { setFormFieldValue } from '../../src/store';

function NumberFields() {
    const dispatch = useDispatch();

    const plainSetClicked = () => {
        dispatch(setFormFieldValue({
            form: 'numberfields',
            field: 'plain',
            value: 12345,
        }));
    };

    const dollarSetClicked = () => {
        dispatch(setFormFieldValue({
            form: 'numberfields',
            field: 'dollar',
            value: 12345,
        }));
    };

    const commasSetClicked = () => {
        dispatch(setFormFieldValue({
            form: 'numberfields',
            field: 'commas',
            value: 12345,
        }));
    };

    const decimalsSetClicked = () => {
        dispatch(setFormFieldValue({
            form: 'numberfields',
            field: 'decimals',
            value: 1234.5,
        }));
    };

    const allFormattingSetClicked = () => {
        dispatch(setFormFieldValue({
            form: 'numberfields',
            field: 'allformatting',
            value: 12345.6,
        }));
    };

    const defaultSetClicked = () => {
        dispatch(setFormFieldValue({
            form: 'numberfields',
            field: 'defaultvalue',
            value: 12345.6,
        }));
    };

    return (
        <DuxForm name="numberfields">
            <div className="form-group">
                <label>No commas, no decimal, no dollar sign</label>
                <div className="input-group">
                    <DuxInput name="plain" className="form-control" dataType="num"/>
                    <div className="input-group-append">
                        <button type="button" className="btn btn-secondary" onClick={plainSetClicked}>Set</button>
                    </div>
                </div>
            </div>
            <div className="form-group">
                <label>No Rounding</label>
                <DuxInput name="noround" className="form-control" dataType="num" round={false}/>
            </div>
            <div className="form-group">
                <label>With Dollar Sign</label>
                <div className="input-group">
                    <DuxInput name="dollar" className="form-control" dataType="num" showDollar={true}/>
                    <div className="input-group-append">
                        <button type="button" className="btn btn-secondary" onClick={dollarSetClicked}>Set</button>
                    </div>
                </div>
            </div>
            <div className="form-group">
                <label>With Commas</label>
                <div className="input-group">
                    <DuxInput name="commas" className="form-control" dataType="num" showCommas={true}/>
                    <div className="input-group-append">
                        <button type="button" className="btn btn-secondary" onClick={commasSetClicked}>Set</button>
                    </div>
                </div>
            </div>
            <div className="form-group">
                <label>With 2 Decimal Places</label>
                <div className="input-group">
                    <DuxInput name="decimals" className="form-control" dataType="num" precision={2}/>
                    <div className="input-group-append">
                        <button type="button" className="btn btn-secondary" onClick={decimalsSetClicked}>Set</button>
                    </div>
                </div>
            </div>
            <div className="form-group">
                <label>With All Numeric Formatting Options</label>
                <div className="input-group">
                    <DuxInput name="allformatting" className="form-control" dataType="num" showDollar={true} showCommas={true} precision={2}/>
                    <div className="input-group-append">
                        <button type="button" className="btn btn-secondary" onClick={allFormattingSetClicked}>Set</button>
                    </div>
                </div>
            </div>
            <div className="form-group">
                <label>Default Value</label>
                <div className="input-group">
                    <DuxInput name="defaultvalue" className="form-control" dataType="num" showDollar={true} showCommas={true} precision={2} defaultValue={123.4}/>
                    <div className="input-group-append">
                        <button type="button" className="btn btn-secondary" onClick={defaultSetClicked}>Set</button>
                    </div>
                </div>
            </div>
        </DuxForm>
    );
}

export default NumberFields;
