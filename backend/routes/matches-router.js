//import express module
const express=require("express");

//***models importation
const Match = require("../models/match");

const router =express.Router();



//business Logic:Get all Matches

router.get("/", (req, res) => {
    console.log("here into BL:get all matches") //then taatina l resulat mtaa li kbalha (Match.find()) => yal9a resultat w baed yhotha fi docs 
    Match.find().then((docs) => { // Match c'est le nom du modele qui se pointee automatiquement au collection matches 
       res.json({ matches: docs });
    });
 });
 
 //business Logic:Get  Match by id
 router.get("/:id", (req, res) => {
    console.log("here into BL:get matche by id")
    let id = req.params.id; //recuperation de l id
    Match.findOne({ _id: id }).then((doc) => {
       res.json({ match: doc });
    });
 
 });
 //business Logic:delete  Match by id
 router.delete("/:id", (req, res) => {
    console.log("here into BL:delete matche by id");
    let id = req.params.id;
    Match.deleteOne({ _id: id }).then((deleteResponse) => {
       deleteResponse.deletedCount ? res.json({ isDeleted: true }) : res.json({ isDeleted: false });
 
    });
 
 });
 
 //business Logic:add   Match 
 router.post("/", (req, res) => {
 
    console.log("here into BL:add match", req.body);
    let match = new Match(req.body); //creation d'une instance match de type Match //req.body obj je mel front 
    match.save();// save methode predefinie teb3a l mongoose  pour enregister un objet dans la collection + generation _id
    res.json({ isadded: true });
 
 
 });
 //business Logic: update   Match 
 router.put("/", (req, res) => {
    
    console.log("here into BL:update match", req.body);
    Match.updateOne({ _id: req.body._id }, req.body).then((updatedResponse) => {
       console.log("here response after update", updatedResponse);
       updatedResponse.nModified ? res.json({ isUpdated: true }) : res.json({ isUpdated: false });
    });
 
 
 
 });
 
 //Business logique : search matches by score
 router.get("/search/:score", (req, res) => {
    console.log("here is into BL : search match by score ");
    let score = req.params.score; //recuperation de name
    let findedMatch = matchesTab.filter((match) => { return match.scoreOne == score || match.scoreTwo == score });
    res.json({ isFounded: findedMatch });
 
 });
 




module.exports=router;