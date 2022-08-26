const mongoose = require ('mongoose');

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    phoneNumber: {
        type: Number,
        required:true
    },
    email: {
        type: String,
        required:true
    },
    message: {
        type: String,
        required:true
    },
   date: {
        type: Date,
        default: Date.now
   }
})

const contact = mongoose.model('contactData', contactSchema);

module.exports = contact;