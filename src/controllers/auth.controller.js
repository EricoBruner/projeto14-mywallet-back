import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

import {
  loginValidator,
  registerValidator,
} from "../validators/auth.validator.js";

import { db } from "../database/database.conection.js";

export async function signUp(req, res) {
  const { name, email, password } = req.body;

  try {
    const encryptedPassword = bcrypt.hashSync(password, 10);

    const user = { name, email, password: encryptedPassword };

    const error = registerValidator(user);
    if (error) return res.status(422).send(error);

    const resp = await db.collection("users").findOne({ email });
    if (resp) return res.status(409).send("E-mail already registered!");

    await db.collection("users").insertOne(user);

    return res.sendStatus(201);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export async function signIn(req, res) {
  const { email, password } = req.body;

  const login = { email, password };

  try {
    const token = uuid();

    const error = loginValidator(login);
    if (error) return res.status(422).send(error);

    const user = await db.collection("users").findOne({ email });
    if (!user) return res.status(404).send("User not found!");

    if (!bcrypt.compareSync(password, user.password))
      return res.status(401).send("Incorrect username or password!");

    await db.collection("sessions").deleteOne({ userId: user._id });
    await db.collection("sessions").insertOne({ userId: user._id, token });

    return res.status(200).json({ token: token, user: user.name });
  } catch (err) {
    return res.status(500).send(err.message);
  }
}
