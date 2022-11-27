import mysql from 'mysql2'

import dotenv from 'dotenv'

dotenv.config()
//edit when moving to cloud 
const pool = mysql.createPool({ 
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQ_PASS,
    database: process.env.MYSQL_DB
//using promise for async
}).promise()


export async function getScores(){

const [result] = await pool.query("SELECT * FROM scores")

console.log("Results rendered from get scores: "+result)
return result;

};
//5 top high scores for
export async function getHighScores(){
    const [result] = await pool.query(`
    SELECT score, userName
    FROM scores
    ORDER BY score DESC LIMIT 5;

    `)

    console.log("Results rendered from get scores: "+result)
    return result;
};


//create high score with insert statement 
export async function submitHighScore(userName, score){
    const [result] = await pool.query(`
    insert into scores (userName, score)
    VALUES(?,?)
    `,[userName,score])
    return result;

}


/* const scores = await getScores();

const highScores = await getHighScores()

const newScore = await submitHighScore("TJS", 16)
console.log(highScores);
console.log(scores);

console.log(newScore); */