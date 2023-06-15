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
app.put("/", async (req, res) => {
  const newuser = await createUser(req.body.email, req.body.password);
  console.log(newuser);
  res.send({ newuser });
});
app.listen(3002, () => {});
