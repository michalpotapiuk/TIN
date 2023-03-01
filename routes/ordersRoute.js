const express = require('express');
const router = express.Router();

const orderController = require('../controllers/ordersController');

router.get('/', orderController.showOrdersList);
router.get('/add', orderController.showAddOrdersForm );
router.get('/edit/:orderId', orderController.showEditOrderForm);
router.get('/details/:orderId', orderController.showOrdersDetails);

router.post('/add', orderController.addOrder);
router.post('/edit', orderController.updateOrder);
router.get('/delete/:orderId', orderController.deleteOrder);

module.exports = router;