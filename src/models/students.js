const mongoose = require("mongoose");
const validator = require("validator");

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
            unique: [true, "email is envaild"],
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
            
        }

    });

    const Student = new mongoose.model(
        "Student", StudentSchema
    );

    module.exports = Student;