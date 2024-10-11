import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const EmailPass = () => {
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const {token} = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make an API call to reset the password here
      // Assuming you have an endpoint that takes the new password and token
       // Get token from URL
      const response = await fetch(`http://localhost:4000/api/v1/resetPassword/${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newPassword }),
      });
      console.log(response);
      

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message); // Display success message
        setNewPassword('');
      } else {
        setMessage(data.message); // Display error message
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      setMessage('Failed to reset password. Please try again.');
    }
  };

  return (
    <div>
      <h2>Reset Your Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="newPassword">New Password:</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Reset Password</button>
      </form>
      {message && <p>{message}</p>} {/* Display success or error message */}
    </div>
  );
};

export default EmailPass;
