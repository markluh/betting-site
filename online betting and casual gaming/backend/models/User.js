class User {
  constructor(id, username, password, created_at) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.created_at = created_at;
  }
}

module.exports = User;
