import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ReactQuill from 'react-quill';
import axiosInstance from '../../axios/axiosIntrecepters';
import { toast } from 'react-toastify';

const DEFAULT_IMAGE = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmEISboQsDjY02hZFABoG-G0a2sXLMfwtJcBO29_j0wYvnLsq6BlAFvLk7y9fZ-_TBM7o&usqp=CAU';

const EditPost = ({ blogId, onCancel, onUpdate }) => {
	const formik = useFormik({
		initialValues: {
			title: '',
			shortDescription: '',
			content: '',
			image: null,
		},
		validationSchema: Yup.object({
			title: Yup.string()
				.min(20, 'Title must be at least 20 characters ')
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

			const formData = new FormData();
			formData.append('title', values.title);
			formData.append('short_description', values.shortDescription);
			formData.append('content', values.content);
			if (values.image) {
				formData.append('image', values.image);
			}
			try {
				const response = await axiosInstance.put(`update-blog/${blogId}/`, formData);
				console.log('Post updated successfully:', response.data);
				onUpdate();

			} catch (error) {
				console.error('Error updating post:', error);
				toast.error('Error updating post. Please try again.');
			}
		},
	});

	useEffect(() => {
		const fetchBlogDetails = async () => {
			try {
				const response = await axiosInstance.get(`get-blog/${blogId}`);
				formik.setValues({
					title: response.data.title,
					shortDescription: response.data.short_description,
					content: response.data.content,
					image: null,
				});
				formik.setFieldValue('imageUrl', response.data.image);
			} catch (error) {
				console.log(error);
			}
		};

		fetchBlogDetails();
	}, [blogId]);

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			formik.setFieldValue('image', file);
		}
	};

	const renderImagePreview = () => {
		if (formik.values.image) {
			return URL.createObjectURL(formik.values.image);
		} else if (formik.values.imageUrl) {
			return formik.values.imageUrl;
		}
		return DEFAULT_IMAGE;
	};

	return (
		<div className="edit-post-container w-full mx-auto p-6 bg-white shadow-lg rounded-lg">
			<h2 className="text-2xl font-bold mb-6 text-center">Edit Blog Post</h2>
			<div className="mt-4 flex justify-center">
				<img
					src={renderImagePreview()}
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
						className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm ring-0"
						required
					/>
					{formik.touched.title && formik.errors.title ? (
						<div className="text-red-500 text-sm">{formik.errors.title}</div>
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
						className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm ring-0"
						placeholder="Write a short description..."
						required
					/>
					{formik.touched.shortDescription && formik.errors.shortDescription ? (
						<div className="text-red-500 text-sm">{formik.errors.shortDescription}</div>
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
					{formik.touched.image && formik.errors.image ? (
						<div className="text-red-500 text-sm">{formik.errors.image}</div>
					) : null}
				</div>

				<div>
					<label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
					<ReactQuill
						value={formik.values.content}
						onChange={(value) => formik.setFieldValue('content', value)}
						className="w-full border pb-40 border-gray-300 rounded-md shadow-sm"
						placeholder="Start editing your blog post..."
						style={{ height: '300px', paddingBottom: '40px' }}
					/>
					{formik.touched.content && formik.errors.content ? (
						<div className="text-red-500 text-sm">{formik.errors.content}</div>
					) : null}
				</div>

				<div className="flex pt-10 justify-between">
					<button
						type="submit"
						className="w-full bg-gray-600 hover:bg-gray-900 text-white font-semibold py-2 rounded-md transition duration-200 ease-in-out"
					>
						Update Post
					</button>
					<button
						type="button"
						className="ml-4 w-full bg-red-500 hover:bg-red-700 text-white font-semibold py-2 rounded-md transition duration-200 ease-in-out"
						onClick={onCancel}
					>
						Cancel
					</button>
				</div>
			</form>
		</div>
	);
};

export default EditPost;
