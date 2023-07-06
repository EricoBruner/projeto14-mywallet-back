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
    const token = uuid();

    const error = loginValidator(login);
    if (error) return res.status(422).send(error);

    const user = await db.collection("users").findOne({ email });
    if (!user) return res.status(404).send("Usuario não encontrado!");

    if (!bcrypt.compareSync(password, user.password))
      return res.status(401).send("Usuario ou senha incorretas!");

    await db.collection("sessions").deleteOne({ userId: user._id });
    await db.collection("sessions").insertOne({ userId: user._id, token });

    return res.status(200).send(token);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

export default router;
