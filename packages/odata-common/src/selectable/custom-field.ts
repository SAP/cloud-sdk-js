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
  DeSerializersT extends DeSerializers,
  NullableT extends boolean = false
> extends Field<EntityT, NullableT> {
  protected fieldBuilder: FieldBuilder<Constructable<EntityT>, DeSerializersT>;
  constructor(
    fieldName: string,
    entityConstructor: Constructable<EntityT>,
    private deSerializers: DeSerializersT,
    isNullable: NullableT = false as NullableT
  ) {
    super(fieldName, entityConstructor, { isNullable });
    this.fieldBuilder = new FieldBuilder(entityConstructor, this.deSerializers);
  }

  edmString(): EdmTypeField<
    EntityT,
    DeSerializersT,
    'Edm.String',
    NullableT,
    true
  > {
    return this.fieldBuilder.buildEdmTypeField(
      this._fieldName,
      'Edm.String',
      this._fieldOptions.isNullable
    );
  }

  edmBoolean(): EdmTypeField<
    EntityT,
    DeSerializersT,
    'Edm.Boolean',
    NullableT,
    true
  > {
    return this.fieldBuilder.buildEdmTypeField(
      this._fieldName,
      'Edm.Boolean',
      this._fieldOptions.isNullable
    );
  }

  edmGuid(): EdmTypeField<
    EntityT,
    DeSerializersT,
    'Edm.Guid',
    NullableT,
    true
  > {
    return this.fieldBuilder.buildEdmTypeField(
      this._fieldName,
      'Edm.Guid',
      this._fieldOptions.isNullable
    );
  }

  edmDecimal(): OrderableEdmTypeField<
    EntityT,
    DeSerializersT,
    'Edm.Decimal',
    NullableT,
    true
  > {
    return this.fieldBuilder.buildEdmTypeField(
      this._fieldName,
      'Edm.Decimal',
      this._fieldOptions.isNullable
    );
  }

  edmInt16(): OrderableEdmTypeField<
    EntityT,
    DeSerializersT,
    'Edm.Int16',
    NullableT,
    true
  > {
    return this.fieldBuilder.buildEdmTypeField(
      this._fieldName,
      'Edm.Int16',
      this._fieldOptions.isNullable
    );
  }

  edmInt32(): OrderableEdmTypeField<
    EntityT,
    DeSerializersT,
    'Edm.Int32',
    NullableT,
    true
  > {
    return this.fieldBuilder.buildEdmTypeField(
      this._fieldName,
      'Edm.Int32',
      this._fieldOptions.isNullable
    );
  }

  edmInt64(): OrderableEdmTypeField<
    EntityT,
    DeSerializersT,
    'Edm.Int64',
    NullableT,
    true
  > {
    return this.fieldBuilder.buildEdmTypeField(
      this._fieldName,
      'Edm.Int64',
      this._fieldOptions.isNullable
    );
  }

  edmSingle(): OrderableEdmTypeField<
    EntityT,
    DeSerializersT,
    'Edm.Single',
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
    DeSerializersT,
    'Edm.Double',
    NullableT,
    true
  > {
    return this.fieldBuilder.buildEdmTypeField(
      this._fieldName,
      'Edm.Double',
      this._fieldOptions.isNullable
    );
  }

  edmByte(): OrderableEdmTypeField<
    EntityT,
    DeSerializersT,
    'Edm.Byte',
    NullableT,
    true
  > {
    return this.fieldBuilder.buildEdmTypeField(
      this._fieldName,
      'Edm.Byte',
      this._fieldOptions.isNullable
    );
  }

  edmSByte(): OrderableEdmTypeField<
    EntityT,
    DeSerializersT,
    'Edm.SByte',
    NullableT,
    true
  > {
    return this.fieldBuilder.buildEdmTypeField(
      this._fieldName,
      'Edm.SByte',
      this._fieldOptions.isNullable
    );
  }

  edmDateTimeOffset(): OrderableEdmTypeField<
    EntityT,
    DeSerializersT,
    'Edm.DateTimeOffset',
    NullableT,
    true
  > {
    return this.fieldBuilder.buildEdmTypeField(
      this._fieldName,
      'Edm.DateTimeOffset',
      this._fieldOptions.isNullable
    );
  }

  edmBinary(): EdmTypeField<
    EntityT,
    DeSerializersT,
    'Edm.Binary',
    NullableT,
    true
  > {
    return this.fieldBuilder.buildEdmTypeField(
      this._fieldName,
      'Edm.Binary',
      this._fieldOptions.isNullable
    );
  }
}
