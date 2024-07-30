import express from "express";
import { getMyDetails, getUsers, updateProfile } from "../controllers/users";
import { authenticate } from "../middlewares/auth";

const router = express();

router.get("/", authenticate, getUsers);
router.get("/me", authenticate, getMyDetails);
router.put("/", authenticate, updateProfile);

export default router;
