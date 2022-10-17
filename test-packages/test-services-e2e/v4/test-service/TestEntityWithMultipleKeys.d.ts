import {
  Entity,
  DefaultDeSerializers,
  DeSerializers,
  DeserializedType,
  BoundActionRequestBuilder,
  BoundFunctionRequestBuilder
} from '@sap-cloud-sdk/odata-v4';
import type { TestEntityWithMultipleKeysApi } from './TestEntityWithMultipleKeysApi';
/**
 * This class represents the entity "TestEntityWithMultipleKeys" of service "TestService".
 */
export declare class TestEntityWithMultipleKeys<
    T extends DeSerializers = DefaultDeSerializers
  >
  extends Entity
  implements TestEntityWithMultipleKeysType<T>
{
  readonly _entityApi: TestEntityWithMultipleKeysApi<T>;
  /**
   * Technical entity name for TestEntityWithMultipleKeys.
   */
  static _entityName: string;
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath: string;
  /**
   * All key fields of the TestEntityWithMultipleKeys entity
   */
  static _keys: string[];
  /**
   * Key Test Entity With Multiple Keys.
   */
  keyTestEntityWithMultipleKeys: DeserializedType<T, 'Edm.Int32'>;
  /**
   * String Property With Multiple Keys.
   * Maximum length: 111.
   */
  stringPropertyWithMultipleKeys: DeserializedType<T, 'Edm.String'>;
  /**
   * Boolean Property With Multiple Keys.
   */
  booleanPropertyWithMultipleKeys: DeserializedType<T, 'Edm.Boolean'>;
  constructor(_entityApi: TestEntityWithMultipleKeysApi<T>);
  boundFunctionWithoutArguments<
    DeSerializersT extends DeSerializers = DefaultDeSerializers
  >(): BoundFunctionRequestBuilder<
    TestEntityWithMultipleKeys<DeSerializersT>,
    DeSerializersT,
    any,
    string | null
  >;
  boundFunctionWithoutArgumentsWithMultipleKeys<
    DeSerializersT extends DeSerializers = DefaultDeSerializers
  >(): BoundFunctionRequestBuilder<
    TestEntityWithMultipleKeys<DeSerializersT>,
    DeSerializersT,
    any,
    string | null
  >;
  boundFunctionWithArgumentsWithMultipleKeys<
    DeSerializersT extends DeSerializers = DefaultDeSerializers
  >(
    param1: string,
    param2: string
  ): BoundFunctionRequestBuilder<
    TestEntityWithMultipleKeys<DeSerializersT>,
    DeSerializersT,
    any,
    string | null
  >;
  getStringProperty<
    DeSerializersT extends DeSerializers = DefaultDeSerializers
  >(): BoundFunctionRequestBuilder<
    TestEntityWithMultipleKeys<DeSerializersT>,
    DeSerializersT,
    any,
    string | null
  >;
  concatStrings<DeSerializersT extends DeSerializers = DefaultDeSerializers>(
    Str2: string
  ): BoundFunctionRequestBuilder<
    TestEntityWithMultipleKeys<DeSerializersT>,
    DeSerializersT,
    any,
    string | null
  >;
  getAll<
    DeSerializersT extends DeSerializers = DefaultDeSerializers
  >(): BoundFunctionRequestBuilder<
    TestEntityWithMultipleKeys<DeSerializersT>,
    DeSerializersT,
    any,
    string | null
  >;
  getByKey<
    DeSerializersT extends DeSerializers = DefaultDeSerializers
  >(): BoundFunctionRequestBuilder<
    TestEntityWithMultipleKeys<DeSerializersT>,
    DeSerializersT,
    any,
    string | null
  >;
  getByKeyWithMultipleKeys<
    DeSerializersT extends DeSerializers = DefaultDeSerializers
  >(
    StringPropertyWithMultipleKeys: string,
    BooleanPropertyWithMultipleKeys: string
  ): BoundFunctionRequestBuilder<
    TestEntityWithMultipleKeys<DeSerializersT>,
    DeSerializersT,
    any,
    string | null
  >;
  returnCollection<
    DeSerializersT extends DeSerializers = DefaultDeSerializers
  >(): BoundFunctionRequestBuilder<
    TestEntityWithMultipleKeys<DeSerializersT>,
    DeSerializersT,
    any,
    string | null
  >;
  returnInt<
    DeSerializersT extends DeSerializers = DefaultDeSerializers
  >(): BoundFunctionRequestBuilder<
    TestEntityWithMultipleKeys<DeSerializersT>,
    DeSerializersT,
    any,
    string | null
  >;
  returnKey<
    DeSerializersT extends DeSerializers = DefaultDeSerializers
  >(): BoundFunctionRequestBuilder<
    TestEntityWithMultipleKeys<DeSerializersT>,
    DeSerializersT,
    any,
    string | null
  >;
  returnSapCloudSdk<
    DeSerializersT extends DeSerializers = DefaultDeSerializers
  >(): BoundFunctionRequestBuilder<
    TestEntityWithMultipleKeys<DeSerializersT>,
    DeSerializersT,
    any,
    string | null
  >;
  boundActionWithoutArguments<
    DeSerializersT extends DeSerializers = DefaultDeSerializers
  >(): BoundActionRequestBuilder<
    TestEntityWithMultipleKeys<DeSerializersT>,
    DeSerializersT,
    any,
    string | null
  >;
  boundActionWithoutArgumentsWithMultipleKeys<
    DeSerializersT extends DeSerializers = DefaultDeSerializers
  >(): BoundActionRequestBuilder<
    TestEntityWithMultipleKeys<DeSerializersT>,
    DeSerializersT,
    any,
    string | null
  >;
  deleteEntity<
    DeSerializersT extends DeSerializers = DefaultDeSerializers
  >(): BoundActionRequestBuilder<
    TestEntityWithMultipleKeys<DeSerializersT>,
    DeSerializersT,
    any,
    string | null
  >;
  createTestEntityById<
    DeSerializersT extends DeSerializers = DefaultDeSerializers
  >(): BoundActionRequestBuilder<
    TestEntityWithMultipleKeys<DeSerializersT>,
    DeSerializersT,
    any,
    string | null
  >;
  createTestEntityByIdReturnId<
    DeSerializersT extends DeSerializers = DefaultDeSerializers
  >(): BoundActionRequestBuilder<
    TestEntityWithMultipleKeys<DeSerializersT>,
    DeSerializersT,
    any,
    string | null
  >;
  createTestEntityReturnId<
    DeSerializersT extends DeSerializers = DefaultDeSerializers
  >(): BoundActionRequestBuilder<
    TestEntityWithMultipleKeys<DeSerializersT>,
    DeSerializersT,
    any,
    string | null
  >;
}
export interface TestEntityWithMultipleKeysType<
  T extends DeSerializers = DefaultDeSerializers
> {
  keyTestEntityWithMultipleKeys: DeserializedType<T, 'Edm.Int32'>;
  stringPropertyWithMultipleKeys: DeserializedType<T, 'Edm.String'>;
  booleanPropertyWithMultipleKeys: DeserializedType<T, 'Edm.Boolean'>;
}
//# sourceMappingURL=TestEntityWithMultipleKeys.d.ts.map
