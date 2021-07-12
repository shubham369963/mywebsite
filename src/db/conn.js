const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/students",{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then( () =>{
    console.log("connection successful");
}).catch( (err) =>{
    console.log("err");
});