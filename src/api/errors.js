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
module.exports.UserCreateError = class UserCreateError extends BaseError{};
module.exports.CommentsCreateError = class CommentsCreateError extends BaseError{};
module.exports.InvalidRequest = class InvalidRequest extends BaseError{};
module.exports.InvalidUsernameOrPassword = class InvalidUsernameOrPassword extends BaseError{};
