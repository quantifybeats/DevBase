import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });
      login(res.data.token, res.data.user);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md border border-slate-200">
      <h2 className="text-2xl font-bold mb-6 text-slate-800 text-center">Login to DevBase</h2>
      {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-slate-700 mb-2">Email</label>
          <input 
            type="email" 
            className="w-full p-2 border border-slate-300 rounded focus:outline-none focus:border-blue-500"
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div className="mb-6">
          <label className="block text-slate-700 mb-2">Password</label>
          <input 
            type="password" 
            className="w-full p-2 border border-slate-300 rounded focus:outline-none focus:border-blue-500"
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 font-semibold transition-colors">
          Log In
        </button>
      </form>
      <div className="mt-4 text-center text-sm text-slate-600">
        Don't have an account? <Link to="/register" className="text-blue-600 hover:underline">Register here</Link>
      </div>
    </div>
  );
};

export default Login;
