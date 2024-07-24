import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SignUp from '../components/SignUp';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8800/api-v1';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccessMessage('');
    },1000);

    return () => clearTimeout(timer);
  }, [successMessage]);

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });

      if (response.data.success) {
        setError('');
        setSuccessMessage('Successfully logged in');
        localStorage.setItem('token', response.data.token);
        setTimeout(() => navigate('/find-jobs'), 1000); // Navigate after 1 seconds
      } else {
        setError('Invalid credentials');
      }
    } catch (error) {
      console.error(error);
      setError('An error occurred during sign-in');
    }
  };

  return (
    <div className="container mx-auto flex flex-col items-center justify-center min-h-screen py-2">
      <h2 className="text-2xl font-semibold mb-6">Sign In</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSignIn}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Sign In
          </button>
        </div>
      </form>
      <p className="mt-4">
        Don't have an account?{' '}
        <button onClick={() => setIsSignUpOpen(true)} className="text-blue-500">
          Sign Up
        </button>
      </p>
      <SignUp open={isSignUpOpen} setOpen={setIsSignUpOpen} />
    </div>
  );
};

export default SignIn;
