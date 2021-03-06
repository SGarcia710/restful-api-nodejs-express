const mongoose = require('mongoose');

const { Schema } = mongoose;

const Book = new Schema({
  title: { type: String },
  genre: { type: String },
  author: { type: String },
  read: { type: Boolean, default: false },
});

module.exports = mongoose.model('Book', Book);
