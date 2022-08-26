const express = require('express');
const router = express.Router();
const crypt = require('bcryptjs');
const authentication = require("../middleware/authentication.jsx");
const authAdmin = require("../middleware/authadmin.jsx");
const fileUpload = require('express-fileupload');
const nodemailer = require ('nodemailer');


require('../db/connection.jsx');
const User = require("../model/userSchema.jsx");
const Otp = require("../model/otpSchema.jsx");
const Admin = require("../model/adminSchema.jsx");
const Contact = require("../model/contactSchema.jsx");
const Report = require("../model/reportSchema.jsx");

router.get('/', (req, res) => {
    res.send(`Hello from the server1`);
});

//Register
router.post('/signup', async (req, res) => {
    
    const { Username, email, firstName, lastName, password, cpassword } = req.body;
    
    if(!Username || !email || !firstName || !lastName || !password || !cpassword) {
        return res.status(422).json({error: "Please fill all the fields properly"});
    }

    try {
        const userExist = await User.findOne({ email: email });

        if(userExist) {
            return res.status(422).json({ error: "Email already Exists" });
        }

        else if(password != cpassword) {
            return res.status(422).json({ error: "Passwords do not match" });
        }
        
        else {
            const user = new User({Username, email, firstName, lastName, password});
            await user.save();
            return res.status(201).json({ message: "User register successfully" });
        }
        
    } catch(err) {
        console.log(err);
    }
    
});

//Admin Register
router.post('/AdminRegister', async (req, res) => {
    
    const { username, firstName, lastName, role, password, cpassword } = req.body;
    
    if(!username || !firstName || !lastName || !role || !password || !cpassword) {
        return res.status(422).json({error: "Please fill all the fields properly"});
    }

    try {
        const adminExist = await Admin.findOne({ username: username });

        if(adminExist) {
            return res.status(422).json({ error: "Username already Exists" });
        }

        else if(password != cpassword) {
            return res.status(422).json({ error: "Passwords do not match" });
        }
        
        else {
            const admin = new Admin({username, firstName, lastName, role, password});
            await admin.save();
            return res.status(201).json({ message: "Admin register successfully" });
        }
        
    } catch(err) {
        console.log(err);
    }
    
});

//Admin Login
router.post('/AdminLogin', async (req, res) => {
    try {
        const { username, password } = req.body;

        if( !username || !username) {
            return res.status(400).json({error: "Please fill all the fields properly"});
        }

        const adminLogin = await Admin.findOne({username: username });

        if(adminLogin) {
            
            const hashComp = await crypt.compare(password, adminLogin.password);
            
            const token = await adminLogin.generateAuthToken();
            //console.log(token);

            res.cookie("token", token, {
                expireIn: "1h",
                httpOnly:true
            });

            if(!hashComp) {
                res.status(400).json({ error: "Invalid Credentials" });
            } 
            else {
                res.json({ message: "Admin signed successfully" });
            }
        }
        else {
            res.status(400).json({ error: "Invalid Credentials" });
        }
        
    } catch (err) {
        console.log(err);
    }
});

//Login
router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;

        if( !email || !password) {
            return res.status(400).json({error: "Please fill all the fields properly"});
        }

        const userLogin = await User.findOne({email: email });

        if(userLogin) {
            
            const hashComp = await crypt.compare(password, userLogin.password);

            const token = await userLogin.generateAuthToken();
            //console.log(token);

            res.cookie("token", token, {
                expireIn: "1h",
                httpOnly:true
            });

            if(!hashComp) {
                res.status(400).json({ error: "Invalid Credentials" });
            } 
            else {
                res.json({ message: "User signed successfully" });
            }
        }
        else {
            res.status(400).json({ error: "Invalid Credentials" });
        }
        
    } catch (err) {
        console.log(err);
    }
});

//Logout
router.get("/logout", (req,res) => {
    res.clearCookie("token", { path : '/'});
    res.status(200).send("User logout");
    
})

//Dashboard
router.get('/Dash' , authentication, (req, res) => {
    //console.log("in the dashboard auth function");
    res.send(req.UserInfo);
});

//CreatePoll
router.get('/create' , authentication, (req, res) => {
    //console.log("in the dashboard auth function");
    res.send(req.UserInfo);
});

//Explore
router.get('/exp' , authentication, (req, res) => {
    //console.log("in the dashboard auth function");
    res.send(req.UserInfo);
});

//Admin
router.get('/admin', authAdmin , (req, res) => {
    //console.log("in the dashboard auth function");
    res.send(req.UserInfo);
});

//user
router.get("/getUsers",function(req,res){   
    User.find({},function(err,data){  
               if(err){  
                   res.send(err);  
               }  
               else{             
                   res.send(data);  
                   }  
           });  
});

//update
router.post('/update', function(req,res){
    const id = req.body.id
    User.findByIdAndUpdate({"_id": id},{"verified": true}, function(err, result){
        if(err){
            res.send(err)
        }
        else{
            console.log("Verified: " + id)
            res.send(result)
        }
    })
})

//Contact Us
router.post('/contact', async (req, res) => {
    
    const { name, phoneNumber, email, message } = req.body;
    
    if(!name|| !phoneNumber || !email || !message) {
        return res.status(422).json({error: "Please fill all the fields properly"});
    }

    try {
        const contact = new Contact({name, phoneNumber, email, message});
        await contact.save();
        return res.status(201).json({ message: "Message stored Successfully" });
        
        
    } catch(err) {
        console.log(err);
    }
});

//contact Admin
router.get("/contactAdmin",function(req,res){   
    Contact.find({},function(err,data){  
               if(err){  
                   res.send(err);  
               }  
               else{             
                   res.send(data);  
                   }  
           });  
});

//view Admin
router.get("/getAdmins",function(req,res){   
    Admin.find({},function(err,data){  
               if(err){  
                   res.send(err);  
               }  
               else{             
                   res.send(data);  
                   }  
           });  
});


//File upload
router.use(fileUpload());

//Upload endpoint
router.post('/upload', (req, res) => {
    if(req.files == null){
        return res.status(400).json({msg: 'No file uploaded'});
    }
    const file = req.files.file;
    file.mv("uploads/" + file.name, err => {
        if(err){
            console.error(err);
            return res.status(500).send(err);

        }
        res.json({fileName: file.name, filePath: "/uploads/" + file.name});
        
    });
    //Uploading route to Database
    id = file.name.split("_");
    const route = "http://localhost:3001/uploads/" + file.name;
    User.findByIdAndUpdate({"_id": id[0]},{"image": route}, function(err, result){
        if(err){
            console.log(err)
        }
        else{
            console.log("Image uploaded for: " + id[0])
        }
    })
});

//send report
router.post('/sendReport', async (req, res) => {
    
    const { currentAccount, pollId, title, reason } = req.body;
    const user = await User.find({walletID: currentAccount });
    pollID = pollId.hex
    username = user[0].Username
    email = user[0].email
    pollTitle = title
    try {
        const report = new Report({username, email, pollID, pollTitle, reason});
        await report.save();
        return res.status(201).json("Poll has been reported");
        
        
    } catch(err) {
        console.log(err);
    }
});

//view Reports
router.get("/getReports", authAdmin, function(req,res){   
    Report.find({},function(err,data){  
               if(err){  
                   res.send(err);  
               }  
               else{             
                   res.send(data);  
                   }  
           });  
});

//Wallet ID uploading
router.post('/walletID', async (req, res) => {
    try {
        const { userData, wallet } = req.body;
        try {
        const walletCheck = await User.find({walletID: wallet });
        exist = false
        for (i in walletCheck)
        {
            if (walletCheck[i].email != userData.email)
            {
                exist = true;
            }
        }
        if (exist)
        {
            return res.status(422).json({ error: "Wallet ID already exists for some other account" });
        }
        else{
            User.findByIdAndUpdate({"_id": userData._id},{"walletID": wallet}, function(err, result){
            if(err){
                console.log(err)
            }
            else{
                console.log("Wallet ID uploaded for: " + userData._id)
            }
        })
        } 
        } catch(err) {
            console.log(err);
        }
        
    } catch (err) {

    }
});

//Forgot password
router.post('/email-send', async (req, res) => {
    let data = await User.findOne({email:req.body.email});
    //console.log("Forgot password data: ", data)
    const responseType = {}
    let code;
    if(data){
        let otpCode = Math.floor(1000 + Math.random() * 9000);
        let otpData = new Otp({
            email: req.body.email,
            code: otpCode,
            expireIn: new Date().getTime() + 300*1000
        })
        let otpResponse = await otpData.save();
        responseType.statusText = 'Success'
        mailer(req.body.email,otpCode)
        responseType.message = 'Verification email has been sent!'
    }
    else 
    {
        responseType.statusText = 'Error'
        responseType.message = 'Email Id does not Exist!'
    }
    res.status(200).json(responseType)

})
router.post('/change-password', async (req, res) => {
    let data = await Otp.find({email: req.body.email, code: req.body.code});
    const response = {}
    if(data.length != 0) {
        let currentTime = new Date().getTime();
        let diff = data.expireIn - currentTime;
        
        if(diff < 0) {
            response.message = 'Token Expire'
            response.statusText = 'error'
        }
        else {
            let user = await User.findOne({email: req.body.email})
            user.password = req.body.password;
            user.save();
            response.message = 'Password Updated Successfully!'
            response.statusText = 'Success'
        }
    }
    else {
        response.message = 'Invalid OTP!'
        response.statusText = 'error'
    }
    res.status(200).json(response);
})


//Mailer
const mailer = (email, otp)=>{
    //https://stackoverfLow.com/questions/45478293/username-and-password-not-accepted-when-using-nodemailer
    //https://myaccount.google. com/lesssecureapps
    var transporter = nodemailer.createTransport({
        service: "gmail",
        port: 587,
        secure: false,
        auth: {
            user: "customerservice.bbps@gmail.com",
            pass: "ffhhggxypdixqdmg"
        }
    })

    var mailOptions = {
        from: 'customerservice.bbps@gmail.com',
        to: email.toString(),
        subject: "Password Reset OTP",
        text: "Hello " + email.toString()+ ", \n\nYou requested for an OTP to change your password on BBPS. Your OTP is: " + otp.toString() + "\nPlease note, your OTP is valid for 2 minutes. \nIf this is not your request, please contact us. \n\nRegards,\nBBPS Team\ncustomerservice.bbps@gmail.com "
    };
    
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
}

module.exports = router;