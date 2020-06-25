import C from '../../src/constants';
import DuxFormReducer from '../../src/reducer';

describe('DuxFormReducer REFORM_SET_FORM_DATA', () => {
    test('form does exist', () => {
        const startingState = {
            form1: {value1: 'value1'}
        };
        const expectedState = {
            form1: {value1: 'value1'},
            form2: {value2: 'value2'}
        };

        const before = JSON.stringify(startingState);
        const actualState = DuxFormReducer(startingState, {
            type: C.DUXFORM_SET_FORM_DATA,
            name: 'form2',
            data: {value2: 'value2'}
        });
        const after = JSON.stringify(startingState);
        expect(after).toEqual(before);
        expect(actualState).toEqual(expectedState);
    });

    test('add scalar value', () => {
        const startingState = {
            form1: {value1: 'value1'},
            form2: {value2: 'value2'}
        };
        const expectedState = {
            form1: {value1: 'value1'},
            form2: {value2: 'value2', value3: 'value3'}
        };

        const before = JSON.stringify(startingState);
        const actualState = DuxFormReducer(startingState, {
            type: C.DUXFORM_SET_FORM_DATA,
            name: 'form2',
            data: {value3: 'value3'}
        });
        const after = JSON.stringify(startingState);
        expect(after).toEqual(before);
        expect(actualState).toEqual(expectedState);
    });

    test('update scalar value', () => {
        const startingState = {
            form1: {value1: 'value1'},
            form2: {value2: 'value2', value3: 'value3'}
        };
        const expectedState = {
            form1: {value1: 'value1'},
            form2: {value2: 2, value3: 'value3'}
        };

        const before = JSON.stringify(startingState);
        const actualState = DuxFormReducer(startingState, {
            type: C.DUXFORM_SET_FORM_DATA,
            name: 'form2',
            data: {value2: 2}
        });
        const after = JSON.stringify(startingState);
        expect(after).toEqual(before);
        expect(actualState).toEqual(expectedState);
    });

    test('add array value', () => {
        const startingState = {
            form1: {value1: 'value1'},
            form2: {value2: 'value2'}
        };
        const expectedState = {
            form1: {value1: 'value1'},
            form2: {value2: 'value2', array3: [1, 2, 3]}
        };

        const before = JSON.stringify(startingState);
        const actualState = DuxFormReducer(startingState, {
            type: C.DUXFORM_SET_FORM_DATA,
            name: 'form2',
            data: {array3: [1, 2, 3]}
        });
        const after = JSON.stringify(startingState);
        expect(after).toEqual(before);
        expect(actualState).toEqual(expectedState);
    });

    test('update array value', () => {
        const startingState = {
            form1: {value1: 'value1'},
            form2: {array2: [1, 2], array3: [1, 2, 3]}
        };
        const expectedState = {
            form1: {value1: 'value1'},
            form2: {array2: [1, 2, 3, 4], array3: [1, 2, 3]}
        };

        const before = JSON.stringify(startingState);
        const actualState = DuxFormReducer(startingState, {
            type: C.DUXFORM_SET_FORM_DATA,
            name: 'form2',
            data: {array2: [1, 2, 3, 4]}
        });
        const after = JSON.stringify(startingState);
        expect(after).toEqual(before);
        expect(actualState).toEqual(expectedState);
    });
});
