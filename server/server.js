const express = require("express");
const db = require("./db/config");
const fetch = require('node-fetch');
const cors = require('cors');

class Server{

  constructor(run){
    if(run){
      this.start_server()
    }
  }

  start_server(){
    const app = express();
    const PORT = process.env.PORT || 3000

    app.use(express.static("public"));
    app.use(express.json());
    app.use(cors());

    // Declare the relative path to the public HTML folder
    app.use(express.static( path.join(__dirname, 'public' ) ));
    app.get('/', (req, res)=>{
      console.log("HOME DIRECTORY");
      res.sendFile( path.join(__dirname, "./public/index.html") )
  })

    app.post("/api/submit_quiz", (req, res) => {
      console.log( "BODY: ", req.body )
      const query = `INSERT INTO quiz_results
      (user_name, category, difficulty, total_time, total_questions, score, score_percent)
      VALUES ( $1, $2, $3, $4, $5, $6, $7 ) `
      const {user_name, category, difficulty, totalTime, total_questions, score, percentage} = req.body
      db.query(query, [user_name, category, difficulty, totalTime, total_questions, score, percentage], (err, data) => {
        if (err) {
          res.status(404).send(err);
        } else {
          res.json([data.rows]);
        }
      });
    });

    app.get('/api/highscores', (req, res) => {
      db.query("SELECT * FROM quiz_results ORDER BY score_percent desc LIMIT 10", (err, data) => {
        if (err) {
          res.status(404).send(err);
        } else {
          res.json([data.rows]);
        }
      });
    })

    app.get('/test', (req, res) => {
      console.log("RUNNING TEST...")
      do_fetch()
    })

    app.listen(PORT, () => {
      console.log(`listening on Port ${PORT}`);
    });
  }
}


function do_fetch(){
  const url = 'https://opentdb.com/api.php?amount=10'
  console.log("URL: ", url);
  fetch( url )
    .then((response) => response.json())
    .then((data) => console.log("DATA: ", ({'quiz_master':data})) );
}



if(true){
  const empty = new Server(true)
}
