import React from 'react';
import GameList from '../components/GameList';

const Home = ({ token, onSelectGame }) => (
  <div className="max-w-3xl mx-auto my-12 bg-white cursor-pointer p-8 rounded shadow">
    <h1 className="text-3xl hover:underline cursor-pointer font-bold text-center mb-3 text-blue-700">
      Welcome to LiteBet.com
    </h1>
    <p className="text-center font-medium hover:underline cursor-pointer mb-7 text-gray-700">The leading betting website</p>
    <p className="text-center mb-8 cursor-pointer text-gray-700">
      Register, login, and start placing bets on live football games.<br />
      Enjoy secure payments and instant results!
    </p>
    <GameList token={token} onSelectGame={onSelectGame || (() => {})} />
  </div>
);

export default Home;