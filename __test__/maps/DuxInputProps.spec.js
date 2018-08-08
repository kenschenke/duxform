import { mapDuxInputProps } from "../../src/maps/DuxInput.map";

describe('mapDuxInputProps tests', () => {
    test('form missing', () => {
        const form = 'myform';
        const field = 'myfield';
        const state = {
            forms: {
                otherform: {}
            }
        };
        const props = {
            formName: form,
            name: field
        };

        const expected = {
            hasFocus: false,
            value: '',
            formValue: ''
        };
        const actual = mapDuxInputProps(state, props);
        expect(actual).toEqual(expected);
    });

    test('fields object missing', () => {
        const form = 'myform';
        const field = 'myfield';
        const state = {
            forms: {
                otherform: {},
                myform: {}
            }
        };
        const props = {
            formName: form,
            name: field
        };

        const expected = {
            hasFocus: false,
            value: '',
            formValue: ''
        };
        const actual = mapDuxInputProps(state, props);
        expect(actual).toEqual(expected);
    });

    test('field missing', () => {
        const form = 'myform';
        const field = 'myfield';
        const state = {
            forms: {
                otherform: {},
                myform: {
                    fields: {}
                }
            }
        };
        const props = {
            formName: form,
            name: field
        };

        const expected = {
            hasFocus: false,
            value: '',
            formValue: ''
        };
        const actual = mapDuxInputProps(state, props);
        expect(actual).toEqual(expected);
    });

    test('hasFocus missing', () => {
        const form = 'myform';
        const field = 'myfield';
        const state = {
            forms: {
                otherform: {},
                myform: {
                    fields: {
                        myfield: {}
                    }
                }
            }
        };
        const props = {
            formName: form,
            name: field
        };

        const expected = {
            hasFocus: false,
            value: '',
            formValue: ''
        };
        const actual = mapDuxInputProps(state, props);
        expect(actual).toEqual(expected);
    });

    test('hasFocus false', () => {
        const form = 'myform';
        const field = 'myfield';
        const state = {
            forms: {
                otherform: {},
                myform: {
                    fields: {
                        myfield: {
                            hasFocus: false
                        }
                    }
                }
            }
        };
        const props = {
            formName: form,
            name: field
        };

        const expected = {
            hasFocus: false,
            value: '',
            formValue: ''
        };
        const actual = mapDuxInputProps(state, props);
        expect(actual).toEqual(expected);
    });

    test('hasFocus true', () => {
        const form = 'myform';
        const field = 'myfield';
        const state = {
            forms: {
                otherform: {},
                myform: {
                    fields: {
                        myfield: {
                            hasFocus: true
                        }
                    }
                }
            }
        };
        const props = {
            formName: form,
            name: field
        };

        const expected = {
            hasFocus: true,
            value: '',
            formValue: ''
        };
        const actual = mapDuxInputProps(state, props);
        expect(actual).toEqual(expected);
    });

    test('non-radio button value', () => {
        const form = 'myform';
        const field = 'myfield';
        const propsValue = 'Props Value';
        const formValue = 'Form Value';
        const state = {
            forms: {
                otherform: {},
                myform: {
                    fields: {
                        myfield: {
                            value: formValue
                        }
                    }
                }
            }
        };
        const props = {
            formName: form,
            name: field,
            value: propsValue
        };

        const expected = {
            hasFocus: false,
            value: formValue,
            formValue: formValue
        };
        const actual = mapDuxInputProps(state, props);
        expect(actual).toEqual(expected);
    });

    test('radio button value', () => {
        const form = 'myform';
        const field = 'myfield';
        const propsValue = 'Props Value';
        const formValue = 'Form Value';
        const state = {
            forms: {
                otherform: {},
                myform: {
                    fields: {
                        myfield: {
                            value: formValue
                        }
                    }
                }
            }
        };
        const props = {
            formName: form,
            name: field,
            value: propsValue,
            type: 'radio'
        };

        const expected = {
            hasFocus: false,
            value: propsValue,
            formValue: formValue
        };
        const actual = mapDuxInputProps(state, props);
        expect(actual).toEqual(expected);
    });
});
