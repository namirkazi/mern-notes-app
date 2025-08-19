const express = require('express');
const router = express.Router();

// Import both functions from the controller
const { registerUser, loginUser } = require('../controllers/userController');

router.post('/', registerUser);
router.post('/login', loginUser); // <-- Add the new login route

module.exports = router;