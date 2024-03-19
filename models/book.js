const books = [
  { title: "Leviathan Wakes", publishingYear: 2011, authorIds: ["0", "1"], genreId: "1" },
  { title: "bookone", publishingYear: 2021, authorIds: ["0", "1"], genreId: "1" },
  { title: "booktwo", publishingYear: 2022, authorIds: ["0", "2"], genreId: "2" },
  { title: "bookthree", publishingYear: 2023, authorId: "3", genreId: "3" }
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
  
  exports.all = books