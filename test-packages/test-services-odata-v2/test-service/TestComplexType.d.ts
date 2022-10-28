import { TestNestedComplexTypeField } from './TestNestedComplexType';
import {
  ComplexTypeField,
  ConstructorOrField,
  DeSerializers,
  DefaultDeSerializers,
  DeserializedType,
  EdmTypeField,
  Entity,
  FieldOptions,
  OrderableEdmTypeField,
  PropertyMetadata
} from '@sap-cloud-sdk/odata-v2';
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
  complexTypeProperty?: DeserializedType<
    DeSerializersT,
    'API_TEST_SRV.A_TestNestedComplexType'
  >;
}
/**
 * TestComplexTypeField
 * @typeParam EntityT - Type of the entity the complex type field belongs to.
 */
export declare class TestComplexTypeField<
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
  private _fieldBuilder;
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
  >;
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
  >;
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
  >;
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
  >;
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
  >;
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
  >;
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
  >;
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
  >;
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
  >;
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
  >;
  /**
   * Representation of the {@link TestComplexType.timeProperty} property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  timeProperty: OrderableEdmTypeField<
    EntityT,
    DeSerializersT,
    'Edm.Time',
    true,
    false
  >;
  /**
   * Representation of the {@link TestComplexType.dateTimeProperty} property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  dateTimeProperty: OrderableEdmTypeField<
    EntityT,
    DeSerializersT,
    'Edm.DateTime',
    true,
    false
  >;
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
  >;
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
  >;
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
  >;
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
  >;
  /**
   * Representation of the {@link TestComplexType.complexTypeProperty} property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  complexTypeProperty: TestNestedComplexTypeField<
    EntityT,
    DeSerializersT,
    true,
    false
  >;
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
  );
}
export declare namespace TestComplexType {
  /**
   * Metadata information on all properties of the `TestComplexType` complex type.
   */
  const _propertyMetadata: PropertyMetadata<TestComplexType>[];
}
//# sourceMappingURL=TestComplexType.d.ts.map
