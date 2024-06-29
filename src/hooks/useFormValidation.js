import { useState } from 'react';

const useFormValidation = (formData, validationRules) => {

    const [errors, setErrors] = useState({});

    const validate = () => {
        
        let tempErrors = {};

        for (const field in validationRules) {
           
            if (validationRules[field].required && !formData[field]) {
                tempErrors[field] = `${field} is required`;
            }

            if (validationRules[field].type === 'file') {
                const file = formData[field];
                if (!file) {
                    tempErrors[field] = `${field} is required`;
                }
            }
        }

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };
   
    return { errors, validate };
};

export default useFormValidation;