const mongoose = require("mongoose");
mongoose.connect( process.env.MONGODB_KEY || "mongodb://localhost:27017/upcodedatabase",{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then( () =>{
    console.log("connection successful");
}).catch( (err) =>{
    console.log("err");
});