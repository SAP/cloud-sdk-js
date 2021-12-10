import {
  Entity,
  DefaultDeSerializers,
  DeSerializers
} from '@sap-cloud-sdk/odata-v2';
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
   * Key Property.
   * Maximum length: 10.
   */
  keyProperty: DeserializedType<T, 'Edm.String'>;
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
   * One-to-many navigation property to the [[TestEntityLvl2MultiLink]] entity.
   */
  toMultiLink: TestEntityLvl2MultiLink<T>[];
  /**
   * One-to-one navigation property to the [[TestEntityLvl2SingleLink]] entity.
   */
  toSingleLink?: TestEntityLvl2SingleLink<T> | null;
}
export interface TestEntityMultiLinkType<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> {
  keyProperty: DeserializedType<DeSerializersT, 'Edm.String'>;
  stringProperty?: DeserializedType<DeSerializersT, 'Edm.String'> | null;
  booleanProperty?: DeserializedType<DeSerializersT, 'Edm.Boolean'> | null;
  guidProperty?: DeserializedType<DeSerializersT, 'Edm.Guid'> | null;
  int16Property?: DeserializedType<DeSerializersT, 'Edm.Int16'> | null;
  toMultiLink: TestEntityLvl2MultiLinkType<DeSerializersT>[];
  toSingleLink?: TestEntityLvl2SingleLinkType<DeSerializersT> | null;
}
//# sourceMappingURL=TestEntityMultiLink.d.ts.map
