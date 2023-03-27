const catchAsync = require("../utils/catchAsync");
const Account = require("../models/Accounts");


exports.createAccount = catchAsync(async(req,res) =>{

    const account = Account.create(req.body)

    res.status(201).json({
        status : "success",
        data : {
            account
        }
    })
})