import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { Note } from './modules/notes/entities/note.entity';

dotenv.config();

const config: PostgresConnectionOptions = {
  name: 'notelink',
  type: 'postgres',
  host: process.env.NOTELINK_DB_HOST,
  port: parseInt(process.env.NOTELINK_DB_PORT, 10),
  username: process.env.NOTELINK_DB_USER,
  password: process.env.NOTELINK_DB_PASSWORD,
  database: process.env.NOTELINK_DB_NAME,
  entities: [Note],
  synchronize: true,
  migrationsRun: true,
  logging: true,
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  ssl: false,
};

export default new DataSource(config);
