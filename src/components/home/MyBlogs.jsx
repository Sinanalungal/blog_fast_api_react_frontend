import React, { useState, useEffect } from 'react';
import { FiEdit, FiTrash } from 'react-icons/fi';
import EditPost from './MyBlogEdit';
import axiosInstance from '../../axios/axiosIntrecepters';
import Modal from 'react-modal';
import { toast } from 'react-toastify';

Modal.setAppElement('#portal-root');

const MyBlogs = () => {
    const [blogPosts, setBlogPosts] = useState([]);
    const [editPostId, setEditPostId] = useState(null);
    const [deletePostId, setDeletePostId] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(false);

    const fetchBlogs = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(`get-my-blogs/`);
            console.log("API Response:", response.data);
            setBlogPosts(response.data.results);
        } catch (error) {
            console.error("Error fetching blogs:", error);
            toast.error("Failed to load blog posts.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, [refresh]);
    const handleEditClick = (postId) => {
        console.log("Edit clicked for post:", postId);
        setEditPostId(postId);
    };

    const handleDeleteClick = (postId) => {
        console.log("Delete clicked for post:", postId);
        setDeletePostId(postId);
        setIsModalVisible(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await axiosInstance.delete(`my-blogs/${deletePostId}/`);
            setDeletePostId(null);
            setIsModalVisible(false);
            setRefresh(prev => !prev);
            toast.success("Blog post deleted successfully!");
        } catch (error) {
            console.error("Failed to delete the blog post:", error);
            toast.error("Failed to delete the blog post.");
        }
    };

    const handleCancelDelete = () => {
        setIsModalVisible(false);
        setDeletePostId(null);
    };

    const handleUpdateSuccess = () => {
        setEditPostId(null);
        setRefresh(prev => !prev);
        toast.success("Blog post updated successfully!");
    };

    return (
        <div className="container mx-auto p-6">
            {loading ? (
                <p className="text-center">Loading...</p>
            ) : editPostId ? (
                <EditPost
                    key={editPostId}
                    blogId={editPostId}
                    onCancel={() => setEditPostId(null)}
                    onUpdate={handleUpdateSuccess}
                />
            ) : (
                <>
                    <h1 className="text-3xl font-bold text-center pb-10">My Blogs</h1>
                    {blogPosts.length === 0 && <p className="text-center">No blog posts available.</p>}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {blogPosts.map((post) => (
                            <div key={post.id} className="bg-white shadow-md rounded-lg overflow-hidden transition hover:shadow-lg">
                                {post.image && (
                                    <img src={post.image} alt={post.title} className="w-full h-40 object-cover" />
                                )}
                                <div className="p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-lg truncate max-w-72 break-words font-semibold">{post.title}</h3>
                                        <div className="flex space-x-2">
                                            <button
                                                className="text-gray-500 hover:text-gray-900"
                                                onClick={() => handleEditClick(post.id)}
                                                title="Edit"
                                            >
                                                <FiEdit size={20} />
                                            </button>
                                            <button
                                                className="text-red-500 hover:text-red-700"
                                                onClick={() => handleDeleteClick(post.id)}
                                                title="Delete"
                                            >
                                                <FiTrash size={20} />
                                            </button>
                                        </div>
                                    </div>
                                    <p className="text-gray-500 text-xs mb-2">{post.author?.email || 'Unknown author'}</p>
                                    <p className="text-gray-600 line-clamp-2 break-words text-sm">
                                        {post.short_description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <Modal
                        isOpen={isModalVisible}
                        onRequestClose={handleCancelDelete}
                        className="bg-white rounded-lg p-6 mx-4 sm:mx-auto sm:w-3/4 md:w-1/3 lg:w-1/4"
                        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
                    >
                        <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
                        <p>Are you sure you want to delete this blog post?</p>
                        <div className="flex justify-end mt-4">
                            <button
                                className="bg-red-600 text-white px-4 py-2 rounded mr-2"
                                onClick={handleConfirmDelete}
                            >
                                Delete
                            </button>
                            <button
                                className="bg-gray-300 text-black px-4 py-2 rounded"
                                onClick={handleCancelDelete}
                            >
                                Cancel
                            </button>
                        </div>
                    </Modal>
                </>
            )}
        </div>
    );
};

export default MyBlogs;
