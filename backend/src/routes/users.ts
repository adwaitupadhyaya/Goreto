import express from "express";
import { getUsers, createUser } from "../controllers/users";

const router = express();

router.get("/", getUsers);
router.post("/", createUser);

export default router;
