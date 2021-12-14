import { Entity, DefaultDeSerializers, DeSerializers } from '@sap-cloud-sdk/odata-v2';
import { DeserializedType } from '@sap-cloud-sdk/odata-common/internal';
/**
 * This class represents the entity "A_CASETEST" of service "API_TEST_SRV".
 */
export declare class Casetest_1<T extends DeSerializers = DefaultDeSerializers> extends Entity implements Casetest_1Type<T> {
    /**
     * Technical entity name for Casetest_1.
     */
    static _entityName: string;
    /**
     * Default url path for the according service.
     */
    static _defaultServicePath: string;
    /**
     * All key fields of the Casetest_1 entity
     */
    static _keys: string[];
    /**
     * Key Property String.
     */
    keyPropertyString: DeserializedType<T, 'Edm.String'>;
}
export interface Casetest_1Type<T extends DeSerializers = DefaultDeSerializers> {
    keyPropertyString: DeserializedType<T, 'Edm.String'>;
}
//# sourceMappingURL=Casetest_1.d.ts.map