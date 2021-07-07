/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { Moment } from 'moment';
import { BigNumber } from 'bignumber.js';
import {
  TestNestedComplexType,
  TestNestedComplexTypeField
} from './TestNestedComplexType';
import { TestEnumType } from './TestEnumType';
import {
  CollectionField,
  ComplexTypeField,
  ConstructorOrField,
  EdmTypeField,
  EntityV4,
  FieldType,
  OrderableEdmField,
  PropertyMetadata,
  Time,
  deserializeComplexTypeV4
} from '../../../../../src';

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
   * Time Of Day Property.
   * @nullable
   */
  timeOfDayProperty?: Time;
  /**
   * Date Property.
   * @nullable
   */
  dateProperty?: Moment;
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
   * Geography Point Property.
   * @nullable
   */
  geographyPointProperty?: any;
  /**
   * Enum Property.
   * @nullable
   */
  enumProperty?: TestEnumType;
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
  /**
   * Collection String Property.
   * @nullable
   */
  collectionStringProperty?: string[];
  /**
   * Collection Complex Type Property.
   * @nullable
   */
  collectionComplexTypeProperty?: TestNestedComplexType[];
  /**
   * Base String Property.
   * @nullable
   */
  baseStringProperty?: string;
}

/**
 * @deprecated Since v1.6.0. Use [[TestComplexType.build]] instead.
 */
export function createTestComplexType(json: any): TestComplexType {
  return TestComplexType.build(json);
}

/**
 * TestComplexTypeField
 * @typeparam EntityT - Type of the entity the complex type field belongs to.
 */
export class TestComplexTypeField<
  EntityT extends EntityV4,
  NullableT extends boolean = false
> extends ComplexTypeField<EntityT, TestComplexType> {
  /**
   * Representation of the [[TestComplexType.stringProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  stringProperty: EdmTypeField<EntityT, 'Edm.String', false> = new EdmTypeField(
    'StringProperty',
    this,
    'Edm.String',
    false
  );
  /**
   * Representation of the [[TestComplexType.booleanProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  booleanProperty: EdmTypeField<EntityT, 'Edm.Boolean', true> =
    new EdmTypeField('BooleanProperty', this, 'Edm.Boolean', true);
  /**
   * Representation of the [[TestComplexType.guidProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  guidProperty: EdmTypeField<EntityT, 'Edm.Guid', true> = new EdmTypeField(
    'GuidProperty',
    this,
    'Edm.Guid',
    true
  );
  /**
   * Representation of the [[TestComplexType.int16Property]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  int16Property: OrderableEdmField<EntityT, 'Edm.Int16', true> =
    new OrderableEdmField('Int16Property', this, 'Edm.Int16', true);
  /**
   * Representation of the [[TestComplexType.int32Property]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  int32Property: OrderableEdmField<EntityT, 'Edm.Int32', true> =
    new OrderableEdmField('Int32Property', this, 'Edm.Int32', true);
  /**
   * Representation of the [[TestComplexType.int64Property]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  int64Property: OrderableEdmField<EntityT, 'Edm.Int64', true> =
    new OrderableEdmField('Int64Property', this, 'Edm.Int64', true);
  /**
   * Representation of the [[TestComplexType.decimalProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  decimalProperty: OrderableEdmField<EntityT, 'Edm.Decimal', true> =
    new OrderableEdmField('DecimalProperty', this, 'Edm.Decimal', true);
  /**
   * Representation of the [[TestComplexType.singleProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  singleProperty: OrderableEdmField<EntityT, 'Edm.Single', true> =
    new OrderableEdmField('SingleProperty', this, 'Edm.Single', true);
  /**
   * Representation of the [[TestComplexType.doubleProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  doubleProperty: OrderableEdmField<EntityT, 'Edm.Double', true> =
    new OrderableEdmField('DoubleProperty', this, 'Edm.Double', true);
  /**
   * Representation of the [[TestComplexType.floatProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  floatProperty: OrderableEdmField<EntityT, 'Edm.Float', true> =
    new OrderableEdmField('FloatProperty', this, 'Edm.Float', true);
  /**
   * Representation of the [[TestComplexType.timeOfDayProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  timeOfDayProperty: OrderableEdmField<EntityT, 'Edm.TimeOfDay', true> =
    new OrderableEdmField('TimeOfDayProperty', this, 'Edm.TimeOfDay', true);
  /**
   * Representation of the [[TestComplexType.dateProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  dateProperty: OrderableEdmField<EntityT, 'Edm.Date', true> =
    new OrderableEdmField('DateProperty', this, 'Edm.Date', true);
  /**
   * Representation of the [[TestComplexType.dateTimeOffSetProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  dateTimeOffSetProperty: OrderableEdmField<
    EntityT,
    'Edm.DateTimeOffset',
    true
  > = new OrderableEdmField(
    'DateTimeOffSetProperty',
    this,
    'Edm.DateTimeOffset',
    true
  );
  /**
   * Representation of the [[TestComplexType.byteProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  byteProperty: OrderableEdmField<EntityT, 'Edm.Byte', true> =
    new OrderableEdmField('ByteProperty', this, 'Edm.Byte', true);
  /**
   * Representation of the [[TestComplexType.sByteProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  sByteProperty: OrderableEdmField<EntityT, 'Edm.SByte', true> =
    new OrderableEdmField('SByteProperty', this, 'Edm.SByte', true);
  /**
   * Representation of the [[TestComplexType.geographyPointProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  geographyPointProperty: EdmTypeField<EntityT, 'Edm.Any', true> =
    new EdmTypeField('GeographyPointProperty', this, 'Edm.Any', true);
  /**
   * Representation of the [[TestComplexType.enumProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  enumProperty: EdmTypeField<EntityT, 'Edm.Enum', true> = new EdmTypeField(
    'EnumProperty',
    this,
    'Edm.Enum',
    true
  );
  /**
   * Representation of the [[TestComplexType.somethingTheSdkDoesNotSupport]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  somethingTheSdkDoesNotSupport: EdmTypeField<EntityT, 'Edm.Any', true> =
    new EdmTypeField('SomethingTheSDKDoesNotSupport', this, 'Edm.Any', true);
  /**
   * Representation of the [[TestComplexType.complexTypeProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  complexTypeProperty: TestNestedComplexTypeField<EntityT, true> =
    new TestNestedComplexTypeField('ComplexTypeProperty', this, true);
  /**
   * Representation of the [[TestComplexType.collectionStringProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  collectionStringProperty: CollectionField<EntityT, 'Edm.String', true> =
    new CollectionField('CollectionStringProperty', this, 'Edm.String', true);
  /**
   * Representation of the [[TestComplexType.collectionComplexTypeProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  collectionComplexTypeProperty: CollectionField<
    EntityT,
    TestNestedComplexType,
    true
  > = new CollectionField(
    'CollectionComplexTypeProperty',
    this,
    TestNestedComplexType,
    true
  );
  /**
   * Representation of the [[TestComplexType.baseStringProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  baseStringProperty: EdmTypeField<EntityT, 'Edm.String', true> =
    new EdmTypeField('BaseStringProperty', this, 'Edm.String', true);

  /**
   * Creates an instance of TestComplexTypeField.
   *
   * @param fieldName - Actual name of the field as used in the OData request.
   * @param fieldOf - Either the parent entity constructor of the parent complex type this field belongs to.
   */
  constructor(
    fieldName: string,
    fieldOf: ConstructorOrField<EntityT>,
    isNullable: NullableT = false as NullableT
  ) {
    super(fieldName, fieldOf, TestComplexType);
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

  /**
   * @deprecated Since v1.25.0. Use `deserializeComplexTypeV2` or `deserializeComplexTypeV4` of the `@sap-cloud-sdk/core` package instead.
   */
  export function build(json: {
    [keys: string]: FieldType | TestNestedComplexType;
  }): TestComplexType {
    return deserializeComplexTypeV4(json, TestComplexType);
  }
}
