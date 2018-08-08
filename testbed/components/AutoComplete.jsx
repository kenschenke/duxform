import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DuxForm } from '../../src/DuxForm';
import { DuxAutoComplete } from '../../src/DuxAutoComplete';
import { getFormFieldError, isFieldValidOrPristine } from '../../src/helpers';

const mapProps = state => {
    return {
        singleNoNewValid: isFieldValidOrPristine(state, 'autocomplete', 'singlenonew'),
        multiNoNewValid: isFieldValidOrPristine(state, 'autocomplete', 'multinonew'),
        validateValid: isFieldValidOrPristine(state, 'autocomplete', 'validateitem'),
        validateError: getFormFieldError(state, 'autocomplete', 'validateitem')
    };
};

const mapDispatch = dispatch => {
    return {

    };
};

class AutoCompleteUi extends React.Component {
    validateEmail = value => {
        const email = $.trim(value);
        const found = email.search(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}\b/);
        if (found >= 0) {
            return undefined;
        } else {
            return 'Invalid email address';
        }
    };

    render() {
        const items = [
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

        return (
            <DuxForm name="autocomplete">
                <div className="form-group">
                    <label>Single Selection, No New Items</label>
                    <DuxAutoComplete
                        className={'form-control' + (this.props.singleNoNewValid ? '' : ' is-invalid')}
                        name="singlenonew"
                        allowMulti={false}
                        allowNewItems={false}
                        items={items}
                        nextField="singlenew"
                    />
                    <small className="form-text text-danger" style={{height:'.8em'}}>{this.props.singleNoNewValid ? '' : 'You must select a state'}</small>
                </div>
                <div className="form-group">
                    <label>Single Selection, New Items Allowed</label>
                    <DuxAutoComplete
                        className="form-control"
                        name="singlenew"
                        allowMulti={false}
                        allowNewItems={true}
                        items={items}
                        nextField="multinonew"
                    />
                </div>
                <div className="form-group">
                    <label>Multi Selection, No New Items</label>
                    <DuxAutoComplete
                        className={'form-control' + (this.props.multiNoNewValid ? '' : ' is-invalid')}
                        name="multinonew"
                        allowMulti={true}
                        allowNewItems={false}
                        items={items}
                        nextField="multinew"
                    />
                    <small className="form-text text-danger" style={{height:'.8em'}}>{this.props.multiNoNewValid ? '' : 'You must select at least one state'}</small>
                </div>
                <div className="form-group">
                    <label>Multi Selection, New Items Allowed</label>
                    <DuxAutoComplete
                        className="form-control"
                        name="multinew"
                        allowMulti={true}
                        allowNewItems={true}
                        items={items}
                        nextField="validateitem"
                    />
                </div>
                <div className="form-group">
                    <label>Item Validation</label>
                    <DuxAutoComplete
                        className={'form-control' + (this.props.validateValid ? '' : ' is-invalid')}
                        name="validateitem"
                        allowMulti={true}
                        allowNewItems={true}
                        items={addrbook}
                        validateItem={this.validateEmail}
                        nextField="singlenonew"
                    />
                    <small className="form-text text-danger" style={{height:'.8em'}}>{this.props.validateValid ? '' : this.props.validateError}</small>
                </div>
            </DuxForm>
        );
    }
}

AutoCompleteUi.propTypes = {
    singleNoNewValid: PropTypes.bool.isRequired,
    multiNoNewValid: PropTypes.bool.isRequired,
    validateValid: PropTypes.bool.isRequired,
    validateError: PropTypes.string.isRequired
};

export const AutoComplete = connect(mapProps, mapDispatch)(AutoCompleteUi);
