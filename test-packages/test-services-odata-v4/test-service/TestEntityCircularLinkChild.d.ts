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
} from '@sap-cloud-sdk/odata-v4';
import type { TestEntityCircularLinkChildApi } from './TestEntityCircularLinkChildApi';
import {
  TestEntityCircularLinkParent,
  TestEntityCircularLinkParentType
} from './TestEntityCircularLinkParent';
/**
 * This class represents the entity "A_TestEntityCircularLinkChild" of service "API_TEST_SRV".
 */
export declare class TestEntityCircularLinkChild<
    T extends DeSerializers = DefaultDeSerializers
  >
  extends Entity
  implements TestEntityCircularLinkChildType<T>
{
  readonly _entityApi: TestEntityCircularLinkChildApi<T>;
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
   * Maximum length: 10.
   */
  keyProperty: DeserializedType<T, 'Edm.String'>;
  /**
   * One-to-one navigation property to the {@link TestEntityCircularLinkParent} entity.
   */
  toParent?: TestEntityCircularLinkParent<T> | null;
  constructor(_entityApi: TestEntityCircularLinkChildApi<T>);
}
export interface TestEntityCircularLinkChildType<
  T extends DeSerializers = DefaultDeSerializers
> {
  keyProperty: DeserializedType<T, 'Edm.String'>;
  toParent?: TestEntityCircularLinkParentType<T> | null;
}
//# sourceMappingURL=TestEntityCircularLinkChild.d.ts.map
