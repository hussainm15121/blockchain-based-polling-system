const mongoose = require ('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required:true
    },
    firstName: {
        type: String,
        required:true
    },
    lastName: {
        type: String,
        required:true
    },
    role: {
        type: String,
        required:true
    },
    password: {
        type: String,
        required:true
    },
   date: {
        type:Date,
        default: Date.now
   },
   tokens: [
        {
            token: {
                type: String,
                required:true
            }
        }
   ]
})


//Hashing password

adminSchema.pre('save', async function(next) {
    if(this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
});

//Generation of Token

adminSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({_id:this._id} ,process.env.SECRETKEY);
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;
    }
    catch(err) {
        console.log(err);
    }
}

const Admin = mongoose.model('adminData', adminSchema);

module.exports = Admin;