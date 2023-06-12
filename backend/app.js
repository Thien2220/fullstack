const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
// get the client
const mysql = require("mysql2");
// create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "newuser",
  password: "Thien123@",
  database: "cinema_booking_system",
});

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  connection.execute(
    "SELECT countvalue FROM count",
    function (err, results, fields) {
      const data = results[0].countvalue;
      res.send({ x: data });
    }
  );
});
app.post("/", (req, res) => {
  req.body.x === "decs" &&
    connection.execute(
      "SELECT countvalue FROM count",
      function (err, results, fields) {
        const value = results[0].countvalue + 1;
        connection.execute(
          `UPDATE  count SET countvalue = ${value} WHERE (id = 1) `
        );
      }
    );
});

app.listen(3002, () => {
  console.log("Example app listening on port 3002!");
});
