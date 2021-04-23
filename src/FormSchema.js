import * as yup from 'yup';

export default yup.object().shape({
    name: yup.string()
                .required('Name is required')
                .min(2, 'name must be at least 2 characters'),
    
    size: yup.string()
              .required("Size is required"),

    tomatoSauce: yup.boolean(),
    whiteSauce: yup.boolean(),
    pepperoni: yup.boolean(),
    bellPeppers: yup.boolean(),

    instructions: yup.string()

    
})