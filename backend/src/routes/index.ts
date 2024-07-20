import express from "express";
import authRoutes from "./auth";

const router = express();

router.use("/auth", authRoutes);

export default router;
