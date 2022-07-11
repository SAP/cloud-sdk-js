import {
  Entity,
  DefaultDeSerializers,
  DeSerializers,
  DeserializedType
} from '@sap-cloud-sdk/odata-v4';
import {
  TestEntityLvl2MultiLink,
  TestEntityLvl2MultiLinkType
} from './TestEntityLvl2MultiLink';
import {
  TestEntityLvl2SingleLink,
  TestEntityLvl2SingleLinkType
} from './TestEntityLvl2SingleLink';
/**
 * This class represents the entity "A_TestEntityMultiLink" of service "API_TEST_SRV".
 */
export declare class TestEntityMultiLink<
    T extends DeSerializers = DefaultDeSerializers
  >
  extends Entity
  implements TestEntityMultiLinkType<T>
{
  /**
   * Technical entity name for TestEntityMultiLink.
   */
  static _entityName: string;
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath: string;
  /**
   * All key fields of the TestEntityMultiLink entity
   */
  static _keys: string[];
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
   * Key Property.
   * Maximum length: 10.
   */
  keyProperty: DeserializedType<T, 'Edm.String'>;
  /**
   * One-to-many navigation property to the [[TestEntityLvl2MultiLink]] entity.
   */
  toMultiLink1: TestEntityLvl2MultiLink<T>[];
  /**
   * One-to-one navigation property to the [[TestEntityLvl2SingleLink]] entity.
   */
  toSingleLink?: TestEntityLvl2SingleLink<T> | null;
}
export interface TestEntityMultiLinkType<
  T extends DeSerializers = DefaultDeSerializers
> {
  stringProperty?: DeserializedType<T, 'Edm.String'> | null;
  booleanProperty?: DeserializedType<T, 'Edm.Boolean'> | null;
  guidProperty?: DeserializedType<T, 'Edm.Guid'> | null;
  int16Property?: DeserializedType<T, 'Edm.Int16'> | null;
  keyProperty: DeserializedType<T, 'Edm.String'>;
  toMultiLink1: TestEntityLvl2MultiLinkType<T>[];
  toSingleLink?: TestEntityLvl2SingleLinkType<T> | null;
}
//# sourceMappingURL=TestEntityMultiLink.d.ts.map
