import {
  Entity,
  DefaultDeSerializers,
  DeSerializers
} from '@sap-cloud-sdk/odata-v2';
import { DeserializedType } from '@sap-cloud-sdk/odata-common/internal';
/**
 * This class represents the entity "A_TestEntityLvl2SingleLink" of service "API_TEST_SRV".
 */
export declare class TestEntityLvl2SingleLink<
    T extends DeSerializers = DefaultDeSerializers
  >
  extends Entity
  implements TestEntityLvl2SingleLinkType<T>
{
  /**
   * Technical entity name for TestEntityLvl2SingleLink.
   */
  static _entityName: string;
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath: string;
  /**
   * All key fields of the TestEntityLvl2SingleLink entity
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
}
export interface TestEntityLvl2SingleLinkType<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> {
  keyProperty: DeserializedType<DeSerializersT, 'Edm.String'>;
  stringProperty?: DeserializedType<DeSerializersT, 'Edm.String'> | null;
  booleanProperty?: DeserializedType<DeSerializersT, 'Edm.Boolean'> | null;
  guidProperty?: DeserializedType<DeSerializersT, 'Edm.Guid'> | null;
  int16Property?: DeserializedType<DeSerializersT, 'Edm.Int16'> | null;
}
//# sourceMappingURL=TestEntityLvl2SingleLink.d.ts.map
