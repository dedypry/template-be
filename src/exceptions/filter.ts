import { NotNullViolationError, UniqueViolationError } from 'objection';
import {
  ExpressErrorMiddlewareInterface,
  HttpError,
  Middleware,
} from 'routing-controllers';

@Middleware({ type: 'after' })
export class ErrorHandler implements ExpressErrorMiddlewareInterface {
  error(
    error: any,
    request: any,
    response: any,
    next: (err?: any) => any
  ): void {
    console.error('ERROR:', error);
    let statusCode = 500;
    let message = 'Internal Server Error';
    let errors: any = undefined;

    if (error instanceof UniqueViolationError) {
      statusCode = 409; // Conflict
      message = `${(error as any).columns} already exists`;
    } else if (error instanceof NotNullViolationError) {
      statusCode = 400;
      message = `Missing required ${error.column}`;
      errors = [
        {
          [error.column]: 'Data Is required',
        },
      ];
    } else if (Array.isArray(error?.errors)) {
      statusCode = error?.httpCode || 400;
      message = 'Validation failed';
      errors = error.errors.map((e: any) => ({
        [e.property]: Object.values(e.constraints || {}),
      }));
    } else if (error instanceof HttpError) {
      statusCode = error.httpCode || 500;
      message = error.message;
    }

    response.status(statusCode).json({
      status: 'error',
      message,
      errors,
    });
  }
}
