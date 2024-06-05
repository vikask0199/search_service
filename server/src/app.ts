import express, { Express, Request, Response } from "express";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./routes/routes";
import multer from "multer";
import path from "path";
import fs from "fs"; // Import the fs module
import ImageDetails from "./models/ImageDetails";
import { sendResponse } from "./utils/sendResponse";

const app: Express = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://192.168.29.74:5173",
      "*"
    ],
    methods: ["GET", "PATCH", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up static file serving and ensure the images directory exists
const imagesDir = path.join(__dirname, "../src/images");
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}
app.use('/images', express.static(imagesDir)); // Serve images statically

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, imagesDir);  // Ensure the path is correct
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10 MB
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }
});

// Routes
app.post("/upload-image", upload.single("image"), async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ status: "error", message: "No file uploaded or invalid file format" });
  }

  const imageName = req.file.filename;
  const host = req.get('host');
  const protocol = req.protocol;
  const imageUrl = `${protocol}://${host}/images/${imageName}`;

  try {
    await ImageDetails.create({ image: imageUrl });
    res.json({ status: "ok", imageUrl: imageUrl });
  } catch (error: any) {
    sendResponse(res, 400, error.message);
  }
});

app.get("/get-image", async (req: Request, res: Response) => {
  res.send("hello working");
  // try {
  //   const data = await ImageDetails.find({});
  //   res.send({ status: "ok", data: data });
  // } catch (error: any) {
  //   sendResponse(res, 400, error.message);
  // }
});

// https://github.com/the-debug-arena/multer-image-upload/blob/main/backend/backend.js

app.use(router);



export default app;
