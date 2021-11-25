import { DeSerializers } from '../de-serializers';
import { EntityBase, Constructable } from '../entity-base';
import { EdmTypeField } from './edm-type-field';
import { Field } from './field';
import { FieldBuilder } from './field-builder';
import { OrderableEdmTypeField } from './orderable-edm-type-field';

/**
 * @internal
 */
export class CustomField<
  EntityT extends EntityBase,
  T extends DeSerializers,
  NullableT extends boolean = false
> extends Field<EntityT, NullableT> {
  protected fieldBuilder: FieldBuilder<Constructable<EntityT>, T>;
  constructor(
    fieldName: string,
    entityConstructor: Constructable<EntityT>,
    private deSerializers: T,
    isNullable: NullableT = false as NullableT
  ) {
    super(fieldName, entityConstructor, { isNullable });
    this.fieldBuilder = new FieldBuilder(entityConstructor, this.deSerializers);
  }

  edmString(): EdmTypeField<EntityT, 'Edm.String', T, NullableT, true> {
    return this.fieldBuilder.buildEdmTypeField(
      this._fieldName,
      'Edm.String',
      this._fieldOptions.isNullable
    );
  }

  edmBoolean(): EdmTypeField<EntityT, 'Edm.Boolean', T, NullableT, true> {
    return this.fieldBuilder.buildEdmTypeField(
      this._fieldName,
      'Edm.Boolean',
      this._fieldOptions.isNullable
    );
  }

  edmGuid(): EdmTypeField<EntityT, 'Edm.Guid', T, NullableT, true> {
    return this.fieldBuilder.buildEdmTypeField(
      this._fieldName,
      'Edm.Guid',
      this._fieldOptions.isNullable
    );
  }

  edmDecimal(): EdmTypeField<EntityT, 'Edm.Decimal', T, NullableT, true> {
    return this.fieldBuilder.buildEdmTypeField(
      this._fieldName,
      'Edm.Decimal',
      this._fieldOptions.isNullable
    );
  }

  edmInt16(): OrderableEdmTypeField<EntityT, 'Edm.Int16', T, NullableT, true> {
    return this.fieldBuilder.buildEdmTypeField(
      this._fieldName,
      'Edm.Int16',
      this._fieldOptions.isNullable
    );
  }

  edmInt32(): OrderableEdmTypeField<EntityT, 'Edm.Int32', T, NullableT, true> {
    return this.fieldBuilder.buildEdmTypeField(
      this._fieldName,
      'Edm.Int32',
      this._fieldOptions.isNullable
    );
  }

  edmInt64(): OrderableEdmTypeField<EntityT, 'Edm.Int64', T, NullableT, true> {
    return this.fieldBuilder.buildEdmTypeField(
      this._fieldName,
      'Edm.Int64',
      this._fieldOptions.isNullable
    );
  }

  edmSingle(): OrderableEdmTypeField<
    EntityT,
    'Edm.Single',
    T,
    NullableT,
    true
  > {
    return this.fieldBuilder.buildEdmTypeField(
      this._fieldName,
      'Edm.Single',
      this._fieldOptions.isNullable
    );
  }

  edmDouble(): OrderableEdmTypeField<
    EntityT,
    'Edm.Double',
    T,
    NullableT,
    true
  > {
    return this.fieldBuilder.buildEdmTypeField(
      this._fieldName,
      'Edm.Double',
      this._fieldOptions.isNullable
    );
  }

  edmByte(): OrderableEdmTypeField<EntityT, 'Edm.Byte', T, NullableT, true> {
    return this.fieldBuilder.buildEdmTypeField(
      this._fieldName,
      'Edm.Byte',
      this._fieldOptions.isNullable
    );
  }

  edmSByte(): OrderableEdmTypeField<EntityT, 'Edm.SByte', T, NullableT, true> {
    return this.fieldBuilder.buildEdmTypeField(
      this._fieldName,
      'Edm.SByte',
      this._fieldOptions.isNullable
    );
  }

  edmDateTimeOffset(): OrderableEdmTypeField<
    EntityT,
    'Edm.DateTimeOffset',
    T,
    NullableT,
    true
  > {
    return this.fieldBuilder.buildEdmTypeField(
      this._fieldName,
      'Edm.DateTimeOffset',
      this._fieldOptions.isNullable
    );
  }

  edmBinary(): EdmTypeField<EntityT, 'Edm.Binary', T, NullableT, true> {
    return this.fieldBuilder.buildEdmTypeField(
      this._fieldName,
      'Edm.Binary',
      this._fieldOptions.isNullable
    );
  }
}
