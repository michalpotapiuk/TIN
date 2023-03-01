const sequelize = require('./sequelize');


const User = require('../../models/sequelize/user');
const Order = require('../../models/sequelize/order');
const Book = require('../../models/sequelize/book');
const Author = require('../../models/sequelize/author');

module.exports = () => {
    Book.hasMany(Order, {as: 'orders', foreignKey: { name: 'bookId', allowNull: false}, constraints: true, onDelete: 'CASCADE'})
    Order.belongsTo(Book, {as: 'book', foreignKey: {name: 'bookId', allowNull: false}})
    User.hasMany(Order, {as: 'orders', foreignKey: {name: 'userId', allowNull: false}, constraints: true, onDelete: 'CASCADE'})
    Order.belongsTo(User, {as: 'user', foreignKey: {name: 'userId', allowNull: false}})
    Author.hasMany(Book, {as: 'books', foreignKey: {name: 'authorId', allowNull: false}, constraints: true, onDelete: 'CASCADE'})
    Book.belongsTo(Author, {as: 'author', foreignKey: {name: 'authorId', allowNull: false}})


    let allBooks, allUsers, allAuthors

    return sequelize
        .sync({force: true})
        .then(() => {
            return Author.findAll()
        })
        .then(authors => {
            if (!authors || authors.length === 0) {
                return Author.bulkCreate([
                    {firstName: 'Adam', lastName: 'Mickiewicz'},
                    {firstName: 'Aleksander', lastName: ' Fredro'}
                ])
                    .then(() => {
                        return Author.findAll()
                    })
            } else {
                return authors
            }
        })
        .then(authors => {
            allAuthors = authors
            return Book.findAll();
        })
        .then(books => {
            if (!books || books.length === 0) {
                return Book.bulkCreate([
                    {title: 'Pan Tadeusz', price: 55.90,publisher: 'Empik', authorId: allAuthors[0]._id},
                    {title: 'Zemsta', price: 49.90,publisher: 'REBIS', authorId: allAuthors[1]._id},
                ])
                    .then(() => {
                        return Book.findAll()
                    })
            } else {
                return books
            }
        })
        .then( books => {
            allBooks = books
            return User.findAll()
        })
        .then(users => {
            if (!users || users.length === 0) {
                return User.bulkCreate([
                    {firstName: 'Adam', lastName: 'Adamowicz', email: 'adam@example.com', address: 'Kołowa 4822', number: "222-333-444"},
                    {firstName: 'Witkro', lastName: 'Wiktorowicz', email: 'wiktor@example.com', address: 'Trójkątna 2137', number: "443-322-453"},
                    {firstName: 'Robert', lastName: 'Kubica', email: 'szybcior2115@example.com', address: 'Kwadratowa 42', number: "694-821-221"},
                ])
                    .then( () => {
                        return User.findAll()
                    })
            } else {
                return users
            }
        }).then(users=> {
            allUsers= users
            return Order.findAll()
        })
        .then (orders => {
            if (!orders || orders.length === 0 ) {
                return Order.bulkCreate([
                    {bookId: allBooks[0]._id, userId: allUsers[2]._id, dateOrder : '2022-12-01', dateShipping: '2022-12-03' },
                    {bookId: allBooks[0]._id, userId: allUsers[0]._id, dateOrder : '2022-11-12',dateShipping: null  },
                    {bookId: allBooks[1]._id, userId: allUsers[1]._id, dateOrder : '2022-09-12',dateShipping: '2022-09-16'},
                    {bookId: allBooks[1]._id, userId: allUsers[2]._id, dateOrder : '2022-12-12',dateShipping: null}

                ])
            } else {
                console.log(orders)
                return orders
            }
        })
}