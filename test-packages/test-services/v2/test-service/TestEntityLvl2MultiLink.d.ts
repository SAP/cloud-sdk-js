import { Entity, DefaultDeSerializers, DeSerializers } from '@sap-cloud-sdk/odata-v2';
import { DeserializedType } from '@sap-cloud-sdk/odata-common/internal';
/**
 * This class represents the entity "A_TestEntityLvl2MultiLink" of service "API_TEST_SRV".
 */
export declare class TestEntityLvl2MultiLink<T extends DeSerializers = DefaultDeSerializers> extends Entity implements TestEntityLvl2MultiLinkType<T> {
    /**
     * Technical entity name for TestEntityLvl2MultiLink.
     */
    static _entityName: string;
    /**
     * Default url path for the according service.
     */
    static _defaultServicePath: string;
    /**
     * All key fields of the TestEntityLvl2MultiLink entity
     */
    static _keys: string[];
    /**
     * Key Property.
     * Maximum length: 10.
     */
    keyProperty: DeserializedType<T, 'Edm.String'>;
    /**
     * String Property.
     * Maximum length: 10.
     * @nullable
     */
    stringProperty?: DeserializedType<T, 'Edm.String'>;
    /**
     * Boolean Property.
     * @nullable
     */
    booleanProperty?: DeserializedType<T, 'Edm.Boolean'>;
    /**
     * Guid Property.
     * @nullable
     */
    guidProperty?: DeserializedType<T, 'Edm.Guid'>;
    /**
     * Int 16 Property.
     * @nullable
     */
    int16Property?: DeserializedType<T, 'Edm.Int16'>;
}
export interface TestEntityLvl2MultiLinkType<DeSerializersT extends DeSerializers = DefaultDeSerializers> {
    keyProperty: DeserializedType<DeSerializersT, 'Edm.String'>;
    stringProperty?: DeserializedType<DeSerializersT, 'Edm.String'> | null;
    booleanProperty?: DeserializedType<DeSerializersT, 'Edm.Boolean'> | null;
    guidProperty?: DeserializedType<DeSerializersT, 'Edm.Guid'> | null;
    int16Property?: DeserializedType<DeSerializersT, 'Edm.Int16'> | null;
}
//# sourceMappingURL=TestEntityLvl2MultiLink.d.ts.map