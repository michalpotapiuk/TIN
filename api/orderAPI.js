const OrderRepository = require('../repository/sequelize/orderRepository')

exports.getOrders = (req, res, next) => {
    OrderRepository.getOrders()
        .then( orders=> {
            res.status(200).json(orders)
        })
        .catch(err => {
            res.status(500).json(err)
        })
}

exports.getOrderById = (req, res, next) => {
    const id = req.params.id

    OrderRepository.getOrderById(id)
        .then(order => {
            if (!order) {
                res.status(404).json({
                    message: 'Order with id: ' + id + ' not found'
                })
            } else {
                res.status(200).json(order)
            }
        })
}

exports.createOrder = (req, res, next) => {
    OrderRepository.createOrder(req.body)
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

exports.updateOrder = (req, res, next) => {
    const id = req.params.id

    OrderRepository.updateOrder(id, req.body)
        .then(result => {
            res.status(200).json({message: 'Updated order with id ' + id, order: result})
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500
            } else next(err)
        })
}

exports.deleteOrder = (req, res, next) => {
    const id = req.params.id
    OrderRepository.deleteOrder(id).then(x => res.status(200).json({message: 'deleted order with id ' + id, order: x}))
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500
            }

            next(err)
        })
}