const db = require('../database')

  exports.statuses = [
    "todo","reading","finished"
  ]
  
  exports.add = async (bookUser) => {
    return db.getPool()
    .query(`INSERT INTO
            books_users(book_id, user_id, read_status)
            VALUES($1, $2, $3) RETURNING *`,
      [bookUser.bookId, bookUser.userId, bookUser.status]);
}

  exports.get = async (bookId, userEmail) => {
    return books_users.find((bookUser) => {
      return book_user.bookId == bookId && bookUser.userEmail == userEmail;
    });
  }
  
  exports.allForUser = async (userEmail) => {
    return books_users.filter((bookUser) => {
      return book_user.userEmail == userEmail;
    });
  }

  exports.update = async (bookUser) => {
    return await db.getPool()
    .query("UPDATE books_users SET read_status = $1 where id = $2 RETURNING *",
      [bookUser.status, bookUser.id]);

  }
  
  exports.upsert = (bookUser) => {
    if (bookUser.id) {
      return exports.update(bookUser);
    } else {
      return exports.add(bookUser);
    }
  }  

    exports.statuses = [
      "comment"
    ]
    
    exports.add = (comment) => {
      comments.push(comment);
    }
  
    exports.get = async (book, user) => {
      const { rows } = await db.getPool().query(`
    select *
    from books_users
    where book_id = $1 and user_id = $2`,
    [book.id, user.id])
  return db.camelize(rows)[0]
;
    }
    
    exports.allForUser = async (user) => {
      const { rows } = await db.getPool().query(`
        select books.title, books_users.read_status
        from books_users
        join books on books.id = books_users.book_id
        where user_id = $1;`,
        [user.id]);
  return db.camelize(rows);
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
  
  