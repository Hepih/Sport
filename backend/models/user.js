//import mongoose module
const mongoose=require("mongoose");
//import mongoose-unique-validator
const uniqueValidator = require('mongoose-unique-validator');

//create user schema
const userSChema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email:{ type: String, unique: true, required: true },
    pwd:String,
    role:String,
    avatar:String,

});
// Apply the uniqueValidator plugin to userSchema.
userSChema.plugin(uniqueValidator);
//affect userSchema to user model Name
const user =mongoose.model("User",userSChema);
//export team
module.exports=user;
