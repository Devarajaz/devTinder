const express = require('express');
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json());

app.post("/signup", async (req,res) => {   
    
//Creating a new Instance of the user model
    const user = new User(req.body);

try {
    await user.save();
    res.send("User added succesfully");
 } catch (err) {
   res.status(400).send("Error saving the user:" + err.message); 
 }
});

app.get("/user", async (req, res) => {
    const userEmail = req.body.emailId;

    try {
        const users = await User.find({ emailId: userEmail });
        if (users.length === 0) {
            res.status(404).send("User not found")
        }else{
            res.send(users);
        }
    } catch (error) {
        res.status(400).send("something went wrong")
    }
});

app.get("/feed", async (req, res) => {

    try {
        const users = await User.find({});
        res.send(users);
    } catch (error) {
        res.status(400).send("Something went wrong");
    }

});

app.delete("/user", async (req, res) => {
    const userId = req.body.userId;

    try {
        const user = await User.findByIdAndDelete(userId);
        res.send("User deleted successfully");
    } catch (error) {
       res.status(400).send("something went wrong"); 
    }
});

app.patch("/user", async (req, res) => {
    const userId = req.body.userId;
    const data = req.body;

    try {
        const allowedUpdates = ["userId","photoUrl","about","gender","age","skills",];
        const isUpdateAllowd = Object.keys(data).every((k) =>
        allowedUpdates.includes(k)
    );
    if (!isUpdateAllowd){
        throw new Error("Update not allowed");
    }
    if(data?.skills.length > 10){
        throw new Error("Skills cannot be more then 10");
    }
        const user = await User.findByIdAndUpdate({ _id: userId }, data, {   
        runValidators: true,
        });
        res.send("User updated successfully");
    } catch (err) {
      res.status(400).send("Update failed:" + err.message);        
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


