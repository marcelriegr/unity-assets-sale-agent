class CustomError extends Error {
  constructor(message, status = 500, field) {
    super(message);
    this.status = status;
    this.field = field;
  }
}

const Errors = {
  CustomError,
  notFoundMessage: (message = 'Not found.') => new CustomError(message, 404),
};

module.exports = Errors;
