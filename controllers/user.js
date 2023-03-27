const catchAsync = require('../utils/catchAsync')
const Users = require('../models/Users');
const AppError = require('../utils/appError');


exports.createnewUser =  async(req, res) => {
    try{
    const user  = await Users.create(req.body);

    res.status(201).json({
        status : "success",
        data : {
            user
        }
    })
    }
    catch(e){
        res.status(404).json({
            status : "fail",
            error :{
                e
            }
        })
    }

}
