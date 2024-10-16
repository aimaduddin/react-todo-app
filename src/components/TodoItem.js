import React from 'react';

function TodoItem({ todo, toggleTodo, deleteTodo }) {
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      deleteTodo(todo.id);
    }
  };

  return (
    <li className="flex items-center justify-between p-3 bg-gray-100 rounded-md mb-2">
      <div>
        <span
          className={`cursor-pointer ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}
          onClick={() => toggleTodo(todo.id)}
        >
          {todo.text}
        </span>
        {todo.dueDate && (
          <span className="ml-2 text-sm text-gray-500">
            Due: {new Date(todo.dueDate).toLocaleDateString()}
          </span>
        )}
      </div>
      <button 
        onClick={handleDelete}
        className="ml-2 px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
      >
        Delete
      </button>
    </li>
  );
}

export default TodoItem;