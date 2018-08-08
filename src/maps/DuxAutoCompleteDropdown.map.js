import { autocompleteAddSelectedItem } from '../actions';

export const mapDuxAutoCompleteDropdownProps = (state, props) => {
    return {
        items: (state.forms.hasOwnProperty(props.formName) &&
            state.forms[props.formName].hasOwnProperty('fields') &&
            state.forms[props.formName].fields.hasOwnProperty(props.name) &&
            state.forms[props.formName].fields[props.name].hasOwnProperty('items')) ?
            state.forms[props.formName].fields[props.name].items : [],
        left: (state.forms.hasOwnProperty(props.formName) &&
            state.forms[props.formName].hasOwnProperty('fields') &&
            state.forms[props.formName].fields.hasOwnProperty(props.name) &&
            state.forms[props.formName].fields[props.name].hasOwnProperty('left')) ?
            state.forms[props.formName].fields[props.name].left : 0,
        width: (state.forms.hasOwnProperty(props.formName) &&
            state.forms[props.formName].hasOwnProperty('fields') &&
            state.forms[props.formName].fields.hasOwnProperty(props.name) &&
            state.forms[props.formName].fields[props.name].hasOwnProperty('width')) ?
            state.forms[props.formName].fields[props.name].width : 0,
        highlightedValue: (state.forms.hasOwnProperty(props.formName) &&
            state.forms[props.formName].hasOwnProperty('fields') &&
            state.forms[props.formName].fields.hasOwnProperty(props.name) &&
            state.forms[props.formName].fields[props.name].hasOwnProperty('highlightedValue')) ?
            state.forms[props.formName].fields[props.name].highlightedValue : -1
    };
};

export const mapDuxAutoCompleteDropdownDispatch = dispatch => {
    return {
        itemClicked(formName, name, allowMulti, value) {
            dispatch(autocompleteAddSelectedItem(formName, name, allowMulti, value));
        }
    };
};
