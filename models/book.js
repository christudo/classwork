const books = [
  { id: 0, title: "Leviathan Wakes", publishingYear: 2011, authorIds: ["0", "1"], genreId: "1", comments: [] },
  { id: 1, title: "bookone", publishingYear: 2021, authorIds: ["0", "1"], genreId: "1", comments: [] },
  { id: 2, title: "booktwo", publishingYear: 2022, authorIds: ["0", "2"], genreId: "2", comments: [] },
  { id: 3, title: "bookthree", publishingYear: 2023, authorId: "3", genreId: "3", comments: [] }
];

  exports.add = (book) => {
    books.push(book);
  }

  exports.get = (idx) => {
    return books[idx];
  }  

  exports.update = (book) => {
    books[book.id] = book;
  }
  
  exports.upsert = (book) => {
    if (book.authorIds && ! Array.isArray(book.authorIds)) {
      book.authorIds = [book.authorIds];
    }
    if (book.id) {
      exports.update(book);
    } else {
      exports.add(book);
    }
  }  
  exports.addCommentToBook = (bookId, commentId) => {
    const book = books.find(book => book.id === bookId);
    if (book) {
      book.comments.push(commentId);
    }
  };
  
  exports.getBookComments = (bookId) => {
    const book = books.find(book => book.id === bookId);
    if (book) {
      return book.comments.map(commentId => comments.find(comment => comment.id === commentId));
    }
    return [];
  };
  
  exports.all = books