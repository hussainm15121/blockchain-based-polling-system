const dotenv = require("dotenv");
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser());

dotenv.config({path: './config.env' });

const PORT = process.env.PORT;

require('./db/connection.jsx');

app.use(require('./router/auth.jsx'));

//Middleware

app.use(express.json());

//Making upload folder static for mongodb
app.use("/uploads", express.static("uploads"));

//var database

app.get('/', (req, resp) => {
    resp.send('Welcome to mongodb API')
})

app.get('/user', function (req, res) {
    User.find({}, function (err, users) {
    if(err) {
        res.send('something went really wrong!!!');
        next();
    }
    res.json(users);
    });
})


app.listen(PORT, () => {
    console.log(`server is running at port no ${PORT}`);
});


