import joi from "joi";
import joioid from "joi";

export const transactionSchema = joi.object({
  amount: joi.number().precision(1).positive().required(),
  description: joi.string().required(),
  type: joi.string().valid("entrada", "saida").required(),
  userId: joi.object().id().required(),
});
