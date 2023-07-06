import express, { json } from "express";
import cors from "cors";
import authRouter from "./routes/auth.routes.js";
import transactionRouter from "./routes/transaction.routes.js";

const app = express();

app.use(cors());
app.use(json());

app.use(authRouter);
app.use(transactionRouter);

app.listen(5000, () => {
  console.log("👾 Servidor rodando na porta 5000! 👾");
});
