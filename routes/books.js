const express = require('express');
const router = express.Router();
const Book = require('../models/book');
const Author = require('../models/author');
const BookUser = require('../models/book_user');
const Genre = require('../models/genre'); // Add the Genre model
const Comment = require('../models/comment'); // Add the Comment model

router.get('/', async (req, res, next) => {
  const books = await Book.all()
  res.render('books/index', { title: 'BookedIn || Books', books: books });
});

router.get('/form', async (req, res, next) => {
  res.render('books/form', { title: 'BookedIn || Books', authors: await Author.all(), genres: await Genre.all() });
});

router.get('/edit', async (req, res, next) => {
  let bookId = req.query.id;
  let book = await Book.get(bookId);
  book.authorIds = (await Author.allForBook(book)).map(author => author.id);
  res.render('books/form', { title: 'BookedIn || Books', book: book, authors: await Author.all(), genres: await Genre.all() });
});

router.post('/upsert', async (req, res, next) => {
  console.log('body: ' + JSON.stringify(req.body))
  await Book.upsert(req.body);
  let createdOrupdated = req.body.id ? 'updated' : 'created';
  req.session.flash = {
    type: 'info',
    intro: 'Success!',
    message: `The book has been ${createdOrupdated}!`,
  };
  res.redirect(303, '/books')
});
 
  router.get('/show/:id', async (req, res, next) => {
    let templateVars = {
      title: 'BookedIn || Books',
      book: await Book.get(req.params.id),
      bookId: req.params.id,
      statuses: BookUser.statuses,
      comments: Comment.allForBook(req.params.id)
    };
    
    templateVars.book.authors = await Author.allForBook(templateVars.book);

    if (templateVars.book.genreId) {
      templateVars['genre'] = await Genre.get(templateVars.book.genreId);
    }
    if (req.session.currentUser) {
      templateVars['bookUser'] = await BookUser.get(templateVars.book, req.session.currentUser);
    }
    res.render('books/show', templateVars);
  });
  
module.exports = router;