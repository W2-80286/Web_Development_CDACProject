import React, { useState } from 'react';
import axios from 'axios';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4001/user/signin', { email, password });
      const { token, firstName, lastName, role } = response.data;
      // Do something with the token (e.g., store it in localStorage) and redirect the user
      console.log('Signin successful:', token, firstName, lastName, role);
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error('Server responded with status:', error.response.status);
        setError('Invalid email or password');
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
        setError('Could not connect to the server');
      } else {
        // Something else happened while setting up the request
        console.error('Error setting up the request:', error.message);
        setError('An unexpected error occurred');
      }
    }
  };

  return (
    <div>
      <h2>Sign In</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSignin}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default Signin;
