import multer from "multer";
import path from "path";
import fs from "fs";
import { Request, Response } from "express";
import ImageDetails from "../models/ImageDetails";
import upload from "../app";



export async function uploadImage(req: Request, res: Response) {
    try {
        upload(req, res, async (err: any) => {
            if (err) {
                return res.status(400).json({ status: "error", message: err.message });
            }

            const imageName = req?.file?.filename;
            const host = req.get('host');
            const protocol = req.protocol;
            const imageUrl = `${protocol}://${host}/images/${imageName}`;

            try {
                await ImageDetails.create({ image: imageUrl });
                res.json({ status: "ok", imageUrl: imageUrl });
            } catch (error: any) {
                res.status(500).json({ status: "error", message: error.message });
            }
        });
    } catch (error: any) {
        res.status(500).json({ status: "error", message: error.message });
    }
}


export async function getImages(req: Request, res: Response) {
    try {
        const data = await ImageDetails.find({});
        res.send({ status: "ok", data: data });
    } catch (error:any) {
        res.status(500).json({ status: "error", message: error.message });
    }
}

export async function deleteImage(req: Request, res: Response) {
    try {
        const image = await ImageDetails.findById(req.params.id);

        if (!image) {
            return res.status(404).json({ status: "error", message: "Image not found" });
        }

        // Delete the image from the file system
        const imagePath = path.join(__dirname, "../src/images", image.image);
        fs.unlinkSync(imagePath);

        // Delete the image from the database
        await ImageDetails.findByIdAndDelete(req.params.id);

        res.json({ status: "ok", message: "Image deleted successfully" });
    } catch (error:any) {
        res.status(500).json({ status: "error", message: error.message });
    }
}