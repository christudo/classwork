const express = require('express');
const router = express.Router();

const Genre = require('../models/genre');
const Book = require('../models/book');

router.get('/', function(req, res, next) {
  const genresList = Genre.all
  res.render('genres/index', { title: 'BookedIn || Books', genres: genresList });
});

  router.get('/form', async (req, res, next) => {
    const genresList = Genre.all
    res.render('genres/form', {
        title: 'BookedIn || Books', 
        books: Book.all, 
        genres: genresList
    });
  });

router.post('/upsert', async (req, res, next) => {
  console.log('body: ' + JSON.stringify(req.body))
  Genre.upsert(req.body);
  res.redirect(303, '/genres')
});

router.get('/edit', async (req, res, next) => {
  let genreIndex = req.query.id;
  let genre = Genre.get(genreIndex);
  res.render('genres/form', 
  { title: 'BookedIn || Books', genre: genre, genreIndex: genreIndex, genres: Genre.all});
});

router.get('/show/:id', async (req, res, next) => {
  let templateVars = {
    title: 'BookedIn || Books',
    genre: Genre.get(req.params.id)
  }
  if (templateVars.genre.genreId) {
    templateVars.genre = Genere.get(templateVars.genre.genreId);
  }
  res.render('genres/show', templateVars);
});

module.exports = router;