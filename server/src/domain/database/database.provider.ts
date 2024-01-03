import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import * as process from 'process';
dotenv.config();
export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: 'localhost',
        port: +process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME_DATABASE,
        // logging: true ,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
      });
      await dataSource
        .initialize()
        .then(() => {
          console.log('Đã kết nối với mySQL');
        })
        .catch((err) => {
          console.error('Error during Data Source initialization', err);
        });

      return dataSource;
    },
  },
];
