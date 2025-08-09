import React, { useState } from 'react';
import axios from 'axios';

const OtpForm = ({ username, password, email, phone, onVerified }) => {
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/verify-otp', {
        username,
        otp,
        password,
        email,
        phone
      });
      if (res.data.message === 'User registered successfully') {
        setMessage('Registration complete!');
        onVerified();
      } else {
        setMessage(res.data.message || 'Verification failed');
      }
    } catch (err) {
      setMessage(err.response?.data?.message || 'Verification failed');
    }
  };

  return (
    <form
      onSubmit={handleVerify}
      className="bg-white p-6 rounded shadow max-w-md mx-auto my-8"
    >
      <label className="block mb-2 font-semibold">
        Enter OTP:
        <input
          type="text"
          value={otp}
          onChange={e => setOtp(e.target.value)}
          required
          maxLength={6}
          className="block w-full mb-4 p-2 border border-gray-300 rounded"
        />
      </label>
      <button
        type="submit"
        className="bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition"
      >
        Verify OTP
      </button>
      {message && (
        <div className="mt-4 text-center text-blue-600 font-semibold">{message}</div>
      )}
    </form>
  );
};

export default OtpForm;