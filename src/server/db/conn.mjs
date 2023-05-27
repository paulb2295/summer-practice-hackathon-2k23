import { MongoClient } from "mongodb";

const connectionString = "mongodb+srv://borleapaul:Tl1nWlY4gTn3vrSi@cluster0.cushin9.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(connectionString);

let conn;
try {
  conn = await client.connect();
} catch(e) {
  console.error(e);
}

let db = conn.db("mfa");

export default db;