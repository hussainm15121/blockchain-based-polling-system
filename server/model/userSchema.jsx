const mongoose = require ('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    Username: {
        type: String,
        required:true
    },
    email: {
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
    password: {
        type: String,
        required:true
    },
    verified: {
        type: Boolean,
        default: false
   },
   image: {
       type: String,
       default: null
   },
   walletID: {
       type: String,
       default: null
   },
   date: {
        type: Date,
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

userSchema.pre('save', async function(next) {
    if(this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
});

//Generation of Token

userSchema.methods.generateAuthToken = async function () {
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

const User = mongoose.model('userData', userSchema);

module.exports = User;