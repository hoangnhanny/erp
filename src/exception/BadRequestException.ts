export class BadRequestException extends Error {
  statusCode = 400;
  constructor(message: string) {
    super(message);
    this.name = "BadRequestException";
  }
}
