/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { Moment } from 'moment';
import { BigNumber } from 'bignumber.js';
import { TestNestedComplexType, TestNestedComplexTypeField } from './TestNestedComplexType';
import { ComplexTypeBigNumberPropertyField, ComplexTypeBooleanPropertyField, ComplexTypeDatePropertyField, ComplexTypeField, ComplexTypeNumberPropertyField, ComplexTypeStringPropertyField, ComplexTypeTimePropertyField, Entity, FieldType, Time, createComplexType, edmToTs } from '@sap-cloud-sdk/core';

/**
 * TestComplexType
 */
export interface TestComplexType {
  /**
   * String Property.
   * @nullable
   */
  stringProperty?: string;
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
   * Complex Type Property.
   * @nullable
   */
  complexTypeProperty?: TestNestedComplexType;
}

/**
 * @deprecated Since v1.6.0. Use [[TestComplexType.build]] instead.
 */
export function createTestComplexType_1(json: any): TestComplexType {
  return TestComplexType.build(json);
}

/**
 * TestComplexTypeField
 * @typeparam EntityT - Type of the entity the complex type field belongs to.
 */
export class TestComplexTypeField<EntityT extends Entity> extends ComplexTypeField<EntityT> {
  /**
   * Representation of the [[TestComplexType.stringProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  stringProperty: ComplexTypeStringPropertyField<EntityT> = new ComplexTypeStringPropertyField('StringProperty', this, 'Edm.String');
  /**
   * Representation of the [[TestComplexType.booleanProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  booleanProperty: ComplexTypeBooleanPropertyField<EntityT> = new ComplexTypeBooleanPropertyField('BooleanProperty', this, 'Edm.Boolean');
  /**
   * Representation of the [[TestComplexType.guidProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  guidProperty: ComplexTypeStringPropertyField<EntityT> = new ComplexTypeStringPropertyField('GuidProperty', this, 'Edm.Guid');
  /**
   * Representation of the [[TestComplexType.int16Property]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  int16Property: ComplexTypeNumberPropertyField<EntityT> = new ComplexTypeNumberPropertyField('Int16Property', this, 'Edm.Int16');
  /**
   * Representation of the [[TestComplexType.int32Property]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  int32Property: ComplexTypeNumberPropertyField<EntityT> = new ComplexTypeNumberPropertyField('Int32Property', this, 'Edm.Int32');
  /**
   * Representation of the [[TestComplexType.int64Property]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  int64Property: ComplexTypeBigNumberPropertyField<EntityT> = new ComplexTypeBigNumberPropertyField('Int64Property', this, 'Edm.Int64');
  /**
   * Representation of the [[TestComplexType.decimalProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  decimalProperty: ComplexTypeBigNumberPropertyField<EntityT> = new ComplexTypeBigNumberPropertyField('DecimalProperty', this, 'Edm.Decimal');
  /**
   * Representation of the [[TestComplexType.singleProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  singleProperty: ComplexTypeNumberPropertyField<EntityT> = new ComplexTypeNumberPropertyField('SingleProperty', this, 'Edm.Single');
  /**
   * Representation of the [[TestComplexType.doubleProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  doubleProperty: ComplexTypeNumberPropertyField<EntityT> = new ComplexTypeNumberPropertyField('DoubleProperty', this, 'Edm.Double');
  /**
   * Representation of the [[TestComplexType.floatProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  floatProperty: ComplexTypeNumberPropertyField<EntityT> = new ComplexTypeNumberPropertyField('FloatProperty', this, 'Edm.Float');
  /**
   * Representation of the [[TestComplexType.timeProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  timeProperty: ComplexTypeTimePropertyField<EntityT> = new ComplexTypeTimePropertyField('TimeProperty', this, 'Edm.Time');
  /**
   * Representation of the [[TestComplexType.dateTimeProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  dateTimeProperty: ComplexTypeDatePropertyField<EntityT> = new ComplexTypeDatePropertyField('DateTimeProperty', this, 'Edm.DateTime');
  /**
   * Representation of the [[TestComplexType.dateTimeOffSetProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  dateTimeOffSetProperty: ComplexTypeDatePropertyField<EntityT> = new ComplexTypeDatePropertyField('DateTimeOffSetProperty', this, 'Edm.DateTimeOffset');
  /**
   * Representation of the [[TestComplexType.byteProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  byteProperty: ComplexTypeNumberPropertyField<EntityT> = new ComplexTypeNumberPropertyField('ByteProperty', this, 'Edm.Byte');
  /**
   * Representation of the [[TestComplexType.sByteProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  sByteProperty: ComplexTypeNumberPropertyField<EntityT> = new ComplexTypeNumberPropertyField('SByteProperty', this, 'Edm.SByte');
  /**
   * Representation of the [[TestComplexType.complexTypeProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  complexTypeProperty: TestNestedComplexTypeField<EntityT> = new TestNestedComplexTypeField('ComplexTypeProperty', this);
}

export namespace TestComplexType {
  export function build(json: { [keys: string]: FieldType }): TestComplexType {
    return createComplexType(json, {
      StringProperty: (stringProperty: string) => ({ stringProperty: edmToTs(stringProperty, 'Edm.String') }),
      BooleanProperty: (booleanProperty: boolean) => ({ booleanProperty: edmToTs(booleanProperty, 'Edm.Boolean') }),
      GuidProperty: (guidProperty: string) => ({ guidProperty: edmToTs(guidProperty, 'Edm.Guid') }),
      Int16Property: (int16Property: number) => ({ int16Property: edmToTs(int16Property, 'Edm.Int16') }),
      Int32Property: (int32Property: number) => ({ int32Property: edmToTs(int32Property, 'Edm.Int32') }),
      Int64Property: (int64Property: BigNumber) => ({ int64Property: edmToTs(int64Property, 'Edm.Int64') }),
      DecimalProperty: (decimalProperty: BigNumber) => ({ decimalProperty: edmToTs(decimalProperty, 'Edm.Decimal') }),
      SingleProperty: (singleProperty: number) => ({ singleProperty: edmToTs(singleProperty, 'Edm.Single') }),
      DoubleProperty: (doubleProperty: number) => ({ doubleProperty: edmToTs(doubleProperty, 'Edm.Double') }),
      FloatProperty: (floatProperty: number) => ({ floatProperty: edmToTs(floatProperty, 'Edm.Float') }),
      TimeProperty: (timeProperty: Time) => ({ timeProperty: edmToTs(timeProperty, 'Edm.Time') }),
      DateTimeProperty: (dateTimeProperty: Moment) => ({ dateTimeProperty: edmToTs(dateTimeProperty, 'Edm.DateTime') }),
      DateTimeOffSetProperty: (dateTimeOffSetProperty: Moment) => ({ dateTimeOffSetProperty: edmToTs(dateTimeOffSetProperty, 'Edm.DateTimeOffset') }),
      ByteProperty: (byteProperty: number) => ({ byteProperty: edmToTs(byteProperty, 'Edm.Byte') }),
      SByteProperty: (sByteProperty: number) => ({ sByteProperty: edmToTs(sByteProperty, 'Edm.SByte') }),
      ComplexTypeProperty: (complexTypeProperty: TestNestedComplexType) => ({ complexTypeProperty: TestNestedComplexType.build(complexTypeProperty) })
    });
  }
}
