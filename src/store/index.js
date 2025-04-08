import { configureStore } from '@reduxjs/toolkit';
import { formsReducer } from './slices/formsSlice';

export const store = configureStore({
    reducer: {
        forms: formsReducer,
    },
});

export {
    autocompleteAddNewItem,
    autocompleteAddSelectedItem,
    autocompleteDownArrowPressed,
    autocompleteDropdownMatches,
    autocompleteRemoveSelectedItem,
    autocompleteUpArrowPressed,
    clearAutocompleteSelection,
    setAutocompleteMultiSelectValues,
    setAutocompleteSingleSelectValue,
    setFormData,
    setFieldData,
    setFormFieldValue,
} from './slices/formsSlice';
