import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './auth.css';

function SignIn() {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleLogin = e => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === form.email);

    if (!user) return setError('No account found with this email.');
    if (user.password !== form.password) return setError('Incorrect password.');

    setUser(user);
    navigate('/');

  };

  return (
    <div className="auth-container">
    <div className="auth-page">
      <h2>Sign In</h2>
      <form onSubmit={handleLogin}>
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        {error && <p className="error">{error}</p>}
        <button type="submit">Sign In</button>
        <p className="register-link">
  Don’t have an account? <Link to="/register">Register</Link>
</p>

      </form>
    </div>
        </div> );
}

export default SignIn;