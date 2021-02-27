const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const winston = require('winston');

const configpath = process.env.CONFIG_PATH || path.join(__dirname, 'config.json');

let log;
let config;
let dbOptions = {};

try{
  config = JSON.parse(fs.readFileSync(configpath));

  if(require.main !== module){
    console.log('Using config file at', configpath);
  }

}catch(e){
  config = {};
}

config = _.merge({}, {
  ENV: process.env.NODE_ENV || 'development',
  HOST: process.env.HOST,
  PORT: process.env.PORT,
  LOG_LEVEL: process.env.LOG_LEVEL,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_USER: process.env.DB_USER,
  DB_PASS: process.env.DB_PASS,
  DB_NAME: process.env.DB_NAME,
  SECRET_KEY: process.env.SECRET_KEY,
  JWT_SECRET: process.env.JWT_SECRET
}, config);


const loggerTransports = [new winston.transports.Console()]

const loggerFormat = winston.format.printf(info => {
  return `${info.timestamp} [${info.level}]: ${info.message}`
})

if( config.LOG_PATH ){
  const logPath = path.join(__dirname, config.LOG_PATH);
  loggerTransports.push(new winston.transports.File({ filename: logPath }));
}

winston.addColors({
  emerg: 'red',
  alert: 'red',
  crit: 'red',
  error: 'red',
  warning: 'yellow',
  notice: 'gray',
  cache: 'magenta',
  sql: 'cyan',
  info: 'grey',
  debug: 'white'
})

if( config.ENV === 'test' ){
  config.LOG_LEVEL = "-1";
}

log = winston.createLogger({
  levels: {
    emerg: 0,
    alert: 1,
    crit: 2,
    error: 3,
    warning: 4,
    notice: 5,
    cache: 6,
    sql: 7,
    info: 8,
    debug: 9
  },
  level: config.LOG_LEVEL.toLowerCase(),
  format: winston.format.combine(
    winston.format.splat(),
    winston.format.timestamp(),
    winston.format.colorize({ all: true }),
    winston.format.simple(),
    loggerFormat
  ),
  transports: loggerTransports
});

// console.log(`NODE_ENV=${config.ENV}`)

if( config.ENV === 'test' ){
  // config.DB_URL = config.TEST_DB_URL || 'postgres://localhost:5432/portfolio';
  // dbOptions.logging = false;
}else{
  dbOptions.logging = function(msg){
    log.sql(msg);
  };
}

if( config.DB_LOGS === false ){
  dbOptions.logging = false;
}

config.log = log;
config.DB_OPTIONS = _.merge({}, config.DB_OPTIONS, dbOptions);


config.captureException = (e) => {
  console.log("Error --->", e)
}

if(require.main === module){
  const args = process.argv.slice(2);

  if( args.length > 0 ){
    console.log( _.get(config, args[0]) );
  }else{
    console.log( config );
  }
}

module.exports = config;

