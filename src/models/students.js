const mongoose = require("mongoose");
const validator = require("validator");

const StudentSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
            minlength: 5
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
            unique: true
        },
        address: {
            type: String,
            required: true
        }
    });

    const Student = new mongoose.model(
        "Student", StudentSchema
    );

    module.exports = Student;