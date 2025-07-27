import { Action, Interceptor, InterceptorInterface } from "routing-controllers";

@Interceptor()
export class ResponseInterceptor implements InterceptorInterface {
  intercept(action: Action, result: any) {
    if (result?.results) {
      const { page, pageSize } = action.request.query;
      if (result?.total) {
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
        status: "success",
        data: result,
      };
    }

    return {
      status: "success",
      data: result.data || "NO DATA",
      message: result.message,
    };
  }
}
