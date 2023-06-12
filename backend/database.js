import mysql from "mysql2";
import env from "dotenv";
env.config();
console.log();

const pool = mysql
  .createPool({
    host: process.env.sql_host,
    user: "newuser",
    password: "Thien123@",
    database: "cinema_booking_system",
  })
  .promise();

export const getNote = async () => {
  const [row] = await pool.query("select * from count");
  return row;
};
// const data = await getNote();
// console.log(data);
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
const dele = await delData(39);
