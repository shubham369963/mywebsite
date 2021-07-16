const mongoose = require("mongoose");

const DB = process.env.MONGODB_KEY;


mongoose.connect( DB || "mongodb://localhost:27017/upcodedatabase" ,{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then( () =>{
    console.log("connection successful");
}).catch( (err) =>{
    console.log("err");
});