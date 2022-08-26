const mongoose = require ('mongoose');

const reportSchema = new mongoose.Schema({
    username: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required:true
    },
    pollID: {
        type: String,
        required:true
    },
    pollTitle: {
        type: String,
        required:true
    },
    reason: {
        type: String,
        required:true
    },
   date: {
        type: Date,
        default: Date.now
   }
})

const report = mongoose.model('reportData', reportSchema);

module.exports = report;