const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accountSchema = new Schema({
    accountType : {
        type : String
    },
    AccountNumber: {
        type : String,
        required : [true,"account number is needed always"]
    },
    accountBalance : {
        type : Number,
        default : 500
    },
    user :[{
        type: Schema.Types.ObjectId,
        ref : 'customer'
    }]

})

const Account = mongoose.model('account',accountSchema)
module.exports = Account;