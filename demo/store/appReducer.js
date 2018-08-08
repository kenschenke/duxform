import C from '../constants';
import { combineReducers } from 'redux';
import { DuxFormReducer } from '../../src/reducer';

const demoReducer = (state='', action) => {
    switch (action.type) {
        case C.SET_DEMO:
            return action.payload;

        default:
            return state;
    }
};

const sourceReducer = (state='', action) => {
    switch (action.type) {
        case C.SET_SOURCE:
            return action.payload;

        default:
            return state;
    }
};

export default combineReducers({
    demo: demoReducer,
    source: sourceReducer,
    forms: DuxFormReducer
});
