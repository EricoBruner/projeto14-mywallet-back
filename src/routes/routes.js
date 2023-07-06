import { Router } from "express";

import { signIn, signUp } from "../controllers/authController.js";

const router = Router();

router.post("/cadastro", signUp);

router.post("/", signIn);

export default router;
