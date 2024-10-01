import { useEffect, useState } from 'react'
import './App.css'
import PostList from './components/post';

function App() {



    const [bugs, setBugs] = useState([]);
    const [filter, setFilter] = useState('all');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');

   // Load bugs from localStorage when the component mounts
   useEffect(() => {
    const storedBugs = JSON.parse(localStorage.getItem('bugs')) || [];
    setBugs(storedBugs);
}, []);

  

    const addBug = () => {
        const newBug = {
            title,
            description,
            date: new Date().toLocaleString(),
            status: 'pending'
        };
        const updatedBugs = [...bugs, newBug];
        setBugs(updatedBugs);
        localStorage.setItem('bugs', JSON.stringify(updatedBugs)); // Save to localStorage
        setTitle('');
        setDescription('');
    };

    const changeStatus = (index, status) => {
        const updatedBugs = bugs.map((bug, i) => 
            i === index ? { ...bug, status } : bug
        );
        setBugs(updatedBugs);
        localStorage.setItem('bugs', JSON.stringify(updatedBugs)); // Save to localStorage

    };

    const filteredBugs = bugs.filter(bug => 
        filter === 'all' ? true : bug.status === filter
    );


    const sortedBugs = [...filteredBugs].sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });



    return (
        <>
        
            <h1 className="text-2xl font-bold mb-4">Bug Tracker</h1>
            <div className="">
                <input 
                    type="text" 
                    placeholder="Title" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    className="mb-2 p-2 border border-gray-300 rounded w-full text-black"
                />
                <input 
                    type="text" 
                    placeholder="Description" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    className="mb-2 p-2 border border-gray-300 rounded w-full text-black"
                />
                <button 
                    onClick={addBug} 
                    className="bg-blue-500 text-white p-2 rounded w-full"
                >
                    Add Bug
                </button>
            </div>
            <div className="p-4 flex justify-between items-center">
                <div>
                    <button 
                        onClick={() => setFilter('all')} 
                        className="bg-gray-500 text-white p-2 rounded mr-2 hover:bg-gray-600"
                    >
                        All
                    </button>
                    <button 
                        onClick={() => setFilter('pending')} 
                        className="bg-yellow-500 text-white p-2 rounded mr-2 hover:bg-yellow-600"
                    >
                        Pending
                    </button>
                    <button 
                        onClick={() => setFilter('completed')} 
                        className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
                    >
                        Completed
                    </button>
                </div>
                <div>
                    <select 
                        onChange={(e) => setSortOrder(e.target.value)} 
                        className="bg-white text-black p-2 rounded border border-gray-300"
                    >
                        <option value="ascending">Ascending</option>
                        <option value="descending">Descending</option>
                    </select>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredBugs.map((bug, index) => (
                            <tr key={index} className="hover:bg-gray-100">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{bug.title}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{bug.description}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{bug.date}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{bug.status}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <input 
                                        type="checkbox" 
                                        checked={bug.status === 'completed'} 
                                        onChange={() => changeStatus(index, bug.status === 'completed' ? 'pending' : 'completed')} 
                                        className="form-checkbox h-5 w-5 text-green-600"
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <PostList/>
        </>
    )
  
              }

export default App
