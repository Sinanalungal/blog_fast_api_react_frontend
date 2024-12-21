import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createPost } from '../../services/api/createPost';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const DEFAULT_IMAGE = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmEISboQsDjY02hZFABoG-G0a2sXLMfwtJcBO29_j0wYvnLsq6BlAFvLk7y9fZ-_TBM7o&usqp=CAU';

const CreatePost = () => {
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(DEFAULT_IMAGE);
    const navigate = useNavigate();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const formik = useFormik({
        initialValues: {
            title: '',
            shortDescription: '',
            content: '',
        },
        validationSchema: Yup.object({
            title: Yup.string()
                .min(20, 'Title must be at least 20 characters .')
                .test('no-spaces', 'Title must be at least 20 characters ', value => value.replace(/\s/g, '').length >= 20)
                .required('Title is required'),
            shortDescription: Yup.string()
                .min(50, 'Short description must be at least 50 characters .')
                .test('no-spaces', 'Short description must be at least 50 characters ', value => value.replace(/\s/g, '').length >= 50)
                .required('Short description is required'),
            content: Yup.string()
                .min(150, 'Content must be at least 150 characters .')
                .test('no-spaces', 'Content must be at least 150 characters ', value => value.replace(/\s/g, '').length >= 150)
                .required('Content is required'),
        }),
        onSubmit: async (values) => {
            if (!image) {
                toast.error("Image is required");
                return;
            }

            const formData = new FormData();
            formData.append('title', values.title);
            formData.append('short_description', values.shortDescription);
            formData.append('content', values.content);
            formData.append('image', image);

            try {
                const response = await createPost(formData);
                console.log('Post created successfully:', response);
                toast.success("Post created successfully, you can check it in the feed");
                navigate('/home');
            } catch (error) {
                console.error('Failed to create post:', error);
            }
        }
    });

    return (
        <div className="create-post-container w-full mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">Create New Post</h2>
            <div className="mt-4 flex justify-center">
                <img
                    src={imagePreview}
                    alt="Preview"
                    className="object-cover rounded-md shadow-sm h-52"
                />
            </div>
            <form onSubmit={formik.handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        id="title"
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`mt-1 block w-full p-2 border ${formik.touched.title && formik.errors.title ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm ring-0`}
                        required
                    />
                    {formik.touched.title && formik.errors.title ? (
                        <p className="text-red-500 text-xs mt-1">{formik.errors.title}</p>
                    ) : null}
                </div>

                <div>
                    <label htmlFor="shortDescription" className="block text-sm font-medium text-gray-700">Short Description</label>
                    <textarea
                        id="shortDescription"
                        value={formik.values.shortDescription}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        rows={3}
                        className={`mt-1 block w-full p-2 border ${formik.touched.shortDescription && formik.errors.shortDescription ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm ring-0`}
                        required
                    />
                    {formik.touched.shortDescription && formik.errors.shortDescription ? (
                        <p className="text-red-500 text-xs mt-1">{formik.errors.shortDescription}</p>
                    ) : null}
                </div>

                <div>
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image</label>
                    <input
                        id="file_input"
                        type="file"
                        onChange={handleImageChange}
                        className="block w-full text-sm p-2 text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                    />
                </div>

                <div>
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
                    <ReactQuill
                        value={formik.values.content}
                        onChange={(value) => formik.setFieldValue('content', value)}
                        onBlur={() => formik.setFieldTouched('content')}
                        className={`w-full border ${formik.touched.content && formik.errors.content ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm`}
                        placeholder="Start writing your blog post..."
                        style={{ height: '300px', paddingBottom: '40px' }}
                    />
                    {formik.touched.content && formik.errors.content ? (
                        <p className="text-red-500 text-xs mt-1">{formik.errors.content}</p>
                    ) : null}
                </div>

                <button
                    type="submit"
                    className="w-full mt-4 bg-gray-600 hover:bg-gray-900 text-white font-semibold py-2 rounded-md transition duration-200 ease-in-out"
                >
                    Create Post
                </button>
            </form>
        </div>
    );
};

export default CreatePost;
