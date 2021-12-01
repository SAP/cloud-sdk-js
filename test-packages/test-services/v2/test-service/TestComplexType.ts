/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */

import {
  TestNestedComplexType,
  TestNestedComplexTypeField
} from './TestNestedComplexType';
import {
  DefaultDeSerializers,
  DeSerializers,
  Entity
} from '@sap-cloud-sdk/odata-v2';
import {
  ComplexTypeField,
  ConstructorOrField,
  DeserializedType,
  EdmTypeField,
  FieldBuilder,
  FieldOptions,
  PropertyMetadata
} from '@sap-cloud-sdk/odata-common/internal';

/**
 * TestComplexType
 */
export interface TestComplexType<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> {
  /**
   * String Property.
   */
  stringProperty: DeserializedType<DeSerializersT, 'Edm.String'>;
  /**
   * Boolean Property.
   * @nullable
   */
  booleanProperty?: DeserializedType<DeSerializersT, 'Edm.Boolean'>;
  /**
   * Guid Property.
   * @nullable
   */
  guidProperty?: DeserializedType<DeSerializersT, 'Edm.Guid'>;
  /**
   * Int 16 Property.
   * @nullable
   */
  int16Property?: DeserializedType<DeSerializersT, 'Edm.Int16'>;
  /**
   * Int 32 Property.
   * @nullable
   */
  int32Property?: DeserializedType<DeSerializersT, 'Edm.Int32'>;
  /**
   * Int 64 Property.
   * @nullable
   */
  int64Property?: DeserializedType<DeSerializersT, 'Edm.Int64'>;
  /**
   * Decimal Property.
   * @nullable
   */
  decimalProperty?: DeserializedType<DeSerializersT, 'Edm.Decimal'>;
  /**
   * Single Property.
   * @nullable
   */
  singleProperty?: DeserializedType<DeSerializersT, 'Edm.Single'>;
  /**
   * Double Property.
   * @nullable
   */
  doubleProperty?: DeserializedType<DeSerializersT, 'Edm.Double'>;
  /**
   * Float Property.
   * @nullable
   */
  floatProperty?: DeserializedType<DeSerializersT, 'Edm.Float'>;
  /**
   * Time Property.
   * @nullable
   */
  timeProperty?: DeserializedType<DeSerializersT, 'Edm.Time'>;
  /**
   * Date Time Property.
   * @nullable
   */
  dateTimeProperty?: DeserializedType<DeSerializersT, 'Edm.DateTime'>;
  /**
   * Date Time Off Set Property.
   * @nullable
   */
  dateTimeOffSetProperty?: DeserializedType<
    DeSerializersT,
    'Edm.DateTimeOffset'
  >;
  /**
   * Byte Property.
   * @nullable
   */
  byteProperty?: DeserializedType<DeSerializersT, 'Edm.Byte'>;
  /**
   * S Byte Property.
   * @nullable
   */
  sByteProperty?: DeserializedType<DeSerializersT, 'Edm.SByte'>;
  /**
   * Something The Sdk Does Not Support.
   * @nullable
   */
  somethingTheSdkDoesNotSupport?: DeserializedType<DeSerializersT, 'Edm.Any'>;
  /**
   * Complex Type Property.
   * @nullable
   */
  complexTypeProperty?: TestNestedComplexType;
}

/**
 * TestComplexTypeField
 * @typeparam EntityT - Type of the entity the complex type field belongs to.
 */
export class TestComplexTypeField<
  EntityT extends Entity,
  DeSerializersT extends DeSerializers = DefaultDeSerializers,
  NullableT extends boolean = false,
  SelectableT extends boolean = false
> extends ComplexTypeField<
  EntityT,
  DeSerializersT,
  TestComplexType,
  NullableT,
  SelectableT
> {
  private _fieldBuilder: FieldBuilder<this, DeSerializersT> = new FieldBuilder(
    this,
    this.deSerializers
  );
  /**
   * Representation of the [[TestComplexType.stringProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  stringProperty: EdmTypeField<
    EntityT,
    'Edm.String',
    DeSerializersT,
    false,
    false
  > = this._fieldBuilder.buildEdmTypeField(
    'StringProperty',
    'Edm.String',
    false
  );
  /**
   * Representation of the [[TestComplexType.booleanProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  booleanProperty: EdmTypeField<
    EntityT,
    'Edm.Boolean',
    DeSerializersT,
    true,
    false
  > = this._fieldBuilder.buildEdmTypeField(
    'BooleanProperty',
    'Edm.Boolean',
    true
  );
  /**
   * Representation of the [[TestComplexType.guidProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  guidProperty: EdmTypeField<EntityT, 'Edm.Guid', DeSerializersT, true, false> =
    this._fieldBuilder.buildEdmTypeField('GuidProperty', 'Edm.Guid', true);
  /**
   * Representation of the [[TestComplexType.int16Property]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  int16Property: EdmTypeField<
    EntityT,
    'Edm.Int16',
    DeSerializersT,
    true,
    false
  > = this._fieldBuilder.buildEdmTypeField('Int16Property', 'Edm.Int16', true);
  /**
   * Representation of the [[TestComplexType.int32Property]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  int32Property: EdmTypeField<
    EntityT,
    'Edm.Int32',
    DeSerializersT,
    true,
    false
  > = this._fieldBuilder.buildEdmTypeField('Int32Property', 'Edm.Int32', true);
  /**
   * Representation of the [[TestComplexType.int64Property]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  int64Property: EdmTypeField<
    EntityT,
    'Edm.Int64',
    DeSerializersT,
    true,
    false
  > = this._fieldBuilder.buildEdmTypeField('Int64Property', 'Edm.Int64', true);
  /**
   * Representation of the [[TestComplexType.decimalProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  decimalProperty: EdmTypeField<
    EntityT,
    'Edm.Decimal',
    DeSerializersT,
    true,
    false
  > = this._fieldBuilder.buildEdmTypeField(
    'DecimalProperty',
    'Edm.Decimal',
    true
  );
  /**
   * Representation of the [[TestComplexType.singleProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  singleProperty: EdmTypeField<
    EntityT,
    'Edm.Single',
    DeSerializersT,
    true,
    false
  > = this._fieldBuilder.buildEdmTypeField(
    'SingleProperty',
    'Edm.Single',
    true
  );
  /**
   * Representation of the [[TestComplexType.doubleProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  doubleProperty: EdmTypeField<
    EntityT,
    'Edm.Double',
    DeSerializersT,
    true,
    false
  > = this._fieldBuilder.buildEdmTypeField(
    'DoubleProperty',
    'Edm.Double',
    true
  );
  /**
   * Representation of the [[TestComplexType.floatProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  floatProperty: EdmTypeField<
    EntityT,
    'Edm.Float',
    DeSerializersT,
    true,
    false
  > = this._fieldBuilder.buildEdmTypeField('FloatProperty', 'Edm.Float', true);
  /**
   * Representation of the [[TestComplexType.timeProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  timeProperty: EdmTypeField<EntityT, 'Edm.Time', DeSerializersT, true, false> =
    this._fieldBuilder.buildEdmTypeField('TimeProperty', 'Edm.Time', true);
  /**
   * Representation of the [[TestComplexType.dateTimeProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  dateTimeProperty: EdmTypeField<
    EntityT,
    'Edm.DateTime',
    DeSerializersT,
    true,
    false
  > = this._fieldBuilder.buildEdmTypeField(
    'DateTimeProperty',
    'Edm.DateTime',
    true
  );
  /**
   * Representation of the [[TestComplexType.dateTimeOffSetProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  dateTimeOffSetProperty: EdmTypeField<
    EntityT,
    'Edm.DateTimeOffset',
    DeSerializersT,
    true,
    false
  > = this._fieldBuilder.buildEdmTypeField(
    'DateTimeOffSetProperty',
    'Edm.DateTimeOffset',
    true
  );
  /**
   * Representation of the [[TestComplexType.byteProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  byteProperty: EdmTypeField<EntityT, 'Edm.Byte', DeSerializersT, true, false> =
    this._fieldBuilder.buildEdmTypeField('ByteProperty', 'Edm.Byte', true);
  /**
   * Representation of the [[TestComplexType.sByteProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  sByteProperty: EdmTypeField<
    EntityT,
    'Edm.SByte',
    DeSerializersT,
    true,
    false
  > = this._fieldBuilder.buildEdmTypeField('SByteProperty', 'Edm.SByte', true);
  /**
   * Representation of the [[TestComplexType.somethingTheSdkDoesNotSupport]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  somethingTheSdkDoesNotSupport: EdmTypeField<
    EntityT,
    'Edm.Any',
    DeSerializersT,
    true,
    false
  > = this._fieldBuilder.buildEdmTypeField(
    'SomethingTheSDKDoesNotSupport',
    'Edm.Any',
    true
  );
  /**
   * Representation of the [[TestComplexType.complexTypeProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  complexTypeProperty: TestNestedComplexTypeField<EntityT, true, false> =
    this._fieldBuilder.buildComplexTypeField(
      'ComplexTypeProperty',
      TestNestedComplexTypeField,
      true
    );

  /**
   * Creates an instance of TestComplexTypeField.
   * @param fieldName - Actual name of the field as used in the OData request.
   * @param fieldOf - Either the parent entity constructor of the parent complex type this field belongs to.
   */
  constructor(
    fieldName: string,
    fieldOf: ConstructorOrField<EntityT>,
    deSerializers: DeSerializersT,
    fieldOptions?: FieldOptions<NullableT, SelectableT>
  ) {
    super(fieldName, fieldOf, deSerializers, TestComplexType, fieldOptions);
  }
}

export namespace TestComplexType {
  /**
   * Metadata information on all properties of the `TestComplexType` complex type.
   */
  export const _propertyMetadata: PropertyMetadata<TestComplexType>[] = [
    {
      originalName: 'StringProperty',
      name: 'stringProperty',
      type: 'Edm.String',
      isCollection: false
    },
    {
      originalName: 'BooleanProperty',
      name: 'booleanProperty',
      type: 'Edm.Boolean',
      isCollection: false
    },
    {
      originalName: 'GuidProperty',
      name: 'guidProperty',
      type: 'Edm.Guid',
      isCollection: false
    },
    {
      originalName: 'Int16Property',
      name: 'int16Property',
      type: 'Edm.Int16',
      isCollection: false
    },
    {
      originalName: 'Int32Property',
      name: 'int32Property',
      type: 'Edm.Int32',
      isCollection: false
    },
    {
      originalName: 'Int64Property',
      name: 'int64Property',
      type: 'Edm.Int64',
      isCollection: false
    },
    {
      originalName: 'DecimalProperty',
      name: 'decimalProperty',
      type: 'Edm.Decimal',
      isCollection: false
    },
    {
      originalName: 'SingleProperty',
      name: 'singleProperty',
      type: 'Edm.Single',
      isCollection: false
    },
    {
      originalName: 'DoubleProperty',
      name: 'doubleProperty',
      type: 'Edm.Double',
      isCollection: false
    },
    {
      originalName: 'FloatProperty',
      name: 'floatProperty',
      type: 'Edm.Float',
      isCollection: false
    },
    {
      originalName: 'TimeProperty',
      name: 'timeProperty',
      type: 'Edm.Time',
      isCollection: false
    },
    {
      originalName: 'DateTimeProperty',
      name: 'dateTimeProperty',
      type: 'Edm.DateTime',
      isCollection: false
    },
    {
      originalName: 'DateTimeOffSetProperty',
      name: 'dateTimeOffSetProperty',
      type: 'Edm.DateTimeOffset',
      isCollection: false
    },
    {
      originalName: 'ByteProperty',
      name: 'byteProperty',
      type: 'Edm.Byte',
      isCollection: false
    },
    {
      originalName: 'SByteProperty',
      name: 'sByteProperty',
      type: 'Edm.SByte',
      isCollection: false
    },
    {
      originalName: 'SomethingTheSDKDoesNotSupport',
      name: 'somethingTheSdkDoesNotSupport',
      type: 'Edm.Any',
      isCollection: false
    },
    {
      originalName: 'ComplexTypeProperty',
      name: 'complexTypeProperty',
      type: TestNestedComplexType,
      isCollection: false
    }
  ];
}
