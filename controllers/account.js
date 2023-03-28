const catchAsync = require("../utils/catchAsync");
const Account = require("../models/Accounts");


exports.createAccount = catchAsync(async(req,res) =>{

    const account = await Account.create(req.body)

    res.status(201).json({
        status : "success",
        data : {
            account
        }
    })
})

exports.getAccounts = catchAsync( async (req,res)=>{
    const accounts = await Account.find();
    res.status(201).json({
        status : "success",
        data : {
            accounts
        }
    })


})