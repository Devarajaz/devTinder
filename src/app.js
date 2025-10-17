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
 } catch (error) {
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
        await User.findByIdAndUpdate({_id:userId}, data);
        res.send("User updated successfully");
    } catch (error) {
        res.status(400).send("Something went wrong");        
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


