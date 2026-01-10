// components/Auth/Register.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { User, Mail, Lock, Building, MapPin, Phone, AlertCircle, UtensilsCrossed } from 'lucide-react';

const baseURL = import.meta.env.VITE_API_BASE_URL;

// Reusable Input Field Component for consistency
const InputField = ({ id, name, type, placeholder, value, onChange, required, icon: Icon, minLength }) => (
  <div className="relative">
    <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
      minLength={minLength}
      className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-200"
    />
  </div>
);

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    restaurantName: '',
    location: '',
    contactNumber: ''
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

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${baseURL}/auth/register`, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        restaurantName: formData.restaurantName,
        location: formData.location,
        contactNumber: formData.contactNumber
      });

      if (response.status === 201) {
        alert('Registration successful! Please login.');
        navigate('/login');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-100 p-4 font-sans">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden lg:grid lg:grid-cols-2">
        
        {/* Left Side - Branding */}
        <div className="hidden lg:flex flex-col items-center justify-center p-12 bg-gradient-to-br from-blue-600 to-purple-600 text-white text-center">
            <UtensilsCrossed size={64} className="mb-6 opacity-80" />
            <h1 className="text-4xl font-extrabold mb-3 tracking-tight">Join Think&Order</h1>
            <p className="text-lg opacity-90 leading-relaxed">
              Digitize your dining experience and streamline your restaurant's operations today.
            </p>
        </div>

        {/* Right Side - Registration Form */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-800 mb-2">Create Your Account</h2>
            <p className="text-slate-500">Let's get your restaurant set up.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {error && (
              <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg text-sm flex items-center gap-3">
                <AlertCircle size={20} />
                <span>{error}</span>
              </div>
            )}
            
            {/* Admin Details Section */}
            <fieldset className="space-y-4">
              <legend className="text-xl font-semibold text-slate-700 border-b border-slate-200 pb-2 mb-4 w-full">Admin Details</legend>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField id="name" name="name" type="text" placeholder="John Doe" value={formData.name} onChange={handleChange} required icon={User} />
                <InputField id="email" name="email" type="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} required icon={Mail} />
                <InputField id="password" name="password" type="password" placeholder="Create Password" value={formData.password} onChange={handleChange} required icon={Lock} minLength="6" />
                <InputField id="confirmPassword" name="confirmPassword" type="password" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required icon={Lock} />
              </div>
            </fieldset>

            {/* Restaurant Details Section */}
             <fieldset className="space-y-4">
              <legend className="text-xl font-semibold text-slate-700 border-b border-slate-200 pb-2 mb-4 w-full">Restaurant Details</legend>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField id="restaurantName" name="restaurantName" type="text" placeholder="Your Restaurant's Name" value={formData.restaurantName} onChange={handleChange} required icon={Building} />
                <InputField id="location" name="location" type="text" placeholder="City, Country" value={formData.location} onChange={handleChange} required icon={MapPin} />
                <InputField id="contactNumber" name="contactNumber" type="tel" placeholder="Contact Phone Number" value={formData.contactNumber} onChange={handleChange} required icon={Phone} />
              </div>
            </fieldset>

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
                  <span>Creating Account...</span>
                </div>
              ) : (
                'Register & Create Restaurant'
              )}
            </button>
          </form>

          <div className="text-center mt-8">
            <p className="text-slate-500 text-sm">
              Already have an account?{' '}
              <a href="/login" className="text-blue-600 hover:underline font-medium transition duration-200">
                Sign In
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
