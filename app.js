import express from 'express'
import cors from 'cors'
import https from 'https'
import fs from 'fs'
import { getHighScores, getScores, submitHighScore, activePort } from './database.js'


// Import builtin NodeJS modules to instantiate the service
//const https = use("https");

 //app.use(https);
//added 
//var cors = require('cors')

const app = express()

//helmet 
//const helmet = require('helmet');
//app.use(helmet);
//use cors 
app.use(cors())
//
app.use(express.json())




var corsOptions = {
    origin: 'https://192.168.1.243/',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

app.get("/scores", async (req, res) => {
    const scores = await getHighScores()
    res.send(scores)
})

app.post("/scores/create", async(req, res)=>{
    //const{userName, score} = req.body
    let newScore ={
        "userName": req.body.userName,
        "score": req.body.score
    }
    const scoreSubmit = await submitHighScore(newScore.userName, newScore.score)
    res.status(201).send(scoreSubmit)
    console.log("Score submitted:"+scoreSubmit)
})  


app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })


  // Create a NodeJS HTTPS listener on port 4000 that points to the Express app
// Use a callback function to tell when the server is created.
https
.createServer(
  {
    key: fs.readFileSync("key.pem"),
    cert: fs.readFileSync("cert.pem"),
  },
  app)
.listen(activePort(), ()=>{
  console.log('Server is running on');
});

  app.listen(8080,()=>{
    console.log('listening on port 8080')
  });
  