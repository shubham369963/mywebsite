const express = require("express");
const router = new express.Router();
const Student = require("../models/students");
const bcrypt = require("bcryptjs");

router.post("/signup" , async(req , res) =>{
    try{
        const password = req.body.password;
        const cpassword = req.body.cpassword;

        if(password === cpassword){
            const user = new Student({
                fname: req.body.fname,
                lname: req.body.lname,
                email: req.body.email,
                phone: req.body.phone,
                day: req.body.day,
                month: req.body.month,
                year: req.body.year,
                password: req.body.password,
                cpassword: req.body.cpassword
            });
            console.log("success" + user);
            const registered = await user.save();
          //  console.log("token" + token);
            console.log("page" + registered);
            res.status(201).render("login.hbs");
        }else{
            res.send("password are not matching");
        }

    }catch(err){
        res.status(500).send(err);
    }
});

router.post("/login" , async(req , res) =>{
    try{
const email = req.body.email;
const password = req.body.password;
const useremail = await Student.findOne({email : email});

const isMatch = await bcrypt.compare( password , useremail.password);

if(isMatch){
    res.status(201).render("explore.hbs");
}else{
    res.status(400).render("login.hbs");
}
    }catch(err){
res.status(500).send("invalid login details");
    }
});






module.exports = router;