import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DateUtil } from '../utils/date.util';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    return next.handle().pipe(
      map(data => {
        return {
          statusCode: response.statusCode,
          timestamp: DateUtil.now(),
          path: request.url,
          method: request.method,
          success: true,
          data: data,
        };
      }),
    );
  }
}

