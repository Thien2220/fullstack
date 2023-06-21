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
  const signup = await createUser(
    req.body.email,
    req.body.password.replace(/\s+/g, "")
  );
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
  const loginUser = await checkUser(
    req.body.email,
    req.body.password.replace(/\s+/g, "")
  );
  let token;
  let resStatus;
  let status;
  if (loginUser > 0) {
    resStatus = 200;
    status = "đăng nhập thành công";
    token = Jwt.sign(
      {
        email: req.body.email,
      },
      "secret_keykhdhkhkashdfádasdhhádask",
      { expiresIn: 60 * 60 }
    );
  } else {
    resStatus = 403;
    token = null;
    status = "sai tài khoản hoặc mật khẩu";
  }
  res.status(resStatus).send({ loginUser, token, status });
});
// console.log(" asd sdg a ".replace(/\s+/g, "").length);
app.listen(3002, () => {});
// console.log("asdkh kh s".indexOf(" "));
