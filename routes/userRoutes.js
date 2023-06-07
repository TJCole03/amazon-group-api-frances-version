const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.listUsers);
router.post('/', userController.createUser);
router.post('/login', userController.loginUser);
router.post('/logout', userController.logoutUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.auth, userController.deleteUser);

module.exports = router;
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDgxMTI4ZTE2N2E4ODM1NjBkYjA2ZjIiLCJpYXQiOjE2ODYxODA0OTR9.V23ks691C55iekrVEEHwFNb_VNBDndRIHn2MaNDnDDU