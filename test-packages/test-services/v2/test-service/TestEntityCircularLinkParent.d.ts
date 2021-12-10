import {
  Entity,
  DefaultDeSerializers,
  DeSerializers
} from '@sap-cloud-sdk/odata-v2';
import { DeserializedType } from '@sap-cloud-sdk/odata-common/internal';
import {
  TestEntityCircularLinkChild,
  TestEntityCircularLinkChildType
} from './TestEntityCircularLinkChild';
/**
 * This class represents the entity "A_TestEntityCircularLinkParent" of service "API_TEST_SRV".
 */
export declare class TestEntityCircularLinkParent<
    T extends DeSerializers = DefaultDeSerializers
  >
  extends Entity
  implements TestEntityCircularLinkParentType<T>
{
  /**
   * Technical entity name for TestEntityCircularLinkParent.
   */
  static _entityName: string;
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath: string;
  /**
   * All key fields of the TestEntityCircularLinkParent entity
   */
  static _keys: string[];
  /**
   * Key Property.
   */
  keyProperty: DeserializedType<T, 'Edm.String'>;
  /**
   * One-to-many navigation property to the [[TestEntityCircularLinkChild]] entity.
   */
  toChild: TestEntityCircularLinkChild<T>[];
}
export interface TestEntityCircularLinkParentType<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> {
  keyProperty: DeserializedType<DeSerializersT, 'Edm.String'>;
  toChild: TestEntityCircularLinkChildType<DeSerializersT>[];
}
//# sourceMappingURL=TestEntityCircularLinkParent.d.ts.map
