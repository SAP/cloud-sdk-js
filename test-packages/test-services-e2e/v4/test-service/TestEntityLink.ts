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
import type { TestEntityLinkApi } from './TestEntityLinkApi';

/**
 * This class represents the entity "TestEntityLink" of service "TestService".
 */
export class TestEntityLink<T extends DeSerializers = DefaultDeSerializers>
  extends Entity
  implements TestEntityLinkType<T>
{
  /**
   * Technical entity name for TestEntityLink.
   */
  static override _entityName = 'TestEntityLink';
  /**
   * Default url path for the according service.
   */
  static override _defaultBasePath = '/odata/test-service';
  /**
   * All key fields of the TestEntityLink entity.
   */
  static _keys = ['KeyTestEntityLink', 'KeyToTestEntity'];
  /**
   * Key Test Entity Link.
   */
  declare keyTestEntityLink: DeserializedType<T, 'Edm.Int32'>;
  /**
   * Key To Test Entity.
   */
  declare keyToTestEntity: DeserializedType<T, 'Edm.Int32'>;
  /**
   * String Property.
   * Maximum length: 111.
   * @nullable
   */
  declare stringProperty?: DeserializedType<T, 'Edm.String'> | null;

  constructor(_entityApi: TestEntityLinkApi<T>) {
    super(_entityApi);
  }
}

export interface TestEntityLinkType<
  T extends DeSerializers = DefaultDeSerializers
> {
  keyTestEntityLink: DeserializedType<T, 'Edm.Int32'>;
  keyToTestEntity: DeserializedType<T, 'Edm.Int32'>;
  stringProperty?: DeserializedType<T, 'Edm.String'> | null;
}
