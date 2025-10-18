import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as timezone from 'dayjs/plugin/timezone';
import { Between, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';

dayjs.extend(utc);
dayjs.extend(timezone);

const DEFAULT_TIMEZONE = 'Asia/Bangkok';

export class DateUtil {
  static format(date: Date | string, format = 'YYYY-MM-DD HH:mm:ss'): string {
    return dayjs(date).tz(DEFAULT_TIMEZONE).format(format);
  }

  static now(format = 'YYYY-MM-DD HH:mm:ss'): string {
    return dayjs().tz(DEFAULT_TIMEZONE).format(format);
  }

  static setDateCriteria(from?: string, to?: string): Date | undefined {
    if (from && to)
      return Between(DateUtil.format(from, 'YYYY-MM-DD 00:00:00'), DateUtil.format(to, 'YYYY-MM-DD 23:59:59')) as unknown as Date;
    if (from)
      return MoreThanOrEqual(DateUtil.format(from, 'YYYY-MM-DD 00:00:00')) as unknown as Date;
    if (to)
      return LessThanOrEqual(DateUtil.format(to, 'YYYY-MM-DD 23:59:59')) as unknown as Date;
  }
}