const config = require('../../../config.json')

module.exports={
  "development": {
    "username": config.DB_USER,
    "password": config.DB_PASS,
    "database": config.DB_NAME,
    "host": config.DB_HOST,
    "dialect": config.DB_DIALECT
  },
  "test": {
    "username": config.DB_USER,
    "password": config.DB_PASS,
    "database": config.DB_NAME,
    "host": config.DB_HOST,
    "dialect": "postgres"
  },
  "production": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "dialect": "postgres",
    "use_env_variable": process.env.DATABASE_URL
  }
}
