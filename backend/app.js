import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { createUser, checkUser } from "./database.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.put("/sigup", async (req, res) => {
  const newuser = await createUser(req.body.email, req.body.password);
  console.log(newuser);
  res.send({ newuser });
});
app.put("/login", async (req, res) => {
  const loginUser = await checkUser(req.body.email, req.body.password);
  console.log(loginUser);
  res.send({ loginUser });
});
app.get("/clickemail", (req, res) => {
  console.log(123);
  res.send({ click: "" });
});
// const login = await checkUser("lengocthien288220@gmail.com", 1111111);
// console.log(login);
app.listen(3002, () => {});
