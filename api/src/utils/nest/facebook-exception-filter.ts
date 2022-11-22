import {ArgumentsHost, Catch, ExceptionFilter, HttpStatus} from '@nestjs/common';

@Catch(Error)
export class FacebookExceptionFilter implements ExceptionFilter {
  catch(error: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    response.status(HttpStatus.BAD_REQUEST).json({
      error: 'Bad Request',
      statusCode: HttpStatus.BAD_REQUEST,
      message: `${error.message}`,
    });
  }
}
