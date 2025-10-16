const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect(
    "mongodb+srv://devarajmuddha_db_user:5L0VAe8cpguaSvXD@devaraj.pljugwy.mongodb.net/devTinder"
    )
};

module.exports = connectDB;
