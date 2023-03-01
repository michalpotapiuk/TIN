const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const User = sequelize.define('User', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    firstName: {
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
    lastName: {
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
    email: {
        type:Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty:{
                msg:"Pole jest wymagane"
            },
            len:{
                args:[5,60],
                msg:"Pole powinno zawierać od 5 do 60 znaków"
            },
            isEmail:{
                msg:"Pole powinno zawierać peawidłowy adrs email"
            }
        }
    },
    address:{
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
    number: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Numer telefonu jest wymagany"
            },
            isValidPhoneNumber(value){
                const reg = /^[0-9]{3}-[0-9]{3}-[0-9]{3}$/
                if(value && !reg.test(value)){
                    throw new Error("numer telefonu powinien być w formacie ddd-ddd-ddd")
                }
            }
        }
    }
});

module.exports = User;