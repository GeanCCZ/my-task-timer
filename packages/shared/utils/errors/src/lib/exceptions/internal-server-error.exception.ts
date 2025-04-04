import { HttpErrorType } from '@my-task-timer/shared-interfaces';
import { CustomException } from './custom.exception';

export class InternalServerError extends CustomException {
  constructor(message: string) {
    super(HttpErrorType.INTERNAL_SERVER_ERROR, message, 500);
  }
}
