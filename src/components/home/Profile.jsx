import React, { useState, useEffect } from 'react';
import { validationSchema } from '../../utils/validations/profile';
import { useFormik } from 'formik';
import axiosInstance from '../../axios/axiosIntrecepters';
import { updateUserProfile } from '../../services/api/profile';
import { toast } from 'react-toastify';

const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [originalData, setOriginalData] = useState(null);
    const [error, setError] = useState({});

    const formik = useFormik({
        initialValues: {
            profileImage: '',
            username: '',
            email: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const formData = new FormData();
                formData.append('username', values.username);
                formData.append('email', values.email);

                if (values.profileImage instanceof File) {
                    formData.append('profile_picture', values.profileImage);
                }

                const response = await updateUserProfile(formData);
                console.log(response);
                setIsEditing(false);
                toast.success('Profile updated successfully!');
            } catch (error) {
                console.log(error.response.data);
                setError(error.response.data);
                if (error.response.data.profile_picture) {
                    toast.error("invalid image format");
                }
            }
        },
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get('user-profile/');
                console.log(response);

                const fetchedData = {
                    profileImage: response.data.profile_picture || '',
                    username: response.data.username,
                    email: response.data.email,
                };

                formik.setValues(fetchedData);
                setOriginalData(fetchedData);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            formik.setFieldValue('profileImage', file);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        if (originalData) {
            formik.setValues(originalData);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-300 to-gray-100">
            <div className="max-w-lg w-full bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="flex justify-center pt-10">
                    {formik.values.profileImage ? (
                        <img
                            src={typeof formik.values.profileImage === 'string' ? formik.values.profileImage : URL.createObjectURL(formik.values.profileImage)}
                            alt="Profile"
                            className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
                        />
                    ) : (
                        <img
                            src='https://pics.craiyon.com/2023-11-15/NFfo8Fq5SC-QlFZzS4ge3Q.webp'
                            alt="Default Profile"
                            className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
                        />
                    )}
                </div>

                <div className="p-6">
                    <form onSubmit={formik.handleSubmit}>
                        <div className="text-center">
                            {isEditing ? (
                                <div>
                                    <div className="mb-4">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            id="file-upload"
                                            className="hidden"
                                        />
                                        <label
                                            htmlFor="file-upload"
                                            className="block cursor-pointer border border-gray-300 rounded-md p-3 bg-white hover:bg-gray-50 transition duration-200"
                                        >
                                            <span className="text-gray-700">Choose a file</span>
                                            <span className="ml-2 text-gray-500 text-sm"> ('jpg', 'jpeg', 'png', 'webp')</span>
                                        </label>
                                    </div>
                                    <input
                                        type="text"
                                        name="username"
                                        value={formik.values.username}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className={`border border-gray-300 rounded-md p-2 mb-2 w-full ${formik.touched.username && formik.errors.username ? 'border-red-500' : ''}`}
                                        placeholder="Username"
                                    />
                                    {formik.touched.username && formik.errors.username ? (
                                        <div className="text-red-500 text-xs">{formik.errors.username}</div>
                                    ) : null}
                                    {error && error.username ? (
                                        <div className="text-red-500 mb-2 text-xs">{error.username}</div>
                                    ) : null}

                                    <input
                                        type="email"
                                        name="email"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className={`border border-gray-300 rounded-md p-2 mb-4 w-full ${formik.touched.email && formik.errors.email ? 'border-red-500' : ''}`}
                                        placeholder="Email"
                                    />
                                    {formik.touched.email && formik.errors.email ? (
                                        <div className="text-red-500 text-xs">{formik.errors.email}</div>
                                    ) : null}
                                    {error && error.email ? (
                                        <div className="text-red-500 text-xs">{error.email}</div>
                                    ) : null}
                                </div>
                            ) : (
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800">{formik.values.username}</h2>
                                    <p className="text-gray-600">{formik.values.email}</p>
                                </div>
                            )}
                        </div>

                        <div className="mt-4 flex justify-between">
                            {isEditing ? (
                                <>
                                    <button
                                        type="submit"
                                        className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-900 transition w-1/2 mr-2"
                                    >
                                        Save
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleCancel}
                                        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition w-1/2"
                                    >
                                        Cancel
                                    </button>
                                </>
                            ) : (
                                <div className="flex w-full justify-center">
                                    <button
                                        type="button"
                                        onClick={() => setIsEditing(true)}
                                        className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-900 transition w-1/2"
                                    >
                                        Edit
                                    </button>
                                </div>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;
