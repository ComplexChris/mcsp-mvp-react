const express = require("express");
const db = require("./db/config");
const fetch = require('node-fetch');


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

    app.get("/api/tweets", (req, res) => {
      db.query("SELECT * FROM tweets", (err, data) => {
        if (err) {
          res.status(404).send(err);
        } else {
          res.json([data.rows]);
        }
      });
    });

    app.get('/highscores', (req, res) => {
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
