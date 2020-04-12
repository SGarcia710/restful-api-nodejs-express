function booksController(Book) {
  // Revealing Module Pattern: There is a controller with a series of functions and you have to return back the list of functions that you're going to expose to outside world.
  function post(req, res) {
    const book = new Book(req.body);
    if (!req.body.title) {
      res.status(400);
      return res.send('Title is required');
    }
    book.save();
    res.status(201);
    return res.json(book);
  }

  function get(req, res) {
    const query = {};
    if (req.query.genre) {
      query.genre = req.query.genre;
    }
    Book.find(query, (err, books) => {
      if (err) return res.send(err);
      //HATEOAS
      const returnBooks = books.map((book) => {
        const newBook = book.toJSON();
        newBook.links = {};
        // Adding Hypermedia
        newBook.links.self = `http://${req.headers.host}/api/books/${book._id}`;
        return newBook;
      });
      return res.json(returnBooks);
    });
  }
  return { post, get };
}

module.exports = booksController;
