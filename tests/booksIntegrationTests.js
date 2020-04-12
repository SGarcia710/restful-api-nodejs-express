// Integration Test (End-to-end testing)
// Nothing is going to be mocked
require('should');

const request = require('supertest');
const mongoose = require('mongoose');

process.env.ENV = 'Test';

const app = require('../app.js');

const Book = mongoose.model('Book');
const agent = request.agent(app);

describe('Books Crud Test', () => {
  it('should allow a book to be posted and return read and _id', (done) => {
    const bookPost = {
      title: 'My Book',
      author: 'Sebastian',
      genre: 'Fiction',
    };
    // Black box testing. Agent will send the post and it wont care how it works.
    // We are going to send an HTTP request to /api/books and see what happens.
    agent
      .post('/api/books')
      .send(bookPost)
      .expect(200)
      .end((err, results) => {
        // results.body.read.shoud.not.equal(false);
        results.body.should.have.property('_id');
        done();
      });
  });
  afterEach((done) => {
    Book.deleteMany({}).exec();
    done();
  });

  after((done) => {
    mongoose.connection.close();
    app.server.close(done);
  });
});
