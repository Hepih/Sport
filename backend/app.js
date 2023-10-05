//my key
//11875a0713a3ca57209eec4c4281a91e

//*1* importation 
//import express module
const express = require("express");
// import body-parser module
const bodyParser = require("body-parser");
//import mongoose module
const mongoose = require("mongoose");
mongoose.connect('mongodb://127.0.0.1:27017/sportDB');
//import bcrypt module
const bcrypt=require("bcrypt");
//import jsonwebtoken module
const jwt = require('jsonwebtoken');
//import express-session module
const session = require('express-session');
//import multer module
const multer = require('multer');
//import path module (interne pas d 'installation)v
const path = require('path');
//import axios module
const axios = require('axios');

//import weather router
const weatherRouter=require("./routes/weather-router");

//import weather router
const matchRouter=require("./routes/matches-router");


//*2*create express applications
const app = express();


//*3*Configuration

//send JSON responses
app.use(bodyParser.json());
//get object from request
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/avatars', express.static(path.join('backend/images')));

// Security configuration

app.use((req, res, next) => {

   res.setHeader("Access-Control-Allow-Origin", "*");

   res.setHeader(

      "Access-Control-Allow-Headers",
      "Origin, Accept, Content-Type, X-Requested-with, Authorization, expiresIn"

   );

   res.setHeader(

      "Access-Control-Allow-Methods",

      "GET, POST, DELETE, OPTIONS, PATCH, PUT"

   );

   next();

});

const secretKey = 'croco23';
app.use(session({
secret: secretKey,
}));

//security
const MIME_TYPE = {
   'image/png': 'png',
   'image/jpeg': 'jpg',
   'image/jpg': 'jpg'
}
//milter config : destination and fileName 
const storageConfig = multer.diskStorage({
   // destination
   destination: (req, file, cb) => {
   const isValid = MIME_TYPE[file.mimetype];
   let error = new Error("Mime type is invalid");
   if (isValid) {
   error = null;
}
cb(null, 'backend/images')
},
filename: (req, file, cb) => {
const name = file.originalname.toLowerCase().split(' ').join('-');
const extension = MIME_TYPE[file.mimetype];
const imgName = name + '-' + Date.now() + '-crococoder-' + '.' +extension;
cb(null, imgName);
}
});


//***models importation
const Match = require("./models/match");
const Player = require("./models/player");
const Team = require("./models/team");
const User = require("./models/user");




//*4*Business Logic 

//---------matches------------------


app.use("/matches",matchRouter);

//----------players----


//Business Logic : get  all players
app.get("/api/players", (req, res) => {
   console.log("here is into BL : get all players");
   Player.find().then((docs) => {
      res.json({ players: docs });
   });
});
//Business logique :get player by id
app.get("/api/players/:id", (req, res) => {
   console.log("here is into BL : get player by id ");
   let id = req.params.id; //recuperation de l id
   Player.findOne({ _id: id }).then((doc) => {
      res.json({ player: doc });
   });

});
//Business logique : delete player by id
app.delete("/api/players/:id", (req, res) => {
   console.log("here is into BL : delete player by id ");
   let id = req.params.id;
   Player.deleteOne({ _id: id }).then((deleteResponse) => {
      deleteResponse.deletedCount ? res.json({ isDeleted: true }) : res.json({ isDeleted: false });

   });

});
//Business logique : add player
app.post("/api/players", (req, res) => {
   try {
      //search team by id
   Team.findById(req.body.tId).then((team) => {
   if (!team) {
   return res.status(404).json({ message: "Team not found" });
   }
   //create player object 
   const player = new Player({
   name: req.body.name,
   nbr: req.body.nbr,
   age: req.body.age,
   position:req.body.position,
   teamId: team._id,
   });
   //save player object 
   player.save((err, doc) => {
   team.players.push(player);
   team.save();
   res.json({message: "player is saved "});
   });
   });
   } catch (error) {
      console.log("here error",error);
   res
   .status(500)
   .json({ message: "Error creating player", error: error.message });
   }
   });

//Business logique : update player 
app.put("/api/players", (req, res) => {
   console.log("here into BL:update Player", req.body);
   Player.updateOne({ _id: req.body._id }, req.body).then((updatedResponse) => {
      console.log("here response after update", updatedResponse);
      updatedResponse.nModified ? res.json({ isUpdated: true }) : res.json({ isUpdated: false });
   });
});

//Busniess logique : get all team players
app.get("/api/players/teams/:id",(req,res)=>{
   console.log("here into Bl : get all team players",req.body.id);
   Team.findById(req.params.id)
.populate("players")
.then((team) => {
if (!team) {
return res.status(404).json({ message: "Team not found" });
}
console.log("Team Players", team.players);
res.json({ teamPlayers: team.players });
});
});

//----------teams------

//Business logique : search team by name
app.get("/teams/:name", (req, res) => {
   console.log("here is into BL : search team by name ");
   let name = req.params.name; //recuperation de name
   Team.findOne({ name: name }).then((doc) => {
      res.json({ team: doc });
   });

});
//Business logique : get team by staduim
app.get("/teams/get/:stadium", (req, res) => {
   console.log("here is into BL : get team by stadium ");
   let stadium = req.params.stadium; //recuperation de l stadium
   Team.findOne({ stadium: stadium }).then((doc) => {
      res.json({ team: doc });
   });

});
//business Logic:delete   team
app.delete("/teams/:id", (req, res) => {
   console.log("here into BL:delete all team");
   let id = req.params.id;
   Team.deleteOne({ _id: id }).then((deleteResponse) => {
      deleteResponse.deletedCount ? res.json({ isDeleted: true }) : res.json({ isDeleted: false });

   });


});
//business Logic:Get all teams

app.get("/teams", (req, res) => {
   console.log("here into BL:get all teams")
   Team.find().then((docs) => {
      res.json({ teams: docs });
   });

});

//business Logic:add   team
app.post("/teams", (req, res) => {

   console.log("here into BL:add team", req.body);
   let team = new Team(req.body);
   team.save((err,doc)=>{
     if (err) {
      res.json({isadded: false });
     } else {
      res.json({ isadded: true });
     }
   });
   


});
//business Logic: update   team 
app.put("/teams", (req, res) => {
   console.log("here into BL:update  team")
   console.log("here into BL:update team", req.body);
   Team.updateOne({ _id: req.body._id }, req.body).then((updatedResponse) => {
      console.log("here response after update", updatedResponse);
      updatedResponse.nModified ? res.json({ isUpdated: true }) : res.json({ isUpdated: false });
   });
});




//-----user-----------

//business Logic:signup user 
app.post("/users/signup", multer({storage:storageConfig}).single("img"), (req, res) => {

   console.log("here into BL:signup user", req.body);
   
      bcrypt.hash(req.body.pwd , 10).then((cryptedPwd)=>{
         console.log("here cryptedPwd", cryptedPwd);
         req.body.pwd=cryptedPwd;
         let protocol =req.protocol;
         let host=req.get("host");
         req.body.avatar=`${protocol}://${host}/avatars/${req.file.filename}`
         let user = new User(req.body);
         user.save((err,doc)=>{

           if (err){
            if (err.errors.email) {
               res.json({msg:0 });
            }
            }
            else{
               res.json({msg:1 });
            } 
         });
     
   
   });
   
   });
  

//Business logique : login
//response 1 :"0"=>check your email
//response 2 :"1"=>check your pwd
//response 3 :"2"=>sucsess

app.post("/users/login", (req, res) => {
   console.log("here is into BL : login ", req.body);
   let user;
   //search user by email
   User.findOne({ email: req.body.email })
   .then((doc) => {
      //user email is not found 
      if (!doc) {
         //send response 1: check your email
         res.json({msg:"0"});
      // user  is founded by email
      } else {
         user=doc;
         //compare crypted pwd with req.body.pwd
         return bcrypt.compare(req.body.pwd , doc.pwd);
      }
      //resultat taa comparaison // dima tekhou resultat mtaa ekher return
   }).then((pwdResult)=>{
      console.log("here pwd result", pwdResult);
      //pwd and crypted pwd are nt equals
      if (!pwdResult) {
         //send response 2 : check your pwd
          res.json({msg:"1"})
      } else {
         // send response 3 : welcome
         let userToSend={
            fName: user.firstName ,
            lName:user.lastName , 
            role:user.role,
            id:user._id,
         };
         const token =jwt.sign(userToSend,secretKey, {expiresIn :"1h"});
         res.json({ msg:"2", token:token});
      }
   });

});

app.post("/Imc",(req,res)=>{
   console.log("here is into BL : Imc" , req.body);
  let  Imc= (req.body.poids)/((req.body.taille*req.body.taille)*0.0001);
  if (Imc<16.5) {
   res.json({msg:"Maigreur extrême"});  
  }
  else if (Imc>=16.5 && Imc < 18.5 ) {
   res.json({msg:"maigreux "});  

  }
  else if (Imc>=18.5 && Imc < 25) {
   res.json({msg:"Corpulence normale"});  

  }
  else if (Imc>=25 && Imc < 30) {
   res.json({msg:"Surpoids ou pré-obésité"});  

  }
  else if (Imc>=30 && Imc < 35) {
   res.json({msg:"Obésité modérée (classe I)"});  

  }
  else if (Imc>=35 && Imc < 40)  {
   res.json({msg:"Obésité sévère (classe II)"});  

  }
  else{
   res.json({msg:"Obésité morbide (classe III)"});  

  }
});

//weather section 
app.use("/weather",weatherRouter);

//*5*make app importable from another files
module.exports = app;