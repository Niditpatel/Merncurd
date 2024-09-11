const router = require('express').Router();

const AuthController = require('../Controller/AuthController');

router.post('/signUp',AuthController.registerUser);
router.post('/login',AuthController.Login);

module.exports = router;