const bcrypt = require('bcryptjs');
const User = require('../models/User');

const get = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.userId }).exec();
    res.json(user);
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong, try again...' });
  }
};

const del = async (req, res) => {
  try {
    await User.deleteOne({ _id: req.user.userId }).exec();
    res.json({ message: 'Success' });
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong, try again...' });
  }
};

const patch = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.userId }).exec();
    const { oldPassword, newPassword } = req.body;

    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ message: 'Incorrect password, please try again' });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 12);
    user.password = hashedNewPassword;
    await user.save();
    res.json({ message: 'Success' });
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong, try again...' });
  }
};

module.exports = {
  get,
  del,
  patch,
};
