import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DuxForm } from '../../src/DuxForm';
import { DuxInput } from '../../src/DuxInput';
import { getFormFieldError, isFieldValidOrPristine, isFormValid } from '../../src/helpers';
import { setFormFieldValue } from '../../src/actions';

const mapBasicFormProps = state => {
    return {
        state: state.forms.hasOwnProperty('basic') ? JSON.stringify(state.forms.basic,null,3) : '{}',
        nameValid: isFieldValidOrPristine(state, 'basic', 'fullname'),
        nameError: getFormFieldError(state, 'basic', 'fullname'),
        dateValid: isFieldValidOrPristine(state, 'basic', 'date'),
        dateError: getFormFieldError(state, 'basic', 'date'),
        priceValid: isFieldValidOrPristine(state, 'basic', 'price'),
        priceError: getFormFieldError(state, 'basic', 'price'),
        emailValid: isFieldValidOrPristine(state, 'basic', 'email'),
        emailError: getFormFieldError(state, 'basic', 'email'),
        phoneValid: isFieldValidOrPristine(state, 'basic', 'phone'),
        phoneError: getFormFieldError(state, 'basic', 'phone'),
        formValid: isFormValid(state, 'basic')
    };
};

const mapBasicFormDispatch = dispatch => {
    return {
        setDateClicked() {
            const then = new Date();
            then.setTime(then.getTime() - 7 * 60 * 60 * 24 * 1000);  // 7 days ago
            dispatch(setFormFieldValue('basic', 'date', then));
        },

        setNameClicked() {
            dispatch(setFormFieldValue('basic', 'fullname', 'Name Set'));
        },

        setOffers(offers) {
            dispatch(setFormFieldValue('basic', 'offers', offers));
        },

        setPriceClicked() {
            dispatch(setFormFieldValue('basic', 'price', 1234.56));
        },

        setColorClicked() {
            dispatch(setFormFieldValue('basic', 'color', 'blue'));
        }
    };
};

class BasicFormUi extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pricePrecision: 2,
            priceShowDollar: true,
            priceShowCommas: true
        };
    }

    decreasePricePrecision = () => {
        this.setState({
            pricePrecision: this.state.pricePrecision - 1
        });
    };

    formatPhone = value => {
        if (value.length !== 10) {
            return value;
        }

        return '(' + value.substr(0,3) + ') ' + value.substr(3,3) + '-' + value.substr(6,4);
    };

    normalizePhone = value => {
        const phone = typeof value === 'string' ? value : value.toString();
        return phone.replace(/[^0-9]/g, '');
    };

    increasePricePrecision = () => {
        this.setState({
            pricePrecision: this.state.pricePrecision + 1
        });
    };

    togglePriceCommas = () => {
        this.setState({
            priceShowCommas: !this.state.priceShowCommas
        });
    };

    togglePriceDollar = () => {
        this.setState({
            priceShowDollar: !this.state.priceShowDollar
        });
    };

    validateDate = date => {
        const now = new Date();
        return date > now ? 'Purchase date cannot be in the future' : undefined;
    };

    validateEmail = email => {
        const found = email.search(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}\b/);
        return found >= 0 ? undefined : 'Invalid email address';
    };

    validateName = value => {
        return value.length ? undefined : 'You must enter a name';
    };

    validatePhone = value => {
        const phone = value.replace(/[^0-9]/g, '');
        return phone.length === 10 ? undefined : 'Invalid phone number';
    };

    validatePrice = value => {
        return value < 0 ? 'Purchase price cannot be negative' : undefined;
    };

    render() {
        return (
            <div>
                <DuxForm name="basic">
                    <div className="form-group">
                        <label>Name</label>
                        <DuxInput
                            name="fullname"
                            className={'form-control' + (this.props.nameValid ? '' : ' is-invalid')}
                            dataType="str"
                            placeholder="Please enter your name"
                            onValidate={this.validateName}
                            nextField="date"
                        />
                        <small className="form-text text-danger" style={{height:'.8em'}}>{this.props.nameValid ? '' : this.props.nameError}</small>
                    </div>
                    <div className="form-group">
                        <label>Purchase Date</label>
                        <DuxInput
                            name="date"
                            className={'form-control' + (this.props.dateValid ? '' : ' is-invalid')}
                            dataType="date"
                            onValidate={this.validateDate}
                            nextField="price"
                        />
                        <small className="form-text text-danger" style={{height:'.8em'}}>{this.props.dateValid ? '' : this.props.dateError}</small>
                    </div>
                    <div className="form-group">
                        <label>Purchase Price</label>
                        <DuxInput
                            name="price"
                            className={'form-control' + (this.props.priceValid ? '' : ' is-invalid')}
                            dataType="num"
                            onValidate={this.validatePrice}
                            precision={this.state.pricePrecision}
                            showCommas={this.state.priceShowCommas}
                            showDollar={this.state.priceShowDollar}
                            nextField="email"
                            defaultValue={1234}
                        />
                        <small className="form-text text-danger" style={{height:'.8em'}}>{this.props.priceValid ? '' : this.props.priceError}</small>
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <DuxInput
                            name="email"
                            className={'form-control' + (this.props.emailValid ? '' : ' is-invalid')}
                            onValidate={this.validateEmail}
                            nextField="fullname"
                        />
                        <small className="form-text text-danger" style={{height:'.8em'}}>{this.props.emailValid ? '' : this.props.emailError}</small>
                    </div>
                    <div className="form-group">
                        <label>Phone Number</label>
                        <DuxInput
                            name="phone"
                            className={'form-control' + (this.props.phoneValid ? '' : ' is-invalid')}
                            onValidate={this.validatePhone}
                            normalize={this.normalizePhone}
                            format={this.formatPhone}
                            defaultValue="8165551212"
                        />
                        <small className="form-text text-danger" style={{height:'.8em'}}>{this.props.phoneValid ? '' : this.props.phoneError}</small>
                    </div>
                    <div className="form-group">
                        <label>Color</label>
                        <DuxInput
                            name="color"
                            type="select"
                            className="form-control"
                            defaultValue="white"
                        >
                            <option value="red">Red</option>
                            <option value="blue">Blue</option>
                            <option value="green">Green</option>
                            <option value="black">Black</option>
                            <option value="white">White</option>
                            <option value="silver">Silver</option>
                        </DuxInput>
                    </div>
                    <div className="form-group">
                        <label>Education Level</label>
                        <div className="form-check">
                            <DuxInput
                                name="education"
                                className="form-check-input"
                                type="radio"
                                value="somehs"
                            />
                            <label className="form-check-label">Some Highschool</label>
                        </div>
                        <div className="form-check">
                            <DuxInput
                                name="education"
                                className="form-check-input"
                                type="radio"
                                value="hsgrad"
                                defaultChecked={true}
                            />
                            <label className="form-check-label">Highschool Graduate</label>
                        </div>
                        <div className="form-check">
                            <DuxInput
                                name="education"
                                className="form-check-input"
                                type="radio"
                                value="somecollege"
                            />
                            <label className="form-check-label">Some College</label>
                        </div>
                        <div className="form-check">
                            <DuxInput
                                name="education"
                                className="form-check-input"
                                type="radio"
                                value="collegegrad"
                            />
                            <label className="form-check-label">College Graduate</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="form-check">
                            <DuxInput
                                name="offers"
                                className="form-check-input"
                                type="checkbox"
                            />
                            <label className="form-check-label">Sell my information to your marketing partners</label>
                        </div>
                    </div>
                    <button type="button" className="btn btn-primary mb-2" disabled={!this.props.formValid}>Submit</button>
                </DuxForm>
                <button type="button" className="btn btn-primary mb-2" onClick={this.props.setNameClicked}>Set Name</button>
                <br/>
                <button type="button" className="btn btn-primary mb-2" onClick={this.props.setDateClicked}>Set Date</button>
                <br/>
                <div className="mb-2">
                    <button type="button" className="btn btn-primary mr-2" onClick={this.props.setPriceClicked}>Set Price</button>
                    <button type="button" className="btn btn-primary mr-2" onClick={this.decreasePricePrecision}>Precision +</button>
                    <button type="button" className="btn btn-primary mr-2" onClick={this.increasePricePrecision}>Precision -</button>
                    <button type="button" className="btn btn-primary mr-2" onClick={this.togglePriceCommas}>Commas</button>
                    <button type="button" className="btn btn-primary mr-2" onClick={this.togglePriceDollar}>Dollar</button>
                </div>
                <button type="button" className="btn btn-primary mb-2" onClick={this.props.setColorClicked}>Set Color</button>
                <div className="mb-2">
                    <button type="button" className="btn btn-primary mr-2" onClick={() => this.props.setOffers(true)}>Set Offers</button>
                    <button type="button" className="btn btn-primary mr-2" onClick={() => this.props.setOffers(false)}>Clear Offers</button>
                </div>
            </div>
        );
    }
}

BasicFormUi.propTypes = {
    nameValid: PropTypes.bool.isRequired,
    nameError: PropTypes.string.isRequired,
    dateValid: PropTypes.bool.isRequired,
    dateError: PropTypes.string.isRequired,
    priceValid: PropTypes.bool.isRequired,
    priceError: PropTypes.string.isRequired,
    emailValid: PropTypes.bool.isRequired,
    emailError: PropTypes.string.isRequired,
    phoneValid: PropTypes.bool.isRequired,
    phoneError: PropTypes.string.isRequired,
    formValid: PropTypes.bool.isRequired,

    setNameClicked: PropTypes.func.isRequired,
    setDateClicked: PropTypes.func.isRequired,
    setPriceClicked: PropTypes.func.isRequired,
    setColorClicked: PropTypes.func.isRequired,
    setOffers: PropTypes.func.isRequired
};

export const BasicForm = connect(mapBasicFormProps, mapBasicFormDispatch)(BasicFormUi);
