const books = [
    {title: "bookone", publishingYear: 2021},
    {title: "booktwo", publishingYear: 2022},
    {title: "bookthree", publishingYear: 2023},
]

  exports.add = (book) => {
    books.push(book);
  }
  
  exports.all = books