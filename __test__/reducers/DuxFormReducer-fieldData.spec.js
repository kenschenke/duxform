import C from '../../src/constants';
import DuxFormReducer from '../../src/reducer';

describe('DuxFormReducer REFORM_SET_FIELD_DATA', () => {
    test('form does not exist', () => {
        const formName = 'form2';
        const fieldName = 'field1';
        const startingState = {
            form1: {value1: 'value1'}
        };
        const expectedState = {
            form1: {value1: 'value1'},
            form2: {
                fields: {
                    field1: {value2: 'value2'}
                }
            }
        };

        const before = JSON.stringify(startingState);
        const actualState = DuxFormReducer(startingState, {
            type: C.DUXFORM_SET_FIELD_DATA,
            form: formName,
            field: fieldName,
            payload: {value2: 'value2'}
        });
        const after = JSON.stringify(startingState);
        expect(after).toEqual(before);
        expect(actualState).toEqual(expectedState);
    });

    test('fields object in form does not exist', () => {
        const formName = 'form2';
        const fieldName = 'field1';
        const startingState = {
            form1: {value1: 'value1'},
            form2: {value3: 'value3'}
        };
        const expectedState = {
            form1: {value1: 'value1'},
            form2: {
                value3: 'value3',
                fields: {
                    field1: {value2: 'value2'}
                }
            }
        };

        const before = JSON.stringify(startingState);
        const actualState = DuxFormReducer(startingState, {
            type: C.DUXFORM_SET_FIELD_DATA,
            form: formName,
            field: fieldName,
            payload: {value2: 'value2'}
        });
        const after = JSON.stringify(startingState);
        expect(after).toEqual(before);
        expect(actualState).toEqual(expectedState);
    });

    test('field does not exist', () => {
        const formName = 'form2';
        const fieldName = 'field2';
        const startingState = {
            form1: {value1: 'value1'},
            form2: {
                fields: {
                    field1: {value2: 'value2'}
                }
            }
        };
        const expectedState = {
            form1: {value1: 'value1'},
            form2: {
                fields: {
                    field1: {value2: 'value2'},
                    field2: {value3: 'value3'}
                }
            }
        };

        const before = JSON.stringify(startingState);
        const actualState = DuxFormReducer(startingState, {
            type: C.DUXFORM_SET_FIELD_DATA,
            form: formName,
            field: fieldName,
            payload: {value3: 'value3'}
        });
        const after = JSON.stringify(startingState);
        expect(after).toEqual(before);
        expect(actualState).toEqual(expectedState);
    });

    test('add new scalar value', () => {
        const formName = 'form2';
        const fieldName = 'field1';
        const startingState = {
            form1: {value1: 'value1'},
            form2: {
                fields: {
                    field1: {value2: 'value2'},
                    field2: {value3: 'value3'}
                }
            }
        };
        const expectedState = {
            form1: {value1: 'value1'},
            form2: {
                fields: {
                    field1: {value2: 'value2', value4: 'value4'},
                    field2: {value3: 'value3'}
                }
            }
        };

        const before = JSON.stringify(startingState);
        const actualState = DuxFormReducer(startingState, {
            type: C.DUXFORM_SET_FIELD_DATA,
            form: formName,
            field: fieldName,
            payload: {value4: 'value4'}
        });
        const after = JSON.stringify(startingState);
        expect(after).toEqual(before);
        expect(actualState).toEqual(expectedState);
    });

    test('update scalar value', () => {
        const formName = 'form2';
        const fieldName = 'field1';
        const startingState = {
            form1: {value1: 'value1'},
            form2: {
                fields: {
                    field1: {value2: 'value2', value4: 'value4'},
                    field2: {value3: 'value3'}
                }
            }
        };
        const expectedState = {
            form1: {value1: 'value1'},
            form2: {
                fields: {
                    field1: {value2: 2, value4: 'value4'},
                    field2: {value3: 'value3'}
                }
            }
        };

        const before = JSON.stringify(startingState);
        const actualState = DuxFormReducer(startingState, {
            type: C.DUXFORM_SET_FIELD_DATA,
            form: formName,
            field: fieldName,
            payload: {value2: 2}
        });
        const after = JSON.stringify(startingState);
        expect(after).toEqual(before);
        expect(actualState).toEqual(expectedState);
    });

    test('add new array value', () => {
        const formName = 'form2';
        const fieldName = 'field1';
        const startingState = {
            form1: {value1: 'value1'},
            form2: {
                fields: {
                    field1: {value2: 'value2'},
                    field2: {value3: 'value3'}
                }
            }
        };
        const expectedState = {
            form1: {value1: 'value1'},
            form2: {
                fields: {
                    field1: {value2: 'value2', array4: [1, 2, 3]},
                    field2: {value3: 'value3'}
                }
            }
        };

        const before = JSON.stringify(startingState);
        const actualState = DuxFormReducer(startingState, {
            type: C.DUXFORM_SET_FIELD_DATA,
            form: formName,
            field: fieldName,
            payload: {array4: [1, 2, 3]}
        });
        const after = JSON.stringify(startingState);
        expect(after).toEqual(before);
        expect(actualState).toEqual(expectedState);
    });

    test('update array value', () => {
        const formName = 'form2';
        const fieldName = 'field1';
        const startingState = {
            form1: {value1: 'value1'},
            form2: {
                fields: {
                    field1: {value2: 'value2', array4: [1, 2, 3]},
                    field2: {value3: 'value3'}
                }
            }
        };
        const expectedState = {
            form1: {value1: 'value1'},
            form2: {
                fields: {
                    field1: {value2: 'value2', array4: [1, 2]},
                    field2: {value3: 'value3'}
                }
            }
        };

        const before = JSON.stringify(startingState);
        const actualState = DuxFormReducer(startingState, {
            type: C.DUXFORM_SET_FIELD_DATA,
            form: formName,
            field: fieldName,
            payload: {array4: [1, 2]}
        });
        const after = JSON.stringify(startingState);
        expect(after).toEqual(before);
        expect(actualState).toEqual(expectedState);
    });
});
