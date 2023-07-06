import { Router } from "express";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

import registerValidator from "../validators/registerValidator.js";
import loginValidator from "../validators/loginValidator.js";

import { db } from "../config/database.js";

const router = Router();

router.post("/cadastro", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const encryptedPassword = bcrypt.hashSync(password, 10);

    const user = { name, email, password: encryptedPassword };

    const error = registerValidator(user);
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

    if (!bcrypt.compareSync(password, resp.password))
      return res.sendStatus(401);

    return res.sendStatus(200);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

export default router;
