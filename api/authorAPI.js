const AuthorRepository = require('../repository/sequelize/authorRepository')

exports.getAuthors = (req, res, next) => {
    AuthorRepository.getAuthors()
        .then( authors=> {
            res.status(200).json(authors)
        })
        .catch(err => {
            res.status(500).json(err)
        })
}

exports.getAuthorById = (req, res, next) => {
    const id = req.params.id

    AuthorRepository.getAuthorById(id)
        .then(author => {
            if (!author) {
                res.status(404).json({
                    message: 'Author with id: ' + id + ' not found'
                })
            } else {
                res.status(200).json(author)
            }
        })
}

exports.createAuthor = (req, res, next) => {
    AuthorRepository.createAuthor(req.body)
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

exports.updateAuthor = (req, res, next) => {
    const id = req.params.id

    AuthorRepository.updateAuthor(id, req.body)
        .then(result => {
            res.status(200).json({message: 'Updated author with id ' + id, author: result})
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500
            } else next(err)
        })
}

exports.deleteAuthor = (req, res, next) => {
    const id = req.params.id
    AuthorRepository.deleteAuthor(id).then(x => res.status(200).json({message: 'deleted author with id ' + id, author: x}))
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500
            }

            next(err)
        })
}