import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error before making the request
    console.log('Login attempt', { email, password });

    try {
      // Send login credentials to backend for authentication
      // const response = await axios.post('http://localhost:5000/api/patients/login', {
      //   email,
      //   password,
      // });
      const response = await fetch('http://localhost:5000/api/patients/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();


      // Assuming the backend sends a JWT token on successful login
      
      
      // Save the token to localStorage (or sessionStorage, as needed)
      localStorage.setItem('authToken', data.token);

      // Redirect user to a different page (e.g., dashboard) after successful login
      // You can use React Router's `useNavigate()` to navigate
      navigate('/patient/dashboard');
      alert('Login successful!'); // Success message
      
    } catch (err) {
      // Handle error
      console.error('Error logging in:', err);
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-2xl font-bold mb-6 text-center">Welcome Back</h2>
          <form onSubmit={handleSubmit}>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="you@example.com"
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
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Sign In
              </button>
              <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                Forgot Password?
              </a>
            </div>
          </form>
        </div>
        <p className="text-center text-gray-500 text-xs">
          Don't have an account? <Link to="/register" className="text-blue-500 hover:text-blue-800">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
