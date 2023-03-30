const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const crypto = require('crypto')

const validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};


const userSchema = new Schema({
    name :{
        type : String,
        required : [true, 'name cannot be empty']
    },
    email :{
        type : String,
        required : [true, 'email cannot be empty'],
        validate: [validateEmail, 'Please fill a valid email address'],
        unique : true,
        lowercase : true,
        
    },
    photo : String,
    accountType :{
       type : String,
       enum :['savings', 'debit','credit'],
       default : 'user'
    },
    password : {
        type : String,
        required : [true,'please provide password'],
        minlength : 8,
        select : false
    },
    confirmPassword :{
        type : String,
        required : [true,'please provide password'],
        validate :{
            validator : function(el){
                return el === this.password;
            },
            message : 'passwords are not the same'
        }
    },
    passwordChangedAt : Date ,
    passwordResetToken : String,
    passwordResetExpires :Date,
    active : {
        type : Boolean,
        default : true,
        select : false
    }
});

userSchema.pre ('save', async function(next){
    // if password was modified then run this function
    if(!this.isModified('password')) return next();

    // encrypt the password
    this.password = await bcrypt.hash(this.password,12)
    this.confirmPassword = undefined;
    next();

});

//passwordchanged at functionality
userSchema.pre('save', function(next){
    if(!this.isModified('password')|| this.isNew)
    return next();

    this.passwordChangedAt = Date.now() - 1000;
    next();
});

userSchema.pre(/^find/, function(next){
    this.find({ active : { $ne : false} });
    next();
})

//compare the password 
userSchema.methods.correctPassword = async function( candidatePassword , userPassword){
    return await bcrypt.compare(candidatePassword,userPassword);
};

userSchema.methods.changedPasswordAfter = function(JWTTimestamp){
    if(this.passwordChangedAt){
        const changedTimestamp = parseInt(
            this.passwordChangedAt.getTime()/1000,
            10
        );
        return JWTTimestamp < changedTimestamp;
    }
    return false;
};

userSchema.methods.createToken = function(){
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken= crypto.createHash('sha256').update(resetToken).digest('hex');

  console.log({resetToken}, this.passwordResetToken);

  this.passwordResetExpires = Date.now()+ 10800000 ;
  //+ 10 * 60 * 1000
  return resetToken;
}

const user = mongoose.model('User',userSchema);
module.exports = user;