import React, { useState } from 'react';
import { auth, googleProvider } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setError(''); // Clear any existing errors
    } catch (error) {
      setError(getErrorMessage(error));
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setError(''); // Clear any existing errors
    } catch (error) {
      setError(getErrorMessage(error));
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      setError(''); // Clear any existing errors
    } catch (error) {
      setError(getErrorMessage(error));
    }
  };

  const getErrorMessage = (error) => {
    switch (error.code) {
      case 'auth/invalid-credential':
        return 'Invalid email or password. Please try again.';
      case 'auth/user-not-found':
        return 'No user found with this email. Please sign up.';
      case 'auth/wrong-password':
        return 'Incorrect password. Please try again.';
      case 'auth/email-already-in-use':
        return 'Email already in use. Please use a different email or sign in.';
      case 'auth/weak-password':
        return 'Password is too weak. Please use a stronger password.';
      case 'auth/invalid-email':
        return 'Invalid email address. Please enter a valid email.';
      case 'auth/operation-not-allowed':
        return 'This sign-in method is not allowed. Please contact support.';
      case 'auth/popup-closed-by-user':
        return 'Sign-in popup was closed before completing. Please try again.';
      default:
        return 'An error occurred. Please try again later.';
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-4">Sign In / Sign Up</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSignIn}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-2 mb-2 border rounded"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-2 mb-4 border rounded"
        />
        <button type="submit" className="w-full p-2 mb-2 bg-blue-500 text-white rounded">Sign In</button>
      </form>
      <button onClick={handleSignUp} className="w-full p-2 mb-2 bg-green-500 text-white rounded">Sign Up</button>
      <button onClick={handleGoogleSignIn} className="w-full p-2 bg-red-500 text-white rounded">Sign In with Google</button>
    </div>
  );
}

export default Auth;