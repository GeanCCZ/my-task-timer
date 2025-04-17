import { HttpErrorType } from '@my-task-timer/shared-interfaces';
import { CustomException } from './custom.exception';

export class NotFoundException extends CustomException {
  constructor(message: string) {
    super(HttpErrorType.NOT_FOUND, message, 404);
  }
}
