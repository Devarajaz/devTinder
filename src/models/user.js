const mongoose = require("mongoose");

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
    },
    password: {
        type: String,
        required: true,
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