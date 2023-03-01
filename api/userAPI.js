const UserRepository = require('../repository/sequelize/userRepository')

exports.getUsers = (req, res, next) => {
    UserRepository.getUsers()
        .then( users => {
            res.status(200).json(users)
        })
        .catch(err => {
            res.status(500).json(err)
        })
}

exports.getUserById = (req, res, next) => {
    const id = req.params.id
    UserRepository.getUserById(id)
        .then(user => {
            if (!user) {
                res.status(404).json({
                    message: 'User with id: ' + id + ' not found'
                })
            } else {
                res.status(200).json(user)
            }
        });
}

exports.createUser = (req, res, next) => {
    UserRepository.createUser(req.body)
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

exports.updateUser = (req, res, next) => {
    const id = req.params.id

    UserRepository.updateUser(id, req.body)
        .then(result => {
            res.status(200).json({message: 'Updated user with id ' + id, user: result})
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500
            } else next(err)
        })
}

exports.deleteUser = (req, res, next) => {
    const id = req.params.id
    UserRepository.deleteUser(id).then(x => res.status(200).json({message: 'deleted user with id ' + id, user: x}))
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500
            }

            next(err)
        })
}