const express = require('express');
const router = express.Router();

const Author = require('../models/author');
const Book = require('../models/book');

router.get('/', function(req, res, next) {
  const authors = Author.all;
  res.render('authors/index', { title: 'BookedIn || Authors', authors: authors });
});

router.get('/form', async (req, res, next) => {
  const authorsList = Authors.all;
  res.render('authors/form', {
      title: 'BookedIn || Authors', 
      books: Booked.all,
      authors: authorsList
  });
});

router.post('/upsert', async (req, res, next) => {
  console.log('body: ' + JSON.stringify(req.body));
  Author.upsert(req.body);
  res.redirect(303, '/authors');
});

router.get('/edit', async (req, res, next) => {
  let authorIndex = req.query.id;
  let author = Author.get(authorIndex);
  res.render('authors/form', 
  { title: 'BookedIn || Authors', author: author, authorIndex: authorIndex });
});

module.exports = router;