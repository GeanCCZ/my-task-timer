import { HttpErrorType } from '@my-task-timer/shared-interfaces';
import { CustomException } from './custom.exception';

export class UnauthorizedException extends CustomException {
  constructor(message: string) {
    super(HttpErrorType.UNAUTHORIZED, message, 401);
  }
}
