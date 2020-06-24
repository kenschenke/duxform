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
            dispatch(setFormFieldValue('normalization', 'nodefault', '1112223333'));
        },

        defaultSetClicked() {
            dispatch(setFormFieldValue('normalization', 'defaultvalue', '1234567890'));
        }
    };
};

class NormalizationUi extends React.Component {
    formatPhone = value => {
        if (value.length !== 10) {
            return value;
        }

        return '(' + value.substr(0,3) + ') ' + value.substr(3,3) + '-' + value.substr(6);
    };

    normalizePhone = value => {
        return value.replace(/[^0-9]/g, '');
    };

    render() {
        return (
            <DuxForm name="normalization">
                <div className="form-group">
                    <label>Phone (No Default)</label>
                    <div className="input-group">
                        <DuxInput name="nodefault" className="form-control" format={this.formatPhone} normalize={this.normalizePhone}/>
                        <div className="input-group-append">
                            <button type="button" className="btn btn-secondary" onClick={this.props.noDefaultSetClicked}>Set</button>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label>Phone (With Default)</label>
                    <div className="input-group">
                        <DuxInput name="defaultvalue" className="form-control" format={this.formatPhone} normalize={this.normalizePhone} defaultValue="8165551212"/>
                        <div className="input-group-append">
                            <button type="button" className="btn btn-secondary" onClick={this.props.defaultSetClicked}>Set</button>
                        </div>
                    </div>
                </div>
            </DuxForm>
        );
    }
}

NormalizationUi.propTypes = {
    noDefaultSetClicked: PropTypes.func.isRequired,
    defaultSetClicked: PropTypes.func.isRequired
};

export const Normalization = connect(mapProps, mapDispatch)(NormalizationUi);
