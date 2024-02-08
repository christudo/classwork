const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  const books = [
    "bookone", "booktwo", "bookthree"
  ]
  res.render('books/index', { title: 'BookedIn || Books', books: books });
});

module.exports = router;