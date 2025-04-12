import { HttpErrorType } from '@my-task-timer/shared-interfaces';
import { CustomException } from './custom.exception';

export class BadRequestException extends CustomException {
  constructor(message: string) {
    super(HttpErrorType.BAD_REQUEST, message, 400);
  }
}
