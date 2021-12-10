import {
  Entity,
  DefaultDeSerializers,
  DeSerializers
} from '@sap-cloud-sdk/odata-v2';
import { DeserializedType } from '@sap-cloud-sdk/odata-common/internal';
/**
 * This class represents the entity "A_TestEntityCircularLinkChild" of service "API_TEST_SRV".
 */
export declare class TestEntityCircularLinkChild<
    T extends DeSerializers = DefaultDeSerializers
  >
  extends Entity
  implements TestEntityCircularLinkChildType<T>
{
  /**
   * Technical entity name for TestEntityCircularLinkChild.
   */
  static _entityName: string;
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath: string;
  /**
   * All key fields of the TestEntityCircularLinkChild entity
   */
  static _keys: string[];
  /**
   * Key Property.
   */
  keyProperty: DeserializedType<T, 'Edm.String'>;
  /**
   * One-to-many navigation property to the [[TestEntityCircularLinkChild]] entity.
   */
  toParent: TestEntityCircularLinkChild<T>[];
}
export interface TestEntityCircularLinkChildType<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> {
  keyProperty: DeserializedType<DeSerializersT, 'Edm.String'>;
  toParent: TestEntityCircularLinkChildType<DeSerializersT>[];
}
//# sourceMappingURL=TestEntityCircularLinkChild.d.ts.map
