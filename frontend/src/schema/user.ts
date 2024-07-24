import Joi from "joi";

export const signUpSchema = Joi.object({
  first_name: Joi.string().required().messages({
    "any.required": "Userame is required",
  }),
  last_name: Joi.string().required().messages({
    "any.required": "Name is required",
  }),
  username: Joi.string().required().messages({
    "any.required": "Name is required",
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "any.required": "Email is required",
      "string.email": "Email must be a valid format",
    }),
  password: Joi.string()
    .required()
    .min(8)
    .messages({
      "any.required": "Password is required",
      "password.uppercase":
        "Password must contain at least one uppercase letter",
      "password.lowercase":
        "Password must contain at least one lowercase letter",
      "password.numbers": "Password must contain at least one number",
      "password.special":
        "Password must contain at least one special character",
    })
    .custom((value, helpers) => {
      if (!/[A-Z]/.test(value)) {
        return helpers.error("password.uppercase");
      }
      if (!/[a-z]/.test(value)) {
        return helpers.error("password.lowercase");
      }
      if (!/[0-9]/.test(value)) {
        return helpers.error("password.numbers");
      }
      if (!/[!@#$%^&*]/.test(value)) {
        return helpers.error("password.special");
      }

      return value;
    }),
  profile_picture: Joi.string().optional(),
});

export const loginSchema = Joi.object({
  username: Joi.string().required().messages({
    "any.required": "Name is required",
  }),
  password: Joi.string().required().min(8).messages({
    "any.required": "Password is required",
  }),
});
