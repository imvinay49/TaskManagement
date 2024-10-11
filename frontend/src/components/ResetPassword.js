import React, { useState } from 'react';

const ResetPassword = () => {
    const [email, setEmail] = useState(''); // State for email input
    const [message, setMessage] = useState(''); // State for feedback message

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        try {
            // Make an API call to request a password reset
            const response = await fetch('http://localhost:4000/api/v1/requestPasswordReset', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }), // Send the email in the request body
            });

            const data = await response.json(); // Parse the response
            if (response.ok) {
                setMessage('Link sent to your email for password reset.'); // Success message
            } else {
                setMessage(data.message || 'Failed to send reset link.'); // Error message
            }
        } catch (error) {
            console.error('Error sending reset link:', error);
            setMessage('Failed to send reset link. Please try again.'); // General error message
        }
    };

    return (
        <div>
            <h2>Reset Your Password</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Send Reset Link</button>
            </form>
            {message && <p>{message}</p>} {/* Display feedback message */}
        </div>
    );
};

export default ResetPassword;
