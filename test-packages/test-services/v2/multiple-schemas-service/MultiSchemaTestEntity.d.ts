import { Entity, DefaultDeSerializers, DeSerializers } from '@sap-cloud-sdk/odata-v2';
import { DeserializedType } from '@sap-cloud-sdk/odata-common/internal';
/**
 * This class represents the entity "MultiSchemaTestEntity" of service "API_MULTIPLE_SCHEMAS_SRV".
 */
export declare class MultiSchemaTestEntity<T extends DeSerializers = DefaultDeSerializers> extends Entity implements MultiSchemaTestEntityType<T> {
    /**
     * Technical entity name for MultiSchemaTestEntity.
     */
    static _entityName: string;
    /**
     * Default url path for the according service.
     */
    static _defaultServicePath: string;
    /**
     * All key fields of the MultiSchemaTestEntity entity
     */
    static _keys: string[];
    /**
     * Key Property.
     */
    keyProperty: DeserializedType<T, 'Edm.String'>;
}
export interface MultiSchemaTestEntityType<DeSerializersT extends DeSerializers = DefaultDeSerializers> {
    keyProperty: DeserializedType<DeSerializersT, 'Edm.String'>;
}
//# sourceMappingURL=MultiSchemaTestEntity.d.ts.map