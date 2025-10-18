import { logger } from "src/configs/logging.config";

export class LoggerUtil {
  static logInfo(message: string, data?: any) {
    logger.info({ message, data });
  }

  static logWarning(message: string, data?: any) {
    logger.warn({ message, data });
  }

  static logError(message: string, stack?: string, data?: any) {
    logger.error({ message, stack, data });
  }
}