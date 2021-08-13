const express = require("express")
const app = express()
const path = require("path")
const sqlite3 = require("sqlite3")
const {open} = require("sqlite")
app.use(express.json())
let db = null
const path_file = path.join(__dirname,"cricketMatchDetails.db")
const connecting_to_database = async()=>{
    try{
        db = await open({
            filename:path_file,
            driver:sqlite3.Database  
        })    
        app.listen(3000,()=>{
            console.log("this server is connected to http://localhost:3000")
        })
    }catch(e){
        console.log(e.message)
        process.exit(1)
    }    
    
}
const converting_get_data = (data)=>{
    return{
        playerId:data.player_id,
        playerName:data.player_name        
    }
}
connecting_to_database()
app.get("/players/",async (request,response)=>{
    const query = `select * from player`
    const result = await db.all(query)
    const main_result = result.map((each)=>
    converting_get_data(each))
})
module.exports = app