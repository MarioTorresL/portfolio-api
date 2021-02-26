const _            = require('lodash');
const express      = require('express');
const bodyParser   = require('body-parser');
const cors         = require('cors');
const config       = require('../config');
const winston        = require('winston')
const expressWinston = require('express-winston')
const helmet        = require('helmet')
const middlewares = require('./api/middlewares.js')

const log  = config.log;
const app = express();

app.use(helmet());

const server = require('http').Server(app);

if( config.ENV !== 'test' ){
  app.use(expressWinston.logger({
    transports: [
      new winston.transports.Console()
    ],
    format: winston.format.combine(
      winston.format.splat(),
      winston.format.timestamp(),
      winston.format.colorize({ all: true }),
      winston.format.simple(),
      winston.format.printf(info => {
        return `${info.timestamp} [${info.level}]: ${info.message}`
      })
    ),
    meta: true,
    msg: "HTTP {{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
  }));
}

app.use(bodyParser.json({ limit: '10mb' }));
app.use(cors());
app.use(middlewares.errorsMiddleware);

app.get('/', (req, res) => res.status(200).json({ status: 200 })) 

// app.use('/wizard/queries', require('./api/queries'));
// app.use('/wizard/tokens', require('./api/tokens'));

module.exports = server;