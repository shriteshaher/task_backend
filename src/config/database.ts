import { Sequelize } from 'sequelize';
import fs from 'node:fs';
import path from 'node:path';

export const sequelize = new Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USER!,
  process.env.DB_PASSWORD!,
  {
    host: process.env.DB_HOST!,
    port: Number(process.env.DB_PORT) || 5432,
    dialect: 'postgres',

    dialectOptions: {
      ssl: {
        ca: fs.readFileSync(
          path.resolve(process.cwd(), 'certs/global-bundle.pem'),
          'utf8'
        ),
        rejectUnauthorized: true,
      },
    },

    logging: false,

    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);
