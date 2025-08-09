const pool = require('../config/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}


exports.register = async (req, res) => {
  const { username, password, email, phone } = req.body;
  const isValidPhone = phone ? /^07\d{8}$/.test(phone) : false;

  if (!username || !password || (!email && !phone)) {
    return res.status(400).json({ message: 'Username, password, and either email or phone required' });
  }
  if (phone && !isValidPhone) {
    return res.status(400).json({ message: 'Phone number must start with 07 and be exactly 10 digits' });
  }


  const otp = generateOtp();
  const expiresAt = new Date(Date.now() + 10 * 60000); //otp expires 10 minutes from generation time

  
  pool.query(
    'INSERT INTO otps (username, otp, expires_at) VALUES (?, ?, ?)',
    [username, otp, expiresAt],
    (err) => {
      if (err) return res.status(500).json({ message: 'OTP generation failed', error: err });
     
      res.status(200).json({ message: 'OTP sent. Please verify to complete registration.', otp }); 
    }
  );
};

exports.login = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password required' });
  }
  pool.query(
    'SELECT * FROM users WHERE username = ?',
    [username],
    async (err, results) => {
      if (err || results.length === 0) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      const user = results[0];
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      const token = jwt.sign({ id: user.id, username: user.username }, '8ab313a3eee24bd0d8f632793e6be775f01f3510d6f846aec4015bd4b0b8e720', { expiresIn: '1h' });
      res.json({ token });
    }
  );
};

exports.verifyOtp = async (req, res) => {
  const { username, otp, password, email, phone } = req.body;
  pool.query(
    'SELECT * FROM otps WHERE username = ? AND otp = ? AND expires_at > NOW()',
    [username, otp],
    async (err, results) => {
      if (err || results.length === 0) {
        return res.status(400).json({ message: 'Invalid or expired OTP' });
      }
      
      const hashedPassword = await bcrypt.hash(password, 10);
      pool.query(
        'INSERT INTO users (username, password, email, phone) VALUES (?, ?, ?, ?)',
        [username, hashedPassword, email || null, phone || null],
        (err2) => {
          if (err2) return res.status(500).json({ message: 'User registration failed', error: err2 });
          
          pool.query('DELETE FROM otps WHERE username = ?', [username]);
          res.status(201).json({ message: 'User registered successfully' });
        }
      );
    }
  );
};
