const express = require("express");
const accountController = require("../controllers/account");

const router = express.Router();

router.post('/createAccount',accountController.createAccount);
router.get('/accounts',accountController.getAccounts)

module.exports = router;