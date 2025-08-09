import React, { useState } from 'react';
import axios from 'axios';
import OtpForm from './OtpForm';

const RegisterForm = ({ onRegistered }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', {
        username,
        password,
        email,
        phone
      });
      if (res.data.message && res.data.message.includes('OTP sent')) {
        setShowOtp(true);
        setMessage('OTP sent. Please check your phone or email.');
      } else {
        setMessage(res.data.message || 'Registration failed');
      }
    } catch (err) {
      setMessage(err.response?.data?.message || 'Registration failed');
    }
  };

  if (showOtp) {
    return (
      <OtpForm
        username={username}
        password={password}
        email={email}
        phone={phone}
        onVerified={onRegistered}
      />
    );
  }

  return (
    <form
      onSubmit={handleRegister}
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
      <label className="block mb-2 font-semibold">
        Email:
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="block w-full mb-4 p-2 border border-gray-300 rounded"
        />
      </label>
      <label className="block mb-2 font-semibold">
        Phone:
        <input
          type="text"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          maxLength={10}
          pattern="07[0-9]{8}"
          title="Phone number must start with 07 and be 10 digits"
          className="block w-full mb-4 p-2 border border-gray-300 rounded"
        />
      </label>
      <button
        type="submit"
        className="bg-blue-600 text-white font-bold py-2 text-center px-4 rounded hover:bg-blue-700 transition"
      >
        Register
      </button>
      {message && <p className="mt-4 text-center text-blue-600">{message}</p>}
    </form>
  );
};

export default RegisterForm;