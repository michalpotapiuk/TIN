const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Book = sequelize.define('Book', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty:{
                msg:"Pole jest wymagane"
            },
            len:{
                args:[2,60],
                msg:"Pole powinno zawierać od 2 do 60 znaków"
            },
        }
    },
    price: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
        validate: {
            notEmpty:{
                msg:"Pole jest wymagane"
            },
            isDecimal:{
                msg:"Pole powinno zawierać cenę"
            },
        }
    },
    publisher: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty:{
                msg:"Pole jest wymagane"
            },
            len:{
                args:[2,60],
                msg:"Pole powinno zawierać od 2 do 60 znaków"
            },
        }
    },
    authorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty:{
                msg:"Pole jest wymagane"
            },
            isInt:{
                msg:"Wybierz prawidłowego Autora"
            },
        }
    }

});

module.exports = Book