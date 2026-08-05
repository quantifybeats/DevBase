import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'student' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/register', formData);
      login(res.data.token, res.data.user);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md border border-slate-200">
      <h2 className="text-2xl font-bold mb-6 text-slate-800 text-center">Create an Account</h2>
      {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-slate-700 mb-2">Name</label>
          <input 
            type="text" name="name"
            className="w-full p-2 border border-slate-300 rounded focus:outline-none focus:border-blue-500"
            value={formData.name} onChange={handleChange} required 
          />
        </div>
        <div className="mb-4">
          <label className="block text-slate-700 mb-2">Email</label>
          <input 
            type="email" name="email"
            className="w-full p-2 border border-slate-300 rounded focus:outline-none focus:border-blue-500"
            value={formData.email} onChange={handleChange} required 
          />
        </div>
        <div className="mb-4">
          <label className="block text-slate-700 mb-2">Password</label>
          <input 
            type="password" name="password"
            className="w-full p-2 border border-slate-300 rounded focus:outline-none focus:border-blue-500"
            value={formData.password} onChange={handleChange} required minLength={6}
          />
        </div>
        <div className="mb-6">
          <label className="block text-slate-700 mb-2">Role</label>
          <select 
            name="role" 
            className="w-full p-2 border border-slate-300 rounded focus:outline-none focus:border-blue-500"
            value={formData.role} onChange={handleChange}
          >
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 font-semibold transition-colors">
          Register
        </button>
      </form>
      <div className="mt-4 text-center text-sm text-slate-600">
        Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Log in</Link>
      </div>
    </div>
  );
};

export default Register;
