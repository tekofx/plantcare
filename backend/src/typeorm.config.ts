import { DataSource } from 'typeorm';
import { config } from './config';
import { PlantData, User } from './entities';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: config.MYSQL_HOST,
  port: 3306,
  username: config.MYSQL_USER,
  password: config.MYSQL_PASSWORD,
  database: config.MYSQL_DATABASE,
  entities: [PlantData, User],
  synchronize: true,
  logging: false,
});
export const PlantDataRepo = AppDataSource.manager.getRepository(PlantData);
export const UserRepo = AppDataSource.manager.getRepository(User);
