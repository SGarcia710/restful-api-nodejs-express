const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

if (process.env.ENV === 'Test') {
  console.log('This is a test');
  const db = mongoose.connect(
    'mongodb+srv://dbadmin:<Password>@cluster0-fhulk.mongodb.net/booksdb_Test?retryWrites=true&w=majority',
    { useUnifiedTopology: true, useNewUrlParser: true }
  );
} else {
  console.log('This is for real');
  const db = mongoose.connect(
    'mongodb+srv://dbadmin:<Password>@cluster0-fhulk.mongodb.net/booksdb?retryWrites=true&w=majority',
    { useUnifiedTopology: true, useNewUrlParser: true }
  );
}

const port = process.env.PORT || 3001;
const Book = require('./models/bookModel');
const bookRouter = require('./routes/bookRouter')(Book);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', bookRouter);

app.get('/', (req, res) => {
  res.send('Welcome to my API');
});

app.server = app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

module.exports = app;
