const express = require('express');
/**
 * Express Router instance for handling routing in the application.
 * @type {express.Router}
 */
const router = express.Router();
const {registerUser, loginUser, getUsers, getProfileInfo, getAvailableRoles} = require('../controllers/userController');
const verifyRole = require("../middleware/verifyRole");

router.post('/register', registerUser);

router.post('/auth/login', loginUser);

router.get('/available-roles', getAvailableRoles);

router.post('/profile', verifyRole(['Administrador', 'Lector', 'Creador']), getProfileInfo);

router.get('/all-users', getUsers);

module.exports = router;