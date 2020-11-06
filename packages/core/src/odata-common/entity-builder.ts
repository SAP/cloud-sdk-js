import { createLogger } from '@sap-cloud-sdk/util';
import type { Constructable, EntityBase } from './entity';
import { toStaticPropertyFormat } from './name-converter';

const logger = createLogger({
  package: 'core',
  messageContext: 'entity-builder'
});

/**
 * @hidden
 */
export class EntityBuilder<EntityT extends EntityBase, JsonT> {
  protected entity: EntityT;

  constructor(private _entityConstructor: Constructable<EntityT, JsonT>) {
    if (!this.entity) {
      this.entity = new this._entityConstructor();
    }
  }

  /**
   * Sets the custom fields for the entity.
   *
   * @param customFields - The custom fields you want to add.
   * @returns The entity builder itself for method chaining
   */
  public withCustomFields(customFields: Record<string, any>): this {
    const validCustomFields = this.filterCustomFields(customFields);
    this.entity = this.entity.initializeCustomFields(validCustomFields);
    return this;
  }

  /**
   * Builds the entity.
   *
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
  public fromJson(json: Partial<JsonT>): EntityT {
    const entityBuilder = this._entityConstructor.builder();
    Object.entries(json).forEach(([key, value]) => {
      if (typeof entityBuilder[key] === 'function') {
        entityBuilder[key](value);
      }
      if (key === '_customFields') {
        entityBuilder.withCustomFields(value as Record<string, any>);
      }
    });
    return entityBuilder.build();
  }

  private filterCustomFields(
    customFields: Record<string, any>
  ): Record<string, any> {
    return Object.keys(customFields).reduce((validCfs, cf) => {
      if (!this._entityConstructor[toStaticPropertyFormat(cf)]) {
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
