const express = require('express');
const router = express.Router();
const Book = require('../models/book');
const Comment = require('../models/comment');

router.get('/', function(req, res, next) {
 const comments = Comment.all;
  res.render('comments/index', { title: 'BookedIn || Comments', comments: comments });
});

router.get('/new', function(req, res, next) {
  res.render('comments/new', { title: 'Add Comment' });
});

router.post('/', function(req, res, next) {
  const newComment = req.body;
  Comment.upsert(newComment);
  res.redirect('/comments');
});

router.get('/form', async (req, res, next) => {
  res.render('comments/form');
});

router.post('/upsert', async (req, res, next) => {
  console.log('body: ' + JSON.stringify(req.body));
  Comment.upsert(req.body);
  let createdOrUpdated = req.body.id ? 'updated' : 'created';
  req.session.flash = {
    type: 'info',
    intro: 'Success!',
    message: `The comment has been ${createdOrUpdated}!`,
  };
  res.redirect(303, '/comments')
});

router.get('/show/:commentId', function(req, res, next) {
  const commentId = req.params.commentId;
  const books = Book.all.filter(book => book.commentId === commentId);
  const comment = Comment.get(commentId); // Fetch genre details if needed
  res.render('comments/show', { title: 'Comment Books', commentId: commentId, books: books });
});


module.exports = router;