class Bet {
  constructor(id, user_id, game_id, amount, created_at) {
    this.id = id;
    this.user_id = user_id;
    this.game_id = game_id;
    this.amount = amount;
    this.created_at = created_at;
  }
}

module.exports = Bet;