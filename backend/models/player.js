//import mongoose module
const mongoose=require("mongoose");

//create player schema
const playerSChema = mongoose.Schema({
    name: String,
    nbr:Number,
    position:String,
    age:Number,
    teamId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Team",
    },
});

//affect playerSchema to player model Name
const player =mongoose.model("Player",playerSChema);
//export player
module.exports=player;
