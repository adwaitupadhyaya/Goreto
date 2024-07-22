import express from "express";

import { signup, login, logout } from "../controllers/auth";
import { validateReqBody } from "../middlewares/validator";
import { signUpSchema, loginSchema } from "../schema/users";

const router = express();

router.post("/signup", validateReqBody(signUpSchema), signup);
router.post("/login", validateReqBody(loginSchema), login);
router.post("/refresh", logout);

export default router;
