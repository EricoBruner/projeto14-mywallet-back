import joi from "joi";

export default function loginValidator(login) {
  const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(3).required(),
  });

  const validation = loginSchema.validate(login);

  if (validation.error) {
    const errors = validation.error.details.map((detail) => detail.message);
    return errors;
  } else {
    return null;
  }
}
