const Book = require('../../models/sequelize/book')
const User = require('../../models/sequelize/user')
const Order = require('../../models/sequelize/order')
const Author = require('../../models/sequelize/author')

exports.getBooks = () => {
    return Book.findAll({include: [
            {
                model: Author,
                as: 'author'
            }
        ]})
};

exports.getBookById = (id) => {
    return Book.findByPk(id,
        {
            include: [{
                model: Order,
                as: 'orders',
                include: [{
                    model: User,
                    as: 'user'
                }]
            }, {
                model: Author,
                as: 'author'
            }]
        });
};


exports.createBook = (data) => {
    return Book.create(
        {
            title: data.title ,
            price: data.price,
            publisher: data.publisher,
            authorId: data.authorId
        }
    )
};

exports.updateBook = (id, data) => {
    console.log(data)
    return Book.update( data, {where: {_id: id}})
};

exports.deleteBook = (id) => {
    return Book.destroy({
        where: {_id: id}
    })
};