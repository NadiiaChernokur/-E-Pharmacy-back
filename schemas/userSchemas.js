import Joi from "joi";

export const createUserSchema = Joi.object({
  email: Joi.string()
    .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    .required(),
  password: Joi.string().min(6).required(),
  name: Joi.string().min(2).required(),
  phone: Joi.string()
    .pattern(/^[+]?[0-9]{10,15}$/)
    .required(),
});

export const loginUserSchema = Joi.object({
  email: Joi.string()
    .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    .required(),
  password: Joi.string().min(6).required(),
});
// export const emailUserSchema = Joi.object({
//   email: Joi.string()
//     .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
//     .required(),
// });

// export const updateSubscription = Joi.object({
//   subscription: Joi.string()
//     .valid(...allowedSubscriptions)
//     .required(),
// });
