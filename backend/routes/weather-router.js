//import express module
const express=require("express");
//import axios module
const axios=require("axios");
  

const router =express.Router();

//business Logic:search weather by adresse : post
router.post("/", (req, res) => {

    console.log("here into BL:add city", req.body);
    
    let key ="11875a0713a3ca57209eec4c4281a91e";
    let apiURL =`https://api.openweathermap.org/data/2.5/weather?q=${req.body.city}&appid=${key}`;
    axios.get(apiURL).then((response)=>{
       const responseObject = {
          temperature: response.data.main.temp,
          pressure: response.data.main.pressure,
          humidity: response.data.main.humidity,
          windSpeed: response.data.wind.speed,
          icon :`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
 
       };
       console.log("here is response from API",responseObject);
       res.json({weather:responseObject});
 
    });
 
 
 });
 

module.exports=router;
