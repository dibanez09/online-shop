import React from 'react';
import FormContext from './FormContext';

const useForm = () => {
    const formContext = React.useContext(FormContext);

    return formContext;
}

export default useForm;