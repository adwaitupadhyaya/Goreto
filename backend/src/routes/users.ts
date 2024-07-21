import express from "express";
import { getUsers, createUser } from "../controllers/users";
import { authenticate } from "../middlewares/auth";

const router = express();

router.get("/", authenticate, getUsers);
router.post("/", createUser);

export default router;
