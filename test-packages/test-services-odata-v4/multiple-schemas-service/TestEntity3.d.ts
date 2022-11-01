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
import { TestComplexType2 } from './TestComplexType2';
import type { TestEntity3Api } from './TestEntity3Api';
import { TestEnumType2 } from './TestEnumType2';
/**
 * This class represents the entity "A_TestEntity3" of service "API_MULTIPLE_SCHEMAS_SRV".
 */
export declare class TestEntity3<T extends DeSerializers = DefaultDeSerializers>
  extends Entity
  implements TestEntity3Type<T>
{
  readonly _entityApi: TestEntity3Api<T>;
  /**
   * Technical entity name for TestEntity3.
   */
  static _entityName: string;
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath: string;
  /**
   * All key fields of the TestEntity3 entity
   */
  static _keys: string[];
  /**
   * Key Property String.
   */
  keyPropertyString: DeserializedType<T, 'Edm.String'>;
  /**
   * Enum Property.
   * @nullable
   */
  enumProperty?: TestEnumType2 | null;
  /**
   * Complex Type Property.
   * @nullable
   */
  complexTypeProperty?: TestComplexType2<T> | null;
  constructor(_entityApi: TestEntity3Api<T>);
}
export interface TestEntity3Type<
  T extends DeSerializers = DefaultDeSerializers
> {
  keyPropertyString: DeserializedType<T, 'Edm.String'>;
  enumProperty?: TestEnumType2 | null;
  complexTypeProperty?: TestComplexType2<T> | null;
}
//# sourceMappingURL=TestEntity3.d.ts.map
