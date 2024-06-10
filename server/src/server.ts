import dotenv from "dotenv";
import http from "http";
import mongoose from "mongoose";
import app from "./app";

dotenv.config({ path: ".env" });

const port = 5000;
const server = http.createServer(app);

process.on("uncaughtException", (error) => {
  process.exit(1);
});

const connectWithDatabase = async () => {
  let mongoConnection;

  const mongoURI = `mongodb+srv://sonkumar371:UogH9XpyoHZly1gz@searchservice.xefur30.mongodb.net/`;

  mongoConnection = await mongoose
    .connect(mongoURI)
    .then(() => {
      console.log("Mongo connection initialized");
    })
    .catch((error) => {
      console.log(
        error
      );
    });
  return { mongoConnection };
};
let accessDB = connectWithDatabase();

server.listen(port, () => {
  console.log(`listening on ${port}`);
});

process.on("uncaughtException", (error) => {
  process.exit(1);
});

export default accessDB;
