import Joi from "joi";

export const createItinerarySchema = Joi.object({
  title: Joi.string().required().messages({
    "any.required": "Title is required",
  }),
  description: Joi.string().optional(),
  number_of_days: Joi.number().min(1).required().messages({
    "any.required": "Number of Days is Required",
    "number.min": "At least one day is required",
  }),
  difficulty: Joi.string().valid("easy", "medium", "hard").required().messages({
    "any.required": "Difficulty is required",
    "any.only": "Difficulty must be either 'easy', 'medium', or 'hard'",
  }),
  path: Joi.array()
    .items(Joi.string().required().min(1))
    .min(1)
    .required()
    .messages({
      "array.base": "Path must be an array",
      "array.min": "Path must contain at least one location",
      "string.empty": "Location cannot be empty",
      "any.required": "Path is required",
    }),
});
