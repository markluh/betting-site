import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GameList = ({ token, onSelectGame }) => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/games', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setGames(res.data);
      } catch (err) {
        setError('Failed to fetch games');
      } finally {
        setLoading(false);
      }
    };
    fetchGames();
  }, [token]);

  if (loading) return <div className="text-center mt-8">Loading games...</div>;
  if (error) return <div className="text-center text-red-600 mt-8">{error}</div>;

  return (
    <div className="max-w-2xl mx-auto my-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Available Games</h2>
      <ul className="space-y-4">
        {games.map(game => (
          <li
            key={game.id}
            className="bg-white p-4 rounded shadow flex justify-between items-center"
          >
            <span>
              {game.name} <span className="text-gray-500">({game.league})</span> <br />
              <span className="text-sm text-gray-600">{game.date} {game.time}</span>
            </span>
            <button
              onClick={() => onSelectGame(game.id)}
              className="bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition"
            >
              Bet
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GameList;