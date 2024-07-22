import express from "express";
import authRoutes from "./auth";
import userRoutes from "./users";
import itineraryRoutes from "./itineraries";

const router = express();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/itineraries", itineraryRoutes);

export default router;
