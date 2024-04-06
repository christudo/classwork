const express = require('express');
const router = express.Router();

const Genre = require('../models/genre');
const Book = require('../models/book');

router.get('/', async function(req, res, next) {
  let genres = await Genre.all();
  res.render('genres/index', { title: 'BookedIn || Genres', genres: genres });
 }); 

/*
router.get('/new', function(req, res, next) {
  res.render('genres/new', { title: 'Add Genre' });
});

router.post('/', function(req, res, next) {
  const newGenre = req.body;
  Genre.upsert(newGenre);
  res.redirect('/genres');
});
*/
router.get('/form', async (req, res, next) => {
  let templateVars = { title: 'BookedIn || Genres' }
  if (req.query.id) {
    let genre = await Genre.get(req.query.id)
    if (genre) {templateVars['genre'] = genre}
  }
  res.render('genres/form', templateVars);
 });
 
 router.post('/upsert', async (req, res, next) => {
  console.log('body: ' + JSON.stringify(req.body))
  Genre.upsert(req.body);
  let createdOrupdated = req.body.id ? 'updated' : 'created';
  req.session.flash = {
    type: 'info',
    intro: 'Success!',
    message: 'the genre has been created!',
  };
  res.redirect(303, '/genres')
 });
 
/*
router.get('/form', async (req, res, next) => {
  res.render('genres/form');
});

router.post('/upsert', async (req, res, next) => {
  console.log('body: ' + JSON.stringify(req.body));
  Genre.upsert(req.body);
  let createdOrUpdated = req.body.id ? 'updated' : 'created';
  req.session.flash = {
    type: 'info',
    intro: 'Success!',
    message: `The genre has been ${createdOrUpdated}!`,
  };
  res.redirect(303, '/genres')
});

router.get('/show/:genreId', function(req, res, next) {
  const genreId = req.params.genreId;
  const books = Book.all.filter(book => book.genreId === genreId);
  const genre = Genre.get(genreId); // Fetch genre details if needed
  res.render('genres/show', { title: 'Genre Books', genreId: genreId, books: books });
});
*/

module.exports = router;