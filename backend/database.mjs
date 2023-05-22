import { MongoClient } from "mongodb";
import "./loadEnviroment.mjs";

const connectionString = process.env.DB_CONN;

const client = new MongoClient(connectionString);

let conn;
try {
  conn = await client.connect();
} catch(e) {
  console.error(e);
}

let db = conn.db(process.env.DB_NAME);

export default db;