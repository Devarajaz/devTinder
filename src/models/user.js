const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 40,
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
        trim: true,
        validate(value) {
            if(!validator.isEmail(value)){
                throw new Error("Invalid email address:" + value);
            }
        },
    },
    password: {
        type: String,
        required: true,
        validate(value) {
            if(!validator.isStrongPassword(value)){
                throw new Error("Enter a Strong Password:" + value);
            }
        },
    },
    age: {
        type: Number,
        min: 18,
    },
    gender: {
        type: String,
        validate(value) {
            if(!["male", "female","others"].includes(value)){
                throw new Error("Gender is not valid");
            }
        }
    },
    photoUrl: {
        type: String,
    },
    about: {
        type: String,
    },
    skills: {
        type: [String],
    },
},
{
    timestamps: true,
});

const User = mongoose.model("User", userSchema);

module.exports = User;