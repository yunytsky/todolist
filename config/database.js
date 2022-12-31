const mongoose = require("mongoose");
require("dotenv").config();


const connectDB = async (req, res, next) => {
    try{
        const conn = await mongoose.connect(process.env.DB_STRING, { useNewUrlParser: true });
        console.log("Connection to the database is established");
    }catch(err){
        throw new Error("Cannot access the database");
        
    }
}

module.exports = connectDB;

