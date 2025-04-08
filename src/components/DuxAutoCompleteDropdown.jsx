import { useContext } from 'react';
import { useDispatch } from 'react-redux';
import FormContext from "../contexts/form-context.jsx";
import { autocompleteAddSelectedItem } from '../store';

function DuxAutoCompleteDropdown({ name, left, width, items, highlightedValue, allowMulti }) {
    const { formName } = useContext(FormContext);
    const dispatch = useDispatch();

    if (!items.length) {
        return null;
    }

    const onItemClicked = value => {
        dispatch(autocompleteAddSelectedItem({
            form: formName,
            field: name,
            allowMulti,
            value,
        }));
    };

    const divStyles = { left, width };

    const liItems = items.map((item) => {
        if (highlightedValue < 0) {
            highlightedValue = item.value;
        }
        return (
            <li key={item.value} id={`duxacitem-${formName}-${name}-${item.value}`}
                className={'duxformac-list-item ' + (highlightedValue===item.value ? 'highlighted' : 'normal')}
                onClick={() => onItemClicked(item.value)}
            >
                {item.label}
            </li>
        );
    });

    return (
        <div id={`duxac-${formName}-${name}`} className="duxformac-dropdown-container" style={divStyles}>
            <ul className="duxformac-dropdown-list">
                {liItems}
            </ul>
        </div>
    );
}

export default DuxAutoCompleteDropdown;
