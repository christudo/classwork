const books_users = [
    {id: "0", bookId: "0", userEmail: "cdacruz@pratt.edu", status: "finished", },
    {id: "1", bookId: "1", userEmail: "cdacruz@pratt.edu", status: "reading", },
    {id: "2", bookId: "2", userEmail: "cdacruz@pratt.edu", status: "todo", },
    {id: "3", bookId: "3", userEmail: "cdacruz@pratt.edu", status: "wishlist", }
  ];
  
  exports.statuses = [
    "todo","reading","finished"
  ]
  
  exports.add = (book_user) => {
    books_users.push(book_user);
  }

  exports.get = (bookId, userEmail) => {
    return books_users.find((book_user) => {
      return book_user.bookId == bookId && book_user.userEmail == userEmail;
    });
  }
  
  exports.AllForUser = (userEmail) => {
    return books_users.filter((book_user) => {
      return book_user.userEmail == userEmail;
    });
  }

  exports.update = (idx, book_user) => {
    books_users[idx] = book_user;
  }
  
  exports.upsert = (book_user) => {
    let idx = books_users.findIndex((bu) => {
      return bu.bookId == book_user.bookId &&
             bu.userEmail == book_user.userEmail;
    });
    if (idx == -1) {
      exports.add(book_user);
    } else {
      exports.update(idx,book_user);
    }

    exports.statuses = [
      "comment"
    ]
    
    exports.add = (comment) => {
      comments.push(comment);
    }
  
    exports.get = (bookId, userEmail) => {
      return comments.find((comment) => {
        return comment.bookId == bookId && comment.userEmail == userEmail;
      });
    }
    
    exports.AllForUser = (userEmail) => {
      return comment.filter((comment) => {
        return comment.userEmail == userEmail;
      });
    }
  
    exports.update = (idx, book_user) => {
      books_users[idx] = book_user;
    }
    
    exports.upsert = (book_user) => {
      let idx = books_users.findIndex((bu) => {
        return bu.bookId == book_user.bookId &&
               bu.userEmail == book_user.userEmail;
      });
      if (idx == -1) {
        exports.add(book_user);
      } else {
        exports.update(idx,book_user);
      }
    }
  }
  