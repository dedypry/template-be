import { ModelClass, RelationMappings } from "objection";
const tableMetadataKey = Symbol("tableName");

const relationMetadataKey = Symbol("relations");

type RelationType = "HasOne" | "HasMany" | "BelongsToOne";

interface RelationMeta {
  property: string;
  relatedModel: () => ModelClass<any>;
  relation: RelationType;
  join: {
    from: string;
    to: string;
  };
}

function addRelation(
  relation: RelationType,
  relatedModel: () => ModelClass<any>,
  from: string,
  to: string
) {
  return function (target: any, propertyKey: string) {
    const existing: RelationMeta[] =
      Reflect.getMetadata(relationMetadataKey, target.constructor) || [];
    existing.push({
      property: propertyKey,
      relation,
      relatedModel,
      join: { from, to },
    });
    Reflect.defineMetadata(relationMetadataKey, existing, target.constructor);
  };
}

export function Table(name: string) {
  return function (target: any) {
    Reflect.defineMetadata(tableMetadataKey, name, target);

    Object.defineProperty(target, "tableName", {
      get: () => Reflect.getMetadata(tableMetadataKey, target),
    });
  };
}

export const HasOne = (
  relatedModel: () => ModelClass<any>,
  from: string,
  to: string
) => addRelation("HasOne", relatedModel, from, to);

export const HasMany = (
  relatedModel: () => ModelClass<any>,
  from: string,
  to: string
) => addRelation("HasMany", relatedModel, from, to);

export const BelongsToOne = (
  relatedModel: () => ModelClass<any>,
  from: string,
  to: string
) => addRelation("BelongsToOne", relatedModel, from, to);

export function ManyToMany(modelClass: () => any, join: any) {
  return function (target: any, propertyKey: string) {
    if (!target.constructor.manyToMany) target.constructor.manyToMany = [];
    target.constructor.manyToMany.push({ propertyKey, modelClass, join });
  };
}

export function Join(modelClass: () => any, relationName?: string) {
  return function (target: any, propertyKey: string) {
    if (!target.constructor.joins) target.constructor.joins = [];
    target.constructor.joins.push({ propertyKey, modelClass, relationName });
  };
}