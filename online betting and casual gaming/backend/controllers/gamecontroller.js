const axios = require('axios');
const pool = require('../config/database');

exports.getLiveGames = async (req, res) => {
  try {
    
    const response = await axios.get('/api/v2/json/search/league/english_premier_league');
    const games = response.data.events.map(event => ({
      id: event.idEvent,
      name: `${event.strHomeTeam} vs ${event.strAwayTeam}`,
      date: event.dateEvent,
      time: event.strTime,
      league: event.strLeague
    }));
    res.json(games);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch live games', error });
  }
};


exports.placeBet = (req, res) => {
  const { game_id, amount } = req.body;
  const user_id = req.user.id;
  if (!game_id || !amount) {
    return res.status(400).json({ message: 'Game ID and amount required' });
  }
  pool.query(
    'INSERT INTO bets (user_id, game_id, amount) VALUES (?, ?, ?)',
    [user_id, game_id, amount],
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Bet placement failed', error: err });
      }
      res.status(201).json({ message: 'Bet placed successfully' });
    }
  );
};
