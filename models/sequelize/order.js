const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Order = sequelize.define('Order', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Pole jest wymagane'
            },
            isInt: {
                msg: 'Wybierz prawidłowego klienta!'
            }
        }
    },
    bookId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Pole jest wymagane'
            },
            isInt: {
                msg: 'Wybierz prawidłową książkę!'
            }
        }
    },
    dateOrder: {
        type: Sequelize.DATE,
        allowNull: true,
        validate: {
            notEmpty: {
                msg: 'Pole jest wymagane'
            },
            isDate: {
                msg: 'Data zamówienia powinna być datą'
            },
            dateIsNotFromFuture(value) {
                if(new Date(value).getDate()<new Date().getDate()){
                    throw new Error("Data złożenia zamówienia nie może być z przeszłości")
                }
            }
        }
    },
    dateShipping: {
        type: Sequelize.DATE,
        allowNull: true,
        validate: {
            notEmpty: {
                msg: 'Pole jest wymagane'
            },
            isDate: {
                msg: 'Data zamówienia powinna być datą'
            },
            dateIsNotFromFuture(value) {
                if(new Date(value).getDate()<new Date().getDate()){
                    throw new Error("Data złożenia zamówienia nie może być z przeszłości")
                }
            }
        }
    }
});

module.exports = Order;