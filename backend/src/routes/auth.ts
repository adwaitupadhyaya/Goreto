import express from "express";

import { signup, login, logout } from "../controllers/auth";

const router = express();

router.post("/signup", signup);
router.post("/login", login);
router.post("/refresh", logout);

export default router;
