/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { MapType } from '@sap-cloud-sdk/util';
import { Constructable, ConstructableODataV4 } from './constructable';
import { EntityBuilder, EntityBuilderODataV4 } from './entity-builder';
import { CustomField, CustomFieldODataV4, Link, LinkODataV4, Selectable, SelectableODataV4 } from './selectable';
import { nonEnumerable } from './util';
import { toPropertyFormat } from './util/name-converter';

export type EntityBuilderType<
  EntityT extends Entity,
  EntityTypeForceMandatoryT
> = {
  [property in keyof EntityTypeForceMandatoryT]: (
    value: EntityTypeForceMandatoryT[property]
  ) => EntityBuilderType<EntityT, EntityTypeForceMandatoryT>;
} &
  EntityBuilder<EntityT, EntityTypeForceMandatoryT>;

export type EntityBuilderTypeODataV4<
  EntityT extends EntityODataV4,
  EntityTypeForceMandatoryT
  > = {
  [property in keyof EntityTypeForceMandatoryT]: (
    value: EntityTypeForceMandatoryT[property]
  ) => EntityBuilderTypeODataV4<EntityT, EntityTypeForceMandatoryT>;
} &
  EntityBuilderODataV4<EntityT, EntityTypeForceMandatoryT>;

// todo fix reference of Entity
export abstract class AbstractEntity {
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
   * A custom field can be added or updated using [[setCustomField]] method.
   */
  protected _customFields: MapType<any>;

  constructor() {
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
  getCustomFields(): MapType<any> {
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
   * Sets all retrieved custom fields in entity.
   *
   * @param customFields - Extracted custom fields from a retrieved entity
   * @returns A boolean value, that indicates the existence of the field in entity
   */
  initializeCustomFields(customFields: MapType<any>): this {
    Object.entries(customFields).forEach(cf => {
      this.setCustomField(cf[0], cf[1]);
    });
    return this;
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
   * @deprecated Since 1.12.0. Will be removed in version 2.0.
   * @param state - State to be set as remote state
   * @returns The entity itself, to facilitate method chaining
   */
  public setOrInitializeRemoteState(state?: MapType<any>): this {
    if (!this.remoteState) {
      nonEnumerable(this, 'remoteState');
      this.remoteState = {};
    }
    if (state) {
      Object.entries(state).forEach(([fieldName, value]) => {
        if (this[toPropertyFormat(fieldName)]) {
          this.remoteState[toPropertyFormat(fieldName)] = value;
        } else {
          // We store the custom field with its original name in the remote state
          this.remoteState[fieldName] = value;
        }
      });
    } else {
      this.remoteState = this.getCurrentMapKeys();
    }
    return this;
  }

  /**
   * Returns all updated custom field properties compared to the last known remote state.
   *
   * @returns A map containing all updated custom properties, with their new values
   */
  public getUpdatedCustomFields(): MapType<any> {
    if (this.remoteState === undefined) {
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
   * The returned properties does not include custom fields. Use [[getUpdatedCustomFields]], if updated custom fields are needed.
   *
   * @returns Entity with all properties that changed
   */
  public getUpdatedProperties(): this {
    const current = this.getCurrentMapKeys();
    if (this.remoteState === undefined) {
      return current;
    }
    const patch = {};
    Object.keys(current)
      .filter(key => this.propertyIsEnumerable(key))
      .filter(key => !this.hasCustomField(key))
      .forEach(key => {
        if (this.remoteState[key] !== current[key]) {
          patch[key] = current[key];
        }
      });
    return patch as this;
  }

  /**
   * Returns a map of all defined fields in entity to their current values.
   *
   * @returns Entity with all defined entity fields
   */
  protected getCurrentMapKeys(): this {
    return Object.keys(this)
      .filter(key => this.propertyIsEnumerable(key))
      .reduce(
        (accumulatedMap, key) => ({ ...accumulatedMap, [key]: this[key] }),
        this.getCustomFields()
      ) as this;
  }

  /**
   * Validates whether a field name does not conflict with an original field name and thus can be defined as custom fields.
   *
   * @param customFieldName - Field name to check
   * @returns Boolean value that describes whether a field name can be defined as custom field
   */
  protected isConflictingCustomField(customFieldName: string): boolean {
    return this[toPropertyFormat(customFieldName)] !== undefined;
  }
}

interface ODataV2Version{
  oDataV2Version: true;
}

interface ODataV4Version{
  oDataV4Version: true;
}

/**
 * Super class for all representations of OData entity types.
 */
export class Entity extends AbstractEntity implements ODataV2Version{
  oDataV2Version: true = true;

  protected static entityBuilder<
    EntityT extends Entity,
    EntityTypeForceMandatoryT
    >(
    entityConstructor: Constructable<EntityT, EntityTypeForceMandatoryT>
  ): EntityBuilderType<EntityT, EntityTypeForceMandatoryT> {
    const builder = new EntityBuilder<EntityT, EntityTypeForceMandatoryT>(
      entityConstructor
    );
    entityConstructor._allFields.forEach(field => {
      const fieldName = `${toPropertyFormat(field._fieldName)}`;
      builder[fieldName] = function (value) {
        this.entity[fieldName] = value;
        return this;
      };
    });
    return builder as EntityBuilderType<EntityT, EntityTypeForceMandatoryT>;
  }

  protected static customFieldSelector<EntityT extends Entity>(
    fieldName: string,
    entityConstructor: Constructable<EntityT>
  ): CustomField<EntityT> {
    return new CustomField(fieldName, entityConstructor);
  }
}

export class EntityODataV4 extends AbstractEntity implements ODataV4Version{
  oDataV4Version: true = true;

  protected static entityBuilder<
    EntityT extends EntityODataV4,
    EntityTypeForceMandatoryT
    >(
    entityConstructor: ConstructableODataV4<EntityT, EntityTypeForceMandatoryT>
  ): EntityBuilderTypeODataV4<EntityT, EntityTypeForceMandatoryT> {
    const builder = new EntityBuilderODataV4<EntityT, EntityTypeForceMandatoryT>(
      entityConstructor
    );
    entityConstructor._allFields.forEach(field => {
      const fieldName = `${toPropertyFormat(field._fieldName)}`;
      builder[fieldName] = function (value) {
        this.entity[fieldName] = value;
        return this;
      };
    });
    return builder as EntityBuilderTypeODataV4<EntityT, EntityTypeForceMandatoryT>;
  }

  protected static customFieldSelector<EntityT extends EntityODataV4>(
    fieldName: string,
    entityConstructor: ConstructableODataV4<EntityT>
  ): CustomFieldODataV4<EntityT> {
    return new CustomFieldODataV4(fieldName, entityConstructor);
  }
}

/**
 * @hidden
 */
export interface EntityIdentifiable<T extends Entity> {
  readonly _entityConstructor: Constructable<T>;
  readonly _entity: T;
}

export interface EntityIdentifiableODataV4<T extends EntityODataV4> {
  readonly _entityConstructor: ConstructableODataV4<T>;
  readonly _entity: T;
}

/* eslint-disable valid-jsdoc */

/**
 * @hidden
 */
export function isSelectedProperty<EntityT extends Entity>(
  json,
  selectable: Selectable<EntityT>
) {
  return json.hasOwnProperty(selectable._fieldName);
}

export function isSelectedPropertyODataV4<EntityT extends EntityODataV4>(
  json,
  selectable: SelectableODataV4<EntityT>
) {
  return json.hasOwnProperty(selectable._fieldName);
}

/**
 * @hidden
 */
export function isExistentProperty<
  EntityT extends Entity,
  LinkedEntityT extends Entity
>(json, link: Link<EntityT, LinkedEntityT>) {
  return isSelectedProperty(json, link) && json[link._fieldName] !== null;
}

export function isExistentPropertyODataV4<
  EntityT extends EntityODataV4,
  LinkedEntityT extends EntityODataV4
  >(json, link: LinkODataV4<EntityT, LinkedEntityT>) {
  return isSelectedPropertyODataV4(json, link) && json[link._fieldName] !== null;
}

/**
 * @hidden
 */
export function isExpandedProperty<
  EntityT extends Entity,
  LinkedEntityT extends Entity
>(json, link: Link<EntityT, LinkedEntityT>) {
  return (
    isExistentProperty(json, link) &&
    !json[link._fieldName].hasOwnProperty('__deferred')
  );
}

export function isExpandedPropertyODataV4<
  EntityT extends EntityODataV4,
  LinkedEntityT extends EntityODataV4
  >(json, link: LinkODataV4<EntityT, LinkedEntityT>) {
  return (
    isExistentPropertyODataV4(json, link) &&
    !json[link._fieldName].hasOwnProperty('__deferred')
  );
}
