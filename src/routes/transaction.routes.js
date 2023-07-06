import { Router } from "express";
import { createTransaction } from "../controllers/transaction.controller.js";

import verifyToken from "../middleware/verifyToken.js";

const transactionRouter = Router();

transactionRouter.post("/nova-transacao/:tipo", verifyToken, createTransaction);

export default transactionRouter;
