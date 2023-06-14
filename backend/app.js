import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { createUser } from "./database.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.post("/", (req, res) => {
  console.log(req.body);
});
app.listen(3002, () => {});

const newuser = createUser;
