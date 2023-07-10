import { Router } from "express";
import {
  createTransaction,
  getAllUserTransaction,
} from "../controllers/transaction.controller.js";

import verifyToken from "../middleware/verifyToken.js";

const transactionRouter = Router();

transactionRouter.post("/nova-transacao/:tipo", verifyToken, createTransaction);
transactionRouter.get("/nova-transacao", verifyToken, getAllUserTransaction);

export default transactionRouter;
