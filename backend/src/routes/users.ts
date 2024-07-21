import express from "express";
import { getUsers } from "../controllers/users";
import { authenticate } from "../middlewares/auth";

const router = express();

router.get("/", authenticate, getUsers);

export default router;
