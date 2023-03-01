const UserRepository = require('../repository/sequelize/userRepository')
const AuthorRepository = require('../repository/sequelize/authorRepository')
const BookRepository = require('../repository/sequelize/bookRepository')
exports.showUsersList = (req, res, next) => {
    UserRepository.getUsers()
        .then(users => {
            res.render('pages/user/user-list', {
                users: users,
                navLocation: 'user'
            });
        });
    //res.render('pages/user/user-list', {navLocation: 'user'})
}

exports.showAddUsersForm = (req, res, next) =>{
    res.render('pages/user/user-form', {
        user: {},
        pageTitle: 'Nowy klient',
        formMode: 'createNew',
        btnLabel: 'Dodaj klienta',
        formAction: '/user/add',
        navLocation: 'user',
        validationErrors: []
    });
}

exports.showEditUserForm = (req, res, next) => {
    const userId = req.params.userId;
    console.log(userId);
    UserRepository.getUserById(userId)
        .then(user => {
            res.render('pages/user/user-form',
                {
                    user: user,
                    formMode: 'edit',
                    pageTitle: 'Edycja klienta',
                    btnLabel: 'Edytuj klienta',
                    formAction: '/user/edit',
                    navLocation: 'user',
                    validationErrors: []
                });
        });
}


exports.showUsersDetails = (req, res, next) =>{
    const userId = req.params.userId
    UserRepository.getUserById(userId)
        .then(user => {
            res.render('pages/user/user-form',
                {
                    user: user,
                    formMode: 'showDetails',
                    pageTitle: 'Szczegóły klienta',
                    formAction: '',
                    navLocation: 'user',
                    validationErrors: []
                });
        });
    //res.render('pages/user/user-details', {navLocation: 'user'})
}

exports.addUser = (req, res, next) => {
    const userData = {...req.body};
    console.log(userData);
    UserRepository.createUser(userData)
        .then(result => {res.redirect('/user')
        })
        .catch(err => {
            console.log(err)
            res.render('pages/user/user-form', {
                user: {},
                pageTitle: 'Nowy klient',
                formMode: 'createNew',
                btnLabel: 'Dodaj klienta',
                formAction: '/user/add',
                navLocation: 'user',
                validationErrors: err.errors
            });
        });
};

exports.updateUser = (req, res, next) => {
    const userId = req.body._id;
    const userData = {...req.body};
    UserRepository.updateUser(userId, userData)
        .then(result => { res.redirect('/user')
        })
        .catch(err => {
            console.log(req.body)
            res.render('pages/user/user-form',
            {
                user: user,
                formMode: 'edit',
                pageTitle: 'Edycja klienta',
                btnLabel: 'Edytuj klienta',
                formAction: '/user/edit',
                navLocation: 'user',
                validationErrors: err.errors
            });
        });
};

exports.deleteUser = (req, res, next) => {
    const userId = req.params.userId;
    console.log(userId)
    UserRepository.deleteUser(userId)
        .then(() => {
            res.redirect('/user')
        })
};
