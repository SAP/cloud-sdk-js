import { Entity, DefaultDeSerializers, DeSerializers, DeserializedType, BoundActionRequestBuilder, BoundFunctionRequestBuilder } from '@sap-cloud-sdk/odata-v4';
import type { TestEntityLinkApi } from './TestEntityLinkApi';
import type { TestEntityWithMultipleKeys } from './TestEntityWithMultipleKeys';
import type { TestEntity } from './TestEntity';
/**
 * This class represents the entity "TestEntityLink" of service "TestService".
 */
export declare class TestEntityLink<T extends DeSerializers = DefaultDeSerializers> extends Entity implements TestEntityLinkType<T> {
    readonly _entityApi: TestEntityLinkApi<T>;
    /**
     * Technical entity name for TestEntityLink.
     */
    static _entityName: string;
    /**
     * Default url path for the according service.
     */
    static _defaultServicePath: string;
    /**
     * All key fields of the TestEntityLink entity
     */
    static _keys: string[];
    /**
     * Key Test Entity Link.
     */
    keyTestEntityLink: DeserializedType<T, 'Edm.Int32'>;
    /**
     * Key To Test Entity.
     */
    keyToTestEntity: DeserializedType<T, 'Edm.Int32'>;
    /**
     * String Property.
     * Maximum length: 111.
     * @nullable
     */
    stringProperty?: DeserializedType<T, 'Edm.String'> | null;
    constructor(_entityApi: TestEntityLinkApi<T>);
    boundFunctionWithoutArguments<DeSerializersT extends DeSerializers = DefaultDeSerializers>(): BoundFunctionRequestBuilder<TestEntityLink<DeSerializersT>, DeSerializersT, any, string | null>;
    boundFunctionWithoutArgumentsWithMultipleKeys<DeSerializersT extends DeSerializers = DefaultDeSerializers>(): BoundFunctionRequestBuilder<TestEntityLink<DeSerializersT>, DeSerializersT, any, string | null>;
    boundFunctionWithArgumentsWithMultipleKeys<DeSerializersT extends DeSerializers = DefaultDeSerializers>(param1: string, param2: string): BoundFunctionRequestBuilder<TestEntityLink<DeSerializersT>, DeSerializersT, any, string | null>;
    getStringProperty<DeSerializersT extends DeSerializers = DefaultDeSerializers>(): BoundFunctionRequestBuilder<TestEntityLink<DeSerializersT>, DeSerializersT, any, string | null>;
    concatStrings<DeSerializersT extends DeSerializers = DefaultDeSerializers>(Str2: string): BoundFunctionRequestBuilder<TestEntityLink<DeSerializersT>, DeSerializersT, any, string | null>;
    getAll<DeSerializersT extends DeSerializers = DefaultDeSerializers>(): BoundFunctionRequestBuilder<TestEntityLink<DeSerializersT>, DeSerializersT, any, TestEntity[] | null>;
    getByKey<DeSerializersT extends DeSerializers = DefaultDeSerializers>(): BoundFunctionRequestBuilder<TestEntityLink<DeSerializersT>, DeSerializersT, any, TestEntity | null>;
    getByKeyWithMultipleKeys<DeSerializersT extends DeSerializers = DefaultDeSerializers>(StringPropertyWithMultipleKeys: string, BooleanPropertyWithMultipleKeys: boolean): BoundFunctionRequestBuilder<TestEntityLink<DeSerializersT>, DeSerializersT, any, TestEntityWithMultipleKeys | null>;
    returnCollection<DeSerializersT extends DeSerializers = DefaultDeSerializers>(): BoundFunctionRequestBuilder<TestEntityLink<DeSerializersT>, DeSerializersT, any, number[] | null>;
    returnInt<DeSerializersT extends DeSerializers = DefaultDeSerializers>(): BoundFunctionRequestBuilder<TestEntityLink<DeSerializersT>, DeSerializersT, any, number | null>;
    returnKey<DeSerializersT extends DeSerializers = DefaultDeSerializers>(): BoundFunctionRequestBuilder<TestEntityLink<DeSerializersT>, DeSerializersT, any, number | null>;
    returnSapCloudSdk<DeSerializersT extends DeSerializers = DefaultDeSerializers>(): BoundFunctionRequestBuilder<TestEntityLink<DeSerializersT>, DeSerializersT, any, string | null>;
    boundActionWithoutArguments<DeSerializersT extends DeSerializers = DefaultDeSerializers>(): BoundActionRequestBuilder<TestEntityLink<DeSerializersT>, DeSerializersT, any, string | null>;
    boundActionWithoutArgumentsWithMultipleKeys<DeSerializersT extends DeSerializers = DefaultDeSerializers>(): BoundActionRequestBuilder<TestEntityLink<DeSerializersT>, DeSerializersT, any, string | null>;
    deleteEntity<DeSerializersT extends DeSerializers = DefaultDeSerializers>(): BoundActionRequestBuilder<TestEntityLink<DeSerializersT>, DeSerializersT, any, number | null>;
    createTestEntityById<DeSerializersT extends DeSerializers = DefaultDeSerializers>(): BoundActionRequestBuilder<TestEntityLink<DeSerializersT>, DeSerializersT, any, TestEntity | null>;
    createTestEntityByIdReturnId<DeSerializersT extends DeSerializers = DefaultDeSerializers>(): BoundActionRequestBuilder<TestEntityLink<DeSerializersT>, DeSerializersT, any, number | null>;
    createTestEntityReturnId<DeSerializersT extends DeSerializers = DefaultDeSerializers>(): BoundActionRequestBuilder<TestEntityLink<DeSerializersT>, DeSerializersT, any, number | null>;
}
export interface TestEntityLinkType<T extends DeSerializers = DefaultDeSerializers> {
    keyTestEntityLink: DeserializedType<T, 'Edm.Int32'>;
    keyToTestEntity: DeserializedType<T, 'Edm.Int32'>;
    stringProperty?: DeserializedType<T, 'Edm.String'> | null;
}
//# sourceMappingURL=TestEntityLink.d.ts.map