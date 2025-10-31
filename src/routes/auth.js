const express = require("express");
const authRouter = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { validateSignupData } = require("../utils/validation");

authRouter.post("/signup", async (req,res) => {
try {
    //Validate of data
    validateSignupData(req);

    const { firstName, lastName, emailId, password } = req.body;

    //Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);
    
    //Creating a new Instance of the user model
    const user = new User({
        firstName,
        lastName,
        emailId,
        password: passwordHash,
    })

    await user.save();
    res.send("User added succesfully");
 } catch (err) {
   res.status(400).send("ERROR :" + err.message); 
 }
});

authRouter.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;

        const user = await User.findOne({ emailId: emailId });
        if (!user) {
            throw new Error("Invalid credentials");
        }
        const isPasswordValid = await user.validatePassword(password);

        if(isPasswordValid) {
            const token = await user.getJWT();
            res.cookie("token", token);
            res.send("Login Successful!!");
        }
        else {
            throw new Error("Invalid credentials");
        }
    } catch (err) {
      res.status(400).send("ERROR :" + err.message);
    }
});

authRouter.post("/logout", async (req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
    })
    res.send("Your logged out");
});

module.exports = authRouter