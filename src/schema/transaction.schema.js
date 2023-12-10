import joi from "joi";

export const transactionSchema = joi.object({
  amount: joi.number().precision(2).positive().required(),
  description: joi.string().required(),
  type: joi.string().valid("in", "out").required(),
  userId: joi.object().id().required(),
  date: joi.date().required(),
});
