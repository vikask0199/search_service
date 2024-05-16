import express from "express";
import planetRoute from "./planetRoutes";
import userRoute from "./userRoutes";
import authRoute from "./authRoutes";
import roleRoute from "./roleRoutes";
import sarRoute from "./sarRoutes";
import generalFunctionsRoute from "./generalFunctionsRelatedRoutes";

const router = express.Router();

router.use("/user", userRoute);
router.use("/auth", authRoute);
router.use("/planet", planetRoute);
router.use("/sar", sarRoute);
router.use("/general", generalFunctionsRoute);
router.use("/role", roleRoute);

export default router;
