import { Request, Response } from "express";
import { uploadOnCloudinary } from "../utils/cloudinaryUploadFile";
import { upload } from "../middlewares/multerConfigFile";

// Controller function to handle the file upload
export const uploadImage = async (req: Request, res: Response) => {
    try {
        // Multer stores the file in req.file
        if (!req.file) {
            return res.status(400).send({ message: "No file uploaded" });
        }

        const localFilePath = req.file.path;
        const cloudinaryResponse = await uploadOnCloudinary(localFilePath);

        if (cloudinaryResponse) {
            return res.status(200).send({
                message: "File uploaded successfully",
                url: cloudinaryResponse.url
            });
        } else {
            return res.status(500).send({ message: "Failed to upload file" });
        }
    } catch (error) {
        return res.status(500).send({ message: "An error occurred", error });
    }
};




export { upload };
