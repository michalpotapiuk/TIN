const BookRepository = require('../repository/sequelize/bookRepository');

exports.getBooks = (req, res) => {
    BookRepository.getBooks()
        .then( books => {
            res.status(200).json(books)
        })
        .catch(err => {
            res.status(500).json(err)
        })
}

exports.getBookById = (req, res) => {
    const id = req.params.id

    BookRepository.getBookById(id)
        .then(book => {
            if (!book) {
                res.status(404).json({
                    message: 'Book with id: ' + id + ' not found'
                })
            } else {
                res.status(200).json(book)
            }
        })
}

exports.createBook = (req, res, next) => {
    BookRepository.createBook(req.body)
        .then(obj => {
            res.status(201).json(obj)
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500
            }

            next(err)
        })
}

exports.updateBook = (req, res, next) => {
    const id = req.params.id

    BookRepository.updateBook(id, req.body)
        .then(result => {
            res.status(200).json({message: 'Updated book with id ' + id, book: result})
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500
            } else next(err)
        })
}

exports.deleteBook = (req, res, next) => {
    const id = req.params.id
    BookRepository.deleteBook(id).then(x  => res.status(200).json({message: 'deleted book with id ' + id, book: x}))
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        })
}