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

router.post('/:id/comments', (req, res) => {
  const bookId = req.params.id;
  const { text, user } = req.body;
  const comment = { id: generateUniqueId(), bookId, text, user };
  
  Comment.addComment(comment);
  Book.addCommentToBook(bookId, comment.id);
  res.status(201).json({ message: 'Comment added successfully', comment });
});

router.get('/:id/comments', (req, res) => {
  const bookId = req.params.id;
  const bookComments = Book.getBookComments(bookId);

  res.json({ comments: bookComments });
});

module.exports = router;