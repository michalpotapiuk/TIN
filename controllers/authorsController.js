const AuthorRepository = require("../repository/sequelize/authorRepository");
const UserRepository = require("../repository/sequelize/userRepository");
const BookRepository = require("../repository/sequelize/bookRepository");

exports.showAuthorsList = (req, res, next) => {
    AuthorRepository.getAuthors()
        .then(authors => {
            res.render('pages/author/author-list', {
                authors: authors,
                navLocation: 'author'
            });
        });
   //res.render('pages/author/author-list', {navLocation: 'author'})
}

exports.showAddAuthorsForm = (req, res, next) =>{
    res.render('pages/author/author-form', {
        author: {},
        pageTitle: 'Nowy autor',
        formMode: 'createNew',
        btnLabel: 'Dodaj autora',
        formAction: '/author/add',
        navLocation: 'author',
        validationErrors: []
    });
    //res.render('pages/author/author-form', {navLocation: 'author'})
}
exports.showEditAuthorsForm = (req, res, next) => {
    const authorId = req.params.authorId
    AuthorRepository.getAuthorById(authorId)
        .then(author => {
            res.render('pages/author/author-form',
                {
                    author: author,
                    formMode: 'edit',
                    pageTitle: 'Edycja autora',
                    btnLabel: 'Edytuj autora',
                    formAction: '/author/edit',
                    navLocation: 'author',
                    validationErrors: []
                });
        });
}

exports.showAuthorsDetails = (req, res, next) =>{
    const authorId = req.params.authorId
    AuthorRepository.getAuthorById(authorId)
        .then(author => {
            res.render('pages/author/author-form',
                {
                    author: author,
                    formMode: 'showDetails',
                    pageTitle: 'Szczegóły autora',
                    formAction: '',
                    navLocation: 'author',
                    validationErrors: []
                });
        });
};

exports.createAuthor = (req, res, next) => {
    const authorData = {...req.body};
    console.log(authorData);
    AuthorRepository.createAuthor(authorData)
        .then(result => {
            res.redirect('/author')
        })
        .catch(err => {
            console.log(err)
                res.render('pages/author/author-form', {
                author: {},
                pageTitle: 'Nowy autor',
                formMode: 'createNew',
                btnLabel: 'Dodaj autora',
                formAction: '/author/add',
                navLocation: 'author',
                validationErrors: err.errors
            })
        });
};

exports.updateAuthor = (req, res, next) => {
    console.log(req.body)
    const authorId = req.body._id;
    const authorData = {...req.body};
    console.log(authorId);
    AuthorRepository.updateAuthor(authorId, authorData)
        .then(result => {
            res.redirect('/author')
        })
        .catch(err => {
            console.log(req.body)
            res.render('pages/author/author-form',
            {
                author: author,
                formMode: 'edit',
                pageTitle: 'Edycja autora',
                btnLabel: 'Edytuj autora',
                formAction: '/author/edit',
                navLocation: 'author',
                validationErrors: err.errors
            });
        });
};

exports.deleteAuthor = (req, res, next) => {
    const authorId = req.params.authorId;
    AuthorRepository.deleteAuthor(authorId)
        .then(() => {
            res.redirect('/author')
        })
};