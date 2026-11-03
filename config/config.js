const dotenv = require('dotenv');
const path = require('node:path');
const fs = require('node:fs');

const environment = process.env.NODE_ENV || 'development';

dotenv.config({
  path: path.resolve(process.cwd(), `.env.${environment}`),
});

const config = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 5432),
  dialect: 'postgres',
};

if (environment === 'production') {
  const caPath = path.resolve(
    __dirname,
    '../certs/global-bundle.pem'
  );

  config.dialectOptions = {
    ssl: {
      ca: fs.readFileSync(caPath, 'utf8'),
      rejectUnauthorized: true,
    },
  };
}

module.exports = {
  [environment]: config,
};
