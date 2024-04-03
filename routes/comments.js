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

router.get('/form/:id', async (req, res, next) => {
  const commentId = req.params.id;
  const comment = Comment.get(commentId);

  res.render('comments/form', { title: 'Add Comment', comment: comment });
});

router.post('/:id/comments', (req, res) => {
  const bookId = req.params.id;
  const email = req.body;  
  const text = req.body;
  const comment = { id: generateUniqueId(), bookId, text, email };

  Comment.addComment(comment);
  Book.addCommentToBook(bookId, comment.id);
  res.status(201).json({ message: 'Comment added successfully', comment });
});

router.get('/:id/comments', (req, res) => {
  const bookId = req.params.id;
  const bookComments = Book.getBookComments(bookId);

  res.json({ comments: bookComments });
});

router.get('/show/:id', (req, res) => {
  const bookId = req.params.id;
  const bookComments = Book.getBookComments(bookId);

  res.render('comments/show', { title: 'BookedIn || Comments', comments: bookComments });
});

router.post('/upsert', async (req, res, next) => {
  console.log(req.body)
  Comment.upsert(req.body);
  res.redirect(303, `/books/show/${req.body.bookId}`)
})

module.exports = router;