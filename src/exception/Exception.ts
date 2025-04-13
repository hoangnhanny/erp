export class BadRequestException extends Error {
  statusCode = 400;
  constructor(message: string) {
    super(message);
    this.name = "BadRequestException";
  }
}

export class NotFoundException extends Error {
  statusCode = 404;
  constructor(message: string) {
    super(message);
    this.name = "NotFoundException";
  }
}

const Exception = {
  BadRequestException,
  NotFoundException,
};

export default Exception;
