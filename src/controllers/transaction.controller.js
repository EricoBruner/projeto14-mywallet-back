import dayjs from "dayjs";

import transactionValidator from "../validators/transaction.validator.js";

import { db } from "../database/database.conection.js";
import { ObjectId } from "mongodb";

export async function createTransaction(req, res) {
  const { tipo } = req.params;
  const { amount, description } = req.body;

  try {
    const transaction = {
      amount: parseFloat(amount),
      description,
      type: tipo,
      userId: res.locals.userId,
      date: dayjs(Date.now()).format("DD/MM"),
    };

    const error = transactionValidator(transaction);
    if (error) return res.status(422).send(error);

    await db.collection("transactions").insertOne(transaction);

    return res.sendStatus(201);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export async function getAllUserTransaction(req, res) {
  try {
    const userId = res.locals.userId;

    const userTransaction = await db
      .collection("transactions")
      .find({ userId })
      .project({ userId: 0 })
      .toArray();

    return res.status(201).send(userTransaction);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export async function deleteTransaction(req, res) {
  try {
    const { id } = req.params;

    await db.collection("transactions").deleteOne({ _id: new ObjectId(id) });

    return res.sendStatus(204);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}
