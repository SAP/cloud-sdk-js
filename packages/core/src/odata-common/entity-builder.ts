import {
  createLogger,
  partition,
  upperCaseSnakeCase
} from '@sap-cloud-sdk/util';
import type { Constructable, Entity } from './entity';
import { isNavigationProperty } from './properties-util';

const logger = createLogger({
  package: 'core',
  messageContext: 'entity-builder'
});

type FromJsonType<T> = {
  [key: string]: any;
} & {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? U extends Record<string, any>
      ? FromJsonType<U>[]
      : T[P]
    : T[P] extends Record<string, any>
    ? FromJsonType<T[P]>
    : T[P];
};

/**
 * @hidden
 */
export class EntityBuilder<EntityT extends Entity, JsonT> {
  protected entity: EntityT;

  constructor(private _entityConstructor: Constructable<EntityT, JsonT>) {
    if (!this.entity) {
      this.entity = new this._entityConstructor();
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
    this.entity = new this._entityConstructor();
    return entity;
  }

  /**
   * Builds an entity from JSON representation.
   * If you have obtained the JSON as a request payload use the [[deserializeEntity]] methods.
   * Note that fields not mappable to a field in the target entity are silently ignored.
   * @param json - Representation of the entity in JSON format.
   * @returns Entity constructed from JSON representation.
   */
  public fromJson(json: FromJsonType<JsonT>): EntityT {
    const entityBuilder = this._entityConstructor.builder();
    const entityConstructor = this._entityConstructor;

    const [entityEntries, customEntries] = partition(
      Object.entries(json),
      ([key]) => typeof entityBuilder[key] === 'function'
    );

    entityEntries.forEach(([key, value]) => {
      const propertyValue = isNavigationProperty(key, entityConstructor)
        ? buildNavigationPropertyFromJson(key, value, entityConstructor)
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
      if (!this._entityConstructor[upperCaseSnakeCase(cf)]) {
        validCfs[cf] = customFields[cf];
      }
      logger.warn(
        `Field name "${cf}" is already existing in "${toClassName(
          this._entityConstructor._entityName
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
  EntityT extends Entity,
  LinkedEntityT extends Entity
>(
  key: string,
  value: FromJsonType<unknown>,
  entityConstructor: Constructable<EntityT>
): LinkedEntityT | LinkedEntityT[] {
  const field = entityConstructor[upperCaseSnakeCase(key)];
  const linkedEntityConstructor: Constructable<LinkedEntityT> =
    field._linkedEntity;
  return Array.isArray(value)
    ? value.map(item =>
        buildSingleEntityFromJson(item, linkedEntityConstructor)
      )
    : buildSingleEntityFromJson(value, linkedEntityConstructor);
}

function buildSingleEntityFromJson<LinkedEntityT extends Entity>(
  json: FromJsonType<unknown>,
  linkedEntityConstructor: Constructable<LinkedEntityT>
): LinkedEntityT {
  return json instanceof linkedEntityConstructor
    ? json
    : linkedEntityConstructor.builder().fromJson(json);
}
