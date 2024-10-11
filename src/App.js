import React, { useState, useEffect } from 'react';
import { 
  collection, 
  query, 
  where, 
  orderBy, 
  onSnapshot, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  serverTimestamp 
} from 'firebase/firestore';
import { db, auth } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import TodoFilter from './components/TodoFilter';
import Auth from './components/Auth';

function App() {
  const [user, setUser] = useState(null);
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('All');
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      console.log("Auth state changed. User:", user ? user.uid : "No user");
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    if (user) {
      const q = query(
        collection(db, 'todos'),
        where('userId', '==', user.uid),
        orderBy('createdAt', 'desc')
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const newTodos = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setTodos(newTodos);
      }, (error) => {
        console.error("Error fetching todos:", error);
      });

      return () => unsubscribe();
    } else {
      setTodos([]);
    }
  }, [user]);

  const addTodo = async (text) => {
    if (!user) {
      console.error("User is not authenticated");
      return;
    }
    if (text) {
      try {
        const docRef = await addDoc(collection(db, 'todos'), {
          text,
          completed: false,
          userId: user.uid,
          createdAt: serverTimestamp()
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (error) {
        console.error("Error adding todo:", error.code, error.message);
      }
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
      {isOffline && <div className="bg-yellow-100 p-2 text-center">You are offline. Some features may be limited.</div>}
    </div>
  );
}

export default App;