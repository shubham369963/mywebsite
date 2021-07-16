const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const StudentSchema = new mongoose.Schema({
        fname: {
            type: String,
            required: true,
            
        },
        lname: {
            type: String,
            required: true,
            
        },
        email: {
            type: String,
            required: true,
            validate(value){
                if(!validator.isEmail(value)){
                    throw new Error("email is not correct");
                };
            }
        },
        phone: {
            type: Number,
            required: true,
            
        },
        day: {
            type: Number,
            min: 1,
            max: 31,
            required: true,
            
        },
        month: {
            type: Number,
            min: 01,
            max: 12,
            required: true,
            
        },
        year: {
            type: Number,
            required: true,
            min: 1900,
            max:2021
        },
        password: {
            type: String,
            required: true,
            
        },
        cpassword: {
            type: String,
            required: true,
            
        },
        tokens:[{
            token: {
                type: String,
                required: true,
            }

        }]

    });


    StudentSchema.methods.generateAuthToken = async function(){
        try{
            console.log(this._id);
            const token = jwt.sign({_id: this._id.toString()} , "h27ris76odn261hdbaczx6549uthns09" );
            this.tokens = this.tokens.concat({token: token});
            await this.save();
            return token;


        }catch(err){
            res.send(err);
            console.log(err);
        }
    };



    StudentSchema.pre("save" , async function(next){
        if(this.isModified("password")){
            console.log(`current password is ${this.password}`)
            this.password = await bcrypt.hash(this.password , 10);
            this.cpassword = await bcrypt.hash(this.password , 10);

        }
        next();
    });



    const Student = new mongoose.model(
        "Student", StudentSchema
    );

    module.exports = Student;