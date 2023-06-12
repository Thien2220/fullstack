import { getNote } from "./database.js";
const data = await getNote();
console.log(data);
