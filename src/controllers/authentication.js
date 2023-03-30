const Users = require('../models/Users');
const catchAsync = require('../utils/catchAsync');
const appError = require('../utils/appError');
const crypto = require('crypto');
const {promisify} = require('util');
const jwt = require('jsonwebtoken');


//creating a jwt token
const signToken = id => {
    return jwt.sign({id }, process.env.JWT_SECRET, {
        expiresIn : process.env.JWT_EXPIRES_IN
    })
};

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);
    const cookieOptions = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true
    };
    res.cookie('jwt', token, cookieOptions);
  
    // Remove password from output
    user.password = undefined;
  
    res.status(statusCode).json({
      status: 'success',
      token,
      data: {
        user
      }
    });
  };

// creating new user to the application
exports.registerUser = catchAsync(async(req,res) =>{

    const user = Users.create(req.body);
    createSendToken(user,201,res)

})