import { formData, updateFormValidate } from '../actions';

export const mapDuxFormProps = (state,props) => {
    return {
        formState: state.forms[props.name]
    };
};

export const mapDuxFormDispatch = dispatch => {
    return {
        setFormStore(name, data) {
            dispatch(
                formData(name, data)
            );
        },

        formValidate(name, onValidate) {
            dispatch(
                updateFormValidate(name, onValidate)
            );
        }
    };
};
