class BaseError extends Error {
  constructor(message, extra) {
      super(message)
      this.name = this.constructor.name;
      this.message = message;
      Error.captureStackTrace(this, this.constructor)
      if (extra) this.extra = extra;
  }
}

module.exports.QueriesCreateError = class QueriesCreateError extends BaseError {};
module.exports.NotFound = class NotFound extends BaseError{};
// module.exports.TokenCreateError = class TokenCreateError extends BaseError{};