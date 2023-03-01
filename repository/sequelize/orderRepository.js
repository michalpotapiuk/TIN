const Book = require('../../models/sequelize/book')
const User = require('../../models/sequelize/user')
const Order = require('../../models/sequelize/order')
const Author = require('../../models/sequelize/author')

exports.getOrders = () => {
    return Order.findAll({include: [
            {
                model: Book,
                as: 'book'
            },
            {
                model: User,
                as: 'user'
            }
        ]});
};

exports.getOrderById = (id) => {
    return Order.findByPk(id, {include: [
            {
                model: Book,
                as: 'book'
            },
            {
                model: User,
                as: 'user'
            }
        ]});
};

exports.createOrder = (data) => {
    console.log(JSON.stringify(data))
    return Order.create(
        {
            userId:data.userId,
            bookId: data.bookId,
            dataOrder: data.dataOrder,
            dataShipping: data.dataShipping
        }
    )
};

exports.updateOrder= (id, data) => {
    return Order.update( data, {where: {_id: id}})
};

exports.deleteOrder = (id) => {
    return Order.destroy({where: {_id: id}})
};
