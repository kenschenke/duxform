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
            dispatch(setFormFieldValue('formatting', 'nodefault', 32));
        },

        defaultSetClicked() {
            dispatch(setFormFieldValue('formatting', 'defaultvalue', 55));
        }
    };
};

class FormattingUi extends React.Component {
    formatDegrees = value => {
        if (isNaN(value)) {
            return '';
        }

        return value.toString() + ' Degrees';
    };

    render() {
        return (
            <DuxForm name="formatting">
                <div className="form-group">
                    <label>No Default Temperature</label>
                    <div className="input-group">
                        <DuxInput name="nodefault" className="form-control" dataType="num" format={this.formatDegrees}/>
                        <div className="input-group-append">
                            <button type="button" className="btn btn-secondary" onClick={this.props.noDefaultSetClicked}>Set</button>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label>Default Temperature</label>
                    <div className="input-group">
                        <DuxInput name="defaultvalue" className="form-control" dataType="num" defaultValue={50} format={this.formatDegrees}/>
                        <div className="input-group-append">
                            <button type="button" className="btn btn-secondary" onClick={this.props.defaultSetClicked}>Set</button>
                        </div>
                    </div>
                </div>
            </DuxForm>
        );
    }
}

FormattingUi.propTypes = {
    noDefaultSetClicked: PropTypes.func.isRequired,
    defaultSetClicked: PropTypes.func.isRequired
};

export const Formatting = connect(mapProps, mapDispatch)(FormattingUi);
