const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 8000;
const hbs = require("hbs");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


require("../src/db/conn");
const Student = require("../src/models/students");
const staticPath = path.join(__dirname, "../public");
const templatePth = path.join(__dirname, "../main/views");
const partialsPath = path.join(__dirname, "../main/partials");
const studentRouter = require("../src/routers/student");
const cookieParser = require("cookie-parser");
const auth = require("../src/middleware/auth");

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));


app.use(studentRouter);
app.set("views", templatePth);
app.set("view engine", "hbs");
hbs.registerPartials(partialsPath);
app.use(express.static(staticPath));


app.get("/", (req, res) => {
    res.render("index");
});

app.get("/secret", auth, (req, res) => {
    //console.log(` this is the cookie ${req.cookies.jwt}`);
    res.render("secret");
});

app.get("/logout" , auth , async(req , res) =>{
try{
    console.log(req.user);

req.user.tokens = req.user.tokens.filter((currentelement) =>{
return currentelement.token !== req.token;

});}catch (err) {
        res.status(500).send(err);
    }
});


app.get("/logout", auth, async (req, res) => {
    try {
        console.log(req.user);

        req.user.tokens = req.user.tokens.filter((currentelement) => {
            return currentelement.token !== req.token;
        });


        res.clearCookie("jwt");
        console.log("logout successfull");
        await req.user.save();
        res.render("login");
    } catch (err) {
        res.status(500).send(err);
    }
});

app.get("/login", (req, res) => {
    res.render("login");
});
app.get("/signup", (req, res) => {
    res.render("signup");
});

app.get("/explore", (req, res) => {
    res.render("explore");
});

app.get("/code", (req, res) => {
    res.render("code");
});

app.get("/*", (req, res) => {
    res.render("error");
});




const createToken = async () => {
    const token = await jwt.sign({ _id: this._id }, "h27ris76odn261hdbaczx6549uthns09", { expiresIn: "10 seconds" });
    console.log(token);

    const userVer = await jwt.verify(token, "h27ris76odn261hdbaczx6549uthns09");
    console.log(userVer);
}
createToken();


/*const securePassword = async (password) =>{
   const passwordHash = await bcrypt.hash(password , 10);
   console.log(passwordHash);
   const passwordmatch = await bcrypt.compare(password , passwordHash);
   console.log(passwordmatch);
}*/

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});