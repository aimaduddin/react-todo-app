import React, { useState, useEffect } from 'react';
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, orderBy, where } from 'firebase/firestore';
import { auth, db } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import TodoFilter from './components/TodoFilter';
import Auth from './components/Auth';

function App() {
  const [user, setUser] = useState(null);
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      const q = query(
        collection(db, 'todos'),
        where('userId', '==', user.uid),
        orderBy('dueDate')
      );
      const unsubscribe = onSnapshot(q, (snapshot) => {
        setTodos(snapshot.docs.map(doc => ({id: doc.id, ...doc.data()})));
      });
      return () => unsubscribe();
    } else {
      setTodos([]);
    }
  }, [user]);

  const addTodo = async (text, dueDate) => {
    if (text && user) {
      await addDoc(collection(db, 'todos'), {
        text,
        completed: false,
        dueDate: dueDate || null,
        userId: user.uid
      });
    }
  };

  const toggleTodo = async (id) => {
    const todoRef = doc(db, 'todos', id);
    const todo = todos.find(todo => todo.id === id);
    await updateDoc(todoRef, { completed: !todo.completed });
  };

  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, 'todos', id));
  };

  const handleSignOut = () => {
    signOut(auth);
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'Active') return !todo.completed;
    if (filter === 'Completed') return todo.completed;
    return true;
  });

  if (!user) {
    return <Auth />;
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Todo App</h1>
      <p className="mb-4">Welcome, {user.email}!</p>
      <button onClick={handleSignOut} className="mb-4 p-2 bg-red-500 text-white rounded">Sign Out</button>
      <TodoForm addTodo={addTodo} />
      <TodoFilter filter={filter} setFilter={setFilter} />
      <TodoList todos={filteredTodos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </div>
  );
}

export default App;