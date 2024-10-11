import { useState } from 'react';
import axios from 'axios';
import Tasks from './Tasks';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/v1/login', { email, password });
      const token = response.data.token;
      localStorage.setItem('token', token); // Store JWT token
      console.log('Login successful');
      if (token) {
        setIsLoggedIn(true); // Update state to indicate the user is logged in
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  //Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
    console.log('Logged Out Successful');
  }

  return (
    <div>
      {!isLoggedIn ? (
        <form onSubmit={handleLogin}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button type="submit">Login</button>
          {error && <p>{error}</p>}
        </form>
      ) : (
        <div>
        <h1>Welcome To TASKIFY</h1>
          <Tasks />
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default Login;
