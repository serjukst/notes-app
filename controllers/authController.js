const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Fields can not be empty' });
    }

    const candidate = await User.findOne({ username });

    if (candidate) {
      return res.status(400).json({ message: 'Such user already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ username, password: hashedPassword });
    await user.save();

    res.json({ message: 'User created' });
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong, try again...' });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Fields can not be empty' });
    }

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ message: 'Incorrect password, please try again' });
    }

    const token = jwt.sign({ userId: user.id }, config.get('jwtSecret'), {
      expiresIn: '1h',
    });

    res.json({ jwt_token: token, userId: user.id });
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong, try again...' });
  }
};

module.exports = {
  register,
  login,
};
