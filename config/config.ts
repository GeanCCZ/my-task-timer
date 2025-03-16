import { validateEnv } from "./env/env.config";

const isProduction = process.env.NODE_ENV === 'production';

export const environment = validateEnv(isProduction);