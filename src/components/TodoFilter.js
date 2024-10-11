import React from 'react';

function TodoFilter({ filter, setFilter }) {
  return (
    <div className="flex justify-center space-x-4 my-4">
      {['All', 'Active', 'Completed'].map((status) => (
        <button
          key={status}
          onClick={() => setFilter(status)}
          className={`px-3 py-1 rounded ${filter === status ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          {status}
        </button>
      ))}
    </div>
  );
}

export default TodoFilter;