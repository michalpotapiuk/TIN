const express = require('express')
const router = express.Router()

const authorApiController = require('../api/authorAPI')

router.get('/', authorApiController.getAuthors)
router.get('/:id', authorApiController.getAuthorById)
router.post('/', authorApiController.createAuthor)
router.put ('/:id', authorApiController.updateAuthor)
router.delete('/:id', authorApiController.deleteAuthor)

module.exports = router