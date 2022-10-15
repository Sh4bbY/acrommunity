import {ArgumentsHost, Catch, ExceptionFilter, HttpStatus} from '@nestjs/common';
import {BaseError, ValidationError} from 'sequelize';

@Catch(BaseError)
export class SequelizeExceptionFilter implements ExceptionFilter {
  catch(exception: BaseError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    if (exception instanceof ValidationError) {
      const data = SequelizeExceptionFilter.getValidationErrorResponseData(exception);
      response.status(data.statusCode).json(data);
      return;
    } else {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        error: 'Sequelize',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: exception.message,
      });
      console.error(exception);
    }
  }


  private static getValidationErrorResponseData(error: ValidationError) {
    switch (error.name) {
      case 'SequelizeUniqueConstraintError':
        return {
          error: 'Conflict',
          statusCode: HttpStatus.CONFLICT,
          message: error.errors[0].message,
        };

      case 'SequelizeValidationError':
        return {
          error: 'Bad Request',
          statusCode: HttpStatus.BAD_REQUEST,
          message: error.errors[0].message,
        };

      default:
        return {
          error: 'Internal Server Error',
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.errors[0].message,
        };
    }
  }
}
