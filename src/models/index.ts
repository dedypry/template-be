import "reflect-metadata";
import { Model as BaseModel, RelationMappings } from "objection";
import knex from "knex";
import { knexConfig } from "../configs/knex";

const knexInstance = knex(knexConfig);

BaseModel.knex(knexInstance);
const relationMetadataKey = Symbol("relations");

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
}
