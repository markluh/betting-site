import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = ({ token }) => {
  const [user, setUser] = useState(null);
  const [bets, setBets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Fetch user info from backend (implement /api/auth/me endpoint in backend)
        const resUser = await axios.get('http://localhost:5000/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(resUser.data);

        // Fetch user's bets
        const resBets = await axios.get('http://localhost:5000/api/user/bets', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBets(resBets.data);
      } catch (err) {
        // Handle error
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [token]);

  if (loading) return <div className="text-center mt-8">Loading profile...</div>;

  return (
    <div className="max-w-2xl mx-auto my-8 bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">Profile</h1>
      {user && (
        <div className="mb-6">
          <p><span className="font-semibold">Username:</span> {user.username}</p>
          <p><span className="font-semibold">Email:</span> {user.email}</p>
          <p><span className="font-semibold">Phone:</span> {user.phone}</p>
        </div>
      )}
      <h2 className="text-xl font-bold mb-2">Your Bets</h2>
      <ul className="list-disc pl-6">
        {bets.map(bet => (
          <li key={bet.id}>
            Game ID: {bet.game_id}, Amount: {bet.amount}, Date: {bet.created_at}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;