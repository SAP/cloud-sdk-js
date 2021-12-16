import {
  Entity,
  DefaultDeSerializers,
  DeSerializers
} from '@sap-cloud-sdk/odata-v4';
import { DeserializedType } from '@sap-cloud-sdk/odata-common/internal';
/**
 * This class represents the entity "A_TestEntityEndsWithSomethingElse" of service "API_TEST_SRV".
 */
export declare class TestEntityEndsWithSomethingElse<
    T extends DeSerializers = DefaultDeSerializers
  >
  extends Entity
  implements TestEntityEndsWithSomethingElseType<T>
{
  /**
   * Technical entity name for TestEntityEndsWithSomethingElse.
   */
  static _entityName: string;
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath: string;
  /**
   * All key fields of the TestEntityEndsWithSomethingElse entity
   */
  static _keys: string[];
  /**
   * Key Property.
   * Maximum length: 10.
   */
  keyProperty: DeserializedType<T, 'Edm.String'>;
}
export interface TestEntityEndsWithSomethingElseType<
  T extends DeSerializers = DefaultDeSerializers
> {
  keyProperty: DeserializedType<T, 'Edm.String'>;
}
//# sourceMappingURL=TestEntityEndsWithSomethingElse.d.ts.map
