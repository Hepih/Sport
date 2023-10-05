//import mongoose module
const mongoose=require("mongoose");

//create team schema
const teamSChema = mongoose.Schema({
    name: String,
    stadium: String,
    owner:String,
    foundation:Number,
    players:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Player",
    }]

});

//affect teamSchema to team model Name
const team =mongoose.model("Team",teamSChema);
//export team
module.exports=team;
