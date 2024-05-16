import dotenv from "dotenv";
import http from "http";
import mongoose from "mongoose";
import appDataSource from "./postGresDataSource";
import app from "./app";

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";
dotenv.config({ path: ".env" });

const server = http.createServer(app);

process.on("uncaughtException", (error) => {
  console.log(error);
  process.exit(1);
});

const connectWithDatabase = async () => {
  console.log("Connecting with database...");
  let mongoConnection;

  // PostgreSQL connection options

  await appDataSource
    .initialize()
    .then(() => {
      
      console.log("PostGresql connection initialized");
    })
    .catch((error) => {
      console.log("Connection PostGresql failed: " + error);
    });

  // mongo connection setup
  const mongoURI = `mongodb://${process.env.MD_DB_USERNAME}:${process.env.MD_DB_PASSWORD}@192.168.29.154:27017/${process.env.MD_DB_NAME}?authSource=${process.env.MD_DB_NAME}`;

  mongoConnection = await mongoose
    .connect(mongoURI)
    .then((connections) => {
      console.log("Mongo connection initialized");
    })
    .catch((error) => {
      console.log(
        "Connection Mongo failed for string: ",
        mongoURI,
        ". error: ",
        error
      );
    });
  return { appDataSource, mongoConnection };
};
let accessDB = connectWithDatabase();

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`listening on ${port}`);
});

process.on("uncaughtException", (error) => {
  console.log(error);
  process.exit(1);
});

export default accessDB;
