import { configureStore } from '@reduxjs/toolkit';
import { formsReducer } from '../../src/store/slices/formsSlice';

export const store = configureStore({
    reducer: {
        forms: formsReducer,
    },
});
