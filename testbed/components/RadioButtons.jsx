import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DuxForm } from '../../src/DuxForm';
import { DuxInput } from '../../src/DuxInput';
import { setFormFieldValue } from '../../src/actions-input';

const mapProps = state => {
    return {

    };
};

const mapDispatch = dispatch => {
    return {
        noDefaultSetClicked() {
            dispatch(setFormFieldValue('radiobuttons', 'nodefault', 'two'));
        },

        defaultSetClicked() {
            dispatch(setFormFieldValue('radiobuttons', 'defaultvalue', 'one'));
        }
    };
};

class RadioButtonsUi extends React.Component {
    render() {
        return (
            <DuxForm name="radiobuttons">
                <div className="form-group">
                    <label>No Default</label>
                    <div className="form-check">
                        <DuxInput name="nodefault" className="form-check-input" type="radio" value="one"/>
                        <label className="form-check-label">One</label>
                    </div>
                    <div className="form-check">
                        <DuxInput name="nodefault" className="form-check-input" type="radio" value="two"/>
                        <label className="form-check-label">Two</label>
                    </div>
                    <div className="form-check">
                        <DuxInput name="nodefault" className="form-check-input" type="radio" value="three"/>
                        <label className="form-check-label">Three</label>
                    </div>
                    <button type="button" className="btn btn-secondary" onClick={this.props.noDefaultSetClicked}>Set</button>
                </div>
                <div className="form-group">
                    <label>Default Value</label>
                    <div className="form-check">
                        <DuxInput name="defaultvalue" className="form-check-input" type="radio" value="one"/>
                        <label className="form-check-label">One</label>
                    </div>
                    <div className="form-check">
                        <DuxInput name="defaultvalue" className="form-check-input" type="radio" value="two" defaultChecked={true}/>
                        <label className="form-check-label">Two</label>
                    </div>
                    <div className="form-check">
                        <DuxInput name="defaultvalue" className="form-check-input" type="radio" value="three"/>
                        <label className="form-check-label">Three</label>
                    </div>
                    <button type="button" className="btn btn-secondary" onClick={this.props.defaultSetClicked}>Set</button>
                </div>
            </DuxForm>
        );
    }
}

RadioButtonsUi.propTypes = {
    noDefaultSetClicked: PropTypes.func.isRequired,
    defaultSetClicked: PropTypes.func.isRequired
};

export const RadioButtons = connect(mapProps, mapDispatch)(RadioButtonsUi);
