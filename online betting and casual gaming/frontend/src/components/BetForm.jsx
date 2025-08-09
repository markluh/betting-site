import React, { useState } from 'react';
import axios from 'axios';

const BetForm = ({ gameId, token }) => {
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');

  const handleBet = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'http://localhost:5000/api/bet',
        { game_id: gameId, amount },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(res.data.message || 'Bet placed successfully!');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Bet failed');
    }
  };

  return (
    <form
      onSubmit={handleBet}
      className="bg-white p-6 rounded shadow max-w-md mx-auto my-8"
    >
      <label className="block mb-2 font-semibold">
        Amount:
        <input
          type="number"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          required
          min="1"
          className="block w-full mb-4 p-2 border border-gray-300 rounded"
        />
      </label>
      <button
        type="submit"
        className="bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition"
      >
        Place Bet
      </button>
      {message && (
        <p className="mt-4 text-center text-blue-600 font-semibold">{message}</p>
      )}
    </form>
  );
};

export default BetForm;