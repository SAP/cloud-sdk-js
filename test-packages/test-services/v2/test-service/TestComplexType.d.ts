import { Moment } from 'moment';
import { BigNumber } from 'bignumber.js';
import {
  TestNestedComplexType,
  TestNestedComplexTypeField
} from './TestNestedComplexType';
import {
  ComplexTypeField,
  ConstructorOrField,
  EdmTypeField,
  EntityV2,
  FieldOptions,
  FieldType,
  OrderableEdmTypeField,
  PropertyMetadata,
  Time
} from '@sap-cloud-sdk/core';
/**
 * TestComplexType
 */
export interface TestComplexType {
  /**
   * String Property.
   */
  stringProperty: string;
  /**
   * Boolean Property.
   * @nullable
   */
  booleanProperty?: boolean;
  /**
   * Guid Property.
   * @nullable
   */
  guidProperty?: string;
  /**
   * Int 16 Property.
   * @nullable
   */
  int16Property?: number;
  /**
   * Int 32 Property.
   * @nullable
   */
  int32Property?: number;
  /**
   * Int 64 Property.
   * @nullable
   */
  int64Property?: BigNumber;
  /**
   * Decimal Property.
   * @nullable
   */
  decimalProperty?: BigNumber;
  /**
   * Single Property.
   * @nullable
   */
  singleProperty?: number;
  /**
   * Double Property.
   * @nullable
   */
  doubleProperty?: number;
  /**
   * Float Property.
   * @nullable
   */
  floatProperty?: number;
  /**
   * Time Property.
   * @nullable
   */
  timeProperty?: Time;
  /**
   * Date Time Property.
   * @nullable
   */
  dateTimeProperty?: Moment;
  /**
   * Date Time Off Set Property.
   * @nullable
   */
  dateTimeOffSetProperty?: Moment;
  /**
   * Byte Property.
   * @nullable
   */
  byteProperty?: number;
  /**
   * S Byte Property.
   * @nullable
   */
  sByteProperty?: number;
  /**
   * Something The Sdk Does Not Support.
   * @nullable
   */
  somethingTheSdkDoesNotSupport?: any;
  /**
   * Complex Type Property.
   * @nullable
   */
  complexTypeProperty?: TestNestedComplexType;
}
/**
 * @deprecated Since v1.6.0. Use [[TestComplexType.build]] instead.
 */
export declare function createTestComplexType_1(json: any): TestComplexType;
/**
 * TestComplexTypeField
 * @typeparam EntityT - Type of the entity the complex type field belongs to.
 */
export declare class TestComplexTypeField<
  EntityT extends EntityV2,
  NullableT extends boolean = false,
  SelectableT extends boolean = false
> extends ComplexTypeField<EntityT, TestComplexType, NullableT, SelectableT> {
  private _fieldBuilder;
  /**
   * Representation of the [[TestComplexType.stringProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  stringProperty: EdmTypeField<EntityT, 'Edm.String', false, false>;
  /**
   * Representation of the [[TestComplexType.booleanProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  booleanProperty: EdmTypeField<EntityT, 'Edm.Boolean', true, false>;
  /**
   * Representation of the [[TestComplexType.guidProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  guidProperty: EdmTypeField<EntityT, 'Edm.Guid', true, false>;
  /**
   * Representation of the [[TestComplexType.int16Property]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  int16Property: OrderableEdmTypeField<EntityT, 'Edm.Int16', true, false>;
  /**
   * Representation of the [[TestComplexType.int32Property]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  int32Property: OrderableEdmTypeField<EntityT, 'Edm.Int32', true, false>;
  /**
   * Representation of the [[TestComplexType.int64Property]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  int64Property: OrderableEdmTypeField<EntityT, 'Edm.Int64', true, false>;
  /**
   * Representation of the [[TestComplexType.decimalProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  decimalProperty: OrderableEdmTypeField<EntityT, 'Edm.Decimal', true, false>;
  /**
   * Representation of the [[TestComplexType.singleProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  singleProperty: OrderableEdmTypeField<EntityT, 'Edm.Single', true, false>;
  /**
   * Representation of the [[TestComplexType.doubleProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  doubleProperty: OrderableEdmTypeField<EntityT, 'Edm.Double', true, false>;
  /**
   * Representation of the [[TestComplexType.floatProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  floatProperty: OrderableEdmTypeField<EntityT, 'Edm.Float', true, false>;
  /**
   * Representation of the [[TestComplexType.timeProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  timeProperty: OrderableEdmTypeField<EntityT, 'Edm.Time', true, false>;
  /**
   * Representation of the [[TestComplexType.dateTimeProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  dateTimeProperty: OrderableEdmTypeField<EntityT, 'Edm.DateTime', true, false>;
  /**
   * Representation of the [[TestComplexType.dateTimeOffSetProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  dateTimeOffSetProperty: OrderableEdmTypeField<
    EntityT,
    'Edm.DateTimeOffset',
    true,
    false
  >;
  /**
   * Representation of the [[TestComplexType.byteProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  byteProperty: OrderableEdmTypeField<EntityT, 'Edm.Byte', true, false>;
  /**
   * Representation of the [[TestComplexType.sByteProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  sByteProperty: OrderableEdmTypeField<EntityT, 'Edm.SByte', true, false>;
  /**
   * Representation of the [[TestComplexType.somethingTheSdkDoesNotSupport]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  somethingTheSdkDoesNotSupport: EdmTypeField<EntityT, 'Edm.Any', true, false>;
  /**
   * Representation of the [[TestComplexType.complexTypeProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  complexTypeProperty: TestNestedComplexTypeField<EntityT, true, false>;
  /**
   * Creates an instance of TestComplexTypeField.
   *
   * @param fieldName - Actual name of the field as used in the OData request.
   * @param fieldOf - Either the parent entity constructor of the parent complex type this field belongs to.
   */
  constructor(
    fieldName: string,
    fieldOf: ConstructorOrField<EntityT>,
    fieldOptions?: FieldOptions<NullableT, SelectableT>
  );
}
export declare namespace TestComplexType {
  /**
   * Metadata information on all properties of the `TestComplexType` complex type.
   */
  const _propertyMetadata: PropertyMetadata<TestComplexType>[];
  /**
   * @deprecated Since v1.25.0. Use `deserializeComplexTypeV2` or `deserializeComplexTypeV4` of the `@sap-cloud-sdk/core` package instead.
   */
  function build(json: {
    [keys: string]: FieldType | TestNestedComplexType;
  }): TestComplexType;
}
//# sourceMappingURL=TestComplexType.d.ts.map
