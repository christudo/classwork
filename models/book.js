const books = [
    {title: "bookone", publishingYear: 2021},
    {title: "booktwo", publishingYear: 2022},
    {title: "bookthree", publishingYear: 2023},
]

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
    if (book.id) {
      exports.update(book);
    } else {
      exports.add(book);
    }
  }
  exports.all = books