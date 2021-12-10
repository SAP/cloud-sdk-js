import { Entity, DefaultDeSerializers, DeSerializers } from '@sap-cloud-sdk/odata-v2';
import { DeserializedType } from '@sap-cloud-sdk/odata-common/internal';
import { TestComplexType } from './TestComplexType';
import { TestEntityMultiLink, TestEntityMultiLinkType } from './TestEntityMultiLink';
import { TestEntityOtherMultiLink, TestEntityOtherMultiLinkType } from './TestEntityOtherMultiLink';
import { TestEntitySingleLink, TestEntitySingleLinkType } from './TestEntitySingleLink';
/**
 * This class represents the entity "A_TestEntity" of service "API_TEST_SRV".
 */
export declare class TestEntity<T extends DeSerializers = DefaultDeSerializers> extends Entity implements TestEntityType<T> {
    /**
     * Technical entity name for TestEntity.
     */
    static _entityName: string;
    /**
     * Default url path for the according service.
     */
    static _defaultServicePath: string;
    /**
     * All key fields of the TestEntity entity
     */
    static _keys: string[];
    /**
     * Key Property Guid.
     */
    keyPropertyGuid: DeserializedType<T, 'Edm.Guid'>;
    /**
     * Key Property String.
     */
    keyPropertyString: DeserializedType<T, 'Edm.String'>;
    /**
     * String Property.
     * Maximum length: 10.
     * @nullable
     */
    stringProperty?: DeserializedType<T, 'Edm.String'> | null;
    /**
     * Boolean Property.
     * @nullable
     */
    booleanProperty?: DeserializedType<T, 'Edm.Boolean'> | null;
    /**
     * Guid Property.
     * @nullable
     */
    guidProperty?: DeserializedType<T, 'Edm.Guid'> | null;
    /**
     * Int 16 Property.
     * @nullable
     */
    int16Property?: DeserializedType<T, 'Edm.Int16'> | null;
    /**
     * Int 32 Property.
     * @nullable
     */
    int32Property?: DeserializedType<T, 'Edm.Int32'> | null;
    /**
     * Int 64 Property.
     * @nullable
     */
    int64Property?: DeserializedType<T, 'Edm.Int64'> | null;
    /**
     * Decimal Property.
     * @nullable
     */
    decimalProperty?: DeserializedType<T, 'Edm.Decimal'> | null;
    /**
     * Single Property.
     * @nullable
     */
    singleProperty?: DeserializedType<T, 'Edm.Single'> | null;
    /**
     * Double Property.
     * @nullable
     */
    doubleProperty?: DeserializedType<T, 'Edm.Double'> | null;
    /**
     * Float Property.
     * @nullable
     */
    floatProperty?: DeserializedType<T, 'Edm.Float'> | null;
    /**
     * Time Property.
     * @nullable
     */
    timeProperty?: DeserializedType<T, 'Edm.Time'> | null;
    /**
     * Date Time Property.
     * @nullable
     */
    dateTimeProperty?: DeserializedType<T, 'Edm.DateTime'> | null;
    /**
     * Date Time Off Set Property.
     * @nullable
     */
    dateTimeOffSetProperty?: DeserializedType<T, 'Edm.DateTimeOffset'> | null;
    /**
     * Byte Property.
     * @nullable
     */
    byteProperty?: DeserializedType<T, 'Edm.Byte'> | null;
    /**
     * S Byte Property.
     * @nullable
     */
    sByteProperty?: DeserializedType<T, 'Edm.SByte'> | null;
    /**
     * Something The Sdk Does Not Support.
     * @nullable
     */
    somethingTheSdkDoesNotSupport?: DeserializedType<T, 'Edm.Any'> | null;
    /**
     * Complex Type Property.
     * @nullable
     */
    complexTypeProperty?: TestComplexType<T> | null;
    /**
     * One-to-many navigation property to the [[TestEntityMultiLink]] entity.
     */
    toMultiLink: TestEntityMultiLink<T>[];
    /**
     * One-to-many navigation property to the [[TestEntityOtherMultiLink]] entity.
     */
    toOtherMultiLink: TestEntityOtherMultiLink<T>[];
    /**
     * One-to-one navigation property to the [[TestEntitySingleLink]] entity.
     */
    toSingleLink?: TestEntitySingleLink<T> | null;
}
export interface TestEntityType<DeSerializersT extends DeSerializers = DefaultDeSerializers> {
    keyPropertyGuid: DeserializedType<DeSerializersT, 'Edm.Guid'>;
    keyPropertyString: DeserializedType<DeSerializersT, 'Edm.String'>;
    stringProperty?: DeserializedType<DeSerializersT, 'Edm.String'> | null;
    booleanProperty?: DeserializedType<DeSerializersT, 'Edm.Boolean'> | null;
    guidProperty?: DeserializedType<DeSerializersT, 'Edm.Guid'> | null;
    int16Property?: DeserializedType<DeSerializersT, 'Edm.Int16'> | null;
    int32Property?: DeserializedType<DeSerializersT, 'Edm.Int32'> | null;
    int64Property?: DeserializedType<DeSerializersT, 'Edm.Int64'> | null;
    decimalProperty?: DeserializedType<DeSerializersT, 'Edm.Decimal'> | null;
    singleProperty?: DeserializedType<DeSerializersT, 'Edm.Single'> | null;
    doubleProperty?: DeserializedType<DeSerializersT, 'Edm.Double'> | null;
    floatProperty?: DeserializedType<DeSerializersT, 'Edm.Float'> | null;
    timeProperty?: DeserializedType<DeSerializersT, 'Edm.Time'> | null;
    dateTimeProperty?: DeserializedType<DeSerializersT, 'Edm.DateTime'> | null;
    dateTimeOffSetProperty?: DeserializedType<DeSerializersT, 'Edm.DateTimeOffset'> | null;
    byteProperty?: DeserializedType<DeSerializersT, 'Edm.Byte'> | null;
    sByteProperty?: DeserializedType<DeSerializersT, 'Edm.SByte'> | null;
    somethingTheSdkDoesNotSupport?: DeserializedType<DeSerializersT, 'Edm.Any'> | null;
    complexTypeProperty?: TestComplexType<DeSerializersT> | null;
    toMultiLink: TestEntityMultiLinkType<DeSerializersT>[];
    toOtherMultiLink: TestEntityOtherMultiLinkType<DeSerializersT>[];
    toSingleLink?: TestEntitySingleLinkType<DeSerializersT> | null;
}
//# sourceMappingURL=TestEntity.d.ts.map