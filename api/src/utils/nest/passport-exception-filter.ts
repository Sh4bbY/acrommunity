import {ArgumentsHost, Catch, ExceptionFilter, HttpStatus} from '@nestjs/common';
import {TokenError} from 'passport-oauth2/lib';

@Catch(TokenError)
export class PassportExceptionFilter implements ExceptionFilter {
  catch(exception: TokenError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    response.status(HttpStatus.BAD_REQUEST).json({
      error: 'Bad Request',
      statusCode: HttpStatus.BAD_REQUEST,
      message: `${exception.message} (${exception.code})`,
    });
  }
}
