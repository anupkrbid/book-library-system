const { v4: uuidv4 } = require('uuid');

const db = require('../../../database');

exports.postBook = (req, res, next) => {
  const newBook = { ...req.body, id: uuidv4() };
  db.fetchBooks().then(books => {
    const bookFound = books.find(book => book.name === newBook.name);
    if (Boolean(bookFound)) {
      const err = new Error('Non Unique Book Name');
      err.status = 400;
      next(err);
    } else {
      books.push(newBook);
      db.saveBooks(books).then(() => {
        res.status(200)
          .json({
            status: true,
            result: newBook,
            message: 'New Book Added.'
          });
      });
    }
  })
  .catch(err => next(err));
}

exports.getBook = (req, res, next) => {
  const bookId = req.params.bookId;

  db.fetchBooks().then(books => {
    const bookFound = books.find(book => book.id === bookId);
    if (!Boolean(bookFound)) {
      const err = new Error('Invalide BookId.');
      err.status = 400;
      return next(err);
    } else {
      res.status(200)
        .json({
          status: true,
          result: bookFound,
          message: 'Book Data'
        });
    }
  })
  .catch(err => next(err));
}

exports.getBooks = (req, res, next) => {
  db.fetchBooks().then(books => {
    res.status(200)
    .json({
      status: true,
      result: books,
      message: 'Book List'
    });
  })
  .catch(err => next(err));
}

exports.putBook = (req, res, next) => {
  const updatedBook = { ...req.body, id: req.params.bookId };

  db.fetchBooks().then(books => {
    const bookIdIndex = books.findIndex(book => book.id === updatedBook.id);
    const bookNameIndex = books.findIndex(book => book.name === updatedBook.name);
    if (bookIdIndex === -1) {
      const err = new Error('Invalide BookId.');
      err.status = 400;
      return next(err);
    } else if (bookIdIndex !== bookNameIndex && bookNameIndex > -1) {
      const err = new Error('Non Unique BookName.');
      err.status = 400;
      return next(err);
    } else {
      books[bookIdIndex] = updatedBook;
      db.saveBooks(books).then(() => {
        res.status(200)
          .json({
            status: true,
            result: updatedBook,
            message: 'Book Data Updated'
          });
      });
    }
  })
  .catch(err => next(err));
}

exports.deleteBook = (req, res, next) => {
  const bookId = req.params.bookId;

  db.fetchBooks().then(books => {
    const bookIndex = books.findIndex(book => book.id === bookId);
    if (bookIndex === -1) {
      const err = new Error('Invalide BookId.');
      err.status = 400;
      return next(err);
    } else {
      books.splice(bookIndex, 1);
      db.saveBooks(books).then(() => {
        res.status(200)
          .json({
            status: true,
            result: { id: bookId },
            message: `Book Deleted.`
          });
      })
    }
  })
  .catch(err => next(err));
}
