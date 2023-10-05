//import app file 
const expressApp =require("./backend/app");
//make express application listening on : http://localhost:3000
expressApp.listen(3000, ()=>{
    //ay console.log  fi BE bch nalkaha fi terminal du serveur 
    console.log("Express Application is Lestening on PORT 3000 ...")
});