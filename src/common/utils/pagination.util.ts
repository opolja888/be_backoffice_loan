export class PaginationUtil {
  static getPaginationOptions(page?: number, limit?: number) {
    if (page && limit) {
      return {
        skip: (page - 1) * limit,
        take: limit,
      };
    }
    return {};
  }
}
