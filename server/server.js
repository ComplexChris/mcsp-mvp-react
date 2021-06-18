const express = require("express");
const db = require("./db/config");

Server();

function Server(){  
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

  app.listen(PORT, () => {
    console.log(`listening on Port ${PORT}`);
  });
}