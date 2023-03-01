const express = require('express');
const router = express.Router();

const userController = require('../controllers/usersController');

router.get('/', userController.showUsersList);
router.get('/add', userController.showAddUsersForm );
router.get('/edit/:userId', userController.showEditUserForm );
router.get('/details/:userId', userController.showUsersDetails)

router.post('/add', userController.addUser);
router.post('/edit', userController.updateUser);
router.get('/delete/:userId', userController.deleteUser);

module.exports = router;

