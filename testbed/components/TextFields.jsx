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
        setMixedClicked() {
            dispatch(setFormFieldValue('textfields', 'mixedcase', 'Mixed Case'));
        },

        setUpperCaseClicked() {
            dispatch(setFormFieldValue('textfields', 'uppercase', 'upper case'.toUpperCase()));
        },

        setDefaultValueClicked() {
            dispatch(setFormFieldValue('textfields', 'defaultvalue', 'New Value'));
        }
    };
};

class TextFieldsUi extends React.Component {
    render() {
        return (
            <DuxForm name="textfields">
                <div className="form-group">
                    <label>Mixed Case</label>
                    <div className="input-group">
                        <DuxInput name="mixedcase" nextField="uppercase" className="form-control"/>
                        <div className="input-group-append">
                            <button className="btn btn-secondary" type="button" onClick={this.props.setMixedClicked}>Set</button>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label>Upper Case</label>
                    <div className="input-group">
                        <DuxInput name="uppercase" nextField="defaultvalue" forceUpper={true} className="form-control"/>
                        <div className="input-group-append">
                            <button className="btn btn-secondary" type="button" onClick={this.props.setUpperCaseClicked}>Set</button>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label>Default Value</label>
                    <div className="input-group">
                        <DuxInput name="defaultvalue" nextField="mixedcase" className="form-control" defaultValue="Default Value"/>
                        <div className="input-group-append">
                            <button className="btn btn-secondary" type="button" onClick={this.props.setDefaultValueClicked}>Set</button>
                        </div>
                    </div>
                </div>
            </DuxForm>
        );
    }
}

TextFieldsUi.propTypes = {
    setMixedClicked: PropTypes.func.isRequired,
    setUpperCaseClicked: PropTypes.func.isRequired,
    setDefaultValueClicked: PropTypes.func.isRequired
};

export const TextFields = connect(mapProps, mapDispatch)(TextFieldsUi);
