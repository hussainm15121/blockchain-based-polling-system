const jwt = require("jsonwebtoken");
const User = require("../model/userSchema.jsx");

const authentication = async (req, res, next) => {
    let token;
    try {
        token = req.cookies.token;
        const verify = jwt.verify(token, process.env.SECRETKEY);

        const UserInfo = await User.findOne({ _id: verify._id , "tokens.token": token });

        if(!UserInfo) { throw new Error('User Not Found') };

        req.token = token;
        req.UserInfo = UserInfo;
        req.UserID = UserInfo._id;

        next();
    }
    catch (err) {
        res.status(401).send("Unauthorized: No token provided");
        //console.log(err);
    }
};

module.exports = authentication;