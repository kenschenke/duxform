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

    };
};

class ParsingUi extends React.Component {
    formatExpiry = value => {
        if (isNaN(value)) {
            return value;
        }

        return Math.floor(value/100).toString() + '/' + Math.floor(value%100).toString();
    };

    parseExpiry = value => {
        if (value.indexOf('/') === -1) {
            return value;
        }

        const parts = value.split('/');
        if (parts.length !== 2) {
            return value;
        }
        const month = parseInt(parts[0]);
        const year = parseInt(parts[1]);
        if (isNaN(month) || isNaN(year)) {
            return value;
        }

        return month * 100 + year;
    };

    render() {
        return (
            <DuxForm name="parsing">
                <div className="form-group">
                    <label>No Default</label>
                    <div className="input-group">
                        <DuxInput name="nodefault" className="form-control" dataType="num" parse={this.parseExpiry} format={this.formatExpiry}/>
                    </div>
                </div>
            </DuxForm>
        );
    }
}

ParsingUi.propTypes = {

};

export const Parsing = connect(mapProps, mapDispatch)(ParsingUi);
