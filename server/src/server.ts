import dotenv from "dotenv";
import http from "http";
import mongoose from "mongoose";
import app from "./app";
import fs from "fs";
import path from "path";



dotenv.config({ path: ".env" });

const port = 5000;
const server = http.createServer(app);

const createDirectoryIfNotExists = (directoryPath: string) => {
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath);
    console.log(`Created directory: ${directoryPath}`);
  }
};

const createPublicTempDirectories = () => {
  const projectRoot = path.join(__dirname, '..');
  const publicDir = path.join(projectRoot, "public");
  const tempDir = path.join(publicDir, "temp");

  createDirectoryIfNotExists(publicDir);
  createDirectoryIfNotExists(tempDir);
};

createPublicTempDirectories();

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
