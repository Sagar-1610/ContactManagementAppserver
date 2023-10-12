const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    phone:Number,
    gender:String,
    question:[String],
    city:String,
    state:String,
    password:String,
});

module.exports = mongoose.model("users",userSchema)