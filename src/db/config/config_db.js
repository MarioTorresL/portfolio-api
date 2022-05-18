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
    "username": config.DB_USER,
    "password": config.DB_PASS,
    "database": config.DB_NAME,
    "host": config.DB_HOST,
    "port": config.DB_PORT,
    "dialect": "postgres",
  }
}

// "dialect": "postgres"