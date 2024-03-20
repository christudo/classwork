const express = require('express');
const router = express.Router();

const Author = require('../models/author');
const Book = require('../models/book');

router.get('/', function(req, res, next) {
  const authors = Author.all
  res.render('authors/index', { title: 'BookedIn || Authors', authors: authors });
});

router.get('/', async (req, res, next) => {
  let authors = await Author.all();
  res.render('authors/index', { title: 'BookedIn || Authors', authors: authors });
 }); 

router.get('/form', async (req, res, next) => {

  res.render('authors/form', {
      title: 'BookedIn || Authors', 
  });
});

router.post('/upsert', async (req, res, next) => {
  console.log('body: ' + JSON.stringify(req.body));
  Author.upsert(req.body);
  let createdOrupdated = req.body.id ? 'updated' : 'created';
  req.session.flash = {
    type: 'info',
    intro: 'Success!',
    message: `the author has been ${createdOrupdated}!`,
  };
  res.redirect(303, '/authors');
});

router.get('/edit', async (req, res, next) => {
  let bookIndex = req.query.id;
  let book = Book.get(bookIndex);
  res.render('books/form', { title: 'BookedIn || Books', book: book, bookIndex: bookIndex, authors: Author.all });
});

module.exports = router;