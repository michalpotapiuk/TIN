const Book = require('../../models/sequelize/book')
const Author = require('../../models/sequelize/author')

exports.getAuthors = () => {
    return Author.findAll();
};

exports.getAuthorById = (id) => {
    return Author.findByPk(id, {
        include: [{
            model: Book,
            as: 'books',
        }]
    })
};

exports.createAuthor = (data) => {
    return Author.create({
        firstName: data.firstName,
        lastName: data.lastName
    })
};

exports.updateAuthor = (id, data) => {
    console.log(data);
    return Author.update(data, {where: {_id:id}})
};

exports.deleteAuthor = (id) => {
    return Author.destroy({where: {_id: id}})
};