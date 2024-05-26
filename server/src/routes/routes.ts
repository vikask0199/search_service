import express from "express";
import authRoute from "./authRoutes";
import categoryRoutes from "./categoryRoute"
import storeRoutes from "./storeRoutes"
import uploadFiles from "./uploadFiles"


const router = express.Router();

router.use("/auth", authRoute);
router.use("/category", categoryRoutes)
router.use("/store", storeRoutes)
router.use("/file", uploadFiles)

export default router;
