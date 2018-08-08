import { combineReducers } from 'redux';
import { DuxFormReducer } from '../../src/reducer';

export default combineReducers({
    forms: DuxFormReducer
});
