import { createContext } from 'react'

const FormContext = createContext();

function FormProvider({ children, formName, formValidate }) {
    return <FormContext.Provider value={{ formName, formValidate }}>
        {children}
    </FormContext.Provider>;
}

export { FormProvider };
export default FormContext;
