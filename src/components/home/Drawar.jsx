import { motion } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import ReactDOM from 'react-dom';

const Drawer = ({ isOpen, onClose, blog }) => {
    if (!blog) return null;

    const drawerContent = (
        <motion.div
            className="fixed bottom-0 overflow-y-auto scrollbar-hide z-10 lg:px-20 transform -translate-x-1/2 w-full h-[90vh] bg-white border rounded-t-3xl"
            initial={{ y: '100%' }}
            animate={{ y: isOpen ? '0%' : '100%' }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
            <style>
                {`
                    .break-words {
                        overflow-wrap: break-word; /* Allows breaking long words */
                        word-break: break-all; /* Breaks words at any character */
                    }
                `}
            </style>
            <div className='max-w-7xl break-words'>
                <div className="p-6 flex items-center flex-col md:px-36 h-full scrollbar-hide">
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700 mb-4 self-end">
                        <FaTimes size={28} />
                    </button>
                    <h2 className="text-2xl font-bold mb-6 break-words">
                        <b>{blog.title}</b>
                    </h2>
                    <p className="text-gray-700 break-words text-justify mb-4">
                        {blog.short_description}
                    </p>
                    <img src={blog.image} alt={blog.title} className="h-[90%] w-[95%] object-cover mb-4 rounded-lg" />
                    <p className="text-gray-500 mb-4 break-words">
                        <b>By: {blog.author?.username || 'Unknown Author'}</b>
                    </p>

                    <div
                        className="text-gray-600 pb-20 text-justify break-words"
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                    />
                </div>
            </div>
        </motion.div>
    );

    return ReactDOM.createPortal(drawerContent, document.getElementById('portal-root'));
};

export default Drawer;
