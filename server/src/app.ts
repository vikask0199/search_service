import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import fs from "fs"; // Import the fs module
import multer from "multer";
import path from "path";
import ImageDetails from "./models/ImageDetails";
import router from "./routes/routes";
import { sendResponse } from "./utils/sendResponse";

const app: Express = express();

dotenv.config({
  path: './.env'
})

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://search-service-ruby.vercel.app",
      "https://movenow.in",
      "http://192.168.255.119:5173/"
    ],
    methods: ["GET", "PATCH", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"))
app.use(cookieParser())

// const imagesDir = path.join(__dirname, "../src/images");
// if (!fs.existsSync(imagesDir)) {
//   fs.mkdirSync(imagesDir, { recursive: true });
//   console.log(`Created images directory at ${imagesDir}`);
// } else {
//   console.log(`Images directory exists at ${imagesDir}`);
// }
// app.use('/images', express.static(imagesDir));
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, imagesDir);
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, uniqueSuffix + path.extname(file.originalname).toLowerCase());
//   },
// });

// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 10 * 1024 * 1024 },
//   fileFilter: function (req, file, cb) {
//     const filetypes = /jpeg|jpg|png/;
//     const mimetype = filetypes.test(file.mimetype);
//     const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

//     if (mimetype && extname) {
//       return cb(null, true);
//     } else {
//       cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
//     }
//   }
// });

// // Upload image route
// app.post("/upload-image", upload.single("image"), async (req: Request, res: Response) => {
//   if (!req.file) {
//     return res.status(400).json({ status: "error", message: "No file uploaded or invalid file format" });
//   }

//   const imageName = req.file.filename;
//   const host = req.get('host');
//   const protocol = req.protocol;
//   const imageUrl = `${protocol}://${host}/images/${imageName}`;
//   console.log(`Image uploaded: ${imageUrl}`);
//   console.log(`Saved at: ${req.file.path}`);

//   try {
//     await ImageDetails.create({ image: imageUrl });
//     res.json({ status: "ok", imageUrl: imageUrl });
//   } catch (error: any) {
//     sendResponse(res, 400, error.message);
//   }
// });


// app.get("/get-image", async (req: Request, res: Response) => {
//   res.send("hello working");
//   // try {
//   //   const data = await ImageDetails.find({});
//   //   res.send({ status: "ok", data: data });
//   // } catch (error: any) {
//   //   sendResponse(res, 400, error.message);
//   // }
// });

// https://github.com/the-debug-arena/multer-image-upload/blob/main/backend/backend.js

app.use(router);



export default app;
