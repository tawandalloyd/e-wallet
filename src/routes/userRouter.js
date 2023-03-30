const express = require('express');
const userController = require('../controllers/user');

const router = express.Router();

router.post('/createUser',userController.createnewUser);
router.get('/allUsers',userController.users);


module.exports = router;