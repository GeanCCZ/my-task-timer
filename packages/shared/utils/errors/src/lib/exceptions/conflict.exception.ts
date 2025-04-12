import { HttpErrorType } from '@my-task-timer/shared-interfaces';
import { CustomException } from './custom.exception';

export class ConflictException extends CustomException {
  constructor(message: string) {
    super(HttpErrorType.CONFLICT, message, 409);
  }
}
