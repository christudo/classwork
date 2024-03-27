const express = require('express');
const router = express.Router();

const BookUser = require('../models/book_user');
const Comment = require('../models/comment'); // Add the Comment model

router.post('/upsert', async (req, res, next) => {
  console.log('body: ' + JSON.stringify(req.body))
  const statusId = req.body.statusId;
  let bookId = req.body.bookId;
  let redirect = `/books/show/${bookId}`;
  BookUser.upsert(req.body);
  req.session.flash = {
    type: 'info',
    intro: 'Success!',
    message: 'Your status has been stored',
  };
  res.redirect(303, `${redirect}?statusId=${statusId}`);
});

module.exports = router;
