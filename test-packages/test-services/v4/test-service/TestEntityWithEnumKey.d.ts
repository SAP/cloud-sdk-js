import { Entity, DefaultDeSerializers, DeSerializers } from '@sap-cloud-sdk/odata-v4';
import { TestEnumType } from './TestEnumType';
/**
 * This class represents the entity "A_TestEntityWithEnumKey" of service "API_TEST_SRV".
 */
export declare class TestEntityWithEnumKey<T extends DeSerializers = DefaultDeSerializers> extends Entity implements TestEntityWithEnumKeyType<T> {
    /**
     * Technical entity name for TestEntityWithEnumKey.
     */
    static _entityName: string;
    /**
     * Default url path for the according service.
     */
    static _defaultServicePath: string;
    /**
     * All key fields of the TestEntityWithEnumKey entity
     */
    static _keys: string[];
    /**
     * Key Property Enum 1.
     */
    keyPropertyEnum1: TestEnumType;
}
export interface TestEntityWithEnumKeyType<T extends DeSerializers = DefaultDeSerializers> {
    keyPropertyEnum1: TestEnumType;
}
//# sourceMappingURL=TestEntityWithEnumKey.d.ts.map