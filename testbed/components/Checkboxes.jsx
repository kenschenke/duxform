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
            dispatch(setFormFieldValue('checkboxes', 'nodefault', true));
        },

        defaultFalseSetClicked() {
            dispatch(setFormFieldValue('checkboxes', 'defaultfalse', true));
        },

        defaultTrueSetClicked() {
            dispatch(setFormFieldValue('checkboxes', 'defaulttrue', false));
        }
    };
};

class CheckboxesUi extends React.Component {
    render() {
        return (
            <DuxForm name="checkboxes">
                <div className="input-group">
                    <div className="form-check">
                        <DuxInput name="nodefault" type="checkbox" className="form-check-input"/>
                        <label className="form-check-label">No Default</label>
                    </div>
                    <button type="button" className="btn btn-secondary ml-2" onClick={this.props.noDefaultSetClicked}>Set</button>
                </div>
                <div className="input-group mt-3">
                    <div className="form-check">
                        <DuxInput name="defaultfalse" type="checkbox" className="form-check-input" defaultChecked={false}/>
                        <label className="form-check-label">Default False</label>
                    </div>
                    <button type="button" className="btn btn-secondary ml-2" onClick={this.props.defaultFalseSetClicked}>Set</button>
                </div>
                <div className="input-group mt-3">
                    <div className="form-check">
                        <DuxInput name="defaulttrue" type="checkbox" className="form-check-input" defaultChecked={true}/>
                        <label className="form-check-label">Default True</label>
                    </div>
                    <button type="button" className="btn btn-secondary ml-2" onClick={this.props.defaultTrueSetClicked}>Set</button>
                </div>
            </DuxForm>
        );
    }
}

CheckboxesUi.propTypes = {
    noDefaultSetClicked: PropTypes.func.isRequired,
    defaultFalseSetClicked: PropTypes.func.isRequired,
    defaultTrueSetClicked: PropTypes.func.isRequired
};

export const Checkboxes = connect(mapProps, mapDispatch)(CheckboxesUi);
