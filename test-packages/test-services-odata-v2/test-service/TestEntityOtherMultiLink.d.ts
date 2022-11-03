/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import {
  Entity,
  DefaultDeSerializers,
  DeSerializers,
  DeserializedType
} from '@sap-cloud-sdk/odata-v2';
import type { TestEntityOtherMultiLinkApi } from './TestEntityOtherMultiLinkApi';
/**
 * This class represents the entity "A_TestEntityOtherMultiLink" of service "API_TEST_SRV".
 */
export declare class TestEntityOtherMultiLink<
    T extends DeSerializers = DefaultDeSerializers
  >
  extends Entity
  implements TestEntityOtherMultiLinkType<T>
{
  readonly _entityApi: TestEntityOtherMultiLinkApi<T>;
  /**
   * Technical entity name for TestEntityOtherMultiLink.
   */
  static _entityName: string;
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath: string;
  /**
   * All key fields of the TestEntityOtherMultiLink entity
   */
  static _keys: string[];
  /**
   * Key Property.
   */
  keyProperty: DeserializedType<T, 'Edm.String'>;
  constructor(_entityApi: TestEntityOtherMultiLinkApi<T>);
}
export interface TestEntityOtherMultiLinkType<
  T extends DeSerializers = DefaultDeSerializers
> {
  keyProperty: DeserializedType<T, 'Edm.String'>;
}
//# sourceMappingURL=TestEntityOtherMultiLink.d.ts.map
