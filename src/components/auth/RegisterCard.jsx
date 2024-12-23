import React, { useContext, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { validationSchemaRegister } from '../../utils/validations/auth';
import { registerUser } from '../../services/api/Register';
import { toast } from 'react-toastify';
import { UserContext } from '../home/userContextProvider';

const RegisterCard = () => {
    const [backendError, setBackendError] = useState('');
    const { user, loading } = useContext(UserContext);
    
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
        },

        validationSchema: validationSchemaRegister,
        onSubmit: async (values) => {
            try {
                const { confirmPassword, ...userData } = values;
                const response = await registerUser(userData)
                console.log('Form submitted successfully:', response);
                navigate('/')
                toast.success('Registration successful! Please SignIn to Continue');
            } catch (error) {
                console.error('There was an error submitting the form:', error);
                const errorMessage = error.response?.data
                console.log(errorMessage)
                setBackendError(errorMessage)
            }
        },
    });

    return (
        <>
           {!user ? <div className="flex min-h-screen w-full font-roboto items-center justify-center text-gray-600 p-4">
                <div className="relative w-full max-w-md">
                    <div className="hidden sm:block h-56 w-56 text-indigo-300 absolute -left-20 -top-20">
                    </div>
                    <div className="hidden sm:block h-28 w-28 text-indigo-300 absolute -right-20 -bottom-20">
                    </div>
                    <div className="relative flex flex-col rounded-lg bg-white shadow-lg p-6">
                        <div className="flex-auto">
                            <div className="mb-10 flex flex-shrink-0 flex-grow-0 items-center justify-center overflow-hidden">
                                <a
                                    href="#"
                                    className="flex cursor-pointer items-center gap-2 text-indigo-500 no-underline hover:text-indigo-500"
                                >
                                    <span className="flex-shrink-0 text-3xl font-black tracking-tight opacity-100">
                                        BlogSpot
                                    </span>
                                </a>
                            </div>

                            <form onSubmit={formik.handleSubmit} className="mb-4">
                                <div className="mb-3">
                                    <label className="mb-2 inline-block text-xs font-medium uppercase text-gray-700">
                                        Username
                                    </label>
                                    <input
                                        type="text"
                                        name="username"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.username}
                                        className={`block w-full cursor-text appearance-none rounded-md border py-2 px-3 text-sm outline-none ${formik.touched.username && formik.errors.username
                                                ? 'border-red-500'
                                                : 'border-gray-400'
                                            } focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow`}
                                        placeholder="Enter your username..."
                                        autoFocus=""
                                    />
                                    {formik.touched.username && formik.errors.username ? (
                                        <div className="text-red-500 text-xs">{formik.errors.username}</div>
                                    ) : null}
                                    {backendError && backendError.username ? (
                                        <div className="text-red-500 p-1 text-xs">{backendError.username}</div>
                                    ) : null}
                                </div>
                                <div className="mb-3">
                                    <label className="mb-2 inline-block text-xs font-medium uppercase text-gray-700">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.email}
                                        className={`block w-full cursor-text appearance-none rounded-md border py-2 px-3 text-sm outline-none ${formik.touched.email && formik.errors.email
                                                ? 'border-red-500'
                                                : 'border-gray-400'
                                            } focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow`}
                                        placeholder="Enter your email..."
                                    />
                                    {formik.touched.email && formik.errors.email ? (
                                        <div className="text-red-500 text-xs">{formik.errors.email}</div>
                                    ) : null}
                                    {backendError && backendError.email ? (
                                        <div className="text-red-500 p-1 text-xs">{backendError.email}</div>
                                    ) : null}
                                </div>

                                <div className="mb-3">
                                    <label className="mb-2 inline-block text-xs font-medium uppercase text-gray-700">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.password}
                                        className={`block w-full cursor-text appearance-none rounded-md border py-2 px-3 text-sm outline-none ${formik.touched.password && formik.errors.password
                                                ? 'border-red-500'
                                                : 'border-gray-400'
                                            } focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow`}
                                        placeholder="Enter your Password..."
                                        autoComplete=""
                                    />
                                    {formik.touched.password && formik.errors.password ? (
                                        <div className="text-red-500 text-xs">{formik.errors.password}</div>
                                    ) : null}
                                </div>
                                <div className="mb-3">
                                    <label className="mb-2 inline-block text-xs font-medium uppercase text-gray-700">
                                        Confirm Password
                                    </label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.confirmPassword}
                                        className={`block w-full cursor-text appearance-none rounded-md border py-2 px-3 text-sm outline-none ${formik.touched.confirmPassword && formik.errors.confirmPassword
                                                ? 'border-red-500'
                                                : 'border-gray-400'
                                            } focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow`}
                                        placeholder="Confirm Password..."
                                        autoComplete=""
                                    />
                                    {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                                        <div className="text-red-500  text-xs">{formik.errors.confirmPassword}</div>
                                    ) : null}
                                </div>

                                <div className="mb-3">
                                    <button
                                        className="grid w-full cursor-pointer select-none rounded-md border border-indigo-400 bg-indigo-400 py-2 px-5 text-center align-middle text-sm text-white shadow hover:border-indigo-600 hover:bg-indigo-600 hover:text-white focus:border-indigo-600 focus:bg-indigo-600 focus:text-white focus:shadow-none"
                                        type="submit"
                                    >
                                        Sign Up
                                    </button>
                                </div>
                            </form>
                            <p className="mb-4 text-center">
                                Already Have An Account? &nbsp;
                                <Link to="/" className="text-blue-500">Sign in</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>:<Navigate to={'/home'}/>}
        </>
    );
}

export default RegisterCard;
