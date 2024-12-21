import React, { useEffect, useState } from 'react';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import Drawer from './Drawar';
import axiosInstance from '../../axios/axiosIntrecepters';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Blogs = () => {

    const [blogPosts, setBlogPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const blogsPerPage = 6;

    useEffect(() => {
        const fetchData = async (page = 1) => {
            try {
                const response = await axiosInstance.get(`blogs/?page=${page}`);
                console.log(response.data);
                setBlogPosts(response.data.results);

                const totalBlogs = response.data.count;
                setTotalPages(Math.ceil(totalBlogs / blogsPerPage));
            } catch (error) {
                console.log(error);
            }
        };
        fetchData(currentPage);
    }, [currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleReadMore = (post) => {
        setSelectedBlog(post);
        setIsDrawerOpen(true);
    };

    const handleCloseDrawer = () => {
        setIsDrawerOpen(false);
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold text-center mb-2">Blogs</h1>
            <p className="text-sm text-gray-400 text-center mb-6">
                Explore our latest blogs featuring diverse topics that inspire and engage.
            </p>

            {blogPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {blogPosts.map((post) => (
                        <div key={post.id} className="bg-white shadow-md rounded-lg overflow-hidden transition hover:shadow-lg">
                            <img src={post.image} alt={post.title} className="w-full h-40 object-cover" />
                            <div className="p-4">
                                <h3 className="text-lg truncate font-semibold">{post.title}</h3>
                                <p className="text-gray-500 text-xs mb-2">{post?.author?.email}</p>
                                <p className="text-gray-600 line-clamp-2 break-words text-sm">
                                    {post.short_description}
                                </p>
                                <button
                                    className="mt-3 flex items-center text-blue-500 hover:underline"
                                    onClick={() => handleReadMore(post)}
                                >
                                    Read More
                                    <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500">No blogs available.</p>
            )}

            {totalPages > 1 && (
                <div className="flex justify-center space-x-2 mt-6">
                    <button
                        className="px-3 py-1 rounded bg-gray-200 text-black disabled:opacity-50 hover:bg-gray-400"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        <AiOutlineLeft />
                    </button>

                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index}
                            className={`px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-gray-400 text-white' : 'bg-gray-200 text-black'} hover:bg-gray-400`}
                            onClick={() => handlePageChange(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}

                    <button
                        className="px-3 py-1 rounded bg-gray-200 text-black disabled:opacity-50 hover:bg-gray-400"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        <AiOutlineRight />
                    </button>
                </div>
            )}

            {isDrawerOpen && (
                <Drawer isOpen={isDrawerOpen} onClose={handleCloseDrawer} blog={selectedBlog} />
            )}
        </div>
    );
};

export default Blogs;
