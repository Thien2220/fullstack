import { getNoteByID } from "./database.js";
const data = await getNoteByID("6 union select * from count");

console.log(data);
