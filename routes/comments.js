const express = require('express');
const router = express.Router();

const Comment = require('../models/comment');
const Book = require('../models/book');

router.get('/', function(req, res, next) {
  const comments = Comment.all();
  res.render('comments/index', { title: 'BookedIn || Comments', comments: comments });
});

router.get('/form', async (req, res, next) => {
  res.render('comments/form', { title: 'BookedIn || Comments', books: Book.all });
});

router.post('/upsert', async (req, res, next) => {
  console.log('body: ' + JSON.stringify(req.body));
  Comment.upsert(req.body);
  let createdOrupdated = req.body.id ? 'updated' : 'created';
  req.session.flash = {
    type: 'info',
    intro: 'Success!',
    message: `The comment has been ${createdOrupdated}!`,
  };
  res.redirect(303, '/comments');
});

router.get('/edit', async (req, res, next) => {
  let commentIndex = req.query.id;
  let comment = Comment.get(commentIndex);
  res.render('comments/form', 
  { title: 'BookedIn || Comments', comment: comment, commentIndex: commentIndex, books: Book.all });
});

router.get('/show/:id', async (req, res, next) => {
  const commentId = req.params.id;
  const comment = Comment.get(commentId);
  const book = Book.get(comment.bookId);
  res.render('comments/show', {
    title: 'BookedIn || Comments',
    comment: comment,
    book: book
  });
});

module.exports = router;