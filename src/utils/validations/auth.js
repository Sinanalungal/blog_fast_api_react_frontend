import * as Yup from 'yup';

export const validationSchemaRegister = Yup.object({
    username: Yup.string()
        .required('Username is required')
        .min(6, 'Username must be at least 6 characters')
        .matches(/^\S*$/, 'Username cannot contain spaces'), 

    email: Yup.string()
        .required('Email is required')
        .email('Invalid email format')
        .matches(/^(?!.* {2})[^\s]+( [^\s]+)*$/, 'Email cannot contain consecutive spaces')
        .matches(/^(?=.*\S).+$/, 'Email cannot be empty spaces'),

    password: Yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters')  
        .matches(/^(?!.* {2})[^\s]+( [^\s]+)*$/, 'Password cannot contain consecutive spaces')
        .matches(/^(?=.*\S).+$/, 'Password cannot be empty spaces'),

    confirmPassword: Yup.string()
        .required('Confirm Password is required')
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .matches(/^(?!.* {2})[^\s]+( [^\s]+)*$/, 'Confirm Password cannot contain consecutive spaces')
        .matches(/^(?=.*\S).+$/, 'Confirm Password cannot be empty spaces'),
});


export const loginValidationSchema = Yup.object({
    username: Yup.string()
        .required('Username is required')
        .min(6, 'Username must be at least 6 characters')
        .matches(/^\S*$/, 'Username cannot contain spaces'), 
    password: Yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters')  
        .matches(/^(?!.* {2})[^\s]+( [^\s]+)*$/, 'Password cannot contain consecutive spaces')
        .matches(/^(?=.*\S).+$/, 'Password cannot be empty spaces'),
});