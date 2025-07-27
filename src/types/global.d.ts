import { QueryBuilder } from "objection";
import {IWithPagination} from "knex-paginate"

declare module "objection" {
  interface QueryBuilder<M, R = M[]> {
    paginate(page: number, perPage: number): Promise<IWithPagination>;
  }
}
