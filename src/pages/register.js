import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './auth.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    countryCode: '+92',
    phoneNumber: '',
    type: '',
    gender: '',
    age: ''
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleRegister = e => {
    e.preventDefault();
    const {
      name,
      email,
      password,
      confirmPassword,
      countryCode,
      phoneNumber,
      type,
      gender,
      age
    } = form;

    if (!email.includes('@')) return setError('Email must contain @');
    if (password.length < 8) return setError('Password must be at least 8 characters');
    if (password !== confirmPassword) return setError('Passwords do not match');

    const phoneRules = {
      '+92': 10,
      '+91': 9,
      '+1': 9,
      '+44': 9,
      '+971': 8
    };

    const expectedLength = phoneRules[countryCode];
    const digitsOnly = /^[0-9]+$/.test(phoneNumber);

    if (!digitsOnly || phoneNumber.length !== expectedLength) {
      return setError(`Phone number must be exactly ${expectedLength} digits for ${countryCode}`);
    }

    const fullPhone = `${countryCode}${phoneNumber}`;

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find(u => u.email === email)) return setError('Email already registered');

    const newUser = {
      name,
      email,
      password,
      phone: fullPhone,
      type,
      gender,
      age
    };

    localStorage.setItem('users', JSON.stringify([...users, newUser]));
    navigate('/signin');
  };

  return (
    <div className="auth-container">
      <div className="auth-page">
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <input name="name" type="text" placeholder="Name" value={form.name} onChange={handleChange} required />
          <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          
          <div className="password-wrapper">
            <input
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <span onClick={() => setShowPassword(!showPassword)} className="eye-icon">
              {showPassword ? <FaEye/> : < FaEyeSlash />}
            </span>
          </div>

          <div className="password-wrapper">
            <input
              name="confirmPassword"
              type={showConfirm ? 'text' : 'password'}
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
            <span onClick={() => setShowConfirm(!showConfirm)} className="eye-icon">
              {showConfirm ? < FaEye/> : <FaEyeSlash />}
            </span>
          </div>

          <div className="phone-wrapper">
            <div className="code-box">
              <select
                name="countryCode"
                value={form.countryCode}
                onChange={handleChange}
                required
              >
                <option value="+92">+92</option>
                <option value="+91">+91</option>
                <option value="+1">+1</option>
                <option value="+44">+44</option>
                <option value="+971">+971</option>
              </select>
            </div>
            <input
              name="phoneNumber"
              type="tel"
              placeholder="Phone Number"
              value={form.phoneNumber}
              onChange={handleChange}
              required
              pattern="[0-9]{7,15}"
              title="Enter digits only (7 to 15 digits)"
              className="only-phone"
            />
          </div>

          <select name="type" value={form.type} onChange={handleChange} required>
            <option value="" disabled>Select Type</option>
            <option value="Student">Student</option>
            <option value="Faculty">Faculty</option>
          </select>

          <select name="gender" value={form.gender} onChange={handleChange} required>
            <option value="" disabled>Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <input name="age" type="number" placeholder="Age" value={form.age} onChange={handleChange} required />

          {error && <p className="error">{error}</p>}

          <button type="submit">Register</button>

          <p className="register-link">
            Already have an account? <Link to="/signin">Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
