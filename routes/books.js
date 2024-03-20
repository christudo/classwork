const express = require('express');
const router = express.Router();

const Book = require('../models/book');
const Author = require('../models/author');
const BookUser = require('../models/book_user');
const Genre = require('../models/genre'); // Add the Genre model

router.get('/', function(req, res, next) {
  const books = Book.all;
  res.render('books/index', { title: 'BookedIn || Books', books: books });
});

router.get('/form', async (req, res, next) => {
  const authors = Author.all;
  const genres = Genre.all; // Fetch all genres
  res.render('books/form', { title: 'BookedIn || Books', authors: authors, genres: genres });
});

router.get('/edit/:id', async (req, res, next) => {
  const bookId = req.params.id;
  const book = Book.get(bookId);
  const genres = Genre.all; // Fetch all genres
  res.render('books/form', { title: 'BookedIn || Books', book: book, genres: genres });
});

router.post('/upsert', async (req, res, next) => {
  console.log('body: ' + JSON.stringify(req.body))
  Book.upsert(req.body);
  let createdOrupdated = req.body.id ? 'updated' : 'created';
  req.session.flash = {
    type: 'info',
    intro: 'Success!',
    message: `The book has been ${createdOrupdated}!`,
  };
  res.redirect(303, '/books')
});
 
  router.get('/show/:id', async (req, res, next) => {
    const bookId = req.params.id;
    const book = Book.get(bookId); // { title, genreId: 2 } as Book
    const genre = Genre.get(book.genreId); // Fetch the genre based on genreId
    const templateVars = {
      title: 'BookedIn || Books',
      book: book,
      bookId: bookId,
      statuses: BookUser.statuses,
      genre: genre // "Science Fiction"
    };
    if (templateVars.book.authorIds) {
      templateVars['authors'] = templateVars.book.authorIds.map((authorId) => Author.get(authorId))
    }  
    if (templateVars.book.genreId) {
    templateVars['genre'] = Genre.get(templateVars.book.genreId);
     }
    if (req.session.currentUser) {
    templateVars['bookUser'] = BookUser.get(bookId, req.session.currentUser.email);
    }
    res.render('books/show', { title: 'BookedIn || Books', book: book, genre: genre });
});

module.exports = router;