import { HttpException } from '@nestjs/common';
import { HttpErrorType } from '@my-task-timer/shared-interfaces';

export class CustomException extends HttpException {
  constructor(
    public readonly errorType: keyof typeof HttpErrorType,
    message: string,
    status: number
  ) {
    super(message, status);
  }
}
