import { transactionSchema } from "../schema/transaction.schema.js";

export default function transactionValidator(transaction) {
  const validation = transactionSchema.validate(transaction, {
    abortEarly: false,
  });

  if (validation.error) {
    const errors = validation.error.details.map((detail) => detail.message);
    return errors;
  } else {
    return null;
  }
}
