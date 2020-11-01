const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
    userId: { type: String, required: true},
    completed: { type: Boolean, default: false},
    text: { type: String, required: true},
    date: { type: Date, default: Date.now },
});

module.exports = model('Note', schema);
