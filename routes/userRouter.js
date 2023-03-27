const express = require('express');
const userController = require('../controllers/user');

const router = express.Router();

router.post('/createUser',userController.createnewUser);


module.exports = router;