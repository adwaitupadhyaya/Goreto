import express from "express";
import authRoutes from "./auth";
import userRoutes from "./users";

const router = express();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);

export default router;
