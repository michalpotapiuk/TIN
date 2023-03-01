const express = require('express');
const router = express.Router();

const authorController = require('../controllers/authorsController');

router.get('/', authorController.showAuthorsList);
router.get('/add', authorController.showAddAuthorsForm )
router.get('/edit/:authorId', authorController.showEditAuthorsForm);
router.get('/details/:authorId', authorController.showAuthorsDetails)

router.post('/add', authorController.createAuthor);
router.post('/edit', authorController.updateAuthor);
router.get('/delete/:authorId', authorController.deleteAuthor);

module.exports = router;