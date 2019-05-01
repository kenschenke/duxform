import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DuxForm from '../../src/DuxForm';
import DuxInput from '../../src/DuxInput';
import { setFormFieldValue } from '../../src/actions-input';

const mapProps = state => {
    return {

    };
};

const mapDispatch = dispatch => {
    return {
        noDefaultSetClicked() {
            const fourweeksago = new Date();
            fourweeksago.setTime(fourweeksago.getTime() - 7 * 60 * 60 * 24 * 4 * 1000);
            dispatch(setFormFieldValue('datefields', 'nodefault', fourweeksago));
        },

        defaultSetClicked() {
            const twodaysago = new Date();
            twodaysago.setTime(twodaysago.getTime() - 2 * 60 * 60 * 24 * 1000);
            dispatch(setFormFieldValue('datefields', 'defaultvalue', twodaysago));
        }
    };
};

class DateFieldsUi extends React.Component {
    constructor(props) {
        super(props);

        this.defaultDate = new Date();
        this.defaultDate.setTime(this.defaultDate.getTime() - 7 * 60 * 60 * 24 * 1000);  // one week
    }

    render() {
        return (
            <DuxForm name="datefields">
                <div className="form-group">
                    <label>No Default</label>
                    <div className="input-group">
                        <DuxInput name="nodefault" className="form-control" dataType="date"/>
                        <div className="input-group-append">
                            <button type="button" className="btn btn-secondary" onClick={this.props.noDefaultSetClicked}>Set</button>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label>Default Value</label>
                    <div className="input-group">
                        <DuxInput name="defaultvalue" className="form-control" dataType="date" defaultValue={this.defaultDate}/>
                        <div className="input-group-append">
                            <button type="button" className="btn btn-secondary" onClick={this.props.defaultSetClicked}>Set</button>
                        </div>
                    </div>
                </div>
            </DuxForm>
        );
    }
}

DateFieldsUi.propTypes = {
    noDefaultSetClicked: PropTypes.func.isRequired,
    defaultSetClicked: PropTypes.func.isRequired
};

export const DateFields = connect(mapProps, mapDispatch)(DateFieldsUi);
