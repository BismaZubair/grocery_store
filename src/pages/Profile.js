import React from 'react';
import { useAuth } from '../context/AuthContext';
import './auth.css';

function Profile() {
  const { user } = useAuth();

  return (
    <div className="auth-container">
    <div className="auth-page">
      <h2>Profile</h2>
      {user ? (
        <div>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Type:</strong> {user.type}</p>
          <p><strong>Gender:</strong> {user.gender}</p>
          <p><strong>Age:</strong> {user.age}</p>
        </div>
      ) : (
        <p>No user logged in.</p>
      )}
    </div>
    </div>
  );
}

export default Profile;