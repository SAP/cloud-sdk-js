/* eslint-disable max-classes-per-file */

import { camelCase, equal, isNullish } from '@sap-cloud-sdk/util';
import { EntityBuilder } from './entity-builder';
import { isNavigationProperty, nonEnumerable } from './properties-util';
import type { Field, Link } from './selectable';
import { DeSerializers } from './de-serializers';
import { EntityApi } from './entity-api';

/**
 * Helper type to extract the {@link @sap-cloud-sdk/util!ODataVersion} from a given entity so ODataVersionOf<MyVersion2Entity> is `v2`.
 */
export type ODataVersionOf<T extends EntityBase> = T['_oDataVersion'];

/**
 * Represents the static API of an entity.
 */
export interface Constructable<EntityT extends EntityBase> {
  /**
   * Name of the entity.
   */
  _entityName: string;
  /**
   * Service path as specified in the `service-mapping.json`, e.g., `/sap/opu/odata/sap/API_COMMON_SRV`.
   */
  _defaultServicePath: string;
  /**
   * Names of the key properties of the entity.
   */
  _keys: string[];
  new (...args: any[]): EntityT;
}

/**
 * Entity builder type with check for EntityT.
 */
export type EntityBuilderType<
  EntityT extends EntityBase,
  DeSerializersT extends DeSerializers
> = {
  [property in keyof Required<Omit<EntityT, keyof EntityBase>>]: (
    value: EntityT[property]
  ) => EntityBuilderType<EntityT, DeSerializersT>;
} & EntityBuilder<EntityT, DeSerializersT>;

/**
 * Super class for all representations of OData entity types.
 */
export abstract class EntityBase {
  static _serviceName: string;
  static _entityName: string;
  static _defaultServicePath: string;

  /**
   * The remote state of the entity.
   * Remote state refers to the last known state of the entity on the remote system from which it has been retrieved or to which it has been posted.
   * It is stored as map, where the keys are stored in the format of the original OData properties.
   */
  protected remoteState: { [keys: string]: any };

  /**
   * The current ETag version of the entity in the remote system.
   * The ETag identified the version of the in the remote system. It will be automatically set in the "if-match" header of update requests and can be set as a custom header for delete requests.
   * When no ETag is provided by the remote system the value of this variable defaults to "*".
   */
  protected _versionIdentifier: string;

  /**
   * A mapper representing custom fields in an entity.
   * Custom fields are represented by their field names and the corresponding values.
   * A custom field can be added or updated using {@link setCustomField} method.
   */
  protected _customFields: Record<string, any>;

  abstract readonly _oDataVersion: any;

  /**
   * @internal
   */
  constructor(readonly _entityApi: any) {
    nonEnumerable(this, '_oDataVersion');
    nonEnumerable(this, '_customFields');
    nonEnumerable(this, '_entityApi');
    this._customFields = {};
  }

  /**
   * ETag version identifier accessor.
   * @returns The ETag version identifier of the retrieved entity, returns `undefined` if not retrieved.
   */
  get versionIdentifier(): string {
    return this._versionIdentifier;
  }

  /**
   * Returns a map that contains all entity custom fields.
   * @returns A map of all defined custom fields in the entity.
   */
  getCustomFields(): Record<string, any> {
    return this._customFields;
  }

  /**
   * Custom field value getter.
   * @param fieldName - The name of the custom field.
   * @returns The value of the corresponding custom field.
   */
  getCustomField(fieldName: string): any {
    return this._customFields[fieldName];
  }

  /**
   * Sets a new custom field in the entity or updates it.
   * Throws an error, if the provided custom field name is already defined by an original field in entity.
   * @param fieldName - The name of the custom field to update.
   * @param value - The value of the field.
   * @returns The entity itself, to facilitate method chaining.
   */
  setCustomField(fieldName: string, value: any): this {
    if (this.isConflictingCustomField(fieldName)) {
      throw new Error(
        `The field name "${fieldName}" is already defined in the entity and cannot be set as custom field.`
      );
    }

    this._customFields[fieldName] = value;

    return this;
  }

  /**
   * Validates whether a custom field exists in the entity.
   * @param fieldName - The name of the custom field to update.
   * @returns A boolean value, that indicates whether a custom field is defined in entity.
   */
  hasCustomField(fieldName: string): boolean {
    return this._customFields[fieldName] !== undefined;
  }

  /**
   * Sets custom fields on an entity.
   * @param customFields - Custom fields to set on the entity.
   * @returns The entity itself, to facilitate method chaining.
   */
  setCustomFields(customFields: Record<string, any>): this {
    Object.entries(customFields).forEach(([key, value]) => {
      this.setCustomField(key, value);
    });
    return this;
  }

  /**
   * Set the ETag version identifier of the retrieved entity.
   * @param etag - The returned ETag version of the entity.
   * @returns The entity itself, to facilitate method chaining.
   */
  setVersionIdentifier(etag: string | undefined): this {
    if (etag && typeof etag === 'string') {
      nonEnumerable(this, '_versionIdentifier');
      this._versionIdentifier = etag;
    }
    return this;
  }

  /**
   * Initializes or sets the remoteState of the entity.
   * This function is called on all read, create and update requests.
   * @param state - State to be set as remote state.
   * @returns The entity itself, to facilitate method chaining.
   */
  setOrInitializeRemoteState(state?: Record<string, any>): this {
    if (!this.remoteState) {
      nonEnumerable(this, 'remoteState');
    }
    state = state || this.asObject();
    this.remoteState = Object.entries(state).reduce(
      (stateObject, [fieldName, value]) => {
        const propertyName = this[camelCase(fieldName)]
          ? camelCase(fieldName)
          : fieldName;
        return { ...stateObject, [propertyName]: value };
      },
      {}
    );
    return this;
  }

  /**
   * Returns all updated custom field properties compared to the last known remote state.
   * @returns An object containing all updated custom properties, with their new values.
   */
  getUpdatedCustomFields(): Record<string, any> {
    if (!this.remoteState) {
      return this._customFields;
    }

    return Object.entries(this.getCustomFields())
      .filter(([fieldName, value]) => this.remoteState[fieldName] !== value)
      .reduce(
        (updatedCustomFields, [fieldName, value]) => ({
          ...updatedCustomFields,
          [fieldName]: value
        }),
        {}
      );
  }

  /**
   * Returns all changed properties compared to the last known remote state.
   * The returned properties do not include custom fields.
   * Use {@link getUpdatedCustomFields}, if you need custom fields.
   * @returns EntityBase with all properties that changed.
   */
  getUpdatedProperties(): Record<string, any> {
    const current = this.asObject();
    return this.getUpdatedPropertyNames().reduce(
      (patch, key) => ({ ...patch, [key]: current[key] }),
      {}
    );
  }

  /**
   * Returns all changed property names compared to the last known remote state.
   * The returned properties names do not include custom fields.
   * Use {@link getUpdatedCustomFields}, if you need custom fields.
   * @returns EntityBase with all properties that changed.
   */
  getUpdatedPropertyNames(): string[] {
    const currentState = this.asObject();
    const names = Object.keys(currentState).filter(
      key => this.propertyIsEnumerable(key) && !this.hasCustomField(key)
    );
    return !this.remoteState
      ? names
      : names.filter(key => !equal(this.remoteState[key], currentState[key]));
  }

  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON(): { [key: string]: any } {
    return { ...this, ...this._customFields };
  }

  protected isVisitedEntity<EntityT extends EntityBase>(
    entity: EntityT,
    visitedEntities: EntityBase[] = []
  ): boolean {
    return Array.isArray(entity)
      ? entity.some(multiLinkChild => visitedEntities.includes(multiLinkChild))
      : visitedEntities.includes(entity);
  }

  protected getCurrentStateForKey(
    key: string,
    visitedEntities: EntityBase[] = []
  ): any {
    if (isNavigationProperty(key, this._entityApi.schema)) {
      if (isNullish(this[key])) {
        return this[key];
      }
      return Array.isArray(this[key])
        ? this[key].map(linkedEntity => linkedEntity.asObject(visitedEntities))
        : this[key].asObject(visitedEntities);
    }
    return Array.isArray(this[key]) ? [...this[key]] : this[key];
  }

  /**
   * Validates whether a field name does not conflict with an original field name and thus can be defined as custom fields.
   * @param customFieldName - Field name to check.
   * @returns Boolean value that describes whether a field name can be defined as custom field.
   */
  protected isConflictingCustomField(customFieldName: string): boolean {
    return Object.values(this._entityApi.schema)
      .map((f: any) => f._fieldName)
      .includes(customFieldName);
  }

  /**
   * Creates an object containing all defined properties, navigation properties and custom fields in the entity.
   * @param visitedEntities - List of entities to check in case of circular dependencies.
   * @returns EntityBase as an object with all defined entity fields.
   */
  protected asObject(visitedEntities: EntityBase[] = []): Record<string, any> {
    visitedEntities.push(this);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return Object.keys(this)
      .filter(
        key =>
          this.propertyIsEnumerable(key) &&
          (!isNavigationProperty(key, this._entityApi.schema) ||
            !this.isVisitedEntity(this[key], visitedEntities))
      )
      .reduce(
        (accumulatedMap, key) => ({
          ...accumulatedMap,
          [key]: this.getCurrentStateForKey(key, visitedEntities)
        }),
        this.getCustomFields()
      );
  }
}
/**
 * Represents an object that is related to an entity.
 * Objects that have the same structure would be represented by the same type in TypeScript.
 * This interface allows to identify equal structures as different structures if they are related to different entities.
 */
export interface EntityIdentifiable<
  T extends EntityBase,
  DeSerializersT extends DeSerializers
> {
  /**
   * Dummy property whose type makes structurally identical entities distiguishable in TypeScript.
   */
  readonly _entity: T;
  /**
   * Dummy property to include also the deserializer type in the strucutre of the entity type.
   */
  readonly _deSerializers: DeSerializersT;
}

/**
 * @internal
 */
export function isSelectedProperty(
  json: any,
  field: Field<any> | Link<any, any, any>
): boolean {
  return json.hasOwnProperty(field._fieldName);
}

/**
 * @internal
 */
export function isExistentProperty(
  json: any,
  link: Link<any, any, any>
): boolean {
  return isSelectedProperty(json, link) && json[link._fieldName] !== null;
}

/**
 * @internal
 */
export function isExpandedProperty(
  json: any,
  link: Link<any, any, any>
): boolean {
  return (
    isExistentProperty(json, link) &&
    !json[link._fieldName].hasOwnProperty('__deferred')
  );
}

/**
 * Create an entity builder for an entity API.
 * @param entityApi - The entity API to build entities for.
 * @returns An entity builder instance for the given entity API.
 */
export function entityBuilder<
  EntityT extends EntityBase,
  DeSerializersT extends DeSerializers
>(
  entityApi: EntityApi<EntityT, DeSerializersT>
): EntityBuilderType<EntityT, DeSerializersT> {
  const builder = new EntityBuilder<EntityT, DeSerializersT>(entityApi);
  Object.values(entityApi.schema).forEach((field: any) => {
    const fieldName = `${camelCase(field._fieldName)}`;
    builder[fieldName] = function (value) {
      this._entity[fieldName] = value;
      return this;
    };
  });
  return builder as EntityBuilderType<EntityT, DeSerializersT>;
}
