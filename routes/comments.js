const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');

// Route to get comments for a specific book
router.get('/:bookId', (req, res) => {
  const bookId = req.params.bookId;
  const comments = Comment.AllForBook(bookId);
  res.render('comments/index', { comments: comments });
});

module.exports = router;