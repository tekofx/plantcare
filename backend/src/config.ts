import 'dotenv/config';

interface Config {
  MYSQL_DATABASE: string;
  MYSQL_USER: string;
  MYSQL_PASSWORD: string;
  MYSQL_HOST: string;
  JWT_SECRET: string;
}

const missingEnvVars = [];

if (!process.env.MYSQL_DATABASE) missingEnvVars.push('MYSQL_DATABASE');
if (!process.env.MYSQL_PASSWORD) missingEnvVars.push('MYSQL_PASSWORD');
if (!process.env.MYSQL_USER) missingEnvVars.push('MYSQL_USER');
if (!process.env.MYSQL_HOST) missingEnvVars.push('MYSQL_HOST');
if (!process.env.JWT_SECRET) missingEnvVars.push('JWT_SECRET');

if (missingEnvVars.length > 0) {
  console.error(`Missing environment variables: ${missingEnvVars.join(', ')}`);
  process.exit(1);
}
const config: Config = {
  MYSQL_DATABASE: process.env.MYSQL_DATABASE!,
  MYSQL_PASSWORD: process.env.MYSQL_PASSWORD!,
  MYSQL_USER: process.env.MYSQL_USER!,
  MYSQL_HOST: process.env.MYSQL_HOST!,
  JWT_SECRET: process.env.JWT_SECRET!,
};
export { config };
