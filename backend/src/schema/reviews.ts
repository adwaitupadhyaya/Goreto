import Joi from "joi";

export const createReviewSchema = Joi.object({
  content: Joi.string().optional().messages({
    "string.base": "Content must be a string ",
  }),
  rating: Joi.number()
    .required()
    .min(0)
    .max(5)
    .messages({
      "any.required": "Rating is Required",
      "number.min": "Rating can't be less than 0",
      "number.max": "Rating can't be greater than 5",
      "rating.float": "Rating should be multiple of 0.5",
    })
    .custom((value, helpers) => {
      if (value % 0.5 !== 0) {
        return helpers.error("rating.float");
      }
      return value;
    }),
}).options({
  stripUnknown: true,
});
