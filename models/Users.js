const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    name : {
        type : String,
        required : [true,'user must have a name']
    },
    surname : {
        type : String,
        required :[true,'surname must never be empty']
    },
    address :{
        type : String,
        required : [true,'please enter residential address']
    },
   account : {
       type : Schema.Types.ObjectId,
       ref : 'account'
    }
})

const user = mongoose.model('customer',CustomerSchema);
module.exports = user;