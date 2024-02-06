import { DataSource } from 'typeorm';
import { config } from './config';
import { Plant, User } from './entities';
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: config.MYSQL_HOST,
  port: 3306,
  username: config.MYSQL_USER,
  password: config.MYSQL_PASSWORD,
  database: config.MYSQL_DATABASE,
  entities: [Plant, User],
  synchronize: true,
  logging: false,
});
export const PlantRepo = AppDataSource.manager.getRepository(Plant);
export const UserRepo = AppDataSource.manager.getRepository(User);
