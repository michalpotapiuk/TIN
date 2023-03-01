const BookRepository = require('../repository/sequelize/bookRepository')
const AuthorRepository = require('../repository/sequelize/authorRepository')

exports.showBooksList = (req, res, next) => {
    BookRepository.getBooks()
        .then(books => {
            res.render('pages/book/book-list', {
                books: books,
                navLocation: 'book',
            });
        });
    //res.render('pages/book/book-list',  {navLocation: 'book'})
}
exports.showAddBooksForm = (req, res, next) =>{
    let allAuthors
    AuthorRepository.getAuthors()
        .then(authors => {
            allAuthors = authors;
            return BookRepository.getBooks()
        }).then(books => {
            res.render('pages/book/book-form',
            {
            book: {},
            allAuthors: allAuthors,
            pageTitle: 'Nowa książka',
            formMode: 'createNew',
            btnLabel: 'Dodaj książkę',
            formAction: '/book/add',
            navLocation: 'book',
            validationErrors: []
        });
    });
    
    //res.render('pages/book/book-list', {navLocation: 'book'})
}

exports.showEditBooksForm = (req, res, next) => {
    let books;
    let allAuthors;
    const bookId = req.params.bookId;
    AuthorRepository.getAuthors()
        .then(authors => {
            allAuthors =authors;
            return  BookRepository.getBooks()
        })
        .then(b => {
            books = b;
            return BookRepository.getBookById(bookId)
        })
        .then(book => {
            res.render('pages/book/book-form',
                {
                    book: book,
                    books: books,
                    allAuthors: allAuthors,
                    formMode: 'edit',
                    pageTitle: 'Edycja książki',
                    btnLabel: 'Edytuj książkę',
                    formAction: '/book/edit',
                    navLocation: 'book', 
                    validationErrors: []
                });
        });
}

exports.showBooksDetails = (req, res, next) =>{
    let books;
    let allAuthors;
    const bookId = req.params.bookId;
    AuthorRepository.getAuthors()
    .then(authors => {
        allAuthors  =authors;
        return  BookRepository.getBooks()
        }).then(b => {
            console.log(b);
            books = b;
            return BookRepository.getBookById(bookId)
        })
        .then(book => {
            res.render('pages/book/book-form',
                {
                    book: book,
                    books: books,
                    allAuthors: allAuthors,
                    formMode: 'showDetails',
                    pageTitle: 'Szczegóły książki',
                    formAction: '',
                    navLocation: 'book',
                    validationErrors: []
                });
        });
    //res.render('pages/book/book-details', {navLocation: 'book'})
}

exports.addBook = (req, res, next) => {
    const bookData = {...req.body};
    let allAuthors;
    console.log(bookData);
    AuthorRepository.getAuthors()
    .then(authors => {
        allAuthors = authors;
        return BookRepository.createBook(bookData)
    }).then(result => {
            res.redirect('/book')
        })
        .catch(err => {
            console.log(err)
            res.render('pages/book/book-form',{
                 book: {},
                 allAuthors: allAuthors,
                 pageTitle: 'Nowa książka',
                 formMode: 'createNew',
                 btnLabel: 'Dodaj książkę',
                 formAction: '/book/add',
                 navLocation: 'book',
                validationErrors: err.errors
         });
    });
};

exports.updateBook = (req, res, next) => {
    const bookId = req.body._id;
    const bookData = {...req.body};
    let allAuthors;
    AuthorRepository.getAuthors()
    .then(authors => {
        allAuthors = authors;
        return BookRepository.updateBook(bookId, bookData)
    }).then(result => {
            res.redirect('/book')
        })
        .catch(err => {
            console.log(req.body)
            res.render('pages/book/book-form',
            {
                book: book,
                allAuthors: allAuthors,
                formMode: 'edit',
                pageTitle: 'Edycja książki',
                btnLabel: 'Edytuj książkę',
                formAction: '/book/edit',
                navLocation: 'book',
                validationErrors: err.errors
            });
        });
};

exports.deleteBook = (req, res, next) => {
    const bookId = req.params.bookId;
    BookRepository.deleteBook(bookId)
        .then(() => {
            res.redirect('/book')
        })
};