/* eslint-disable max-classes-per-file */

import { camelCase, equal, isNullish } from '@sap-cloud-sdk/util';
import { EntityBuilder } from './entity-builder';
import { Link, Field, Selectable, CustomField } from './selectable';
import { RequestBuilder } from './request-builder';
import { isNavigationProperty, nonEnumerable } from './properties-util';

export type ODataVersionOf<T extends Entity> = T['_oDataVersion'];

/**
 * @hidden
 */
export interface Constructable<EntityT extends Entity, EntityTypeT = unknown> {
  _serviceName: string;
  _entityName: string;
  _defaultServicePath: string;
  _allFields: (
    | Selectable<EntityT>
    | Field<EntityT, boolean, boolean>
    | Link<EntityT>
  )[]; // Selectable only here for backwards TODO: Remove in v2.0
  _keyFields: (Selectable<EntityT> | Field<EntityT, boolean, boolean>)[]; // Selectable only here for backwards TODO: Remove in v2.0
  _keys: {
    [keys: string]: Selectable<EntityT> | Field<EntityT, boolean, boolean>;
  }; // Selectable only here for backwards TODO: Remove in v2.0
  new (...args: any[]): EntityT;
  requestBuilder(): RequestBuilder<EntityT>;
  builder(): EntityBuilderType<EntityT, EntityTypeT>;
  customField(
    fieldName: string,
    isNullable?: boolean
  ): CustomField<EntityT, boolean>;
}

export type EntityBuilderType<EntityT extends Entity, EntityTypeT> = {
  [property in keyof Required<EntityTypeT>]: (
    value: EntityTypeT[property]
  ) => EntityBuilderType<EntityT, EntityTypeT>;
} &
  EntityBuilder<EntityT, EntityTypeT>;

/**
 * Super class for all representations of OData entity types.
 */
export abstract class Entity {
  static _serviceName: string;
  static _entityName: string;
  static _defaultServicePath: string;

  protected static entityBuilder<EntityT extends Entity, EntityTypeT>(
    entityConstructor: Constructable<EntityT, EntityTypeT>
  ): EntityBuilderType<EntityT, EntityTypeT> {
    const builder = new EntityBuilder<EntityT, EntityTypeT>(entityConstructor);
    entityConstructor._allFields.forEach(field => {
      const fieldName = `${camelCase(field._fieldName)}`;
      builder[fieldName] = function (value) {
        this.entity[fieldName] = value;
        return this;
      };
    });
    return builder as EntityBuilderType<EntityT, EntityTypeT>;
  }

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
   * A custom field can be added or updated using [[setCustomField]] method.
   */
  protected _customFields: Record<string, any>;

  abstract readonly _oDataVersion: any;

  constructor() {
    nonEnumerable(this, '_oDataVersion');
    nonEnumerable(this, '_customFields');
    this._customFields = {};
  }

  /**
   * ETag version identifier accessor.
   *
   * @returns The ETag version identifier of the retrieved entity, returns undefined if not retrieved
   */
  get versionIdentifier(): string {
    return this._versionIdentifier;
  }

  /**
   * Returns a map that contains all entity custom fields.
   *
   * @returns A map of all defined custom fields in the entity
   */
  getCustomFields(): Record<string, any> {
    return this._customFields;
  }

  /**
   * Custom field value getter.
   *
   * @param fieldName - The name of the custom field
   * @returns The value of the corresponding custom field
   */
  getCustomField(fieldName: string): any {
    return this._customFields[fieldName];
  }

  /**
   * Sets a new custom field in the entity or updates it.
   * Throws an error, if the provided custom field name is already defined by an original field in entity.
   *
   * @param fieldName - The name of the custom field to update
   * @param value - The value of the field
   * @returns The entity itself, to facilitate method chaining
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
   *
   * @param fieldName - The name of the custom field to update
   * @returns A boolean value, that indicates whether a custom field is defined in entity
   */
  hasCustomField(fieldName: string): boolean {
    return this._customFields[fieldName] !== undefined;
  }

  /**
   * Sets custom fields on an entity.
   * @param customFields - Custom fields to set on the entity.
   * @returns The entity itself, to facilitate method chaining
   */
  setCustomFields(customFields: Record<string, any>): this {
    Object.entries(customFields).forEach(([key, value]) => {
      this.setCustomField(key, value);
    });
    return this;
  }

  /**
   * @deprecated Since v1.34.1. Use [[setCustomFields]] instead.
   * Sets all retrieved custom fields in entity.
   *
   * @param customFields - Extracted custom fields from a retrieved entity
   * @returns The entity itself, to facilitate method chaining
   */
  initializeCustomFields(customFields: Record<string, any>): this {
    return this.setCustomFields(customFields);
  }

  /**
   * Set the ETag version identifier of the retrieved entity.
   *
   * @param etag - The returned ETag version of the entity
   * @returns The entity itself, to facilitate method chaining
   */
  public setVersionIdentifier(etag: string | undefined): this {
    if (etag && typeof etag === 'string') {
      nonEnumerable(this, '_versionIdentifier');
      this._versionIdentifier = etag;
    }
    return this;
  }

  /**
   * Initializes or sets the remoteState of the entity.
   * This function is called on all read, create and update requests.
   * This function should be called after [[initializeCustomFields]], if custom fields are defined.
   *
   * @deprecated Since 1.12.0. Will be hidden in version 2.0.
   * @param state - State to be set as remote state.
   * @returns The entity itself, to facilitate method chaining
   */
  public setOrInitializeRemoteState(state?: Record<string, any>): this {
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
   *
   * @returns An object containing all updated custom properties, with their new values.
   */
  public getUpdatedCustomFields(): Record<string, any> {
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
   * Use [[getUpdatedCustomFields]], if you need custom fields.
   * @returns Entity with all properties that changed
   */
  public getUpdatedProperties(): Record<string, any> {
    const current = this.asObject();
    return this.getUpdatedPropertyNames().reduce(
      (patch, key) => ({ ...patch, [key]: current[key] }),
      {}
    );
  }

  /**
   * Returns all changed property names compared to the last known remote state.
   * The returned properties names do not include custom fields.
   * Use [[getUpdatedCustomFields]], if you need custom fields.
   * @returns Entity with all properties that changed
   */
  public getUpdatedPropertyNames(): string[] {
    const currentState = this.asObject();
    const names = Object.keys(currentState).filter(
      key => this.propertyIsEnumerable(key) && !this.hasCustomField(key)
    );
    return !this.remoteState
      ? names
      : names.filter(key => !equal(this.remoteState[key], currentState[key]));
  }

  /**
   * @deprecated Since v1.34.1. Use [[asObject]] instead.
   * Returns a map of all defined fields in entity to their current values.
   * @param visitedEntities List of entities to check in case of circular dependencies.
   * @returns Entity with all defined entity fields
   */
  protected getCurrentMapKeys(visitedEntities: Entity[] = []): any {
    return this.asObject(visitedEntities) as this;
  }

  protected isVisitedEntity<EntityT extends Entity>(
    entity: EntityT,
    visitedEntities: Entity[] = []
  ): boolean {
    return Array.isArray(entity)
      ? entity.some(multiLinkChild => visitedEntities.includes(multiLinkChild))
      : visitedEntities.includes(entity);
  }

  protected getCurrentStateForKey(
    key: string,
    visitedEntities: Entity[] = []
  ): any {
    if (isNavigationProperty(key, this.constructor)) {
      if (isNullish(this[key])) {
        return this[key];
      }
      return Array.isArray(this[key])
        ? this[key].map(linkedEntity =>
            linkedEntity.getCurrentMapKeys(visitedEntities)
          )
        : this[key].getCurrentMapKeys(visitedEntities);
    }
    return Array.isArray(this[key]) ? [...this[key]] : this[key];
  }

  /**
   * Validates whether a field name does not conflict with an original field name and thus can be defined as custom fields.
   *
   * @param customFieldName - Field name to check
   * @returns Boolean value that describes whether a field name can be defined as custom field
   */
  protected isConflictingCustomField(customFieldName: string): boolean {
    return (this.constructor as Constructable<this>)._allFields
      .map(f => f._fieldName)
      .includes(customFieldName);
  }

  /**
   * Creates an object containing all defined properties, navigation properties and custom fields in the entity.
   * @param visitedEntities List of entities to check in case of circular dependencies.
   * @returns Entity as an object with all defined entity fields
   */
  protected asObject(visitedEntities: Entity[] = []): Record<string, any> {
    visitedEntities.push(this);
    return Object.keys(this)
      .filter(
        key =>
          this.propertyIsEnumerable(key) &&
          (!isNavigationProperty(key, this.constructor) ||
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
 * @hidden
 */
export interface EntityIdentifiable<T extends Entity> {
  readonly _entityConstructor: Constructable<T>;
  readonly _entity: T;
}

/* eslint-disable valid-jsdoc */

/**
 * @hidden
 */
export function isSelectedProperty<EntityT extends Entity>(
  json: any,
  field: Field<EntityT> | Link<EntityT>
): boolean {
  return json.hasOwnProperty(field._fieldName);
}

/**
 * @hidden
 */
export function isExistentProperty<
  EntityT extends Entity,
  LinkedEntityT extends Entity
>(json: any, link: Link<EntityT, LinkedEntityT>): boolean {
  return isSelectedProperty(json, link) && json[link._fieldName] !== null;
}

/**
 * @hidden
 */
export function isExpandedProperty<
  EntityT extends Entity,
  LinkedEntityT extends Entity
>(json: any, link: Link<EntityT, LinkedEntityT>): boolean {
  return (
    isExistentProperty(json, link) &&
    !json[link._fieldName].hasOwnProperty('__deferred')
  );
}

export { Entity as EntityBase };
