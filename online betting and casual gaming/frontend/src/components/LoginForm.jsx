import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        username,
        password
      });
      if (res.data.token) {
        onLogin(res.data.token);
        setMessage('Login successful!');
      } else {
        setMessage('Login failed');
      }
    } catch (err) {
      setMessage(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="bg-white p-6 rounded shadow max-w-md mx-auto my-8"
    >
      <label className="block mb-2 font-semibold">
        Username:
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
          className="block w-full mb-4 p-2 border border-gray-300 rounded"
        />
      </label>
      <label className="block mb-2 font-semibold">
        Password:
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className="block w-full mb-4 p-2 border border-gray-300 rounded"
        />
      </label>
      <button
        type="submit"
        className="bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition"
      >
        Login
      </button>
      {message && (
        <div className="mt-4 text-center text-blue-600 font-semibold">{message}</div>
      )}
    </form>
  );
};

export default LoginForm;