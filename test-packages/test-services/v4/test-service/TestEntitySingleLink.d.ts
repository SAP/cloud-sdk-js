import {
  Entity,
  DefaultDeSerializers,
  DeSerializers
} from '@sap-cloud-sdk/odata-v4';
import { DeserializedType } from '@sap-cloud-sdk/odata-common/internal';
import {
  TestEntityLvl2MultiLink,
  TestEntityLvl2MultiLinkType
} from './TestEntityLvl2MultiLink';
import {
  TestEntityLvl2SingleLink,
  TestEntityLvl2SingleLinkType
} from './TestEntityLvl2SingleLink';
/**
 * This class represents the entity "A_TestEntitySingleLink" of service "API_TEST_SRV".
 */
export declare class TestEntitySingleLink<
    T extends DeSerializers = DefaultDeSerializers
  >
  extends Entity
  implements TestEntitySingleLinkType<T>
{
  /**
   * Technical entity name for TestEntitySingleLink.
   */
  static _entityName: string;
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath: string;
  /**
   * All key fields of the TestEntitySingleLink entity
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
  toMultiLink: TestEntityLvl2MultiLink<T>[];
  /**
   * One-to-one navigation property to the [[TestEntityLvl2SingleLink]] entity.
   */
  toSingleLink?: TestEntityLvl2SingleLink<T> | null;
}
export interface TestEntitySingleLinkType<
  T extends DeSerializers = DefaultDeSerializers
> {
  stringProperty?: DeserializedType<T, 'Edm.String'> | null;
  booleanProperty?: DeserializedType<T, 'Edm.Boolean'> | null;
  guidProperty?: DeserializedType<T, 'Edm.Guid'> | null;
  int16Property?: DeserializedType<T, 'Edm.Int16'> | null;
  keyProperty: DeserializedType<T, 'Edm.String'>;
  toMultiLink: TestEntityLvl2MultiLinkType<T>[];
  toSingleLink?: TestEntityLvl2SingleLinkType<T> | null;
}
//# sourceMappingURL=TestEntitySingleLink.d.ts.map
