import React from 'react';
import DuxForm from '../../src/DuxForm';
import DuxInput from '../../src/DuxInput';

export class Formatting extends React.Component {
    formatNumber = value => {
        if (value.length === 10) {
            return `(${value.substr(0,3)}) ${value.substr(3,3)}-${value.substr(6)}`;
        }

        return value;
    };

    formatArray = value => {
        if (Array.isArray(value)) {
            return value.join(',');
        }

        return value;
    };

    render() {
        return (
            <DuxForm name="formatting">
                <div className="form-group">
                    <label>Formatting Demo (type 10 digits)</label>
                    <DuxInput name="formatdemo" format={this.formatNumber} className="form-control"/>
                </div>
                <div className="form-group">
                    <label>Type a string with of upper and lower case</label>
                    <DuxInput name="normalization" normalize={value => value.toLowerCase()} className="form-control"/>
                </div>
                <div className="form-group">
                    <label>Type a few words separated by commas</label>
                    <DuxInput
                        name="parsing"
                        className="form-control"
                        parse={value => value.split(',').map(v => v.trim())}
                        format={this.formatArray}
                    />
                </div>
            </DuxForm>
        );
    }
}

