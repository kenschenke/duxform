import { autocompleteAddSelectedItem } from '../actions-autocomplete';
import { getFormFieldData } from '../helpers';

export const mapDuxAutoCompleteDropdownProps = (state, props) => {
    return {
        items: getFormFieldData(state, props.formName, props.name, 'items', []),
        left: getFormFieldData(state, props.formName, props.name, 'left', 0),
        width: getFormFieldData(state, props.formName, props.name, 'width', 0),
        highlightedValue: getFormFieldData(state, props.formName, props.name, 'highlightedValue', -1)
    };
};

export const mapDuxAutoCompleteDropdownDispatch = dispatch => {
    return {
        itemClicked(formName, name, allowMulti, value) {
            dispatch(autocompleteAddSelectedItem(formName, name, allowMulti, value));
        }
    };
};
