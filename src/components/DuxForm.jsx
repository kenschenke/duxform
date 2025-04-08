import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { findFormField, getFormData } from '../helpers';
import { setFormData } from '../store';
import { FormProvider } from '../contexts/form-context.jsx';

function DuxForm(props) {
    let childProps = {...props};

    // Delete some props that shouldn't be carried forward
    delete childProps.onSubmit;
    delete childProps.onValidate;
    delete childProps.formValidate;

    const [isValidated, setIsValidated] = useState(true);

    const dispatch = useDispatch();
    const values = useSelector(state => {
        let values = {};
        if (state.forms && state.forms[props.name]) {
            for (let field in state.forms[props.name].fields) {
                values[field] = state.forms[props.name].fields[field].value;
            }
        }
        return values;
    });
    const allFieldsValid = useSelector(state => {
        let valid = true;
        if (state.forms && state.forms[props.name] !== undefined) {
            for (let field in state.forms[props.name].fields) {
                if (!state.forms[props.name].fields[field].valid) {
                    valid = false;
                }
            }
        }

        return valid;
    });
    const valid = useSelector(state =>
        getFormData(state, props.name, 'valid', false)
    );

    const onSubmit = event => {
        event.preventDefault();
        if (valid && props.onSubmit) {
            props.onSubmit(values);
        }
    };

    useEffect(() => {
        if (props.initialFocus) {
            setTimeout(() => {
                const field = findFormField(props.name, props.initialFocus);
                if (field !== undefined) {
                    field.focus();
                }
            }, 500);
        }

        dispatch(setFormData({
            name: props.name,
            data: {
                valid: false,
                pristine: true,
                error: '',
            }
        }));
        setTimeout(() => {
            formValidate();
        }, 50);
    }, []);

    if (!isValidated) {
        setTimeout(() => {
            if (props.onValidate && allFieldsValid) {
                const error = props.onValidate(values, props.name);
                dispatch(setFormData({
                    name: props.name,
                    data: {
                        valid: error === undefined,
                        error,
                    }
                }));
                setIsValidated(true);
                return;
            }

            dispatch(setFormData({
                name: props.name,
                data: {
                    valid: allFieldsValid,
                    error: '',
                }
            }));
            setIsValidated(true);
        }, 50);
    }

    const formValidate = () => {
        setIsValidated(false);
    };

    return (
        <FormProvider formName={props.name} formValidate={formValidate}>
            <form onSubmit={onSubmit} {...childProps}>
                {props.children}
            </form>
        </FormProvider>
    );
}

export default DuxForm;
