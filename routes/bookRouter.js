const express = require('express');
const booksController = require('../controllers/booksController');

function routes(Book) {
  const bookRouter = express.Router();
  const controller = booksController(Book);
  bookRouter.route('/books').get(controller.get).post(controller.post);

  // Middlewares
  bookRouter.use('/books/:bookId', (req, res, next) => {
    // next its a function that the middleware uses to signal that its done with its processing and its ready to pass that request on to the next step.
    Book.findById(req.params.bookId, (err, book) => {
      if (err) return res.send(err);

      if (book) {
        req.book = book;
        return next();
      }

      return res.sendStatus(404);
    });
  });

  bookRouter
    .route('/books/:bookId')
    .get((req, res) => {
      const returnBook = req.book.toJSON();

      returnBook.links = {};
      const genre = req.book.genre.replace(' ', '%20');
      returnBook.links.FilterByThisGenre = `http://${req.headers.host}/api/books/?genre=${genre}`;
      res.json(returnBook);
    })
    .put((req, res) => {
      const { book } = req;
      book.title = req.body.title;
      book.author = req.body.author;
      book.genre = req.body.genre;
      book.read = req.body.read;

      req.book.save((err) => {
        if (err) return res.send(err);

        return res.json(book);
      });
    })
    .patch((req, res) => {
      const { book } = req;
      if (req.body._id) delete req.body._id;
      for (let [key, value] of Object.entries(req.body)) {
        book[key] = value;
      }
      req.book.save((err) => {
        if (err) return res.send(err);

        return res.json(book);
      });
    })
    .delete((req, res) => {
      req.book.delete((err) => {
        if (err) return res.send(err);

        return res.sendStatus(204);
      });
    });
  return bookRouter;
}

module.exports = routes;
