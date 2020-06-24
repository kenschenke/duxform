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
            dispatch(setFormFieldValue('textarea', 'nodefault', 'One\nTwo\nThree'));
        },

        defaultSetClicked() {
            dispatch(setFormFieldValue('textarea', 'defaultvalue', 'New Line 1\nNew Line 2\nNew Line 3'))
        }
    };
};

class TextAreaUi extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            defaultValue: 'Line 1\nLine 2\nLine 3'
        }
    }
    render() {
        return (
            <DuxForm name="textarea">
                <div className="form-group">
                    <label>No Default</label>
                    <DuxInput name="nodefault" type="textarea" className="form-control" rows={5}/>
                </div>
                <button type="button" className="btn btn-secondary" onClick={this.props.noDefaultSetClicked}>Set</button>
                <div className="form-group">
                    <label>Default Value</label>
                    <DuxInput name="defaultvalue" type="textarea" className="form-control" rows={5} defaultValue={this.state.defaultValue}/>
                </div>
                <button type="button" className="btn btn-secondary" onClick={this.props.defaultSetClicked}>Set</button>
            </DuxForm>
        );
    }
}

TextAreaUi.propTypes = {
    noDefaultSetClicked: PropTypes.func.isRequired,
    defaultSetClicked: PropTypes.func.isRequired
};

export const TextArea = connect(mapProps, mapDispatch)(TextAreaUi);
