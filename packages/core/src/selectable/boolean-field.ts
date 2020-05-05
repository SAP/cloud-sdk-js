/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
/* eslint-disable max-classes-per-file */

import { Constructable } from '../constructable';
import { EdmType } from '../edm-types';
import { Entity } from '../entity';
import { ODataV2 } from '../odata-v2';
import {
  ComplexTypeField,
  ConstructorOrField,
  getEdmType,
  getEntityConstructor
} from './complex-type-field';
import { EdmTypeField, SelectableEdmTypeField } from './edm-type-field';

/**
 * Represents a property with a boolean value.
 *
 * @typeparam EntityT - Type of the entity the field belongs to
 */
export class BooleanFieldBase<
  EntityT extends Entity<Version>,
  Version
> extends EdmTypeField<EntityT, boolean, Version> {}

/**
 * Represents a selectable property with a boolean value.
 *
 * @typeparam EntityT - Type of the entity the field belongs to
 */
export class BooleanField<EntityT extends Entity<Version>, Version = ODataV2>
  extends BooleanFieldBase<EntityT, Version>
  implements SelectableEdmTypeField {
  readonly selectable: true;
}

/**
 * Represents a complex type property with a boolean value.
 *
 * @typeparam EntityT - Type of the entity the field belongs to
 */
export class ComplexTypeBooleanPropertyField<
  EntityT extends Entity<Version>,
  Version = ODataV2
> extends BooleanFieldBase<EntityT, Version> {
  /**
   * The constructor of the entity or the complex type this field belongs to
   */
  readonly fieldOf: ConstructorOrField<EntityT, Version>;

  /**
   * Creates an instance of ComplexTypeBigNumberPropertyField.
   *
   * @param fieldName - Actual name of the field used in the OData request
   * @param fieldOf - The constructor of the entity or the complex type this field belongs to
   * @param edmType - Type of the field according to the metadata description
   */
  constructor(
    fieldName: string,
    fieldOf: ConstructorOrField<EntityT, Version>,
    edmType: EdmType
  );

  /**
   * @deprecated since verision 1.19.0
   *
   * Creates an instance of ComplexTypeBigNumberPropertyField.
   *
   * @param fieldName - Actual name of the field used in the OData request
   * @param entityConstructor - Constructor type of the entity the field belongs to
   * @param parentTypeName - Name of the parent complex type
   * @param edmType - Type of the field according to the metadata description
   */
  constructor(
    fieldName: string,
    entityConstructor: Constructable<EntityT, {}, Version>,
    parentTypeName: string,
    edmType: EdmType
  );

  /*
   * Union of the two possible constructors.
   */
  constructor(
    fieldName: string,
    fieldOf: ConstructorOrField<EntityT, Version>,
    arg3: string | EdmType,
    arg4?: EdmType
  ) {
    super(fieldName, getEntityConstructor(fieldOf), getEdmType(arg3, arg4));
    this.fieldOf = fieldOf;
  }

  /**
   * Path to the field to be used in filter and order by queries. Combines the parent complex type name with the field name.
   *
   * @returns Path to the field to be used in filter and order by queries.
   */
  fieldPath(): string {
    return this.fieldOf instanceof ComplexTypeField
      ? `${this.fieldOf.fieldPath()}/${this._fieldName}`
      : this._fieldName;
  }
}
