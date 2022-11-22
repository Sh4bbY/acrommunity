import {ArgumentsHost, Catch, ExceptionFilter, HttpStatus, UnauthorizedException} from '@nestjs/common';
import {Request, Response} from 'express';

@Catch(UnauthorizedException)
export class RefreshExceptionFilter implements ExceptionFilter {
  catch(exception: UnauthorizedException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    if (request.path === '/api/auth/refresh') {
      // return 200 Ok for failing refresh request
      response.status(HttpStatus.OK).end();
    } else {
      response.status(status).end();
    }
  }
}
