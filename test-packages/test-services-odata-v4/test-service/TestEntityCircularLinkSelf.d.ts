import {
  Entity,
  DefaultDeSerializers,
  DeSerializers,
  DeserializedType
} from '@sap-cloud-sdk/odata-v4';
/**
 * This class represents the entity "A_TestEntityCircularLinkSelf" of service "API_TEST_SRV".
 */
export declare class TestEntityCircularLinkSelf<
    T extends DeSerializers = DefaultDeSerializers
  >
  extends Entity
  implements TestEntityCircularLinkSelfType<T>
{
  /**
   * Technical entity name for TestEntityCircularLinkSelf.
   */
  static _entityName: string;
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath: string;
  /**
   * All key fields of the TestEntityCircularLinkSelf entity
   */
  static _keys: string[];
  /**
   * Key Property.
   * Maximum length: 10.
   */
  keyProperty: DeserializedType<T, 'Edm.String'>;
  /**
   * One-to-one navigation property to the [[TestEntityCircularLinkSelf]] entity.
   */
  toSelf?: TestEntityCircularLinkSelf<T> | null;
}
export interface TestEntityCircularLinkSelfType<
  T extends DeSerializers = DefaultDeSerializers
> {
  keyProperty: DeserializedType<T, 'Edm.String'>;
  toSelf?: TestEntityCircularLinkSelfType<T> | null;
}
//# sourceMappingURL=TestEntityCircularLinkSelf.d.ts.map
