import mongoose from "mongoose"
import { IUploader } from "../interfaces/ImageUploader";

const ImageUploadSchema = new mongoose.Schema<IUploader>(
  {
   image:String
  }
);

const ImageDetails = mongoose.model<IUploader>('ImageUpload', ImageUploadSchema)

export default ImageDetails