import { Router } from "express";
import {
  createTransaction,
  deleteTransaction,
  getAllUserTransaction,
} from "../controllers/transaction.controller.js";

import verifyToken from "../middleware/verifyToken.js";

const transactionRouter = Router();

transactionRouter.post("/nova-transacao/:tipo", verifyToken, createTransaction);
transactionRouter.get("/nova-transacao", verifyToken, getAllUserTransaction);
transactionRouter.delete("/nova-transacao/:id", verifyToken, deleteTransaction);

export default transactionRouter;
