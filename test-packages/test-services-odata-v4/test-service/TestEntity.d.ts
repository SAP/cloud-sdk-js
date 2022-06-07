import {
  Entity,
  DefaultDeSerializers,
  DeSerializers,
  DeserializedType
} from '@sap-cloud-sdk/odata-v4';
import {
  TestEntityMultiLink,
  TestEntityMultiLinkType
} from './TestEntityMultiLink';
import {
  TestEntitySingleLink,
  TestEntitySingleLinkType
} from './TestEntitySingleLink';
/**
 * This class represents the entity "A_TestEntity" of service "API_TEST_SRV".
 */
export declare class TestEntity<T extends DeSerializers = DefaultDeSerializers>
  extends Entity
  implements TestEntityType<T>
{
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
   * Int 16 Property.
   * @nullable
   */
  int16Property?: DeserializedType<T, 'Edm.Int16'> | null;
  /**
   * One-to-many navigation property to the [[TestEntityMultiLink]] entity.
   */
  toMultiLink: TestEntityMultiLink<T>[];
  /**
   * One-to-one navigation property to the [[TestEntitySingleLink]] entity.
   */
  toSingleLink?: TestEntitySingleLink<T> | null;
}
export interface TestEntityType<
  T extends DeSerializers = DefaultDeSerializers
> {
  keyPropertyGuid: DeserializedType<T, 'Edm.Guid'>;
  keyPropertyString: DeserializedType<T, 'Edm.String'>;
  stringProperty?: DeserializedType<T, 'Edm.String'> | null;
  booleanProperty?: DeserializedType<T, 'Edm.Boolean'> | null;
  int16Property?: DeserializedType<T, 'Edm.Int16'> | null;
  toMultiLink: TestEntityMultiLinkType<T>[];
  toSingleLink?: TestEntitySingleLinkType<T> | null;
}
//# sourceMappingURL=TestEntity.d.ts.map
