import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();

const mongoClient = new MongoClient(process.env.DATABASE_URL);

let db;

const promise = mongoClient.connect();

promise
  .then(() => {
    db = mongoClient.db();
    console.log("Connection to the database successfully established!");
  })
  .catch((err) => {
    console.log("Error connecting to database:", err.message);
  });

export { db };
