import { formData, updateFormValidate } from '../actions-input';

export const mapDuxFormProps = (state,props) => {
    return {
        formState: state.forms[props.name]
    };
};

export const mapDuxFormDispatch = dispatch => {
    return {
        // This is passed to child <DuxInput> and <DuxAutoComplete> elements in the formValidate property.  They call
        // it when their validity changes.  The updateFormValidate action is dispatched, updating the validity of
        // the entire form.
        formValidate(name, onValidate) {
            dispatch(updateFormValidate(name, onValidate));
        }
    };
};
