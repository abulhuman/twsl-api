import * as joi from 'joi';

export const securityConfigSchema = {
  JWT_EXPIRES_IN: joi.string().required(),
  JWT_REFRESH_SECRET: joi.string().required(),
  JWT_ACCESS_SECRET: joi.string().required(),
};
