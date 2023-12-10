import { Router } from "express";

import { signIn, signUp } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/signup", signUp);

authRouter.post("/", signIn);

export default authRouter;
