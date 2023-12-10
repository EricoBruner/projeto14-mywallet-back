import { db } from "../database/database.conection.js";

export default async function verifyToken(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) return res.status(401).send("Invalid token!");

  const session = await db.collection("sessions").findOne({ token });
  if (!session) return res.status(401).send("Invalid token!");

  res.locals.userId = session.userId;

  next();
}
