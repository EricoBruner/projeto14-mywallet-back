import express, { json } from "express";
import cors from "cors";
import router from "./routes/routes.js";

const app = express();

app.use(cors());
app.use(json());
app.use(router);

app.listen(5000, () => {
  console.log("👾 Servidor rodando na porta 5000! 👾");
});
