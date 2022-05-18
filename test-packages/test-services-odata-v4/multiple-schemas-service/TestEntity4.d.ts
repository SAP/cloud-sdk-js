import { Entity, DefaultDeSerializers, DeSerializers, DeserializedType } from '@sap-cloud-sdk/odata-v4';
/**
 * This class represents the entity "A_TestEntity4" of service "API_MULTIPLE_SCHEMAS_SRV".
 */
export declare class TestEntity4<T extends DeSerializers = DefaultDeSerializers> extends Entity implements TestEntity4Type<T> {
    /**
     * Technical entity name for TestEntity4.
     */
    static _entityName: string;
    /**
     * Default url path for the according service.
     */
    static _defaultServicePath: string;
    /**
     * All key fields of the TestEntity4 entity
     */
    static _keys: string[];
    /**
     * Key Property String.
     */
    keyPropertyString: DeserializedType<T, 'Edm.String'>;
    /**
     * Boolean Property.
     * @nullable
     */
    booleanProperty?: DeserializedType<T, 'Edm.Boolean'> | null;
}
export interface TestEntity4Type<T extends DeSerializers = DefaultDeSerializers> {
    keyPropertyString: DeserializedType<T, 'Edm.String'>;
    booleanProperty?: DeserializedType<T, 'Edm.Boolean'> | null;
}
//# sourceMappingURL=TestEntity4.d.ts.map