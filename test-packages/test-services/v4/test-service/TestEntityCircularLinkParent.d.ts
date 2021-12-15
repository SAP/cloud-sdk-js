import { Entity, DefaultDeSerializers, DeSerializers } from '@sap-cloud-sdk/odata-v4';
import { DeserializedType } from '@sap-cloud-sdk/odata-common/internal';
import { TestEntityCircularLinkChild, TestEntityCircularLinkChildType } from './TestEntityCircularLinkChild';
/**
 * This class represents the entity "A_TestEntityCircularLinkParent" of service "API_TEST_SRV".
 */
export declare class TestEntityCircularLinkParent<T extends DeSerializers = DefaultDeSerializers> extends Entity implements TestEntityCircularLinkParentType<T> {
    /**
     * Technical entity name for TestEntityCircularLinkParent.
     */
    static _entityName: string;
    /**
     * Default url path for the according service.
     */
    static _defaultServicePath: string;
    /**
     * All key fields of the TestEntityCircularLinkParent entity
     */
    static _keys: string[];
    /**
     * Key Property.
     * Maximum length: 10.
     */
    keyProperty: DeserializedType<T, 'Edm.String'>;
    /**
     * One-to-one navigation property to the [[TestEntityCircularLinkChild]] entity.
     */
    toFirstChild?: TestEntityCircularLinkChild<T> | null;
    /**
     * One-to-many navigation property to the [[TestEntityCircularLinkChild]] entity.
     */
    toChildren: TestEntityCircularLinkChild<T>[];
}
export interface TestEntityCircularLinkParentType<T extends DeSerializers = DefaultDeSerializers> {
    keyProperty: DeserializedType<T, 'Edm.String'>;
    toFirstChild?: TestEntityCircularLinkChildType<T> | null;
    toChildren: TestEntityCircularLinkChildType<T>[];
}
//# sourceMappingURL=TestEntityCircularLinkParent.d.ts.map