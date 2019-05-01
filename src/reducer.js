import C from './constants';
import _ from 'lodash';

export default (state={}, action) => {
    let newState;

    switch (action.type) {
        case C.DUXFORM_SET_FORM_DATA:
            newState = _.cloneDeep(state);
            if (!newState.hasOwnProperty(action.name)) {
                newState[action.name] = action.data;
            } else {
                newState[action.name] = _.assign(newState[action.name], action.data);
            }
            return newState;

        case C.DUXFORM_SET_FIELD_DATA:
            newState = _.cloneDeep(state);
            if (!newState.hasOwnProperty(action.form)) {
                newState[action.form] = {};
            }
            if (!newState[action.form].hasOwnProperty('fields')) {
                newState[action.form] = {
                    ...newState[action.form],
                    fields: {}
                };
            }
            if (!newState[action.form].fields.hasOwnProperty(action.field)) {
                newState[action.form].fields[action.field] = {};
            }
            newState[action.form].fields[action.field] = _.assign(newState[action.form].fields[action.field], action.payload);
            return newState;

        default:
            return state;
    }
};
