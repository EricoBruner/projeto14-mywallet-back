import { Router } from "express";
import {
  createTransaction,
  deleteTransaction,
  getAllUserTransaction,
  getOneTransaction,
} from "../controllers/transaction.controller.js";

import verifyToken from "../middleware/verifyToken.js";

const transactionRouter = Router();

transactionRouter.post("/transaction/:type", verifyToken, createTransaction);
transactionRouter.get("/transaction", verifyToken, getAllUserTransaction);
transactionRouter.get("/transaction/:id", verifyToken, getOneTransaction);
transactionRouter.delete("/transaction/:id", verifyToken, deleteTransaction);

export default transactionRouter;
