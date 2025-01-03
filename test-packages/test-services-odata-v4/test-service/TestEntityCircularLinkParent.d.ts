/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import {
  Entity,
  DefaultDeSerializers,
  DeSerializers,
  DeserializedType
} from '@sap-cloud-sdk/odata-v4';
import type { TestEntityCircularLinkParentApi } from './TestEntityCircularLinkParentApi';
import {
  TestEntityCircularLinkChild,
  TestEntityCircularLinkChildType
} from './TestEntityCircularLinkChild';
/**
 * See https://api.sap.com/api/path for more information.
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
  static _defaultBasePath: string;
  /**
   * All key fields of the TestEntityCircularLinkParent entity.
   */
  static _keys: string[];
  /**
   * Key Property.
   * Maximum length: 10.
   */
  keyProperty: DeserializedType<T, 'Edm.String'>;
  /**
   * One-to-one navigation property to the {@link TestEntityCircularLinkChild} entity.
   */
  toFirstChild?: TestEntityCircularLinkChild<T> | null;
  /**
   * One-to-many navigation property to the {@link TestEntityCircularLinkChild} entity.
   */
  toChildren: TestEntityCircularLinkChild<T>[];
  constructor(_entityApi: TestEntityCircularLinkParentApi<T>);
}
export interface TestEntityCircularLinkParentType<
  T extends DeSerializers = DefaultDeSerializers
> {
  keyProperty: DeserializedType<T, 'Edm.String'>;
  toFirstChild?: TestEntityCircularLinkChildType<T> | null;
  toChildren: TestEntityCircularLinkChildType<T>[];
}
