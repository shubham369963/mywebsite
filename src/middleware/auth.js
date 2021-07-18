const jwt = require("jsonwebtoken");
const Student = require("../models/students");

const auth = async(req , res , next) =>{
    try{
const token = req.cookies.jwt;
const verifyUser = jwt.verify(token , "h27ris76odn261hdbaczx6549uthns09");
console.log(verifyUser);

const user = await Student.findOne({_id: verifyUser._id});
console.log(user);

req.token = token;
req.user = user;


next();



    }catch(err){
        res.status(401).send(err);
    }
}


module.exports = auth ;