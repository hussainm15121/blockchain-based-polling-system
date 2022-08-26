const mongoose = require ('mongoose');


const otpSchema = new mongoose.Schema({
   email: String,
   code: String,
   expireIn: Number
}, {
    timestamps:true
})

const otp = mongoose.model('otp', otpSchema, 'otp');

module.exports = otp;