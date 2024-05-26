// import path from "path";
// import express, { Request, Response } from "express";
// import fs from "fs";
// import app from "../app";
// import multer from "multer";
// import ImageDetails from "../models/ImageDetails";
// import { sendResponse } from "../utils/sendResponse";


// const router = express.Router();

// // Set up static file serving and ensure the images directory exists
// const imagesDir = path.join(__dirname, "../src/images");
// if (!fs.existsSync(imagesDir)) {
//     fs.mkdirSync(imagesDir, { recursive: true });
// }
// router.use('/images', express.static(imagesDir));

// // Multer configuration
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, imagesDir);  // Ensure the path is correct
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now();
//         cb(null, uniqueSuffix + file.originalname);
//     },
// });

// const upload = multer({
//     storage: storage,
//     limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10 MB
//     fileFilter: function (req, file, cb) {
//         const filetypes = /jpeg|jpg|png/;
//         const mimetype = filetypes.test(file.mimetype);
//         const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

//         if (mimetype && extname) {
//             return cb(null, true);
//         } else {
//             cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
//         }
//     }
// });

// // Routes
// router.post("/upload-image", upload.single("image"), async (req: Request, res: Response) => {
//     if (!req.file) {
//         return res.status(400).json({ status: "error", message: "No file uploaded or invalid file format" });
//     }

//     const imageName = req.file.filename;
//     const host = req.get('host');
//     const protocol = req.protocol;
//     const imageUrl = `${protocol}://${host}/images/${imageName}`;

//     try {
//         await ImageDetails.create({ image: imageUrl });
//         res.json({ status: "ok", imageUrl: imageUrl });
//     } catch (error: any) {
//         sendResponse(res, 400, error.message);
//     }
// });

// router
// .get("/get-image", async (req: Request, res: Response) => {
//     try {
//         const data = await ImageDetails.find({});
//         res.send({ status: "ok", data: data });
//     } catch (error: any) {
//         sendResponse(res, 400, error.message);
//     }
// });



// export default router


import express from 'express';
import {  uploadImage } from '../middlewares/uploadImage';
import { checkAuthorizeOrNot } from '../middlewares/checkAuthorizeOrNot';

const router = express.Router();

router.post('/upload-image', checkAuthorizeOrNot, uploadImage);


export default router