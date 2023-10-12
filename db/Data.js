const mongoose = require("mongoose")



const DataSchema = new mongoose.Schema({
    name:String,
    email:String,
    phone:Number,
    state:String,
    city:String,
    userId:String,

})

module.exports = mongoose.model("datas",DataSchema)