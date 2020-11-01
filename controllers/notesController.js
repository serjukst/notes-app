const Note = require('../models/Note');

const post = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      res.status(400).json({ message: 'Field can not be empty' });
    }

    const note = new Note({
      userId: req.user.userId,
      text,
    });

    await note.save();

    res.json({ message: 'Success' });
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong, try again...' });
  }
};

const get = async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.userId });
    res.json(notes);
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong, try again...' });
  }
};

const getById = async (req, res) => {
  try {
    const notes = await Note.findOne({
      userId: req.user.userId,
      _id: req.params.id,
    }).exec();
    res.json(notes);
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong, try again...' });
  }
};

const put = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      res.status(400).json({ message: 'Field can not be empty' });
    }

    const note = await Note.findOne({
      userId: req.user.userId,
      _id: req.params.id,
    }).exec();

    note.text = text;
    await note.save();

    res.json({ message: 'Success' });
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong, try again...' });
  }
};

const patch = async (req, res) => {
  try {
    const note = await Note.findOne({
      userId: req.user.userId,
      _id: req.params.id,
    }).exec();

    note.completed = !note.completed;
    await note.save();

    res.json({ message: 'Success' });
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong, try again...' });
  }
};

const del = async (req, res) => {
  try {
    await Note.deleteOne({
      userId: req.user.userId,
      _id: req.params.id,
    }).exec();

    res.json({ message: 'Success' });
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong, try again...' });
  }
};

module.exports = {
  post,
  get,
  getById,
  put,
  patch,
  del,
};
