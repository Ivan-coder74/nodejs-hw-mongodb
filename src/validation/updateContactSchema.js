import Joi from 'joi';

export const updateContactSchema = Joi.object({
  name: Joi.string().required().min(3).max(20),
  phoneNumber: Joi.number().required(),
  email: Joi.string().email(),
  isFavorite: Joi.boolean().default(false),
  contactType: Joi.string()
    .valid('work', 'home', 'personal')
    .default('personal'),
});
