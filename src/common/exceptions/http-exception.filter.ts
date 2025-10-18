import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { LoggerUtil } from '../utils/logger.util';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      success: false,
      errorInfo: exception.getResponse ? exception.getResponse() : 'Unknown Error',
    };

    LoggerUtil.logError(`HTTP Exception: ${exception.message}`, process.env.NODE_ENV !== 'production' ? exception.stack : undefined, errorResponse);

    response.status(status).json(errorResponse);
  }
}