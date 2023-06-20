import mysql from "mysql2";
import env from "dotenv";
env.config();
console.log();

const pool = mysql
  .createPool({
    host: process.env.sql_host,
    user: "newuser",
    password: "Thien123@",
    database: "asm2_nodejs",
  })
  .promise();

export const getNote = async () => {
  const [row] = await pool.query("select * from count");
  return row;
};
// const data = await getNote();
// console.log(data);
export const getNoteByID = async (id) => {
  const [row] = await pool.execute(`select * from count where id=${id}`);
  return row;
};
export const changeNote = async (val, id) => {
  const [result] = await pool.query(
    "UPDATE  count  SET  countvalue  = ? WHERE (id = ?)",
    [val, id]
  );
  return result;
};
// const result = await changeNote(101, 1);
// console.log(result);

export const createNote = async (countValue) => {
  const [result] = await pool.query(
    "INSERT INTO `count` (`countvalue`) VALUES ('?')",
    [countValue]
  );
  return result;
};
export const delData = async (del) => {
  const [result] = await pool.query(
    "DELETE FROM `cinema_booking_system`.`count`    WHERE `id` in (?) ",
    [del]
  );
  return result;
};

export const createUser = async (gmail, password) => {
  try {
    const [result] = await pool.query(
      "INSERT INTO `authentication` (gmail,password) VALUES (?,?)",
      [gmail, password]
    );
    return "success";
  } catch (error) {
    if (error.errno === 1062) return "exist";
  }
};

export const checkUser = async (email, pass) => {
  const [result] = await pool.query(
    `SELECT  count(*) as x FROM  authentication where gmail=? and password =?`,
    [email, pass]
  );
  return result[0].x;
};
