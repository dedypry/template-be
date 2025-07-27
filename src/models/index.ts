import "reflect-metadata";
import {
  Model as BaseModel,
  RelationMappings,
  snakeCaseMappers,
} from "objection";
import knex from "knex";
import { attachPaginate, IPagination } from "knex-paginate";
import { knexConfig } from "../configs/knex";

const knexInstance = knex(knexConfig);
attachPaginate();

BaseModel.knex(knexInstance);
const relationMetadataKey = Symbol("relations");

type RelationType =
  | "HasManyRelation"
  | "BelongsToOneRelation"
  | "ManyToManyRelation";

export class Model extends BaseModel {
  id?: number;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;

  $beforeInsert(): void {
    this.created_at = new Date().toISOString();
  }

  $beforeUpdate(): void {
    this.updated_at = new Date().toISOString();
  }

  static softDeleteById(id: number | string) {
    return this.query()
      .findById(id)
      .patch({ deleted_at: new Date().toISOString() });
  }

  static get relationMappings(): RelationMappings {
    const meta = Reflect.getMetadata(relationMetadataKey, this) || [];
    const mappings: RelationMappings = {};

    for (const item of meta) {
      mappings[item.property] = {
        relation: BaseModel[item.relation as RelationType],
        modelClass: item.relatedModel,
        join: {
          from: item.join.from,
          to: item.join.to,
          ...(item.relation === "ManyToManyRelation"
            ? {
                through: {
                  from: item.through.from,
                  to: item.through.to,
                  modelClass: item.through.modelClass,
                  extra: item.through.extra,
                },
              }
            : {}),
        },
      };
    }

    return mappings;
  }
}
