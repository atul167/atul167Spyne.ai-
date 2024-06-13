const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
// Route for user signup
router.post('/signup', UserController.signup);


// Route for user login
router.post('/login', UserController.login);

// Route to render profile page
router.get('/profile/:userId', UserController.renderProfile);

// Route to update user
router.put('/update/:userId', UserController.updateUser);

// Route to delete user
router.delete('/delete/:userId', UserController.deleteUser);

// Route to get list of users
router.get('/list', UserController.listUsers);

module.exports = router;
