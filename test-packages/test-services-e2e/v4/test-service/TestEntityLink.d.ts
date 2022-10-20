import { Entity, DefaultDeSerializers, DeSerializers, DeserializedType, BoundActionRequestBuilder } from '@sap-cloud-sdk/odata-v4';
import type { TestEntityLinkApi } from './TestEntityLinkApi';
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
    boundActionWithoutArguments_2<DeSerializersT extends DeSerializers = DefaultDeSerializers>(): BoundActionRequestBuilder<TestEntityLink<DeSerializersT>, DeSerializersT, any, string | null>;
    createTestEntityById_2<DeSerializersT extends DeSerializers = DefaultDeSerializers>(): BoundActionRequestBuilder<TestEntityLink<DeSerializersT>, DeSerializersT, any, undefined | null>;
    createTestEntityByIdReturnId_2<DeSerializersT extends DeSerializers = DefaultDeSerializers>(): BoundActionRequestBuilder<TestEntityLink<DeSerializersT>, DeSerializersT, any, number | null>;
    createTestEntityReturnId_2<DeSerializersT extends DeSerializers = DefaultDeSerializers>(): BoundActionRequestBuilder<TestEntityLink<DeSerializersT>, DeSerializersT, any, number | null>;
}
export interface TestEntityLinkType<T extends DeSerializers = DefaultDeSerializers> {
    keyTestEntityLink: DeserializedType<T, 'Edm.Int32'>;
    keyToTestEntity: DeserializedType<T, 'Edm.Int32'>;
    stringProperty?: DeserializedType<T, 'Edm.String'> | null;
}
//# sourceMappingURL=TestEntityLink.d.ts.map