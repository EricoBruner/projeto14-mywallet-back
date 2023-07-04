import express, { json } from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(json());

app.post("/cadastro", (req, res) => {});

app.listen(5000, () => {
  console.log("👾 Servidor rodando na porta 5000! 👾");
});
