const express = require('express');

const BookController = require('./book.controller');
const BookMiddleware = require('./book.middleware');

const router = express.Router();

router.post('/', BookMiddleware.verifyPostBookRequest, BookController.postBook);
router.get('/', BookController.getBooks);
router.get('/:bookId', BookMiddleware.verifyGetBookRequest, BookController.getBook);
router.put('/:bookId', BookMiddleware.verifyPutBookRequest, BookController.putBook);
router.delete('/:bookId', BookMiddleware.verifyDeleteBookRequest, BookController.deleteBook);

module.exports = router;
