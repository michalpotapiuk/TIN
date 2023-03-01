const express = require('express')
const router = express.Router()

const orderApiController = require('../api/orderAPI')

router.get('/', orderApiController.getOrders)
router.get('/:id', orderApiController.getOrderById)
router.post('/', orderApiController.createOrder)
router.put ('/:id', orderApiController.updateOrder)
router.delete('/:id', orderApiController.deleteOrder)

module.exports = router