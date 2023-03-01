const express = require('express')
const router = express.Router()

const bookApiController = require('../api/bookAPI')

router.get('/', bookApiController.getBooks)
router.get('/:id', bookApiController.getBookById)
router.post('/', bookApiController.createBook)
router.put ('/:id', bookApiController.updateBook)
router.delete('/:id', bookApiController.deleteBook)

module.exports = router