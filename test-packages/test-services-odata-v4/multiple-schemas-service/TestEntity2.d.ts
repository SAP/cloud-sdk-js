import { Entity, DefaultDeSerializers, DeSerializers, DeserializedType } from '@sap-cloud-sdk/odata-v4';
/**
 * This class represents the entity "A_TestEntity2" of service "API_MULTIPLE_SCHEMAS_SRV".
 */
export declare class TestEntity2<T extends DeSerializers = DefaultDeSerializers> extends Entity implements TestEntity2Type<T> {
    /**
     * Technical entity name for TestEntity2.
     */
    static _entityName: string;
    /**
     * Default url path for the according service.
     */
    static _defaultServicePath: string;
    /**
     * All key fields of the TestEntity2 entity
     */
    static _keys: string[];
    /**
     * Key Property String.
     */
    keyPropertyString: DeserializedType<T, 'Edm.String'>;
    /**
     * Single Property.
     * @nullable
     */
    singleProperty?: DeserializedType<T, 'Edm.Single'> | null;
}
export interface TestEntity2Type<T extends DeSerializers = DefaultDeSerializers> {
    keyPropertyString: DeserializedType<T, 'Edm.String'>;
    singleProperty?: DeserializedType<T, 'Edm.Single'> | null;
}
//# sourceMappingURL=TestEntity2.d.ts.map