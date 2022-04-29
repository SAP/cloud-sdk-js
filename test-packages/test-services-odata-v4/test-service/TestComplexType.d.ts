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
 * @typeparam EntityT - Type of the entity the complex type field belongs to.
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
   * Representation of the [[TestComplexType.stringProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  stringProperty: EdmTypeField<
    EntityT,
    DeSerializersT,
    'Edm.String',
    false,
    false
  >;
  /**
   * Representation of the [[TestComplexType.booleanProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  booleanProperty: EdmTypeField<
    EntityT,
    DeSerializersT,
    'Edm.Boolean',
    true,
    false
  >;
  /**
   * Representation of the [[TestComplexType.guidProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  guidProperty: EdmTypeField<EntityT, DeSerializersT, 'Edm.Guid', true, false>;
  /**
   * Representation of the [[TestComplexType.int16Property]] property for query construction.
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
   * Representation of the [[TestComplexType.int32Property]] property for query construction.
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
   * Representation of the [[TestComplexType.int64Property]] property for query construction.
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
   * Representation of the [[TestComplexType.decimalProperty]] property for query construction.
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
   * Representation of the [[TestComplexType.singleProperty]] property for query construction.
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
   * Representation of the [[TestComplexType.doubleProperty]] property for query construction.
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
   * Representation of the [[TestComplexType.floatProperty]] property for query construction.
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
   * Representation of the [[TestComplexType.timeOfDayProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  timeOfDayProperty: OrderableEdmTypeField<
    EntityT,
    DeSerializersT,
    'Edm.TimeOfDay',
    true,
    false
  >;
  /**
   * Representation of the [[TestComplexType.dateProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  dateProperty: OrderableEdmTypeField<
    EntityT,
    DeSerializersT,
    'Edm.Date',
    true,
    false
  >;
  /**
   * Representation of the [[TestComplexType.dateTimeOffSetProperty]] property for query construction.
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
   * Representation of the [[TestComplexType.byteProperty]] property for query construction.
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
   * Representation of the [[TestComplexType.sByteProperty]] property for query construction.
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
   * Representation of the [[TestComplexType.geographyPointProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  geographyPointProperty: EdmTypeField<
    EntityT,
    DeSerializersT,
    'Edm.Any',
    true,
    false
  >;
  /**
   * Representation of the [[TestComplexType.enumProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  enumProperty: EnumField<EntityT, DeSerializersT, TestEnumType, true, false>;
  /**
   * Representation of the [[TestComplexType.somethingTheSdkDoesNotSupport]] property for query construction.
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
   * Representation of the [[TestComplexType.complexTypeProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  complexTypeProperty: TestNestedComplexTypeField<
    EntityT,
    DeSerializersT,
    true,
    false
  >;
  /**
   * Representation of the [[TestComplexType.collectionStringProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  collectionStringProperty: CollectionField<
    EntityT,
    DeSerializersT,
    'Edm.String',
    true,
    false
  >;
  /**
   * Representation of the [[TestComplexType.collectionEnumProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  collectionEnumProperty: CollectionField<
    EntityT,
    DeSerializersT,
    typeof TestEnumType,
    true,
    false
  >;
  /**
   * Representation of the [[TestComplexType.collectionComplexTypeProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  collectionComplexTypeProperty: CollectionField<
    EntityT,
    DeSerializersT,
    TestNestedComplexType,
    true,
    false
  >;
  /**
   * Representation of the [[TestComplexType.baseStringProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  baseStringProperty: EdmTypeField<
    EntityT,
    DeSerializersT,
    'Edm.String',
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
