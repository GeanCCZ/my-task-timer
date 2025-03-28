import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CustomException } from './exceptions';
import { HttpErrorType } from '@my-task-timer/shared-interfaces';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let errorType: "UNAUTHORIZED" | "FORBIDDEN" | "BAD_REQUEST" | "NOT_FOUND" | "INTERNAL_SERVER_ERROR" | "CONFLICT" = HttpErrorType.INTERNAL_SERVER_ERROR;

    if (exception instanceof CustomException) {
      status = exception.getStatus();
      message = exception.message;
      errorType = exception.errorType;
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message;
      errorType = this.mapStandardErrorToType(exception);
    } else if (exception instanceof Error) {
      message = exception.message;
    }

    response.status(status).json({
      error: true,
      status,
      message,
      errorType,
      list: request.body || {},
      timestamp: new Date().toISOString(),
    });
  }

  private mapStandardErrorToType(
    exception: HttpException
  ): keyof typeof HttpErrorType {
    const status = exception.getStatus();
    switch (status) {
      case 400:
        return HttpErrorType.BAD_REQUEST;
      case 401:
        return HttpErrorType.UNAUTHORIZED;
      case 403:
        return HttpErrorType.FORBIDDEN;
      case 404:
        return HttpErrorType.NOT_FOUND;
      case 409:
        return HttpErrorType.CONFLICT;
      default:
        return HttpErrorType.INTERNAL_SERVER_ERROR;
    }
  }
}
