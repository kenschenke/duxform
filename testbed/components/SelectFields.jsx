import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DuxForm } from '../../src/DuxForm';
import { DuxInput } from '../../src/DuxInput';
import { setFormFieldValue } from '../../src/actions';

const mapProps = state => {
    return {

    };
};

const mapDispatch = dispatch => {
    return {
        noDefaultSetClicked() {
            dispatch(setFormFieldValue('selectfields', 'nodefault', 'three'));
        },

        defaultSetClicked() {
            dispatch(setFormFieldValue('selectfields', 'defaultvalue', 'four'));
        }
    };
};

class SelectFieldsUi extends React.Component {
    render() {
        return (
            <DuxForm name="selectfields">
                <div className="form-group">
                    <label>No Default</label>
                    <div className="input-group">
                        <DuxInput name="nodefault" className="form-control" type="select">
                            <option value="one">One</option>
                            <option value="two">Two</option>
                            <option value="three">Three</option>
                            <option value="four">Four</option>
                            <option value="five">Five</option>
                        </DuxInput>
                        <div className="input-group-append">
                            <button type="button" className="btn btn-secondary" onClick={this.props.noDefaultSetClicked}>Set</button>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label>Default Value</label>
                    <div className="input-group">
                        <DuxInput name="defaultvalue" className="form-control" type="select" defaultValue="two">
                            <option value="one">One</option>
                            <option value="two">Two</option>
                            <option value="three">Three</option>
                            <option value="four">Four</option>
                            <option value="five">Five</option>
                        </DuxInput>
                        <div className="input-group-append">
                            <button type="button" className="btn btn-secondary" onClick={this.props.defaultSetClicked}>Set</button>
                        </div>
                    </div>
                </div>
            </DuxForm>
        );
    }
}

SelectFieldsUi.propTypes = {
    noDefaultSetClicked: PropTypes.func.isRequired,
    defaultSetClicked: PropTypes.func.isRequired
};

export const SelectFields = connect(mapProps, mapDispatch)(SelectFieldsUi);
