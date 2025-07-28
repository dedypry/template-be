import { Action, Interceptor, InterceptorInterface } from 'routing-controllers';
import { Service } from 'typedi';

@Service()
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
          current_page: currentPage,
          per_page: perPage,
          last_page: lastPage,
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

    return {
      message: result,
    };
  }
}
