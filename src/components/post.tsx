import { useEffect, useState } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);

   

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/posts/');
                const data = await response.json();
                setPosts(data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div className="bg-gray-50 p-6 rounded-lg shadow-md mt-4">
            <h1 className="text-3xl font-extrabold mb-6 text-center text-gray-800">Post Lists</h1>
            <ul className="space-y-4">
                {posts.map(post => (
                    <li 
                        key={post.id} 
                        className="p-4 border border-gray-300 rounded-lg shadow-lg hover:bg-gray-200 transition duration-300 ease-in-out"
                        onClick={() => setSelectedPost(post)}
                    >
                        <span className="text-blue-600 hover:text-blue-800 font-semibold cursor-pointer">
                            {post.title}
                        </span>
                    </li>
                ))}
            </ul>

            {selectedPost && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg shadow-xl max-w-lg w-full">
                        <h2 className="text-2xl font-bold mb-4 text-black">{selectedPost.title}</h2>
                        <p className="text-black">{selectedPost.body}</p>
                        <button 
                            onClick={() => setSelectedPost(null)} 
                            className="mt-4 bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition duration-300"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PostList;