/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import {
  Entity,
  DefaultDeSerializers,
  DeSerializers,
  DeserializedType,
  edmToTs,
  transformReturnValueForEdmType,
  defaultDeSerializers,
  BoundActionImportRequestBuilder,
  FunctionImportParameter,
  BoundFunctionImportRequestBuilder
} from '@sap-cloud-sdk/odata-v4';
import { TestComplexType, TestComplexTypeField } from './TestComplexType';
import type { TestEntityApi } from './TestEntityApi';
import { TestEnumType } from './TestEnumType';
import { TestEnumTypeInt64 } from './TestEnumTypeInt64';
import { TestEnumTypeWithOneMember } from './TestEnumTypeWithOneMember';
import {
  TestEntityMultiLink,
  TestEntityMultiLinkType
} from './TestEntityMultiLink';
import {
  TestEntitySingleLink,
  TestEntitySingleLinkType
} from './TestEntitySingleLink';

/**
 * This class represents the entity "A_TestEntity" of service "API_TEST_SRV".
 */
export class TestEntity<T extends DeSerializers = DefaultDeSerializers>
  extends Entity
  implements TestEntityType<T>
{
  /**
   * Technical entity name for TestEntity.
   */
  static _entityName = 'A_TestEntity';
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath = '/sap/opu/odata/sap/API_TEST_SRV';
  /**
   * All key fields of the TestEntity entity
   */
  static _keys = ['KeyPropertyGuid', 'KeyPropertyString'];
  /**
   * Key Property Guid.
   */
  keyPropertyGuid!: DeserializedType<T, 'Edm.Guid'>;
  /**
   * Key Property String.
   */
  keyPropertyString!: DeserializedType<T, 'Edm.String'>;
  /**
   * String Property.
   * Maximum length: 10.
   * @nullable
   */
  stringProperty?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Boolean Property.
   * @nullable
   */
  booleanProperty?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Guid Property.
   * @nullable
   */
  guidProperty?: DeserializedType<T, 'Edm.Guid'> | null;
  /**
   * Int 16 Property.
   * @nullable
   */
  int16Property?: DeserializedType<T, 'Edm.Int16'> | null;
  /**
   * Int 32 Property.
   * @nullable
   */
  int32Property?: DeserializedType<T, 'Edm.Int32'> | null;
  /**
   * Int 64 Property.
   * @nullable
   */
  int64Property?: DeserializedType<T, 'Edm.Int64'> | null;
  /**
   * Decimal Property.
   * @nullable
   */
  decimalProperty?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Single Property.
   * @nullable
   */
  singleProperty?: DeserializedType<T, 'Edm.Single'> | null;
  /**
   * Double Property.
   * @nullable
   */
  doubleProperty?: DeserializedType<T, 'Edm.Double'> | null;
  /**
   * Float Property.
   * @nullable
   */
  floatProperty?: DeserializedType<T, 'Edm.Float'> | null;
  /**
   * Time Of Day Property.
   * @nullable
   */
  timeOfDayProperty?: DeserializedType<T, 'Edm.TimeOfDay'> | null;
  /**
   * Date Property.
   * @nullable
   */
  dateProperty?: DeserializedType<T, 'Edm.Date'> | null;
  /**
   * Date Time Off Set Property.
   * @nullable
   */
  dateTimeOffSetProperty?: DeserializedType<T, 'Edm.DateTimeOffset'> | null;
  /**
   * Duration Property.
   * @nullable
   */
  durationProperty?: DeserializedType<T, 'Edm.Duration'> | null;
  /**
   * Byte Property.
   * @nullable
   */
  byteProperty?: DeserializedType<T, 'Edm.Byte'> | null;
  /**
   * S Byte Property.
   * @nullable
   */
  sByteProperty?: DeserializedType<T, 'Edm.SByte'> | null;
  /**
   * Geography Point Property.
   * @nullable
   */
  geographyPointProperty?: DeserializedType<T, 'Edm.Any'> | null;
  /**
   * Something The Sdk Does Not Support.
   * @nullable
   */
  somethingTheSdkDoesNotSupport?: DeserializedType<T, 'Edm.Any'> | null;
  /**
   * Collection Property.
   * Maximum length: 10.
   * @nullable
   */
  collectionProperty?: DeserializedType<T, 'Edm.String'>[] | null;
  /**
   * Complex Type Property.
   * @nullable
   */
  complexTypeProperty?: TestComplexType<T> | null;
  /**
   * Complex Type Collection Property.
   * @nullable
   */
  complexTypeCollectionProperty?: TestComplexType<T>[] | null;
  /**
   * Enum Property.
   * @nullable
   */
  enumProperty?: TestEnumType | null;
  /**
   * Enum Property Int 64.
   * @nullable
   */
  enumPropertyInt64?: TestEnumTypeInt64 | null;
  /**
   * Enum Property With One Member.
   * @nullable
   */
  enumPropertyWithOneMember?: TestEnumTypeWithOneMember | null;
  /**
   * Enum Collection Property.
   * @nullable
   */
  enumCollectionProperty?: TestEnumType[] | null;
  /**
   * One-to-many navigation property to the {@link TestEntityMultiLink} entity.
   */
  toMultiLink!: TestEntityMultiLink<T>[];
  /**
   * One-to-many navigation property to the {@link TestEntityMultiLink} entity.
   */
  toOtherMultiLink!: TestEntityMultiLink<T>[];
  /**
   * One-to-one navigation property to the {@link TestEntitySingleLink} entity.
   */
  toSingleLink?: TestEntitySingleLink<T> | null;

  constructor(readonly _entityApi: TestEntityApi<T>) {
    super(_entityApi);
  }

  /**
   * Bound Function Without Arguments.
   * @param parameters - Object containing all parameters for the function.
   * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
   */
  boundFunctionWithoutArguments(
    parameters: BoundFunctionWithoutArgumentsParameters<T>,
    deSerializers?: T
  ): BoundFunctionImportRequestBuilder<
    TestEntity<T>,
    T,
    BoundFunctionWithoutArgumentsParameters<T>,
    string | null
  > {
    const params = {};

    return new BoundFunctionImportRequestBuilder(
      this._entityApi,
      this,
      'boundFunctionWithoutArguments',
      data =>
        transformReturnValueForEdmType(data, val =>
          edmToTs(
            val.value,
            'Edm.String',
            deSerializers || defaultDeSerializers
          )
        ),
      params,
      deSerializers || defaultDeSerializers
    );
  }

  /**
   * Bound Function With Arguments.
   * @param parameters - Object containing all parameters for the function.
   * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
   */
  boundFunctionWithArguments(
    parameters: BoundFunctionWithArgumentsParameters<T>,
    deSerializers?: T
  ): BoundFunctionImportRequestBuilder<
    TestEntity<T>,
    T,
    BoundFunctionWithArgumentsParameters<T>,
    string | null
  > {
    const params = {
      param1: new FunctionImportParameter(
        'param1',
        'Edm.String',
        parameters.param1
      ),
      param2: new FunctionImportParameter(
        'param2',
        'Edm.String',
        parameters.param2
      )
    };

    return new BoundFunctionImportRequestBuilder(
      this._entityApi,
      this,
      'boundFunctionWithArguments',
      data =>
        transformReturnValueForEdmType(data, val =>
          edmToTs(
            val.value,
            'Edm.String',
            deSerializers || defaultDeSerializers
          )
        ),
      params,
      deSerializers || defaultDeSerializers
    );
  }

  /**
   * Bound Action Without Arguments.
   * @param parameters - Object containing all parameters for the action.
   * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
   */
  boundActionWithoutArguments(
    parameters: BoundActionWithoutArgumentsParameters<T>,
    deSerializers?: T
  ): BoundActionImportRequestBuilder<
    TestEntity<T>,
    T,
    BoundActionWithoutArgumentsParameters<T>,
    string | null
  > {
    const params = {};

    return new BoundActionImportRequestBuilder(
      this._entityApi,
      this,
      'boundActionWithoutArguments',
      data =>
        transformReturnValueForEdmType(data, val =>
          edmToTs(
            val.value,
            'Edm.String',
            deSerializers || defaultDeSerializers
          )
        ),
      params,
      deSerializers || defaultDeSerializers
    );
  }
}

export interface TestEntityType<
  T extends DeSerializers = DefaultDeSerializers
> {
  keyPropertyGuid: DeserializedType<T, 'Edm.Guid'>;
  keyPropertyString: DeserializedType<T, 'Edm.String'>;
  stringProperty?: DeserializedType<T, 'Edm.String'> | null;
  booleanProperty?: DeserializedType<T, 'Edm.Boolean'> | null;
  guidProperty?: DeserializedType<T, 'Edm.Guid'> | null;
  int16Property?: DeserializedType<T, 'Edm.Int16'> | null;
  int32Property?: DeserializedType<T, 'Edm.Int32'> | null;
  int64Property?: DeserializedType<T, 'Edm.Int64'> | null;
  decimalProperty?: DeserializedType<T, 'Edm.Decimal'> | null;
  singleProperty?: DeserializedType<T, 'Edm.Single'> | null;
  doubleProperty?: DeserializedType<T, 'Edm.Double'> | null;
  floatProperty?: DeserializedType<T, 'Edm.Float'> | null;
  timeOfDayProperty?: DeserializedType<T, 'Edm.TimeOfDay'> | null;
  dateProperty?: DeserializedType<T, 'Edm.Date'> | null;
  dateTimeOffSetProperty?: DeserializedType<T, 'Edm.DateTimeOffset'> | null;
  durationProperty?: DeserializedType<T, 'Edm.Duration'> | null;
  byteProperty?: DeserializedType<T, 'Edm.Byte'> | null;
  sByteProperty?: DeserializedType<T, 'Edm.SByte'> | null;
  geographyPointProperty?: DeserializedType<T, 'Edm.Any'> | null;
  somethingTheSdkDoesNotSupport?: DeserializedType<T, 'Edm.Any'> | null;
  collectionProperty?: DeserializedType<T, 'Edm.String'>[] | null;
  complexTypeProperty?: TestComplexType<T> | null;
  complexTypeCollectionProperty?: TestComplexType<T>[] | null;
  enumProperty?: TestEnumType | null;
  enumPropertyInt64?: TestEnumTypeInt64 | null;
  enumPropertyWithOneMember?: TestEnumTypeWithOneMember | null;
  enumCollectionProperty?: TestEnumType[] | null;
  toMultiLink: TestEntityMultiLinkType<T>[];
  toOtherMultiLink: TestEntityMultiLinkType<T>[];
  toSingleLink?: TestEntitySingleLinkType<T> | null;
}

/**
 * Type of the parameters to be passed to {@link boundFunctionWithoutArguments}.
 */
export interface BoundFunctionWithoutArgumentsParameters<
  DeSerializersT extends DeSerializers
> {}

/**
 * Type of the parameters to be passed to {@link boundFunctionWithArguments}.
 */
export interface BoundFunctionWithArgumentsParameters<
  DeSerializersT extends DeSerializers
> {
  /**
   * Param 1.
   */
  param1?: string | null;
  /**
   * Param 2.
   */
  param2?: string | null;
}

/**
 * Type of the parameters to be passed to {@link boundActionWithoutArguments}.
 */
export interface BoundActionWithoutArgumentsParameters<
  DeSerializersT extends DeSerializers
> {}
