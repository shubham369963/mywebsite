const express = require("express");
const router = new express.Router();
const Student = require("../models/students");


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

module.exports = router;