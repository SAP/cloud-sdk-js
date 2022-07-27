/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import {
  TestNestedComplexType,
  TestNestedComplexTypeField
} from './TestNestedComplexType';
import { TestEnumType } from './TestEnumType';
import {
  CollectionField,
  ComplexTypeField,
  ConstructorOrField,
  DeSerializers,
  DefaultDeSerializers,
  DeserializedType,
  EdmTypeField,
  Entity,
  EnumField,
  FieldBuilder,
  FieldOptions,
  OrderableEdmTypeField,
  PropertyMetadata
} from '@sap-cloud-sdk/odata-v4';

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
   * Time Of Day Property.
   * @nullable
   */
  timeOfDayProperty?: DeserializedType<DeSerializersT, 'Edm.TimeOfDay'>;
  /**
   * Date Property.
   * @nullable
   */
  dateProperty?: DeserializedType<DeSerializersT, 'Edm.Date'>;
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
   * Geography Point Property.
   * @nullable
   */
  geographyPointProperty?: DeserializedType<DeSerializersT, 'Edm.Any'>;
  /**
   * Enum Property.
   * @nullable
   */
  enumProperty?: DeserializedType<DeSerializersT, 'Edm.Enum'>;
  /**
   * Something The Sdk Does Not Support.
   * @nullable
   */
  somethingTheSdkDoesNotSupport?: DeserializedType<DeSerializersT, 'Edm.Any'>;
  /**
   * Complex Type Property.
   * @nullable
   */
  complexTypeProperty?: DeserializedType<
    DeSerializersT,
    'API_TEST_SRV.A_TestNestedComplexType'
  >;
  /**
   * Collection String Property.
   * @nullable
   */
  collectionStringProperty?: DeserializedType<DeSerializersT, 'Edm.String'>;
  /**
   * Collection Enum Property.
   * @nullable
   */
  collectionEnumProperty?: DeserializedType<DeSerializersT, 'Edm.Enum'>;
  /**
   * Collection Complex Type Property.
   * @nullable
   */
  collectionComplexTypeProperty?: DeserializedType<
    DeSerializersT,
    'API_TEST_SRV.A_TestNestedComplexType'
  >;
  /**
   * Base String Property.
   * @nullable
   */
  baseStringProperty?: DeserializedType<DeSerializersT, 'Edm.String'>;
}

/**
 * TestComplexTypeField
 * @typeParam EntityT - Type of the entity the complex type field belongs to.
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
   * Representation of the {@link TestComplexType.stringProperty} property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  stringProperty: OrderableEdmTypeField<
    EntityT,
    DeSerializersT,
    'Edm.String',
    false,
    false
  > = this._fieldBuilder.buildEdmTypeField(
    'StringProperty',
    'Edm.String',
    false
  );
  /**
   * Representation of the {@link TestComplexType.booleanProperty} property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  booleanProperty: OrderableEdmTypeField<
    EntityT,
    DeSerializersT,
    'Edm.Boolean',
    true,
    false
  > = this._fieldBuilder.buildEdmTypeField(
    'BooleanProperty',
    'Edm.Boolean',
    true
  );
  /**
   * Representation of the {@link TestComplexType.guidProperty} property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  guidProperty: OrderableEdmTypeField<
    EntityT,
    DeSerializersT,
    'Edm.Guid',
    true,
    false
  > = this._fieldBuilder.buildEdmTypeField('GuidProperty', 'Edm.Guid', true);
  /**
   * Representation of the {@link TestComplexType.int16Property} property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  int16Property: OrderableEdmTypeField<
    EntityT,
    DeSerializersT,
    'Edm.Int16',
    true,
    false
  > = this._fieldBuilder.buildEdmTypeField('Int16Property', 'Edm.Int16', true);
  /**
   * Representation of the {@link TestComplexType.int32Property} property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  int32Property: OrderableEdmTypeField<
    EntityT,
    DeSerializersT,
    'Edm.Int32',
    true,
    false
  > = this._fieldBuilder.buildEdmTypeField('Int32Property', 'Edm.Int32', true);
  /**
   * Representation of the {@link TestComplexType.int64Property} property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  int64Property: OrderableEdmTypeField<
    EntityT,
    DeSerializersT,
    'Edm.Int64',
    true,
    false
  > = this._fieldBuilder.buildEdmTypeField('Int64Property', 'Edm.Int64', true);
  /**
   * Representation of the {@link TestComplexType.decimalProperty} property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  decimalProperty: OrderableEdmTypeField<
    EntityT,
    DeSerializersT,
    'Edm.Decimal',
    true,
    false
  > = this._fieldBuilder.buildEdmTypeField(
    'DecimalProperty',
    'Edm.Decimal',
    true
  );
  /**
   * Representation of the {@link TestComplexType.singleProperty} property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  singleProperty: OrderableEdmTypeField<
    EntityT,
    DeSerializersT,
    'Edm.Single',
    true,
    false
  > = this._fieldBuilder.buildEdmTypeField(
    'SingleProperty',
    'Edm.Single',
    true
  );
  /**
   * Representation of the {@link TestComplexType.doubleProperty} property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  doubleProperty: OrderableEdmTypeField<
    EntityT,
    DeSerializersT,
    'Edm.Double',
    true,
    false
  > = this._fieldBuilder.buildEdmTypeField(
    'DoubleProperty',
    'Edm.Double',
    true
  );
  /**
   * Representation of the {@link TestComplexType.floatProperty} property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  floatProperty: OrderableEdmTypeField<
    EntityT,
    DeSerializersT,
    'Edm.Float',
    true,
    false
  > = this._fieldBuilder.buildEdmTypeField('FloatProperty', 'Edm.Float', true);
  /**
   * Representation of the {@link TestComplexType.timeOfDayProperty} property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  timeOfDayProperty: OrderableEdmTypeField<
    EntityT,
    DeSerializersT,
    'Edm.TimeOfDay',
    true,
    false
  > = this._fieldBuilder.buildEdmTypeField(
    'TimeOfDayProperty',
    'Edm.TimeOfDay',
    true
  );
  /**
   * Representation of the {@link TestComplexType.dateProperty} property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  dateProperty: OrderableEdmTypeField<
    EntityT,
    DeSerializersT,
    'Edm.Date',
    true,
    false
  > = this._fieldBuilder.buildEdmTypeField('DateProperty', 'Edm.Date', true);
  /**
   * Representation of the {@link TestComplexType.dateTimeOffSetProperty} property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  dateTimeOffSetProperty: OrderableEdmTypeField<
    EntityT,
    DeSerializersT,
    'Edm.DateTimeOffset',
    true,
    false
  > = this._fieldBuilder.buildEdmTypeField(
    'DateTimeOffSetProperty',
    'Edm.DateTimeOffset',
    true
  );
  /**
   * Representation of the {@link TestComplexType.byteProperty} property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  byteProperty: OrderableEdmTypeField<
    EntityT,
    DeSerializersT,
    'Edm.Byte',
    true,
    false
  > = this._fieldBuilder.buildEdmTypeField('ByteProperty', 'Edm.Byte', true);
  /**
   * Representation of the {@link TestComplexType.sByteProperty} property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  sByteProperty: OrderableEdmTypeField<
    EntityT,
    DeSerializersT,
    'Edm.SByte',
    true,
    false
  > = this._fieldBuilder.buildEdmTypeField('SByteProperty', 'Edm.SByte', true);
  /**
   * Representation of the {@link TestComplexType.geographyPointProperty} property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  geographyPointProperty: EdmTypeField<
    EntityT,
    DeSerializersT,
    'Edm.Any',
    true,
    false
  > = this._fieldBuilder.buildEdmTypeField(
    'GeographyPointProperty',
    'Edm.Any',
    true
  );
  /**
   * Representation of the {@link TestComplexType.enumProperty} property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  enumProperty: EnumField<EntityT, DeSerializersT, TestEnumType, true, false> =
    this._fieldBuilder.buildEnumField('EnumProperty', TestEnumType, true);
  /**
   * Representation of the {@link TestComplexType.somethingTheSdkDoesNotSupport} property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  somethingTheSdkDoesNotSupport: EdmTypeField<
    EntityT,
    DeSerializersT,
    'Edm.Any',
    true,
    false
  > = this._fieldBuilder.buildEdmTypeField(
    'SomethingTheSDKDoesNotSupport',
    'Edm.Any',
    true
  );
  /**
   * Representation of the {@link TestComplexType.complexTypeProperty} property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  complexTypeProperty: TestNestedComplexTypeField<
    EntityT,
    DeSerializersT,
    true,
    false
  > = this._fieldBuilder.buildComplexTypeField(
    'ComplexTypeProperty',
    TestNestedComplexTypeField,
    true
  );
  /**
   * Representation of the {@link TestComplexType.collectionStringProperty} property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  collectionStringProperty: CollectionField<
    EntityT,
    DeSerializersT,
    'Edm.String',
    true,
    false
  > = this._fieldBuilder.buildCollectionField(
    'CollectionStringProperty',
    'Edm.String',
    true
  );
  /**
   * Representation of the {@link TestComplexType.collectionEnumProperty} property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  collectionEnumProperty: CollectionField<
    EntityT,
    DeSerializersT,
    typeof TestEnumType,
    true,
    false
  > = this._fieldBuilder.buildCollectionField(
    'CollectionEnumProperty',
    TestEnumType,
    true
  );
  /**
   * Representation of the {@link TestComplexType.collectionComplexTypeProperty} property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  collectionComplexTypeProperty: CollectionField<
    EntityT,
    DeSerializersT,
    TestNestedComplexType,
    true,
    false
  > = this._fieldBuilder.buildCollectionField(
    'CollectionComplexTypeProperty',
    TestNestedComplexType,
    true
  );
  /**
   * Representation of the {@link TestComplexType.baseStringProperty} property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  baseStringProperty: OrderableEdmTypeField<
    EntityT,
    DeSerializersT,
    'Edm.String',
    true,
    false
  > = this._fieldBuilder.buildEdmTypeField(
    'BaseStringProperty',
    'Edm.String',
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
      originalName: 'TimeOfDayProperty',
      name: 'timeOfDayProperty',
      type: 'Edm.TimeOfDay',
      isCollection: false
    },
    {
      originalName: 'DateProperty',
      name: 'dateProperty',
      type: 'Edm.Date',
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
      originalName: 'GeographyPointProperty',
      name: 'geographyPointProperty',
      type: 'Edm.Any',
      isCollection: false
    },
    {
      originalName: 'EnumProperty',
      name: 'enumProperty',
      type: 'Edm.Enum',
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
    },
    {
      originalName: 'CollectionStringProperty',
      name: 'collectionStringProperty',
      type: 'Edm.String',
      isCollection: true
    },
    {
      originalName: 'CollectionEnumProperty',
      name: 'collectionEnumProperty',
      type: 'Edm.Enum',
      isCollection: true
    },
    {
      originalName: 'CollectionComplexTypeProperty',
      name: 'collectionComplexTypeProperty',
      type: TestNestedComplexType,
      isCollection: true
    },
    {
      originalName: 'BaseStringProperty',
      name: 'baseStringProperty',
      type: 'Edm.String',
      isCollection: false
    }
  ];
}
