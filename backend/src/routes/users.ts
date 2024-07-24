import express from "express";
import { getMyDetails, getUsers } from "../controllers/users";
import { authenticate } from "../middlewares/auth";

const router = express();

router.get("/", authenticate, getUsers);
router.get("/me", authenticate, getMyDetails);

export default router;
