const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config({path: '../config.env' });

const DB = process.env.DATABASE;

const connectionParams = {

    useNewURLParser:true,
    useUnifiedTOpology:true,
};

mongoose.connect(DB, connectionParams).then(() => {
    console.log(`connection success`);
}).catch((e) => console.log(`no connection`, e));

