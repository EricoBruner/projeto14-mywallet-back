import { Router } from "express";

import userValidator from "../validators/userValidator";
import loginValidator from "../validators/loginValidator";

const router = Router();

router.post("/cadastro", async (req, res) => {
  const { name, email, password } = req.body;

  const user = { name, email, password };

  try {
    const error = userValidator(user);
    if (error) return res.status(422).send(error);

    const resp = await db.collection("users").findOne({ email });
    if (resp) return res.sendStatus(409);

    await db.collection("users").insertOne(user);

    return res.sendStatus(201);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  const login = { email, password };

  try {
    const error = loginValidator(login);
    if (error) return res.status(422).send(error);

    const resp = await db.collection("users").findOne({ email });
    if (!resp) return res.sendStatus(404);
    if (resp.password != password) return res.sendStatus(401);

    return res.sendStatus(200);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

export { router };
