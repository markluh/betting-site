import React, { useState } from 'react';
import GameList from '../components/GameList';
import BetForm from '../components/BetForm';

const Games = ({ token }) => {
  const [selectedGameId, setSelectedGameId] = useState(null);

  return (
    <div className="cursor-pointer">
      <h1 className="text-3xl font-bold text-center mb-4 text-blue-700 hover:underline">Games</h1>
      {!selectedGameId ? (
        <GameList token={token} onSelectGame={setSelectedGameId} />
      ) : (
        <BetForm gameId={selectedGameId} token={token} />
      )}
    </div>
  );
};

export default Games;