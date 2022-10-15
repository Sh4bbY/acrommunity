import {CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor} from '@nestjs/common';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger();

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const request = context.getArgByIndex(0);
    const userString = request.user ? ` (User: ${request.user.id})` : '';
    const msgHead = `${request.method} ${request.url}`;

    return next.handle()
      .pipe(
        tap(() => {
          const durationInMs = Date.now() - now;
          if (durationInMs < 500) {
            this.logger.verbose(`${msgHead} took ${durationInMs}ms ${userString}`);
          } else {
            this.logger.warn(`${msgHead} took ${durationInMs}ms ${userString} - heavy load request`);
          }
        }),
        catchError(err => {
          const msg = err?.response?.message || err?.message || err;
          this.logger.warn(`${msgHead} failed: ${msg}`);
          if (err?.sql) {
            console.log(err.sql);
            console.log(err?.original?.parameters);
          }
          return throwError(err);
        }),
      );
  }
}
