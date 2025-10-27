const express = require('express');
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignupData } = require("./utils/validation");
const cookieParser = require("cookie-parser");
const { userAuth } = require("./middleware/auth");
const bcrypt = require("bcrypt");

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req,res) => {
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

app.post("/login", async (req, res) => {
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

app.get("/profile", userAuth, async (req, res) => {
try {
    const user = req.user;
    res.send(user);
}catch (err) {
    res.status(400).send("ERROR :" + err.message);
    }
});

app.post("/sendConnectionRequest", userAuth, async (req, res) => {
    const user = req.user;
    console.log("Send a connection request");
    res.send(user.firstName +" "+"sent the connection request");
});

connectDB()
   .then(() => {
    console.log("database connected");
    app.listen(7777, () => {
    console.log("success")
});
})
 .catch((err) => {
    console.error("Database not connected");
 });


