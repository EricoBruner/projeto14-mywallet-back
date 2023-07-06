import transactionValidator from "../validators/transaction.validator.js";

import { db } from "../database/database.conection.js";

export async function createTransaction(req, res) {
  const { tipo } = req.params;
  const { amount, description } = req.body;

  try {
    const transaction = { amount, description, type: tipo };

    const error = transactionValidator(transaction);
    if (error) return res.status(422).send(error);

    await db.collection("transactions").insertOne(transaction);

    return res.sendStatus(201);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}
