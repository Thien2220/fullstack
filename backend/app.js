import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { createUser, checkUser } from "./database.js";
import Jwt from "jsonwebtoken";
const app = express();

const b = "thien";
app.use(cors());
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.json({
    b,
  });
});
app.put("/sigup", async (req, res) => {
  const signup = await createUser(req.body.email, req.body.password);
  let token;
  let resStatus;
  let status;
  if (signup === "success") {
    resStatus = 200;
    token = Jwt.sign(
      {
        email: req.body.email,
      },
      "secret_keykhdhkhkashdfádasdhhádask",
      { expiresIn: 60 * 60 }
    );
    status = "success";
  } else {
    resStatus = 403;
    token = null;
    status = "email đã tồn tại";
  }
  console.log(signup);
  res.status(resStatus).send({ signup, token, status });
  //send client token, status, res(status).json
});
app.put("/login", async (req, res) => {
  const loginUser = await checkUser(req.body.email, req.body.password);
  console.log(loginUser);
  res.send({ loginUser });
});
// const login = await checkUser("lengocthien288220@gmail.com", 1111111);
// console.log(login);
app.listen(3002, () => {});
