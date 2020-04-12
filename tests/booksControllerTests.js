// Unit testing
const should = require('should');
// Sinon do all the mocking, by adding some functions and some methods onto our functions that let us check and see what happens inside those functions when they are called.
const sinon = require('sinon');
// You dont have to import mocha because this will run inside the mocha framework

const booksController = require('../controllers/booksController');

// Mocha lays out very similar to a standard BDD kind of style with a series of methods.

// You start with a describe method, and it describes what it is we're testing
describe('Books Controller Tests:', () => {
  describe('Post', () => {
    it('should not allow an empty title on post', () => {
      // Mocks
      const Book = function (book) {
        this.save = () => {};
      };
      const req = {
        body: {
          author: 'Jon',
        },
      };
      // Here we will use sinon mocking framework to mock this out
      const res = {
        status: sinon.spy(),
        send: sinon.spy(),
        json: sinon.spy(),
      };

      const controller = booksController(Book);
      controller.post(req, res);
      res.status
        .calledWith(400)
        .should.equal(true, `Bad Status ${res.status.args[0][0]}`);
      res.send.calledWith('Title is required').should.equal(true);
    });
  });
});
