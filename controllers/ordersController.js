const OrderRepository = require("../repository/sequelize/orderRepository");
const UserRepository = require("../repository/sequelize/userRepository");
const BookRepository = require("../repository/sequelize/bookRepository")
//git
exports.showOrdersList = (req, res, next) => {
    OrderRepository.getOrders()
        .then(orders => {
            res.render('pages/order/order-list', {
                orders: orders,
                navLocation: 'order'
            });
        });
    //res.render('pages/order/order-list', {navLocation: 'order'})

}

//git
exports.showAddOrdersForm = (req, res, next) => {
    const orderId = req.params.id
    let allUsers, allBooks, allOrders, getOrderId
    UserRepository.getUsers()
        .then(users =>{
            allUsers = users;
            return OrderRepository.getOrderById(orderId)
        })
        .then(order => {
            getOrderId = order
            return BookRepository.getBooks()
        })
        .then(books => {
            allBooks = books;
            return OrderRepository.getOrders()
        })
        .then(orders => {
            allOrders = orders
            res.render('pages/order/order-form',
            {
                order: {},
                getOrderId: getOrderId,
                formMode: 'createNew',
                allUsers: allUsers,
                allBooks: allBooks,
                pageTitle: 'Nowe zamówienie',
                btnLabel: 'Dodaj zamówienie',
                formAction: '/order/add',
                navLocation: 'order',
                validationErrors: []
        })
    });
}

exports.showEditOrderForm = (req, res, next) => {
    const orderId = req.params.id
    let allUsers, allBooks, allOrders, getOrderId
    UserRepository.getUsers()
        .then(users =>{
            allUsers = users;
            return OrderRepository.getOrderById(orderId)
        })
        .then(order => {
            getOrderId = order
            return BookRepository.getBooks()
        })
        .then(books => {
            allBooks = books;
            return OrderRepository.getOrders()
        })
        .then(orders => {
            allOrders = orders
            res.render('pages/order/order-form',
            {
                order: {},
                getOrderId: getOrderId,
                allOrders: allOrders,
                allUsers: allUsers,
                allBooks: allBooks,
                formMode: 'edit',
                pageTitle: 'Edycja zamówienia',
                btnLabel: 'Edytuj zamówienie',
                formAction: '/order/edit',
                navLocation: 'order',
                validationErrors: []
            });
    });
};

///git
exports.showOrdersDetails = (req, res, next) =>{
    const orderId = req.params.id
    let allUsers, allBooks, allOrders, getOrderId
    UserRepository.getUsers()
        .then(users =>{
            allUsers = users;
            return OrderRepository.getOrderById(orderId)
        })
        .then(order => {
            getOrderId = order
            return BookRepository.getBooks()
        })
        .then(books => {
            allBooks = books;
            return OrderRepository.getOrders()
        })
        .then(orders => {
            allOrders = orders
            res.render('pages/order/order-form',
                {
                    order: {},
                    getOrderId: getOrderId,
                    allOrders: allOrders,
                    formMode: 'showDetails',
                    pageTitle: 'Szczegóły zamówienia',
                    allUsers: allUsers,
                    allBooks: allBooks,
                    formAction: '',
                    navLocation: 'order',
                    validationErrors: []

                });
        });
    //res.render('pages/order/order-details', {navLocation: 'order'})
}

exports.addOrder = (req, res, next) => {
    const orderData = {...req.body};
    const orderId = req.params.id
    let allUsers, allBooks, allOrders, getOrderId
    UserRepository.getUsers()
        .then(users =>{
            allUsers = users;
            return OrderRepository.getOrderById(orderId)
        })
        .then(order => {
            getOrderId = order
            return BookRepository.getBooks()
        })
        .then(books => {
            allBooks = books;
        return OrderRepository.createOrder(orderData)
        })
        .then(result => {
            res.redirect('/order')
        })
        .catch(err => {
            console.log(err)
            res.render('pages/order/order-form',{

                order: {},
                getOrderId: getOrderId,
                formMode: 'createNew',
                allUsers: allUsers,
                allBooks: allBooks,
                pageTitle: 'Nowe zamówienie',
                btnLabel: 'Dodaj zamówienie',
                formAction: '/order/add',
                navLocation: 'order',
                validationErrors: err.errors
            });
        });
};

exports.updateOrder = (req, res, next) => {
    const orderId = req.body._id;
    const orderData = {...req.body};
    let allUsers, allBooks, allOrders, getOrderId
    UserRepository.getUsers()
        .then(users =>{
            allUsers = users;
            return OrderRepository.getOrderById(orderId)
        })
        .then(order => {
            getOrderId = order
            return BookRepository.getBooks()
        })
        .then(books => {
            allBooks = books;
            return OrderRepository.updateOrder(orderId, orderData)
        })
        .then(result => {
            res.redirect('/order')
        })
        .catch(err => {
            console.log(req.body)
            res.render('pages/order/order-form',
            {
                order: orderId,
                allOrders: allOrders,
                allUsers: allUsers,
                allBooks: allBooks,
                formMode: 'edit',
                pageTitle: 'Edycja zamówienia',
                btnLabel: 'Edytuj zamówienie',
                formAction: '/order/edit',
                navLocation: 'order',
                validationErrors: err.errors
            });
        });
        
};

exports.deleteOrder = (req, res, next) => {
    const orderId = req.params.id;
    OrderRepository.deleteOrder(orderId)
        .then(() => {
            res.redirect('/order')
        })
};
