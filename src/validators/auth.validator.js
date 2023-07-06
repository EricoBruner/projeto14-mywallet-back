import { loginSchema, registerSchema } from "../schema/auth.schema.js";

export function loginValidator(login) {
  const validation = loginSchema.validate(login, { abortEarly: false });

  if (validation.error) {
    const errors = validation.error.details.map((detail) => detail.message);
    return errors;
  } else {
    return null;
  }
}

export function registerValidator(register) {
  const validation = registerSchema.validate(register, { abortEarly: false });

  if (validation.error) {
    const errors = validation.error.details.map((detail) => detail.message);
    return errors;
  } else {
    return null;
  }
}
