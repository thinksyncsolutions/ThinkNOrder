// components/Auth/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Mail, Lock, LayoutDashboard, AlertCircle } from 'lucide-react';

const baseURL = import.meta.env.VITE_API_BASE_URL;

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${baseURL}/auth/login`, formData, {
        withCredentials: true
      });

      if (response.status === 200) {
        localStorage.setItem('admin', JSON.stringify(response.data.admin));
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-100 p-4 font-sans">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden lg:grid lg:grid-cols-2">
        
        {/* Left Side - Branding & Welcome Message */}
        <div className="hidden lg:flex flex-col items-center justify-center p-12 bg-gradient-to-br from-blue-600 to-purple-600 text-white text-center">
            <LayoutDashboard size={64} className="mb-6 opacity-80" />
            <h1 className="text-4xl font-extrabold mb-3 tracking-tight">Think&Order</h1>
            <p className="text-lg opacity-90 leading-relaxed">
              Welcome to the central hub for managing your restaurant's success.
            </p>
        </div>

        {/* Right Side - Login Form */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-800 mb-2">Admin Login</h2>
            <p className="text-slate-500">Please enter your credentials to proceed.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg text-sm flex items-center gap-3">
                <AlertCircle size={20} />
                <span>{error}</span>
              </div>
            )}
            
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-200"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-200"
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Signing In...</span>
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="text-center mt-8">
            <p className="text-slate-500 text-sm">
              Don't have an account?{' '}
              <a href="/register" className="text-blue-600 hover:underline font-medium transition duration-200">
                Register here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;