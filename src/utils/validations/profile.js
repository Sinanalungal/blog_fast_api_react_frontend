// validationSchema.js
import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
    username: Yup.string()
        .required('Username is required')
        .min(6, 'Username must be at least 6 characters')
        .matches(/^\S*$/, 'Username cannot contain spaces'),
        
    email: Yup.string()
        .required('Email is required')
        .email('Invalid email format')
        .matches(/^(?!.* {2})[^\s]+( [^\s]+)*$/, 'Email cannot contain consecutive spaces')
        .matches(/^(?=.*\S).+$/, 'Email cannot be empty spaces'),
});
