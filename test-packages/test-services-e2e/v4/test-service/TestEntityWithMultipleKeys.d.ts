import {
  Entity,
  DefaultDeSerializers,
  DeSerializers,
  DeserializedType,
  BoundActionRequestBuilder,
  BoundFunctionRequestBuilder
} from '@sap-cloud-sdk/odata-v4';
import type { TestEntityWithMultipleKeysApi } from './TestEntityWithMultipleKeysApi';
import type { TestEntity } from './TestEntity';
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
  concatStrings<DeSerializersT extends DeSerializers = DefaultDeSerializers>(
    str1: string,
    str2: string
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
    TestEntity | null
  >;
  getByKey<DeSerializersT extends DeSerializers = DefaultDeSerializers>(
    param: number
  ): BoundFunctionRequestBuilder<
    TestEntityWithMultipleKeys<DeSerializersT>,
    DeSerializersT,
    any,
    TestEntity | null
  >;
  getByKeyWithMultipleKeys<
    DeSerializersT extends DeSerializers = DefaultDeSerializers
  >(
    keyTestEntityWithMultipleKeys: number,
    stringPropertyWithMultipleKeys: string,
    booleanPropertyWithMultipleKeys: boolean
  ): BoundFunctionRequestBuilder<
    TestEntityWithMultipleKeys<DeSerializersT>,
    DeSerializersT,
    any,
    TestEntityWithMultipleKeys | null
  >;
  returnCollection<DeSerializersT extends DeSerializers = DefaultDeSerializers>(
    param: number
  ): BoundFunctionRequestBuilder<
    TestEntityWithMultipleKeys<DeSerializersT>,
    DeSerializersT,
    any,
    number | null
  >;
  returnInt<DeSerializersT extends DeSerializers = DefaultDeSerializers>(
    param: number
  ): BoundFunctionRequestBuilder<
    TestEntityWithMultipleKeys<DeSerializersT>,
    DeSerializersT,
    any,
    number | null
  >;
  returnSapCloudSdk<
    DeSerializersT extends DeSerializers = DefaultDeSerializers
  >(): BoundFunctionRequestBuilder<
    TestEntityWithMultipleKeys<DeSerializersT>,
    DeSerializersT,
    any,
    string | null
  >;
  createTestEntityById<
    DeSerializersT extends DeSerializers = DefaultDeSerializers
  >(
    id: number
  ): BoundActionRequestBuilder<
    TestEntityWithMultipleKeys<DeSerializersT>,
    DeSerializersT,
    any,
    TestEntity | null
  >;
  createTestEntityByIdReturnId<
    DeSerializersT extends DeSerializers = DefaultDeSerializers
  >(
    id: number
  ): BoundActionRequestBuilder<
    TestEntityWithMultipleKeys<DeSerializersT>,
    DeSerializersT,
    any,
    number | null
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
