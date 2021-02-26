const _           = require('lodash');
const config      = require('../../config');
const errors      = require('./errors');
const { log } = config;

const errorsMiddleware = (req, res, next) => {
  res.error = (e, logging) => {
    let type, message;

    message = e.message || e;

    if( e.name ){
      type = e.name;
    }

    if( !errors[e.name] ){
      log.error(e.stack || e);
      message = 'Application error';
      type = 'ApplicationError';
    }

    const statusCode = (~~(res.statusCode / 100) === 2) ? 400 : res.statusCode;

    res.status(statusCode).json({
      error: {
        message: message,
        type: type
      }
    });
  }

  next();
};

module.exports.errorsMiddleware = errorsMiddleware;