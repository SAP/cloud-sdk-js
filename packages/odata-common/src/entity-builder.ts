import {
  createLogger,
  partition,
  upperCaseSnakeCase
} from '@sap-cloud-sdk/util';
import { isNavigationProperty } from './properties-util';
import type { EntityApi, EntityBase } from './entity-base';
import { defaultDeSerializersRaw } from './de-serializers/default-de-serializers';
import { DeSerializers } from './de-serializers';

const logger = createLogger({
  package: 'odata-common',
  messageContext: 'entity-builder'
});

/**
 * Type to describe possible inputs for `.fromJson`.
 * This is based on the JSON type of an entity and allows all properties to be optional recursively.
 * It also allows setting unknown properties, which will be treated as custom fields.
 * @typeparam JsonT - JSON type of the entity
 */
// prettier-ignore
type FromJsonType<JsonT> = {
  [key: string]: any; // custom properties
} & {
  [P in keyof Omit<JsonT, keyof EntityBase>]?: JsonT[P] extends (infer U)[]
    ? U extends Record<string, any>
      ? FromJsonType<U>[] // one-to-many navigation properties
      : JsonT[P] // collection type
    : JsonT[P] extends Record<string, any> | null | undefined
      ? FromJsonType<JsonT[P]> | null | undefined // one-to-one navigation properties or complex type
      : JsonT[P]; // else
};

/**
 * @internal
 */
export class EntityBuilder<
  EntityT extends EntityBase,
  DeSerializersT extends DeSerializers
> {
  protected entity: EntityT;

  constructor(private _entityApi: EntityApi<EntityT, DeSerializersT>) {
    if (!this.entity) {
      this.entity = new _entityApi.entityConstructor(_entityApi.deSerializers);
    }
  }

  /**
   * Sets the custom fields for the entity.
   * @param customFields - The custom fields you want to add.
   * @returns The entity builder itself for method chaining
   */
  public withCustomFields(customFields: Record<string, any>): this {
    const validCustomFields = this.filterCustomFields(customFields);
    this.entity = this.entity.setCustomFields(validCustomFields);
    return this;
  }

  /**
   * Builds the entity.
   * @returns The entity.
   */
  public build(): EntityT {
    const entity = this.entity;
    this.entity = new this._entityApi.entityConstructor(
      defaultDeSerializersRaw
    );
    return entity;
  }

  /**
   * Builds an entity from JSON representation.
   * If you have obtained the JSON as a request payload use the [[deserializeEntity]] methods.
   * Note that fields not mappable to a field in the target entity are silently ignored.
   * @param json - Representation of the entity in JSON format.
   * @returns EntityBase constructed from JSON representation.
   */
  public fromJson(json: FromJsonType<EntityT>): EntityT {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const entityBuilder = this; // ._entityConstructor.builder();
    const entityConstructor = this._entityApi.entityConstructor;

    const [entityEntries, customEntries] = partition(
      Object.entries(json),
      ([key]) => typeof entityBuilder[key] === 'function'
    );

    entityEntries.forEach(([key, value]) => {
      const propertyValue =
        isNavigationProperty(key, this._entityApi.schema) && !!value
          ? buildNavigationPropertyFromJson(key, value, this._entityApi)
          : value;

      entityBuilder[key](propertyValue);
    });

    const customFields = customEntries.reduce(
      (customFieldsObj, [key, value]) => {
        if (key === '_customFields') {
          logger.warn(
            "Setting custom fields in 'fromJson' through '_customFields' is deprecated and will soon be removed. Add properties to your JSON instead. (Deprecated since v1.38.1)"
          );
          return { ...customFieldsObj, ...value };
        }
        return { ...customFieldsObj, [key]: value };
      },
      {}
    );
    entityBuilder.withCustomFields(customFields);

    return entityBuilder.build();
  }
  private filterCustomFields(
    customFields: Record<string, any>
  ): Record<string, any> {
    return Object.keys(customFields).reduce((validCfs, cf) => {
      if (!this._entityApi.schema[upperCaseSnakeCase(cf)]) {
        validCfs[cf] = customFields[cf];
      }
      logger.warn(
        `Field name "${cf}" is already existing in "${toClassName(
          this._entityApi.entityConstructor._entityName
        )}" and thus cannot be defined as custom field. `
      );
      return validCfs;
    }, {});
  }
}

function toClassName(entityName: string) {
  return entityName.substr(entityName.indexOf('_') + 1);
}

function buildNavigationPropertyFromJson<
  EntityT extends EntityBase,
  DeSerializersT extends DeSerializers,
  LinkedEntityT extends EntityBase
>(
  key: string,
  value: FromJsonType<unknown>,
  entityApi: EntityApi<EntityT, DeSerializersT>
): LinkedEntityT | LinkedEntityT[] {
  const field = entityApi.schema[upperCaseSnakeCase(key)];
  const linkedEntityApi = field._linkedEntityApi;
  return Array.isArray(value)
    ? value.map(item => buildSingleEntityFromJson(item, linkedEntityApi))
    : // TODO: remove type assertion?
      (buildSingleEntityFromJson(value, linkedEntityApi) as LinkedEntityT);
}

function buildSingleEntityFromJson<
  LinkedEntityT extends EntityBase,
  DeSerializersT extends DeSerializers
>(
  json: FromJsonType<unknown>,
  linkedEntityApi: EntityApi<LinkedEntityT, DeSerializersT>
): LinkedEntityT {
  return json instanceof linkedEntityApi.entityConstructor
    ? json
    : linkedEntityApi.entityBuilder().fromJson(json);
}
