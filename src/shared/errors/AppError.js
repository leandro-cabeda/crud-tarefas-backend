class AppError extends Error {

  constructor(message = "", status = 400) {
    super(message);
    this.message = message;
    this.status = status;
  }
}

module.exports = AppError;
