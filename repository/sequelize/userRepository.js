const Book = require('../../models/sequelize/book')
const User = require('../../models/sequelize/user')
const Order = require('../../models/sequelize/order')
const Author = require('../../models/sequelize/author')

exports.getUsers = () => {
    return User.findAll()
};

exports.getUserById = (id) => {
    return User.findByPk(id,
        {include: [{
                model: Order,
                as: 'orders',
                include: [{
                    model: Book,
                    as: 'book',
                }]
            }]
    });
};

exports.createUser = (data) => {
    console.log(data);
    return User.create({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        address: data.address,
        number: data.number
    });
};

exports.updateUser = (id, data) => {
    return User.update( data, {where: {_id: id}})
};

exports.deleteUser = (id) => {
    return User.destroy({where: {_id:id}})
};