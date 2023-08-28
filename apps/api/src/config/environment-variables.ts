import * as Joi from 'joi';

export interface EnvironmentVariables {
  DATABASE_URL: string;
  ETHERSCAN_API_URL: string;
  ETHERSCAN_API_KEY: string;
}

export const validationSchemaForEnv = Joi.object<EnvironmentVariables, true>({
  DATABASE_URL: Joi.string().required(),
  ETHERSCAN_API_URL: Joi.string().required(),
  ETHERSCAN_API_KEY: Joi.string().required(),
});
