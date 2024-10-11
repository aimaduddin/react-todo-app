import React from 'react';

function TodoItem({ todo, toggleTodo, deleteTodo }) {
  return (
    <li className="flex items-center justify-between p-3 bg-gray-100 rounded-md mb-2">
      <span
        className={`cursor-pointer ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}
        onClick={() => toggleTodo(todo.id)}
      >
        {todo.text}
      </span>
      <button 
        onClick={() => deleteTodo(todo.id)}
        className="ml-2 px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
      >
        Delete
      </button>
    </li>
  );
}

export default TodoItem;