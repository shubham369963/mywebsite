const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000 ;
const hbs = require("hbs");
const { connect } = require("http2");
const path = require("path");
require("../src/db/conn");
const Student = require("../src/models/students");
const staticPath = path.join(__dirname , "../public");
const templatePth = path.join(__dirname , "../main/views");
const partialsPath = path.join(__dirname , "../main/partials");
const studentRouter = require("../src/routers/student");
app.use(studentRouter);
app.set("views" , templatePth);
app.set("view engine" , "hbs");
hbs.registerPartials(partialsPath);
app.use(express.json());
app.use(express.static(staticPath));


app.get("/" , (req , res) => {
    res.render("index");
});
app.get("/login" , (req , res) => {
    res.render("login");
});
app.get("/signup" , (req , res) => {
    res.render("signup");
});

app.post("/signup" , async(req , res) =>{
    try{
        const password = req.body.password;
        const cpassword = req.body.cpassword;

        if(password === cpassword){
            const user = new Student({
                firstname: req.body.fname,
                lastname: req.body.lname,
                email: req.body.email,
                phone: req.body.phone,
                birthday: req.body.day,
                birthmonth: req.body.month,
                birthyear: req.body.year,
                password: req.body.password,
                cpassword: req.body.cpassword
            });
            console.log("success" + user);
            const registered = await user.save();
          //  console.log("token" + token);
            console.log("page" + registered);
            res.status(201).render("login.hbs");
        }else{
            res.status(401).send("password are not matching");
        }

    }catch(err){
        res.status(400).send(err);
    }
});

app.get("/explore" , (req , res) => {
    res.render("explore");
});
app.get("/*" , (req , res) => {
    res.render("error");
});

app.listen( PORT , () => {
    console.log(`listening on port ${PORT}`);
});