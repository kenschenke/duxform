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
        plainSetClicked() {
            dispatch(setFormFieldValue('numberfields', 'plain', 12345));
        },

        dollarSetClicked() {
            dispatch(setFormFieldValue('numberfields', 'dollar', 12345));
        },

        commasSetClicked() {
            dispatch(setFormFieldValue('numberfields', 'commas', 12345));
        },

        decimalsSetClicked() {
            dispatch(setFormFieldValue('numberfields', 'decimals', 1234.5));
        },

        allFormattingSetClicked() {
            dispatch(setFormFieldValue('numberfields', 'allformatting', 12345.6));
        },

        defaultSetClicked() {
            dispatch(setFormFieldValue('numberfields', 'defaultvalue', 12345.6));
        }
    };
};

class NumberFieldsUi extends React.Component {
    render() {
        return (
            <DuxForm name="numberfields">
                <div className="form-group">
                    <label>No commas, no decimal, no dollar sign</label>
                    <div className="input-group">
                        <DuxInput name="plain" className="form-control" dataType="num"/>
                        <div className="input-group-append">
                            <button type="button" className="btn btn-secondary" onClick={this.props.plainSetClicked}>Set</button>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label>No Rounding</label>
                    <DuxInput name="noround" className="form-control" dataType="num" round={false}/>
                </div>
                <div className="form-group">
                    <label>With Dollar Sign</label>
                    <div className="input-group">
                        <DuxInput name="dollar" className="form-control" dataType="num" showDollar={true}/>
                        <div className="input-group-append">
                            <button type="button" className="btn btn-secondary" onClick={this.props.dollarSetClicked}>Set</button>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label>With Commas</label>
                    <div className="input-group">
                        <DuxInput name="commas" className="form-control" dataType="num" showCommas={true}/>
                        <div className="input-group-append">
                            <button type="button" className="btn btn-secondary" onClick={this.props.commasSetClicked}>Set</button>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label>With 2 Decimal Places</label>
                    <div className="input-group">
                        <DuxInput name="decimals" className="form-control" dataType="num" precision={2}/>
                        <div className="input-group-append">
                            <button type="button" className="btn btn-secondary" onClick={this.props.decimalsSetClicked}>Set</button>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label>With All Numeric Formatting Options</label>
                    <div className="input-group">
                        <DuxInput name="allformatting" className="form-control" dataType="num" showDollar={true} showCommas={true} precision={2}/>
                        <div className="input-group-append">
                            <button type="button" className="btn btn-secondary" onClick={this.props.allFormattingSetClicked}>Set</button>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label>Default Value</label>
                    <div className="input-group">
                        <DuxInput name="defaultvalue" className="form-control" dataType="num" showDollar={true} showCommas={true} precision={2} defaultValue={123.4}/>
                        <div className="input-group-append">
                            <button type="button" className="btn btn-secondary" onClick={this.props.defaultSetClicked}>Set</button>
                        </div>
                    </div>
                </div>
            </DuxForm>
        );
    }
}

NumberFieldsUi.propTypes = {
    plainSetClicked: PropTypes.func.isRequired,
    dollarSetClicked: PropTypes.func.isRequired,
    commasSetClicked: PropTypes.func.isRequired,
    decimalsSetClicked: PropTypes.func.isRequired,
    allFormattingSetClicked: PropTypes.func.isRequired,
    defaultSetClicked: PropTypes.func.isRequired
};

export const NumberFields = connect(mapProps, mapDispatch)(NumberFieldsUi);
