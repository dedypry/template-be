import { Action, Interceptor, InterceptorInterface } from 'routing-controllers';

@Interceptor()
export class ResponseInterceptor implements InterceptorInterface {
  intercept(action: Action, result: any) {

    if (result?.results) {
      const { page, pageSize } = action.request.query;
      if (result?.total >= 0) {
        const perPage = +pageSize || 10;
        const currentPage = page ? +page - 1 : 1;
        const lastPage = Math.ceil(result.total / perPage);
        return {
          data: result?.results,
          total: result?.total,
          currentPage: currentPage,
          perPage: perPage,
          lastPage: lastPage,
        };
      }
      return {
        data: result?.results,
      };
    }

    if (Array.isArray(result)) {
      return {
        status: 'success',
        data: result,
      };
    }

    return result;
  }
}
