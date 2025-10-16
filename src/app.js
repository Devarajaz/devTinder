const express = require('express');
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.post("/signup", async (req,res) => {
    //Creating a new Instance of the user model
    const user = new User({
        firstName: "virat",
        lastName: "kholi",
        emailId: "virat@123.com",
        password: "virat"
    });

try {
    await user.save();
    res.send("User added succesfully");
 } catch (error) {
   res.status(400).send("Error saving the user:" + err.message); 
 }
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


