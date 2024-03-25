const express = require('express');
const router = express.Router();

const BookUser = require('../models/book_user');
const Comment = require('../models/comment'); // Add the Comment model

router.post('/upsert', async (req, res, next) => {
  console.log('body: ' + JSON.stringify(req.body))
  let bookId = req.body.bookId;
  let redirect = `/books/show/${bookId}`;
  BookUser.upsert(req.body);
  req.session.flash = {
    type: 'info',
    intro: 'Success!',
    message: 'Your status has been stored',
  };
  res.redirect(303, redirect)
});

/*router.post('/upsert', async (req, res, next) => {
  console.log('body: ' + JSON.stringify(req.body))
  let commentId = req.body.commentId;
  let redirect = `/comments/show/${commentId}`;
  Comment.upsert(req.body);
  req.session.flash = {
    type: 'info',
    intro: 'Success!',
    message: 'Your comment has been stored',
  };
  res.redirect(303, redirect)
});
*/
module.exports = router;
