import { Entity, DefaultDeSerializers, DeSerializers, DeserializedType } from '@sap-cloud-sdk/odata-v2';
/**
 * This class represents the entity "A_TestEntityOtherMultiLink" of service "API_TEST_SRV".
 */
export declare class TestEntityOtherMultiLink<T extends DeSerializers = DefaultDeSerializers> extends Entity implements TestEntityOtherMultiLinkType<T> {
    /**
     * Technical entity name for TestEntityOtherMultiLink.
     */
    static _entityName: string;
    /**
     * Default url path for the according service.
     */
    static _defaultServicePath: string;
    /**
     * All key fields of the TestEntityOtherMultiLink entity
     */
    static _keys: string[];
    /**
     * Key Property.
     */
    keyProperty: DeserializedType<T, 'Edm.String'>;
}
export interface TestEntityOtherMultiLinkType<T extends DeSerializers = DefaultDeSerializers> {
    keyProperty: DeserializedType<T, 'Edm.String'>;
}
//# sourceMappingURL=TestEntityOtherMultiLink.d.ts.map