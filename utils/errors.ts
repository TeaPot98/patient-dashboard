export class CustomError extends Error {
  statusCode: number;
  constructor(message?: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class BadRequestError extends CustomError {
  constructor(message?: string) {
    super(message ? message : "Bad request");
    this.statusCode = 400;
  }
}

export class UnauthorizedError extends CustomError {
  constructor(message?: string) {
    super(message ? message : "Unauthorized");
    this.statusCode = 401;
  }
}

export class ForbiddenError extends CustomError {
  constructor(message?: string) {
    super(message ? message : "Forbidden");
    this.statusCode = 403;
  }
}

export class NotFoundError extends CustomError {
  constructor(message?: string) {
    super(message ? message : "Not found");
    this.statusCode = 404;
  }
}

export class UserExistsError extends UnauthorizedError {
  constructor() {
    super("User with this email already exists");
  }
}

export class CredentialsError extends UnauthorizedError {
  constructor() {
    super("Wrong username or password");
  }
}

export class InvalidTokenError extends UnauthorizedError {
  constructor() {
    super("Invalid or missing token");
  }
}
