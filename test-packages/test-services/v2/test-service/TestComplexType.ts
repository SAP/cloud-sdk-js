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
import { deserializeComplexType, Entity } from '@sap-cloud-sdk/odata-v2';
import {
  ComplexTypeField,
  ConstructorOrField,
  FieldBuilder,
  FieldOptions,
  FieldType,
  PropertyMetadata,
  Time
} from '@sap-cloud-sdk/odata-common/internal';
import {
  DeSerializationMiddleware,
  DeSerializationMiddlewareV2BASE
} from '@sap-cloud-sdk/odata-v2/dist/de-serializers/de-serialization-middleware';
import { NewFieldBuilder } from '@sap-cloud-sdk/odata-common/dist/selectable/field-builder-new';
import { NewEdmTypeField } from '@sap-cloud-sdk/odata-common/dist/selectable/edm-type-field-new';
import { DeserializedType } from '@sap-cloud-sdk/odata-common/dist/de-serializers/de-serialization-middleware';
import { NewComplexTypeField } from '@sap-cloud-sdk/odata-common/dist/selectable/complex-type-field-new';
import { NewConstructorOrField } from '@sap-cloud-sdk/odata-common/dist/selectable/constructor-or-field';

/**
 * TestComplexType
 */
export interface TestComplexType<
  T extends DeSerializationMiddlewareV2BASE = DeSerializationMiddleware
> {
  /**
   * String Property.
   */
  stringProperty: DeserializedType<T, 'Edm.String'>;
  /**
   * Boolean Property.
   * @nullable
   */
  booleanProperty?: DeserializedType<T, 'Edm.Boolean'>;
  /**
   * Guid Property.
   * @nullable
   */
  guidProperty?: DeserializedType<T, 'Edm.Guid'>;
  /**
   * Int 16 Property.
   * @nullable
   */
  int16Property?: DeserializedType<T, 'Edm.Int16'>;
  /**
   * Int 32 Property.
   * @nullable
   */
  int32Property?: DeserializedType<T, 'Edm.Int32'>;
  /**
   * Int 64 Property.
   * @nullable
   */
  int64Property?: DeserializedType<T, 'Edm.Int64'>;
  /**
   * Decimal Property.
   * @nullable
   */
  decimalProperty?: DeserializedType<T, 'Edm.Decimal'>;
  /**
   * Single Property.
   * @nullable
   */
  singleProperty?: DeserializedType<T, 'Edm.Single'>;
  /**
   * Double Property.
   * @nullable
   */
  doubleProperty?: DeserializedType<T, 'Edm.Double'>;
  /**
   * Float Property.
   * @nullable
   */
  floatProperty?: DeserializedType<T, 'Edm.Float'>;
  /**
   * Time Property.
   * @nullable
   */
  timeProperty?: DeserializedType<T, 'Edm.Time'>;
  /**
   * Date Time Property.
   * @nullable
   */
  dateTimeProperty?: DeserializedType<T, 'Edm.DateTime'>;
  /**
   * Date Time Off Set Property.
   * @nullable
   */
  dateTimeOffSetProperty?: DeserializedType<T, 'Edm.DateTimeOffset'>;
  /**
   * Byte Property.
   * @nullable
   */
  byteProperty?: DeserializedType<T, 'Edm.Byte'>;
  /**
   * S Byte Property.
   * @nullable
   */
  sByteProperty?: DeserializedType<T, 'Edm.SByte'>;
  /**
   * Something The Sdk Does Not Support.
   * @nullable
   */
  somethingTheSdkDoesNotSupport?: DeserializedType<T, 'Edm.Any'>;
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
  T extends DeSerializationMiddlewareV2BASE = DeSerializationMiddleware,
  NullableT extends boolean = false,
  SelectableT extends boolean = false
> extends NewComplexTypeField<
  EntityT,
  T,
  TestComplexType,
  NullableT,
  SelectableT
> {
  private _fieldBuilder: NewFieldBuilder<this, T> = new NewFieldBuilder(
    this,
    this.deSerializers
  );
  /**
   * Representation of the [[TestComplexType.stringProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  stringProperty: NewEdmTypeField<EntityT, 'Edm.String', T, false, false> =
    this._fieldBuilder.buildEdmTypeField('StringProperty', 'Edm.String', false);
  /**
   * Representation of the [[TestComplexType.booleanProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  booleanProperty: NewEdmTypeField<EntityT, 'Edm.Boolean', T, true, false> =
    this._fieldBuilder.buildEdmTypeField(
      'BooleanProperty',
      'Edm.Boolean',
      true
    );
  /**
   * Representation of the [[TestComplexType.guidProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  guidProperty: NewEdmTypeField<EntityT, 'Edm.Guid', T, true, false> =
    this._fieldBuilder.buildEdmTypeField('GuidProperty', 'Edm.Guid', true);
  /**
   * Representation of the [[TestComplexType.int16Property]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  int16Property: NewEdmTypeField<EntityT, 'Edm.Int16', T, true, false> =
    this._fieldBuilder.buildEdmTypeField('Int16Property', 'Edm.Int16', true);
  /**
   * Representation of the [[TestComplexType.int32Property]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  int32Property: NewEdmTypeField<EntityT, 'Edm.Int32', T, true, false> =
    this._fieldBuilder.buildEdmTypeField('Int32Property', 'Edm.Int32', true);
  /**
   * Representation of the [[TestComplexType.int64Property]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  int64Property: NewEdmTypeField<EntityT, 'Edm.Int64', T, true, false> =
    this._fieldBuilder.buildEdmTypeField('Int64Property', 'Edm.Int64', true);
  /**
   * Representation of the [[TestComplexType.decimalProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  decimalProperty: NewEdmTypeField<EntityT, 'Edm.Decimal', T, true, false> =
    this._fieldBuilder.buildEdmTypeField(
      'DecimalProperty',
      'Edm.Decimal',
      true
    );
  /**
   * Representation of the [[TestComplexType.singleProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  singleProperty: NewEdmTypeField<EntityT, 'Edm.Single', T, true, false> =
    this._fieldBuilder.buildEdmTypeField('SingleProperty', 'Edm.Single', true);
  /**
   * Representation of the [[TestComplexType.doubleProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  doubleProperty: NewEdmTypeField<EntityT, 'Edm.Double', T, true, false> =
    this._fieldBuilder.buildEdmTypeField('DoubleProperty', 'Edm.Double', true);
  /**
   * Representation of the [[TestComplexType.floatProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  floatProperty: NewEdmTypeField<EntityT, 'Edm.Float', T, true, false> =
    this._fieldBuilder.buildEdmTypeField('FloatProperty', 'Edm.Float', true);
  /**
   * Representation of the [[TestComplexType.timeProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  timeProperty: NewEdmTypeField<EntityT, 'Edm.Time', T, true, false> =
    this._fieldBuilder.buildEdmTypeField('TimeProperty', 'Edm.Time', true);
  /**
   * Representation of the [[TestComplexType.dateTimeProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  dateTimeProperty: NewEdmTypeField<EntityT, 'Edm.DateTime', T, true, false> =
    this._fieldBuilder.buildEdmTypeField(
      'DateTimeProperty',
      'Edm.DateTime',
      true
    );
  /**
   * Representation of the [[TestComplexType.dateTimeOffSetProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  dateTimeOffSetProperty: NewEdmTypeField<
    EntityT,
    'Edm.DateTimeOffset',
    T,
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
  byteProperty: NewEdmTypeField<EntityT, 'Edm.Byte', T, true, false> =
    this._fieldBuilder.buildEdmTypeField('ByteProperty', 'Edm.Byte', true);
  /**
   * Representation of the [[TestComplexType.sByteProperty]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  sByteProperty: NewEdmTypeField<EntityT, 'Edm.SByte', T, true, false> =
    this._fieldBuilder.buildEdmTypeField('SByteProperty', 'Edm.SByte', true);
  /**
   * Representation of the [[TestComplexType.somethingTheSdkDoesNotSupport]] property for query construction.
   * Use to reference this property in query operations such as 'filter' in the fluent request API.
   */
  somethingTheSdkDoesNotSupport: NewEdmTypeField<
    EntityT,
    'Edm.Any',
    T,
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
    fieldOf: NewConstructorOrField<EntityT>,
    deSerializers: T,
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
