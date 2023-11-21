export class ApplicationError extends Error {
  constructor(
    message: string,
    public httpCode: number
  ) {
    super(message);
    Object.setPrototypeOf(this, ApplicationError.prototype);
  }
}

export class BadRequestError extends ApplicationError {
  constructor(message: string) {
    super(message, 400);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}
