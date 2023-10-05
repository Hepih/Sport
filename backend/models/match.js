//import mongoose module
const mongoose=require("mongoose");

//create match schema
const matchSChema = mongoose.Schema({
    scoreOne: Number,
    scoreTwo: Number,
    teamOne: String,
    teamTwo: String,
});

//affect matchSchema to match model Name
const match =mongoose.model("Match",matchSChema);
//export match
module.exports=match;
