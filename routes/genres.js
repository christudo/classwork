const express = require('express');
const router = express.Router();
const Genre = require('../models/genre');
const Book = require('../models/book');
const genres = Genre.all; // Fetch all genres
// Get all genres
router.get('/', function(req, res, next) {
  const genres = Genre.all();
  res.render('genres/index', { title: 'Genres', genres: genres });
});

// Get form for adding a new genre
router.get('/new', function(req, res, next) {
  res.render('genres/new', { title: 'Add Genre' });
});

// Add a new genre
router.post('/', function(req, res, next) {
  const newGenre = req.body;
  Genre.upsert(newGenre);
  res.redirect('/genres');
});

router.get('/form', async (req, res, next) => {
  console.log('here')
  res.render('genres/form');
});

router.post('/upsert', async (req, res, next) => {
  console.log('body: ' + JSON.stringify(req.body));
  Genre.upsert(req.body);
  let createdOrUpdated = req.body.id ? 'updated' : 'created';
  req.session.flash = {
    type: 'info',
    intro: 'Success!',
    message: `the genre has been ${createdOrUpdated}!`,
  };
  res.redirect(303, '/genres')
});

// Display books by genre
router.get('/:id/books', function(req, res, next) {
  const genreId = parseInt(req.params.id);
  const genre = Genre.get(genreId);
  if (!genre) {
    res.status(404).send('Genre not found');
    return;
  }
  const booksInGenre = Book.all.filter(book => book.genre.id === genreId);
  res.render('genres/books', { title: 'Books by Genre', genre: genre, books: booksInGenre });
});

module.exports = router;