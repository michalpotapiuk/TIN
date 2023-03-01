const express = require('express');
const router = express.Router();

const bookController = require('../controllers/booksController');

router.get('/', bookController.showBooksList);
router.get('/add', bookController.showAddBooksForm)
router.get('/edit/:bookId', bookController.showEditBooksForm);
router.get('/details/:bookId', bookController.showBooksDetails)

router.post('/add', bookController.addBook);
router.post('/edit', bookController.updateBook);
router.get('/delete/:bookId', bookController.deleteBook );

module.exports = router;