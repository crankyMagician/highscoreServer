import express from 'express'
import { getHighScores, getScores, submitHighScore } from './database.js'

const app = express()

app.use(express.json())

app.get("/scores",async (req, res) => {
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


  app.listen(8080,()=>{
    console.log('listening on port 8080')
  })