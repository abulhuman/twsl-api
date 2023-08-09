import * as Joi from 'joi';

export const appConfigSchema = {
  PORT: Joi.number().default(3000),
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  DATABASE_URL: Joi.string().required(),
  CORS_ENABLED: Joi.boolean().default(false),
};
