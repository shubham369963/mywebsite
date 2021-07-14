const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 8000 ;
const hbs = require("hbs");
//const { connect } = require("http2");

require("../src/db/conn");
const Student = require("../src/models/students");
const staticPath = path.join(__dirname , "../public");
const templatePth = path.join(__dirname , "../main/views");
const partialsPath = path.join(__dirname , "../main/partials");
const studentRouter = require("../src/routers/student");


app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.use(studentRouter);
app.set("views" , templatePth);
app.set("view engine" , "hbs");
hbs.registerPartials(partialsPath);
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

app.get("/explore" , (req , res) => {
    res.render("explore");
});
app.get("/*" , (req , res) => {
    res.render("error");
});

app.listen( PORT , () => {
    console.log(`listening on port ${PORT}`);
});