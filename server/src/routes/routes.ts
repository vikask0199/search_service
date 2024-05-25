import express from "express";
import authRoute from "./authRoutes";
import categoryRoutes from "./categoryRoute"
import storeRoutes from "./storeRoutes"

const router = express.Router();

router.use("/auth", authRoute);
router.use("/category", categoryRoutes)
router.use("/store", storeRoutes)

export default router;
